const mongoose = require('mongoose');

const Schema = mongoose.schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
