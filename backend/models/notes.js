const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const NotesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    standard: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    pdf_doc: {
        type: String,
        required: true
    },
    comments: [{
        type: String,
    }],
    ratings: {
        type: Number,
        max: 5,
        min: 0,
        required: true,
        default: 2
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('notes', NotesSchema)