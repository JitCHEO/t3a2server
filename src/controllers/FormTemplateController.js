const express = require('express');
const {FormTemplate} = require('../models/FormTemplateModel')

const router = express.Router();

// Define route for handling form submissions

router.post('/createForm', async (req, res) => {
  try {
    // Extract form data from request body
    const { formName, layout, header } = req.body;

    // Create a new form submission document
    const formTemplate = new FormTemplate({
      formName,
      layout,
      header
    });

    // Save the form submission document to the database
    await formTemplate.save();

    // Send a success response
    res.status(201).json({ message: 'Form template creaeted successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error creating form:', error);
    res.status(500).json({ error: 'An error occurred while creating the form' });
  }
});

// Export the router
module.exports = router;
