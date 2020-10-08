const mongoose  = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        required: false,
        default: ""
    },
    notes: [{ 
        noteId: {
            type: Schema.Types.ObjectId,
            ref: 'notes'
        }
    }]
});

module.exports = mongoose.model('user', UserSchema);