// Address Model

var mongoose = require('mongoose');

module.exports = mongoose.model('Address', {
	Name: String,
	Phone: String,
	Firm: String,
	City: String,
	Region: String,
	Address: String
});