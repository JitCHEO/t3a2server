const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FormTemplateSchema = new Schema({
    formName: {
        type: String,
        required: true,
        unique: true
    },
    assignedTo: {
        type: String,
        required: true
    },
    components: {
        type: Array,
        required: true
    }
});

const FormTemplate = mongoose.model('FormTemplate', FormTemplateSchema);

module.exports = {
    FormTemplate
};
