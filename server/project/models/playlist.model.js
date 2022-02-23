const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
require('dotenv').config();
let connection = mongoose.createConnection(process.env.DATABASE);

autoIncrement.initialize(connection);

const playListSchema = new mongoose.Schema({
    Title : {
        type: String,
        required : true,
        trim: true,
        maxlength: [255,"Max 255 chars"]
    },
    Channel: {
        type: Number,
        required: true,
        ref: "Channel"
    },
    Type: { 
        type: Number,
        ref: 'VideoType',
        required: true 
    },
}
,{
    timestamps: true
}); 


playListSchema.plugin(autoIncrement.plugin, {
    model: 'Playlist',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

const playListModel = mongoose.model("Playlist",playListSchema);

module.exports = playListModel;

