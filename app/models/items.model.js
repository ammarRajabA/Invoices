var bookshelf=require('../loaders/bookshelf.loader');
var Invoices=require('./invoices.model')

var Items=bookshelf.Model.extend({
	tableName:'items',
	invoice() {
		return this.belongsTo(Invoices)
	}
})

module.exports=Items