const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
require('dotenv').config();
let connection = mongoose.createConnection(process.env.DATABASE);

autoIncrement.initialize(connection);

const subscriptionSchema = new mongoose.Schema({
    Subscriber: {
        type: Number,
        required: true,
        ref: "Channel"
    },
    Creator:{
        type: Number,
        required: true,
        ref: "Channel"
    },
    Active: {
        type: Boolean,
        default: true
    }
}
,{
    timestamps: true
}); 


subscriptionSchema.plugin(autoIncrement.plugin, {
    model: 'Subscription',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

const subscriptionModel = mongoose.model("Subscription",subscriptionSchema);

module.exports = subscriptionModel;

