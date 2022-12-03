const mongoose = require('mongoose');
let ObjectId = mongoose.Schema.ObjectId;
const contactSchema = mongoose.Schema({
  firstName:{
    type:String,
    required:true
  },
  lastName:{
    type:String,
    required:true
  },
  email: {
    type:String,
    required:true
  },
  phone: {
    type:String,
    required:true
  },
  address: String,
  city: String,
  state: String,
  country: String,
  zipCode: String,
  createdOn: Date,
  updatedOn: Date
});

const ContactList = mongoose.model('ContactList', contactSchema);
module.exports =ContactList;