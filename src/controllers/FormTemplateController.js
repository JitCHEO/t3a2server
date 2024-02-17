const express = require("express")
const { FormTemplate } = require("../models/FormTemplateModel")

const router = express.Router();

// Define routes
router.post('/add', async (request, response) => {

    try {
        let newFormTemplate = await FormTemplate.create({
            formName: request.body.formName,
            assignedTo: request.body.assignedTo,
            components: request.body.components
        })

        response.status(201).json({
            newTemplate: newFormTemplate
        })
    } catch (error) {
        response.status(500).json({error: error.message})
    }
})


module.exports = router;
