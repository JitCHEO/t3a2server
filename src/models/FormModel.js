// models/FormSubmission.js
const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
  // Define the schema fields for form submissions
  description: {
    type: String,
    required: true  
  },
  formTemplate: {
    type: mongoose.Types.ObjectId,
    ref: 'FormTemplate',
    required: true,
  },
  formData: {
    type: Array,
    required: true
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  timeStamp: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['open', 'pending task', 'closed'],
    default: 'open'
  },
  actions: {
    type: mongoose.Types.ObjectId,
    ref: 'Action'
  }

});

const Form = mongoose.model('Form', FormSchema);

module.exports = {
    Form
};
