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

const Category = mongoose.model('Category', FormTemplateSchema);

module.exports = {
    Category
};
