const mongoose = require('mongoose');

const userRoleSchema = new mongoose.Schema({
    userroleid: {
        type: Number,
        required: true,
        unique: true 
    },
    userrole: {
        type: String,
        required: true
    },
    userroledescription: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
});

const UserRole = mongoose.model('UserRole', userRoleSchema);

module.exports = { UserRole };
