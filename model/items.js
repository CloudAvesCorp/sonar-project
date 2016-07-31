/**
 * Author: Sanjay Kumar Verma
 * Date: 30th July, 2016
 * 
This schema holds the item wise details.
*/

var mongoose = require('mongoose');
var itemSchema = new mongoose.Schema({
	item: String,
	barcode: String,
	pcs: { type: Number, default: 0 },
	gross_wt: { type: Number, default: 0 },
	pmaking: { type: Number, default: 0 },
	ppolish: { type: Number, default: 0 },
	pextra_gd: { type: Number, default: 0 },
	prate: { type: Number, default: 0 },
	purity: { type: Number, default: 0 },
	smaking: { type: Number, default: 0 },
	spolish: { type: Number, default: 0 },
	sextra_gd: { type: Number, default: 0 },
	srate: { type: Number, default: 0 }
});
mongoose.model('Item', itemSchema);