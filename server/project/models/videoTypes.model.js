const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const chalk = require('chalk');
require('dotenv').config();

let connection = mongoose.createConnection(process.env.DATABASE);
autoIncrement.initialize(connection);

const videoTypeSchema = new mongoose.Schema({
    videoType : {
        type: String,
        required : true,
        unique: true,
        trim: true
    },
}
,{
    timestamps: true
}); 


videoTypeSchema.plugin(autoIncrement.plugin, {
    model: 'VideoType',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

const videoTypeModel = mongoose.model("VideoType",videoTypeSchema);

const createVideoType = async (arrayData) =>{
    try{
        for(let data of arrayData){
            let roleObj = new videoTypeModel(data)
            console.log(roleObj);
            let role = await roleObj.save();
            console.log(role);
        }
        console.log(chalk.yellow("Video Types Added"));

    }catch(err){
        console.log(chalk.red(err));
    }
}

let videoType = [{
    videoType: "Public"
},{
    videoType: "Private"
},{
    videoType: "Unlisted"
}]


let createVideoTypes = async () => {
    let chkEmpty = await videoTypeModel.find();
    if(chkEmpty.length < 1){
        createVideoType(videoType);
    }
}

createVideoTypes();

module.exports = videoTypeModel;