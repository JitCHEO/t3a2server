const mongoose = require('mongoose');

const Schema = mongoose.schema;

const FormTemplateSchema = new Schema({
    name: {
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
