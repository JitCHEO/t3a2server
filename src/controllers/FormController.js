const express = require('express');
const { Form } = require('../models/FormModel');
const { getUserIdFromToken } = require('../utils/userAuthFunctions');

const router = express.Router();


router.post('/submit', async (request, response) => {
  
  try {

    const { description,formTemplate, formData } = request.body;

    const id = getUserIdFromToken(request.headers.jwt)

      let newForm = await Form.create({
          description: description,
          formTemplate: formTemplate,
          formData: formData,
          user: id
      })

      response.status(201).json({
          newForm: newForm
      })
  } catch (error) {
      response.status(500).json({error: error.message})
  }
})

// GET request handler to fetch a form template by name
router.get('/:formName', async (req, res) => {
  const formName = req.params.formName;

  try {
      // Find the form template by name in your database
      const formTemplate = await Form.findOne({ name: formName });
      if (!formTemplate) {
          return res.status(404).json({ error: 'Form template not found' });
      }

      res.json({ formTemplate });
  } catch (error) {
      console.error('Error fetching form template:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

// Export the router
module.exports = router;
