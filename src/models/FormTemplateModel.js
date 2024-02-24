const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FormTemplateSchema = new Schema({
    formName: {
        type: String,
        required: true,
        unique: false
    },
    assignedTo: {
        type: String,
        required: true
    },
    components: {
        type: Array,
        required: true
    },
    questionHeaders: {
        type: Object
    }
});

const FormTemplate = mongoose.model('FormTemplate', FormTemplateSchema);

module.exports = {
    FormTemplate
};
