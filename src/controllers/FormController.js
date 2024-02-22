const express = require('express');
const { Form } = require('../models/FormModel');

const router = express.Router();


router.post('/submit', async (request, response) => {
  try {

    const { description,formTemplate,user } = request.body;

      let newForm = await Form.create({
          description: description,
          formTemplate: formTemplate,
          user: user,
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
