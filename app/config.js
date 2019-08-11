const config={
	app:{
		port:{
			development:2500,
			production:process.env.PORT||80
		},
		staticFiles: './static'
	},
	dbConnection:{
		uri:"sql2.freemysqlhosting.net",
		port:3306
	}
};

module.exports=config;