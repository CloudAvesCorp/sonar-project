/**
 This schema holds the daily rates of the ornaments. 
 */

var mongoose = require('mongoose');
var rateSchema = new mongoose.Schema({
 	date: { type: Date, default: Date.now },
	description: { type: String, default: "GOLD" },
	purity: { type: String, default: "22CT" },
	rate: { type: Number, default: 0 }
});
mongoose.model('Rate', rateSchema);