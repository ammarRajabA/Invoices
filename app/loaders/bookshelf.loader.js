var config=require('../config');

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : config.dbConnection.uri,
    port	 : config.dbConnection.port,
    user     : 'sql2299498',
	password : 'bX8!cP5%',
	database : 'sql2299498',
    charset  : 'utf8'
  }
});
var bookshelf = require('bookshelf')(knex);

module.exports=bookshelf