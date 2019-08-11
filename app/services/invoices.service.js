var Invoices=require('../models/invoices.model');
var Users=require('./users.service');
var Items=require('./items.service')

const getInvoices=()=>new Promise (async (resolve, reject)=>{
	try{
		var invoices=await Invoices.where({}).fetchAll({withRelated:['sender','recipient','items']});
		resolve({err:null,invoices})
	}catch(err){
		resolve({err,invoices:null})
	}
})

const getInvoice=(id)=>new Promise (async (resolve,reject)=>{
	try{
		var invoice=await Invoices.where({id}).fetch({withRelated:['sender','recipient','items']});
		resolve({err:null,invoice})
	}catch(err){
		resolve({err,invoice:null})
	}
})

const addInvoice=(invoice)=> new Promise (async (resolve,reject)=>{
	try{
		if (invoice){
			var sender=await Users.upsertUserByEmail(invoice.sender)
			var recipient=await Users.upsertUserByEmail(invoice.recipient)
			var items=[...invoice.items]
			delete invoice.sender
			delete invoice.recipient
			delete invoice.items
			delete invoice.id
			var newInvoice=await Invoices.forge({...invoice,sender_id:sender.user.get('id'),recipient_id:recipient.user.get('id')}).save();
			await Items.addItems(items,newInvoice.get('id'))
			resolve({err:null,invoice:newInvoice})
		}else{
			resolve({err:null,invoice:null})
		}
	}catch(err){
		resolve({err,invoice:null})
	}
})

const updateInvoice=(id,data)=>new Promise (async (resolve,reject)=>{
	try{
		var invoice=await Invoices.where({id}).fetch();
		if (invoice){
			var sender=await Users.upsertUserByEmail(data.sender)
			var recipient=await Users.upsertUserByEmail(data.recipient)
			await Items.updateItems(data.items,data.id)
			delete data.sender
			delete data.recipient
			delete data.items
			delete data.id
			invoice.set({...data,sender_id:sender.user.id,recipient_id:recipient.user.id});
			invoice.save();
			resolve({err:null,invoice});
		}else{
			resolve({err:null,invoice:null})
		}
	}catch(err){
		resolve({err,invoice:null})
	}
})

const deleteInvoice=(id)=>new Promise (async (resolve,reject)=>{
	try{
		var x=await Invoices.where({id}).destroy();
		resolve({err:null,invoice:x})
	}catch(err){
		resolve({err,invoice:null})
	}
})

module.exports={
	getInvoices,
	getInvoice,
	addInvoice,
	updateInvoice,
	deleteInvoice
}