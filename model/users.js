var mongoose = require('mongoose');
var usersSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  dob: { type: Date, default: Date.now },
  address: String,
  email: String
});
mongoose.model('User', usersSchema);
