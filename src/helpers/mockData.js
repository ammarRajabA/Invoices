import faker from 'faker';

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

const NUM_INVOICES = 10;
const INVOICES = Array.apply(null, new Array(NUM_INVOICES)).map(randomInvoice);

export default {
	invoices:INVOICES,
	meta:{
		total:100,
		totalPages:10,
		pageNumber:1,
		pageSize:10
	},
  INIT_STATE:{
    invoices:[],
    selectedInvoice:null,
    loading:false,
    invoiceSelected:null,
    meta:{
      total:0,
      totalPages:0,
      pageNumber:0,
      pageSize:0
    },
    newInvoice:{
      "id": -1,
        "dueDate": new Date(),
        "createdDate": new Date(),
        "sender": {
            "name": '',
            "email": '',
            "address1": '',
            "address2": '',
            "address3": '',
            "vatId": ''
        },
        "recipient": {
            "name": '',
            "email": '',
            "address1": '',
            "address2": '',
            "address3": '',
            "vatId": ''
        },
        "items": [{description:'',qty:0,unitPriceNet:0,taxRate:0}]
    }
  }
}