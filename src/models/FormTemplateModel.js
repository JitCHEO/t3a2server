const mongoose = require('mongoose');

const FormTemplateSchema = new mongoose.Schema({
    formName: {
        type: String,
        required: true,
        unique: true
    },
    layout: {
        type: Array,
        required: true
    },
    header: {
        type: Object,
    }
});

const FormTemplate = mongoose.model('FormTemplate', FormTemplateSchema);

module.exports = {
    FormTemplate
};
