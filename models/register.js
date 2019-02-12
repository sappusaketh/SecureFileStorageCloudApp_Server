const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registerUser = new Schema({
  name: String,
  password: String,
  email: String,
  phone: String,
  userId: String,
  data : String,
  fileKeys : String
});

module.exports = mongoose.model('registeredUser', registerUser);
