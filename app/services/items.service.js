var Items=require('../models/items.model');

const updateItem=(data,invoice_id)=>new Promise(async (resolve,reject)=>{
	try{
		var item=await Items.where({id:data.id}).fetch();
		if (item){
			item.set({...data,invoice_id});
			item.save();
			resolve({err:null,item})
		}
		else{
			resolve({err:null,item:null})
		}
	}catch(err){
		resolve(err,null)
	}
})

const addItems=(items,invoice_id)=>new Promise(async(resolve,reject)=>{
	try{
		await items.map(async (item)=>{
			if (item.id===null || item.id===undefined){
				var newItem=await Items.forge({...item,invoice_id}).save();
			}
			else{
				await updateItem(item,invoice_id)
			}
		})
		resolve({err:null,items})
	}catch(err){
		resolve({err,items:null})
	}
})

const updateItems=(items,invoice_id)=>new Promise(async (resolve,reject)=>{
	try{
		await Items.where({invoice_id}).save({invoice_id:null},{method:'update',patch:true,require: false})
		var result=await addItems(items,invoice_id)
		resolve(result)
	}catch(err){
		resolve({err,items:null})
	}
})

module.exports={
	addItems,
	updateItem,
	updateItems
}