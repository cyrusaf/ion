var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var {{name}}Schema = new Schema({

}, {
	versionKey: false
});

module.exports = connection.model('{{name}}', {{name}}Schema);