const express=require('express');
const invoices=require('../controllers/invoices.controller');
const router=express.Router();

router.route('/')
		.get((req,res)=>invoices.getInvoices(req,res))
		.post((req,res)=>invoices.addInvoice(req,res))

router.route('/:id')
		.get((req,res)=>invoices.getInvoice(req,res))
		.delete((req,res)=>invoices.deleteInvoice(req,res))
		.put((req,res)=>invoices.updateInvoice(req,res))
		

module.exports=router