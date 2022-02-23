const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const chalk = require('chalk');
require('dotenv').config();

var connection = mongoose.createConnection(process.env.DATABASE);
autoIncrement.initialize(connection)

const roleSchema = new mongoose.Schema({
    Role : {
        type: String,
        required : true,
        unique: true,
        trim: true
    },
}
,{
    timestamps: true
}); 


roleSchema.plugin(autoIncrement.plugin, {
    model: 'Roles',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

const roleModel = mongoose.model("Roles",roleSchema);

const createRole = async (arrayData) =>{
    try{
        for(let data of arrayData){
            let roleObj = new roleModel(data)
            console.log(roleObj);
            let role = await roleObj.save();
            console.log(role);
        }
        console.log(chalk.yellow("Roles Added"));

    }catch(err){
        console.log(chalk.red(err));
    }
}

let roles = [{
    Role: "Admin"
},{
    Role: "Student"
}]

let createRoles = async () => {
    let chkEmpty = await roleModel.find();

    if(chkEmpty.length < 1){
        createRole(roles);
    }
}
createRoles();

module.exports = roleModel;