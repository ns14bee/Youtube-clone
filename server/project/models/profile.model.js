const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
require('dotenv').config();
let connection = mongoose.createConnection(process.env.DATABASE);

autoIncrement.initialize(connection);

const profileSchema = new mongoose.Schema({
    User: {
        type: Number,
        unique: true,
        required: true,
        ref: "UserMaster"
    },
    FirstName: {
        type: String,
        minlength: [3, "Min 3 chars"],
        maxlength: [30,"Max 30 chars"]
    },
    LastName: {
        type: String,
        minlength: [3, "Min 3 chars"],
        maxlength: [30,"Max 30 chars"]
    },
    Gender: {
        type: Number,
        ref: 'Gender'
    },
    DOB: {
        type: Date
    },
    Mobile: {
        type: Number        
    },
    Country: {
        type: Number,
        ref: 'Country'
    },
    ProfileImage:{
        type: String
    },
    ProfileImageID:{
        type: String
    },
    Active: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true
});

profileSchema.plugin(autoIncrement.plugin, {
    model: 'Profile',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

const profileModel = mongoose.model("Profile",profileSchema);

module.exports = profileModel;