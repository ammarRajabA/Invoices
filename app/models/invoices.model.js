var bookshelf=require('../loaders/bookshelf.loader');
var Users=require('./users.model');
var Items=require('./items.model')

var Invoices=bookshelf.Model.extend({
	tableName:'invoices',
	sender() {
		return this.belongsTo(Users,'sender_id')
	},
	recipient() {
		return this.belongsTo(Users,'recipient_id')
	},
	items() {
	    return this.hasMany(Items)
  	}
})

module.exports=Invoices