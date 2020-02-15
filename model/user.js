const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String
    },
    address: {
        type: String
    },
    email: {
        type: String
    },
    mobile_number: {
        type: String
    },

    password: {
        type: String
    },

    user_type: {
        type: String
    }
})

const user = mongoose.model('user', userSchema);
module.exports = user;