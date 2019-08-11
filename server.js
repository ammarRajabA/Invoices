const express = require('express');
var faker = require('faker');
var cors=require('cors')
const app = express();
app.use(express.json()); // for parsing application/json
app.use(cors())
app.use(express.static('./app/public'));
const port = 2500;
const NUM_INVOICES = 100;

function randomInvoice() {
  const senderName = `${faker.name.firstName()} ${faker.name.lastName()}`;
  const recipientName = `${faker.name.firstName()} ${faker.name.lastName()}`;
  return {
    "id": faker.random.uuid(),
    "dueDate": faker.date.future(),
    "createdDate": faker.date.past(),
    "sender": {
      "name": senderName,
      "email": `${senderName.split(" ").map(n => n.toLowerCase()).join(".")}@sender.com`,
      "address1": `${faker.company.companyName()} ${faker.company.companySuffix()}`,
      "address2": `${faker.address.streetName()}, ${faker.random.number({min: 1, max: 100})}`,
      "address3": `${faker.address.zipCode()} ${faker.address.city()}`,
      "vatId": faker.helpers.replaceSymbolWithNumber("DE#########")
    },
    "recipient": {
      "name": recipientName,
      "email": `${recipientName.split(" ").map(n => n.toLowerCase()).join(".")}@recipient.com`,
      "address1": `${faker.company.companyName()} ${faker.company.companySuffix()}`,
      "address2": `${faker.address.streetName()}, ${faker.random.number({min: 1, max: 100})}`,
      "address3": `${faker.address.zipCode()} ${faker.address.city()}`,
      "vatId": faker.helpers.replaceSymbolWithNumber("DE#########")
    },
    "items": Array.apply(null, new Array(faker.random.number({min: 1, max: 20}))).map(() => (
      {
        "description": faker.commerce.productName(),
        "qty": faker.random.number({min: 1, max: 10}),
        "unitPriceNet": parseFloat(faker.finance.amount(0.01,100,2)),
        "taxRate": 0.19
      }
    ))
  }
}

function paginate(array, page_size, page_number) {
  --page_number; // because pages logically start with 1, but technically with 0
  return array.slice(page_number * page_size, (page_number + 1) * page_size);
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const INVOICES = Array.apply(null, new Array(NUM_INVOICES)).map(randomInvoice);

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/invoices', (req, res) => {
  const {page_size, page_number} = req.query;
  const number = isNumber(page_number) ? parseInt(page_number) : 1;
  const size = isNumber(page_size) ? parseInt(page_size) : 10;
  const paginated = paginate(INVOICES, size, number);
  res.json({
    invoices: paginated,
    meta: {
      total: INVOICES.length,
      totalPages: Math.ceil(INVOICES.length / size),
      pageNumber: number,
      pageSize: size
    }
  })
});

app.get('/invoices/:id', (req, res) => {
  const id = req.params["id"];
  const needle = INVOICES.find(i => i.id === id);
  if (needle) {
    res.json({
      invoice: needle
    })
  } else {
    res.status(404).json({error: "Not found."});
  }
});

app.post('/invoices', (req, res) => {
  const {dueDate, sender, recipient, items} = req.body.invoice;
  const newInvoice = {id: faker.random.uuid(), createdDate: new Date(), dueDate, sender, recipient, items};
  INVOICES.push(newInvoice);
  res.json({
    invoice: newInvoice
  });
});

app.put('/invoices/:id', (req, res) => {
  const id = req.params["id"];
  const {dueDate, sender, recipient, items} = req.body.invoice;
  const idx = INVOICES.findIndex(i => {
    return i.id === id;
  });
  if (idx !== -1) {
    INVOICES[idx] = {...INVOICES[idx], dueDate, sender, recipient, items};
    res.json({
      invoice: INVOICES[idx]
    })
  } else {
    res.status(404).json({error: "Not found."});
  }
});

app.delete('/invoices/:id', (req, res) => {
  const id = req.params["id"];
  const idx = INVOICES.findIndex(i => {
    return i.id === id;
  });
  if (idx !== -1) {
    INVOICES.splice(idx, 1);
    res.status(204).send("");
  } else {
    res.status(404).json({error: "Not found."});
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));