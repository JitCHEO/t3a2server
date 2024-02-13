const express = require("express")
const FormTemplate = require("../models/FormTemplateModel")

const router = express.Router();

// Define routes
router.post('/submitForm', formTemplateController.submitForm);

module.exports = router;
