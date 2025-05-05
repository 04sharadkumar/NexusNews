// models/contactCard.model.js
const mongoose = require('mongoose');

const contactCardSchema = new mongoose.Schema({
  
  title: {
    type: String,
    required: true,
  },
  info: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  iconColor: {
    type: String,
    default: 'text-blue-600',
  }
}, { timestamps: true });

const Card = mongoose.model('ContactCard', contactCardSchema);
module.exports = Card;
