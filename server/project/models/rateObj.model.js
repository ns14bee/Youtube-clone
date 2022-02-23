const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const chalk = require('chalk');
require('dotenv').config();

let connection = mongoose.createConnection(process.env.DATABASE);
autoIncrement.initialize(connection);

const rateSchema = new mongoose.Schema({
    rateType : {
        type: String,
        required : true,
        unique: true,
        trim: true
    },
}
,{
    timestamps: true
}); 


rateSchema.plugin(autoIncrement.plugin, {
    model: 'RateObj',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

const rateModel = mongoose.model("RateObj",rateSchema);

const createRate = async (arrayData) =>{
    try{
        for(let data of arrayData){
            let rateObj = new rateModel(data)
            console.log(rateObj);
            let rate = await rateObj.save();
            console.log(rate);
        }
        console.log(chalk.yellow("Rate Types Added"));

    }catch(err){
        console.log(chalk.red(err));
    }
}

let rateType = [{
    rateType: "Like"
},{
    rateType: "Dislike"
},{
    rateType: "Neutral"
}]


let createRates= async () => {
    let chkEmpty = await rateModel.find();
    if(chkEmpty.length < 1){
        createRate(rateType);
    }
}

createRates();

module.exports = rateModel;