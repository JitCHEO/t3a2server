const express = require("express")
const { FormTemplate } = require("../models/FormTemplateModel")

const router = express.Router();

// Define routes
router.get("/", async (request, response) =>{
    let result = await FormTemplate.find();
    response.json({result});
})

router.get('/:formName', async (request, response) => {
    try {
        const formName = request.params.formName;

        // Check if formName is being received correctly
        console.log('Received formName:', formName);


        const template = await FormTemplate.findOne({ formName }).catch(error => error);

        if (!template) {
            return response.status(404).json({ error: 'Template not found' });
        }

        response.json({
            template: template
        });
    } catch (error) {
        console.error('Error:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/add', async (request, response) => {

    try {
        let newFormTemplate = await FormTemplate.create({
            formName: request.body.formName,
            assignedTo: request.body.assignedTo,
            components: request.body.components,
            questionHeaders: request.body.questionHeaders
        })

        response.status(201).json({
            newTemplate: newFormTemplate
        })
    } catch (error) {
        response.status(500).json({error: error.message})
    }
})


module.exports = router;
