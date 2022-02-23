const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
require('dotenv').config();
let connection = mongoose.createConnection(process.env.DATABASE);

autoIncrement.initialize(connection);

const channelSchema = new mongoose.Schema({
    Name : {
        type: String,
        trim: true,
        maxlength: [255,"Max 255 chars"]
    },
    About: {
        type: String
    },
    Banner:{
        type: String
    },
    BannerID:{
        type: String
    },
    User: {
        type: Number,
        required: true,
        ref: "UserMaster"
    },
    Active: {
        type: Boolean,
        default: true
    }
}
,{
    timestamps: true
}); 


channelSchema.plugin(autoIncrement.plugin, {
    model: 'Channel',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

const channelModel = mongoose.model("Channel",channelSchema);

module.exports = channelModel;

