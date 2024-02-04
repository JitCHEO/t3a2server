const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AttachementSchema = new Schema({
    filename: {
        type: String,
        required: true
    },
    contentType: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    uploadDate: {
        type: Date,
        default: Date.now
    },
    // Other fields related to attachments
});

const Attachment = mongoose.model('Attachment', AttachementSchema);

module.exports = {
    Attachment
};