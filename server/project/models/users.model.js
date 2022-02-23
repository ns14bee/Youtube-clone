const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const autoIncrement = require('mongoose-auto-increment');
const ProfileModel = require("./profile.model");
const ChannelModel = require("./channel.model");
require('dotenv').config();
let connection = mongoose.createConnection(process.env.DATABASE);

autoIncrement.initialize(connection);

const userSchema = new mongoose.Schema({
    UserName : {
        type: String,
        required : true,
        trim: true,
        minlength: [3, "Min 3 chars"],
        maxlength: [30,"Max 30 chars"]
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    Password:{
        type: String,
        required: true,
    },
    Role: { 
        type: Number,
        ref: 'Roles',
        required: true 
    },
    Active: {
        type: Boolean,
        default: true
    }
}
,{
    timestamps: true
}); 

userSchema.post("save", async function (user) {
    
    const profile = new ProfileModel({ User: user._id });
    const channel = new ChannelModel({ User: user._id });
    const saveProfile = await profile.save();
    const saveChannel = await channel.save();
    console.log(saveProfile);
    console.log(saveChannel);
});

userSchema.plugin(mongoosePaginate);
userSchema.plugin(autoIncrement.plugin, {
    model: 'UserMaster',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

const userModel = mongoose.model("UserMaster",userSchema);

module.exports = userModel;

