var Users=require('../models/users.model');

const getUsers=()=>new Promise(async(resolve,reject)=>{
	try{
		var users=await Users.fetchAll()
		resolve({err:null,users})
	}catch(err){
		resolve({err,users:null})
	}
})


const getUser=(id)=>new Promise(async (resolve,reject)=>{
	try{
		var user=await Users.where({id}).fetch();
		resolve({err:null,user})
	}catch(err){
		resolve({err,user:null})
	}
})

const getUserByEmail=(email)=>new Promise(async (resolve,reject)=>{
	try{
		var user=await Users.where({email}).fetch();
		resolve({err:null,user})
	}catch(err){
		resolve({err,user:null})
	}
})

const addUser=(user)=> new Promise(async (resolve,reject)=>{
	try{
		if (user.id) delete user.id
		var newUser=await Users.forge(user).save();
		resolve({err:null,user:newUser})
	}catch(err){
		resolve({err,user:null})
	}
})

const updateUser=(id,data)=>new Promise(async (resolve,reject)=>{
	try{
		var user=await Users.where({id}).fetch();
		if (user){
			delete data.id
			user.set(data);
			user.save();
			resolve({err:null,user})
		}
		else{
			resolve({err:null,user:null})
		}
	}catch(err){
		resolve(err,null)
	}
})

const updateUserByEmail=(email,data)=>new Promise(async (resolve,reject)=>{
	try{
		var user=await Users.where({email}).fetch();
		if (user){
			delete data.id
			user.set(data);
			user.save();
			resolve({err:null,user})
		}
		else{
			resolve({err:null,user:null})
		}
	}catch(err){
		resolve({err,user:null})
	}
})

const upsertUser=(user)=>new Promise (async (resolve,reject)=>{
	try{
		if (user.id){
			var updates=await updateUser(user.id,user)
			if (updates.err) resolve({err:updates.err,user:null});
			else if (updates.user) resolve({err:null,user:updates.user});
			else await addUser(user)
		}
	}catch(err){
		resolve({err,user:null})
	}
})

const upsertUserByEmail=(user)=>new Promise (async (resolve,reject)=>{
	try{
		if (user.email){
			var updates=await updateUserByEmail(user.email,user)
			if (updates.err) resolve({err:updates.err,user:null});
			else if (updates.user) resolve({err:null,user:updates.user});
			else {
				var newUser=await addUser(user);
				resolve({err:null,user:newUser.user})
			}
		}else{
			resolve({err:null,user})
		}
	}catch(err){
		resolve({err,user:null})
	}
})

module.exports={
	getUsers,
	getUser,
	getUserByEmail,
	addUser,
	updateUser,
	updateUserByEmail,
	upsertUser,
	upsertUserByEmail
}