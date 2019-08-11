var bookshelf=require('../loaders/bookshelf.loader');

var Users=bookshelf.Model.extend({
	tableName:'users_'
})

module.exports=Users