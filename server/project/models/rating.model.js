const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
require('dotenv').config();
let connection = mongoose.createConnection(process.env.DATABASE);

autoIncrement.initialize(connection);

const ratingSchema = new mongoose.Schema({
    Video: { 
        type: Number,
        ref: 'Video',
        required: true 
    },
    Channel: { 
        type: Number,
        ref: 'Channel',
        required: true 
    },
    LikeStatus:{
        type: Number,
        ref: 'RateObj',
        required: true 
    },
}
,{
    timestamps: true
}); 


ratingSchema.plugin(autoIncrement.plugin, {
    model: 'Rating',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

const ratingModel = mongoose.model("Rating",ratingSchema);

module.exports = ratingModel;

