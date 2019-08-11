const INIT_STATE={
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

export default (state=INIT_STATE,action)=>{
	switch(action.type){
		case 'STARTED_FETCH_INVOICES':
			return {...state,loading:true};
		case 'STARTED_SAVING_INVOICES':
			return {...state,loading:true};
		case 'FINISHED_FETCH_INVOICES':
			return {...state,invoices:action.payload.invoices,meta:action.payload.meta,loading:false};
		case 'FAILED_FETCH_INVOICES':
			return {...state}
		case 'SELECT_INVOICE':
			return {...state,invoiceSelected:action.payload}
		case 'UPDATE_INVOICE':
			var updatedInvoice={...state.invoiceSelected};
			updatedInvoice[action.payload.key]=action.payload.value
			return {...state,invoiceSelected:updatedInvoice}
		case 'NEW_INVOICE':
			var newInvoice={...state.newInvoice}
			return {...state,invoiceSelected:newInvoice}
		case 'SORT_INVOICES':
			return {...state,invoices:action.payload,selectedInvoice:null}
		default:
			return state
	}
}