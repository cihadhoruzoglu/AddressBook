// Address Model

var mongoose = require('mongoose');

module.exports = mongoose.model('Address', {
	Name: String,
	Phone: String,
	Firm: String,
	City: Number,
	Region: String,
	Address: String
});