// models/FormSubmission.js
const mongoose = require('mongoose');

const FormSubmissionSchema = new mongoose.Schema({
  // Define the schema fields for form submissions


  formTemplate: {
    type: 
  }
});

const FormSubmission = mongoose.model('FormSubmission', FormSubmissionSchema);

module.exports = {
    FormSubmission
};
