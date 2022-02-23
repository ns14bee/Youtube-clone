const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const chalk = require('chalk');
require('dotenv').config();

let connection = mongoose.createConnection(process.env.DATABASE);
autoIncrement.initialize(connection);

const genderSchema = new mongoose.Schema({
    Gender : {
        type: String,
        required : true,
        unique: true,
        trim: true
    },
}
,{
    timestamps: true
}); 


genderSchema.plugin(autoIncrement.plugin, {
    model: 'Gender',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

const genderModel = mongoose.model("Gender",genderSchema);

const createGender = async (arrayData) =>{
    try{
        for(let data of arrayData){
            let roleObj = new genderModel(data)
            console.log(roleObj);
            let role = await roleObj.save();
            console.log(role);
        }
        console.log(chalk.yellow("Gender Added"));

    }catch(err){
        console.log(chalk.red(err));
    }
}

let Gender = [{
    Gender: "Male"
},{
    Gender: "Female"
}]


let createGenders = async () => {
    let chkEmpty = await genderModel.find();
    if(chkEmpty.length < 1){
        createGender(Gender);
    }
}

createGenders();

module.exports = genderModel;