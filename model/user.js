const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: false,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

const UserList = mongoose.model('UserList', userSchema);
module.exports = UserList;