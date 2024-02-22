
const mongoose = require('mongoose');

const ActionSchema = new mongoose.Schema({

  form : {
    type: mongoose.Types.ObjectId,
    ref: 'Form',
    required: true
  },
  messages: {
    type: [{
      message: {type: String, required: true},
      sender: { type: mongoose.Types.ObjectId, ref: 'User', required: true},
      timestamp: { type: Date, default: Date.now }
    }],
    required: true
  }
  
});

const Action = mongoose.model('Action', ActionSchema);

module.exports = {
    Action
};
