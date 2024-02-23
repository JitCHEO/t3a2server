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

// Export the router
module.exports = router;
