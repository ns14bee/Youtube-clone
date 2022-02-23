const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const chalk = require('chalk');
require('dotenv').config();

let connection = mongoose.createConnection(process.env.DATABASE);
autoIncrement.initialize(connection);

const fileSchema = new mongoose.Schema({
    File : {
        type: String,
        required : true,
        unique: true,
        trim: true
    }
}
,{
    timestamps: true
}); 


fileSchema.plugin(autoIncrement.plugin, {
    model: 'File',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

const fileModel = mongoose.model("File",fileSchema);

const createFile = async (arrayData) =>{
    try{
        for(let data of arrayData){
            let fileObj = new fileModel(data)
            console.log(fileObj);
            let role = await fileObj.save();
            console.log(fileObj);
        }
        console.log(chalk.yellow("Files Added"));

    }catch(err){
        console.log(chalk.red(err));
    }
}

let File = [{
    File: "Video"
},{
    File: "Image"
}]


let createFiles = async () => {
    let chkEmpty = await fileModel.find();
    if(chkEmpty.length < 1){
        createFile(File);
    }
}

createFiles();

module.exports = fileModel;