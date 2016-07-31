var mongoose = require('mongoose');
var customerSchema = new mongoose.Schema({
  custcode: String,
  name: String,
  mobile: { type: Number, default: 0 },
  dob: { type: Date, default: Date.now },
  address: String,
  email: String,
  balance: { type: Number, default: 0 },
  challan: String,
  lastpayment: { type: Number, default: 0 }
});
mongoose.model('Customer', customerSchema);
