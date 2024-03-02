const express = require('express');
const { Form } = require('../models/FormModel');
const { getUserIdFromToken } = require('../utils/userAuthFunctions');

const router = express.Router();

//get forms for current user
router.get('/currentUser', async (request, response) => {
  try {
    const id = getUserIdFromToken(request.headers.jwt)
    const result = await Form.find({user: id, formTemplate: request.headers.formid})
                              .populate('user', '-_id fname lname')
                              .populate({
                                path: 'formTemplate',
                                select: '-_id assignedTo',
                                populate: {
                                  path: 'assignedTo',
                                  model: 'User',
                                  select: '-_id fname lname'
                                }})
    if(!result){
      return response.status(404).json({message:"completed forms not found"});
  }
    return response.json({result: result})
  } catch (error) {
    return response.status(500).json({message: " Internal server error"})
  }
})

router.get("/:id", async(request, response) => {
  try{
      let result = await Form.findById(request.params.id)
                              .populate('formTemplate')
      if(!result){
          return response.status(404).json({message:"Form not found"});
      }
      console.log(result)
      return response.json({result});
  }catch(error){
      return response.status(500).json({message: " Internal server error"});
  }
})


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

router.patch('/:formId', async (request, response) => {


  try {
    const updatedForm = await Form.findByIdAndUpdate(request.params.formId, request.body, {new: true})
    if (!updatedForm) {
      return response.status(404).json({ error: 'Form not found' }); 
    }
    const result = updatedForm.status
    response.json({ result: 'Form updated successfully', result });
  } catch (error) {
    console.error('Error updating form:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
})

// Export the router
module.exports = router;
