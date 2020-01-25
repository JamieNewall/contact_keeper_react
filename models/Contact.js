const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    
  },
  type: {
    type: String,
    default:'personal'
  },
  date: {
    type: Date,
    default: Date.now
    
  },
  name: {
    type: String,
    required: true
  }
});


// creates model
module.exports = mongoose.model('contact', ContactSchema);
