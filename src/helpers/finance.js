export const calculateTotalPriceWithTax=(invoiceData)=>{
	var total=0.0;
	if (Array.isArray(invoiceData)){
		invoiceData.map((invoice)=>{
			total+=calculateTotalPriceWithTax(invoice)
		})
		return total
	}else{
		invoiceData.items.map((item)=>{
			total+=item.qty*item.unitPriceNet*(1+parseFloat(item.taxRate))
		})
		return total
	}
}
export const calculateTotalPriceNoTax=(invoiceData)=>{
	var total=0.0;
	if (Array.isArray(invoiceData)){
		invoiceData.map((invoice)=>{
			total+=calculateTotalPriceWithTax(invoice)
		})
		return total
	}else{
		invoiceData.items.map((item)=>{
			total+=item.qty*item.unitPriceNet
		})
		return total
	}
}

export const calculateTotalItemNoTax=(item)=>item.qty*item.unitPriceNet
export const calculateTotalItemWithTax=(item)=>item.qty*item.unitPriceNet*(1+parseFloat(item.taxRate))