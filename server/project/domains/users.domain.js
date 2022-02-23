const userModel = require('../models/users.model');
const profileModel = require('../models/profile.model');
const channelModel = require('../models/channel.model');
const roleModel = require('../models/roles.model');
const genderModel = require('../models/gender.model');
const jwt = require('jsonwebtoken');
const {validateLogin, validateUser} = require('../utils/joi.validation');
const bcrypt = require('bcrypt');

class usersDomain{

    // get current users

    getCurrentUser = async (req,res) => {
        try{
            let id = req.decoded.id;
            let userData = await userModel.aggregate([
                {$match:{_id: id}},
                {
                    $lookup: {
                        from: 'profiles',
                        localField: '_id',
                        foreignField: 'User',
                        as: 'Profile',
                    },
                },
                {
                    $lookup: {
                        from: 'channels',
                        localField: '_id',
                        foreignField: 'User',
                        as: 'Channel',
                    },
                },
                {$project: {
                    UserName:1,
                    Email: 1,
                    Profile:{
                        _id:1,
                        FirstName:1,
                        LastName:1,
                        DOB:1,
                        Gender:1,
                        Country:1,
                        ProfileImage:1
                    },
                    Channel:{
                        _id:1,
                        Name:1,
                        Banner:1,
                        About:1
                    }
                }}
            ]);
            if(!userData){
                res.status(500).json({
                    message: "No record found!"
                    });
            }else{
                res.status(200).send(userData);
            }
        }catch(err){
            console.log(err);
            res.status(500).send("Something went wrong");
        }
    }

    // get users
    getAllUsers = async (req,res) => {
        const options = {
            page: req.query.page || 1,
            limit: req.query.limit || 10,
        };
        try{
            let usersData = await userModel.paginate({},options);       
            if(usersData.length < 1){
                res.status(500).json({
                    message: "No Data!"
                });
            }else{
                res.status(200).send(usersData);
            }
        }catch(err){
            console.log(err);
            res.status(500).send("Something went wrong");
        }
    }

    // get user by email
    getUserByEmail  =  async (email) => {
            try{
                let userData = await userModel.findOne({$and: [{Email: email}, {Active: true}]});       
                return userData;
            }catch(err){
                console.log(err);
            }
    }

    // get user by id
    getUserById  = async (req,res) => {
        try{
            let id  = parseInt(req.params.id);
            let userData = await userModel.aggregate([
                {$match:{_id: id}},
                {
                    $lookup: {
                        from: 'profiles',
                        localField: '_id',
                        foreignField: 'User',
                        as: 'Profile',
                    },
                },
                {
                    $lookup: {
                        from: 'channels',
                        localField: '_id',
                        foreignField: 'User',
                        as: 'Channel',
                    },
                },
                {$project: {
                    UserName:1,
                    Email: 1,
                    Profile:{
                        _id:1,
                        FirstName:1,
                        LastName:1,
                        DOB:1,
                        Gender:1,
                        Country:1,
                        ProfileImage:1
                    },
                    Channel:{
                        _id:1,
                        Name:1,
                        Banner:1,
                        About:1
                    }
                }}
            ]);
            console.log(userData);
            if(!userData){
                res.status(400).json({
                    message: "No record found!"
                    });
            }else{
                res.status(200).send(userData);
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }

    // register user
    registerUser = async (req,res) => {
        try{
            let {error} = validateUser(req.body);
            if(error){
                res.status(400).json({
                    message: error.details[0].message
                    });
                return;
            }
            let email = await this.getUserByEmail(req.body.Email);
            if(email){
                res.status(401).json({
                    message: "Email already exists"
                    });
            }else{
                try{
                    let userObj = new userModel(req.body);
                    //let data = req.body;
                    let salt = await bcrypt.genSalt(10);
                    userObj.Password = await bcrypt.hash(userObj.Password, salt);
                    let user = await userObj.save();
                    // let profileObj = new profileModel({User: user._id})
                    // await profileObj.save();
                    // let channelObj = new channelModel({Name:user.UserName,User: user._id})
                    // await channelObj.save();
                    res.status(200).send(user);
                }catch(err){
                    console.log(err);
                }

            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }

    //get role
    getRole = async (id) =>{
        try{
            let userData = await userModel.findById(id);
            return userData.Role;
        }catch(err){
            console.log(err);
        }
    }

    // login
    authLogin = async (req,res) => {
        try{
            let {error} = validateLogin(req.body);
            if(error){
                res.status(400).json({
                    message: error.details[0].message
                    });
                return;
            }
            let userData = {
                Email : req.body.Email.toLowerCase(),
                Password: req.body.Password
            }
            let user = await this.getUserByEmail(userData.Email);
            if(!user){
                res.status(401).json({
                    message: "No User Found"
                });
            }else{
                let channel = await channelModel.findOne({User:user._id});
                let comparePassword = await bcrypt.compare(userData.Password,user.Password);
                if(userData.Email == user.Email && comparePassword && user.Active == true){
                    const token = jwt.sign({'id': user._id,'cid':channel._id}, global.config.secretKey, {
                    algorithm: global.config.algorithm,
                    expiresIn: global.config.expiresIn
                    });
                    res.status(200).json({
                        token : token,
                        message: "Login Successful"
                    });
                }
                else {
                    res.status(401).json({
                    message: "Email or Password is Wrong"
                    });
                }
            }            
        }catch(err){
            console.log(err);
        }
    }

    // deactivate user
    deactivateById = async (req,res) => {
        try{
            let id  = req.params.id;
            let userData = await userModel.findOneAndUpdate({_id: id},
                {
                    $set: { Active: false},
                },
                { new: true }
            );
            let profileData = await profileModel.findOneAndUpdate({User: userData._id},
                {
                    $set: { Active: false},
                },
                { new: true }
            );
            let channelData = await channelModel.findOneAndUpdate({User: userData._id},
                {
                    $set: { Active: false},
                },
                { new: true }
            );
            if(!userData){
                res.status(500).json({
                    message: "No record found!"
                    });
            }else{
                res.status(200).send(userData);
            }
        }catch(err){
            console.log(err)
            res.status(400).send("Something went wrong");
        }                                                                                                      
    }

    // reactivate user
    reactivateById = async (req,res) => {
        try{
            let id  = req.params.id;
            let did = req.decoded.id;
            if(id == did){
                res.status(401).json({
                    message: "You Can't reactivate your own account! Contact another admin."
                    });
            }
            let userData = await userModel.findOneAndUpdate({_id: id},
                {
                    $set: { Active: true},
                },
                { new: true }
            );
            let profileData = await profileModel.findOneAndUpdate({User: userData._id},
                {
                    $set: { Active: true},
                },
                { new: true }
            );
            let channelData = await channelModel.findOneAndUpdate({User: userData._id},
                {
                    $set: { Active: true},
                },
                { new: true }
            );
            if(!userData){
                res.status(500).json({
                    message: "No record found!"
                    });
            }else{
                res.status(200).send(userData);
            }
        }catch(err){
            console.log(err)
            res.status(400).send("Something went wrong");
        }                                                                                                      
    }

}


// exports functions

module.exports = usersDomain;