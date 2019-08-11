import {API} from '../../api/API';

export const getInvoices=(page_number=1,page_size=10)=>async dispatch=>{
	try{
		dispatch({type:"STARTED_FETCH_INVOICES"})
		var response=await API.get(`/invoices?page_size=${page_size}&page_number=${page_number}`);
		if (response.status===200){
			dispatch({type:"FINISHED_FETCH_INVOICES",payload:response.data})
		}else{
			dispatch({type:"FAILED_FETCH_INVOICES"})
		}
	}catch(err){
		dispatch({type:"FAILED_FETCH_INVOICES"})
	}
}

export const sortInvoices=(invoices)=>{
	return ({type:'SORT_INVOICES',payload:invoices})
}

export const saveInvoice=(invoice)=>async dispatch=>{
	try{
		dispatch({type:"STARTED_SAVING_INVOICES"})
		if (invoice.id<0)
			var response=await API.post(`/invoices`,{invoice});
		else
			var response=await API.put(`/invoices/${invoice.id}`,{invoice});
		getInvoices()(dispatch);
	}catch(err){
		
	}
}

export const deleteInvoice=(invoice)=>async dispatch=>{
	try{
		dispatch({type:"STARTED_FETCH_INVOICES"})
		var response=await API.delete(`/invoices/${invoice.id}`);
		getInvoices()(dispatch)
	}catch(err){
		
	}
}

export const selectInvoice =(invoice)=>{
	return {type:'SELECT_INVOICE',payload:invoice}
}
export const newInvoice =()=>{
	return {type:'NEW_INVOICE'}
}

export const updateInvoice=(key,value)=>{
	return {type:'UPDATE_INVOICE',payload:{key,value}}
}