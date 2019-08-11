# Invoices
## Overview
**Invoices** is a React JS web application written simply to manage invoices by providing following functionalities:

 - View list of invoices with simple filtering and search.
 - Edit an invoice.
 - Delete invoice.
 - Create new invoice.
 -  Invoice form validation.

## App Structure
This web app is structured to support scalability by creating **functional** components as modules and separating them from **presentation** components. 

 - In `components` directory presentation components are placed and they're made in a way that they receive their inputs as `props`and they're not connected by `connect()` to **Redux** store.

 - In `modules` directory functional components or modules are placed and they're connected to the **Redux** store.  Each module is its own directory and represents discrete domain within the application and has its **style**,  **actions**, **reducers** and **test** files.

 - Application has also `api` folder that has **Axios** object along with `__mock__` folder that has **Enzyme** mock for the API module.

 - In the `helpers` there's the `finance` file that is responsible for the math functions and calculations, `mockData` that has static data used during testing, `tests-utils` that has helper functions used in mounting components and connecting them to Redux during testing, and the `validators` functions that validate forms.

 - Reducers are combined in the `reducers` directory.

## Running
You can **run** this web app by

 - cloning this **two branches** of this repository (two branches master and backend).
 - `cd` to `backend` directory and run in command line 
	> npm install
	> npm start

	This will start the dummy backend on port `2500`.
 - `cd` to the `master` directory and run in command line
	> yarn
	> npm start

	This will start the ReactJS web app on port `3000`, open your browser to http://localhost:3000/.

You can **test** the app by runnung unit tests by navigating to the master directory and run

> yarn test

Or if you prefer using **Docker**  you can run this web app simply by running following command in command line

> docker run ammar123/invoices:small

Then open your browser to http://localhost:2500/ . Note that we're listening on port 2500 instead of 3000 because this image runs the built version of the React app.

## Live version
This web app is also hosted on **Heroku** you can access this app on the following URL
  [https://invoices-webapp.herokuapp.com/](https://invoices-webapp.herokuapp.com/)

The **source code of the live backend version** is in the branch **live** in this repository.
