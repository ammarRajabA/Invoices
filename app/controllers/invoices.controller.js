var invoicesService=require('../services/invoices.service');
var helpers=require('../helpers/helpers');

const handleResponse=(res,err,data)=>{
	if (err){
		console.log(err);
		res.status(500).json({err});
	}else{
		res.json(data)
	}
}

const getInvoices=async (req,res)=>{
	const {page_size, page_number} = req.query;
  	const number = helpers.isNumber(page_number) ? parseInt(page_number) : 1;
  	const size = helpers.isNumber(page_size) ? parseInt(page_size) : 10;
	
	var {err,invoices}=await invoicesService.getInvoices();
	
	const paginated = helpers.paginate(invoices, size, number);

	handleResponse(res,err,{
		invoices:paginated,
		meta: {
      		total: invoices.length,
      		totalPages: Math.ceil(invoices.length / size),
      		pageNumber: number,
      		pageSize: size
    	}
    })
}

const getInvoice=async (req,res)=>{
	var {err,invoice} = await (invoicesService.getInvoice(req.params.id))
	handleResponse(res,err,{invoice:invoice})
}

const addInvoice=async (req,res)=>{
	var {err,invoice}=await invoicesService.addInvoice(req.body.invoice)
	handleResponse(res,err,{invoice:invoice})
}

const deleteInvoice=async (req,res)=>{
	var {err,invoice}=await invoicesService.deleteInvoice(req.params.id);
	handleResponse(res,err,'')
}

const updateInvoice=async (req,res)=>{
	var {err,invoice}=await invoicesService.updateInvoice(req.params.id,req.body.invoice);
	handleResponse(res,err,{invoice:invoice})
}

module.exports={
	getInvoices,
	getInvoice,
	addInvoice,
	deleteInvoice,
	updateInvoice
}