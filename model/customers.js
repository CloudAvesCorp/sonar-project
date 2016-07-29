var mongoose = require('mongoose');
var customerSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  dob: { type: Date, default: Date.now },
  address: String,
  email: String
});
mongoose.model('Customer', customerSchema);
