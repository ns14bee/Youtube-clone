const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const autoIncrement = require('mongoose-auto-increment');
require('dotenv').config();
let connection = mongoose.createConnection(process.env.DATABASE);

autoIncrement.initialize(connection);

const videoHistorySchema = new mongoose.Schema({
    Video:{
        type: String,
        required: true,
        trim: true
    },
    Channel: {
        type: Number,
        required: true,
        ref: "Channel"
    },
    Duration:{
        type: Number,
        required: true,
    }
}
,{
    timestamps: true
}); 

videoHistorySchema.plugin(mongoosePaginate);
videoHistorySchema.plugin(autoIncrement.plugin, {
    model: 'VideoHistory',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

const VideoHistoryModel = mongoose.model("VideoHistory",videoHistorySchema);

module.exports = VideoHistoryModel;