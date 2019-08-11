const express=require('express');
const bodyParser=require("body-parser");
const https=require('https');
const http=require('http');
const morgan = require('morgan');

const config=require('./app/config');

const app=express();
var httpServer = http.createServer(app);

// 
const cors = require('cors');
app.use(cors())

app. use(morgan(':method :url :status :req[header] :res[content-length] - :response-time ms'))
/////

app.use(express.static(config.app.staticFiles));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const invoices=require('./app/routes/invoices.route');

app.use('/invoices', invoices);

httpServer.listen(config.app.port.production,()=>console.log('Server is running !'))