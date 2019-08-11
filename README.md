# Hypatos Frontend Developer coding challenge

Congratulations you made it through the initial interview. Now it’s time to show off your coding skills. The following task should be self-explanatory but if you have any questions don’t hesitate to contact us lars.buenting@hypatos.ai / levin.rickert@hypatos.ai. We are happy to help.

## Your Task: Create UI for invoice management

Create a simple single page web application to manage invoices. The application is specificated as follow:

Epic from our Product Owner:

As a Hypatos client, I would like to manage my invoices.


1. I would like to see a list of my invoices.

   -  by default show 10 invoices per page, but I want to control that (query params: `page_size` + `page_number`)
  create a new invoice (2)
   - go to the invoice edit (3)
   - go to the invoice detail (4)
   - delete my invoice

2. I would like to create a new invoice (invoice structure see `/invoices/:id`) 
	 some validations should already run on the frontend side to give quick feedback:
	 - vat id formatted like DE[0-9]{9}
   - email format
   - item qty should be > 0
   - unit price should be > 0
   - sender+recipient (name, vatId, email, address1) and dueDate are mandatory
   
   example payload to send (body): 
   ```json
   {
     "invoice": {
       "dueDate": "2099-04-17T11:42:47.881Z",
   
       "sender": {
         "name": "Test User",
         "email": "test.user@sender.com",
         "address1": "Some Group",
         "address2": "Octavia Road, 111",
         "address3": "39074 North Aliceshire",
         "vatId": "DE433238140"
       },
       "recipient": {
         "name": "Clarissa Grimes",
         "email": "clarissa.grimes@sender.com",
         "address1": "Marquardt Group Group",
         "address2": "Cronin Stream, 300",
         "address3": "87471 East Damianhaven",
         "vatId": "DE353236957"
       },
       "items": [
         {
           "description": "Unbranded Soft Pants",
           "qty": 8,
           "unitPriceNet": 40.10,
           "taxRate": 0.19
         }
       ]
     }
   }
   ```

3. I would like to update my invoice.

   - fields that can be updated: 
   - dueDate, items, sender + recipient fields should be editable and validated

4. I would like to see invoice detail.

   - the invoice should be presented more or less like a real invoice layout
   - add calculated value for items: item total before tax (netto), item total after tax (brutto)
   - add calculated value for invoice: total before tax (netto), total after tax (brutto)

### Prequisites:
We already prepared a simple express (nodejs) server with 100 random invoices in this repo.

- Install its deps: `npm install`
- Run it with: `npm start`
- Source code for it is located in `server.js`

## Frontend Developer backlog item form retrospective:

As a Frontend Developer, I would like to use a stack that I prefer, and is used at our company ([React](https://reactjs.org/) or [Ember](https://emberjs.com/)). I would like to write tests for my project because I care about the quality. I want to run and deploy my application easier, so I should focus on that.

## Ship it!

When you’re done, you may provide a Docker container with instructions on how to run it.
Please push the source code in a public Github repository for review.

## How we review
Your application will be reviewed by at least two of our engineers. We do take into consideration your experience level.

- **Architecture**: how clean is the separation between functionalities, is it easy to maintain and add new features
- **Clarity**: does the README clearly and concisely explains the problem and solution? Are technical tradeoffs explained?
- **Correctness**: does the application do what was asked? If anything is missing, does the README explain why it is missing?
- **Code quality**: is the code simple, easy to understand, and maintainable? Are there any code smells or other red flags? Does the object-oriented code follow principles such as the single responsibility principle? Is the coding style consistent with the language's guidelines? Is it consistent throughout the codebase?
- **Testing**: how thorough are the automated tests? Will they be difficult to change if the application requirements were to change? Are there some unit and some integration tests? We're not looking for full coverage (given time constraint) but just trying to get a feel for your testing skills.
- **UX**: is the web interface understandable and pleasing to use?
- **Technical choices**: do choices of libraries, architecture, etc. seem appropriate for the chosen
application?
- Does your README contain information on how to run it?

## Bonus points
If you still have time, think about how to make the app even better... how about: 
- add sort on ui and api side
- add a simple search 
- host it somewhere (e.g. on Amazon EC2, Heroku, Google AppEngine, etc.)
- rewrite the server side to persist data in a database, with a backend framework of your choice (we use golang and python a lot)
