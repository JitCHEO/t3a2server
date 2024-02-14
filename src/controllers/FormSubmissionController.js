const express = require('express');
const { FormSubmission } = require('../models/FormSubmissionModel');

const router = express.Router();

// Define route for handling form submissions

router.post('/submitForm', async (req, res) => {
  try {
    // Extract form data from request body
    const { formName, assignedTo, components } = req.body;

    // Create a new form submission document
    const formSubmission = new FormSubmission({
      formName,
      assignedTo,
      components
    });

    // Save the form submission document to the database
    await formSubmission.save();

    // Send a success response
    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error submitting form:', error);
    res.status(500).json({ error: 'An error occurred while submitting the form' });
  }
});

// Export the router
module.exports = router;
