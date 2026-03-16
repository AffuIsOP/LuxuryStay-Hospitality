const mongoose = require('mongoose');

const staffRoleSchema = new mongoose.Schema({
    staffroleid: {
        type: Number,
        required: true,
        unique: true
    },
    staffrole: {
        type: String,
        required: true
    },
    staffroledescription: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
});

const StaffRole = mongoose.model('StaffRole', staffRoleSchema); 
module.exports = { StaffRole };
