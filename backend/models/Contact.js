const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: Number, required: true },
  message: { type: String, required: true }  // Corrected from `require` to `required`
},{timestamps:true});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
