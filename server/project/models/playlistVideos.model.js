const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
require('dotenv').config();
let connection = mongoose.createConnection(process.env.DATABASE);

autoIncrement.initialize(connection);

const playListVideoSchema = new mongoose.Schema({
    Playlist: {
        type: Number,
        required: true,
        ref: "Playlist"
    },
    Video:{
        type: Number,
        required:true,
        ref: "Video"
    }
}
,{
    timestamps: true
}); 


playListVideoSchema.plugin(autoIncrement.plugin, {
    model: 'PlaylistVideos',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

const playListVideoModel = mongoose.model("PlaylistVideos",playListVideoSchema);

module.exports = playListVideoModel;

