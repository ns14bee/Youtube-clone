const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const autoIncrement = require('mongoose-auto-increment');
require('dotenv').config();
let connection = mongoose.createConnection(process.env.DATABASE);

autoIncrement.initialize(connection);

const videoSchema = new mongoose.Schema({
    Title : {
        type: String,
        required : true,
        trim: true,
        maxlength: [255,"Max 255 chars"]
    },
    Description: {
        type: String,
        trim: true
    },
    Video:{
        type: String,
        required: true,
        trim: true
    },
    Type: { 
        type: Number,
        ref: 'VideoType',
        required: true 
    },
    Thumbnail:{
        type: String,
        required: true,
        trim: true
    },
    Channel: {
        type: Number,
        required: true,
        ref: "Channel"
    },
    VideoID:{
        type: String,
        required:true
    },
    ThumbnailId:{
        type:String,
        required:true
    },
    Views:{
        type:Number,
        default: 0
    },
    Active: {
        type: Boolean,
        default: true
    }
}
,{
    timestamps: true
}); 

videoSchema.plugin(mongoosePaginate);
videoSchema.plugin(autoIncrement.plugin, {
    model: 'Video',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

const videoModel = mongoose.model("Video",videoSchema);

module.exports = videoModel;

