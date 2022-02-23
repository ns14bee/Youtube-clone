const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const chalk = require('chalk');
require('dotenv').config();

let connection = mongoose.createConnection(process.env.DATABASE);
autoIncrement.initialize(connection);

const fileTypeSchema = new mongoose.Schema({
    FileType : {
        type: String,
        required : true,
        unique: true,
        trim: true
    },
    File:{
        type: Number,
        required: true,
        ref: 'File'
    }
}
,{
    timestamps: true
}); 


fileTypeSchema.plugin(autoIncrement.plugin, {
    model: 'FileType',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

const fileTypeModel = mongoose.model("FileType",fileTypeSchema);

const createFileType = async (arrayData) =>{
    try{
        for(let data of arrayData){
            let fileObj = new fileTypeModel(data)
            console.log(fileObj);
            let role = await fileObj.save();
            console.log(fileObj);
        }
        console.log(chalk.yellow("File Types Added"));

    }catch(err){
        console.log(chalk.red(err));
    }
}

let FileType = [{
    FileType: "MP4",
    File: 1
},{
    FileType: "MPEG4",
    File: 1
},{
    FileType: "WebM",
    File: 1
},{
    FileType: "FLV",
    File: 1
},{
    FileType: "3GP",
    File: 1
},{
    FileType: "BMP",
    File: 2
},{
    FileType: "PNG",
    File: 2
},{
    FileType: "JPG",
    File: 2
},{
    FileType: "JPEG",
    File: 2
},{
    FileType: "GIF",
    File: 2
}
]


let createFileTypes = async () => {
    let chkEmpty = await fileTypeModel.find();
    if(chkEmpty.length < 1){
        createFileType(FileType);
    }
}

createFileTypes();

module.exports = fileTypeModel;