const profileModel = require('../models/profile.model');
const userModel = require('../models/users.model');
const channelModel = require('../models/channel.model');
const jwt = require('jsonwebtoken');
const {validateProfile} = require('../utils/joi.validation');
const cloudinary = require('../utils/cloudinary');
const uuid = require('uuid').v4;


class profileDomain{
    
    // current user profile
    getCurrentProfileById  = async (req,res) => {
        try{
            let id  = req.decoded.id;
            let profileData = await profileModel.findOne({$and: [{User: id}, {Active: true}]});
            if(!profileData){
                res.status(500).json({
                    message: "No record found!"
                    });
            }else{
                res.status(200).send(profileData);
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }

    // get profile
    getAllProfiles = async (req,res) => {
        try{
            let profileData = await profileModel.find({Active: true});      
            if(profileData.length < 1){
                res.status(500).json({
                    message: "No Data!"
                });
            }else{
                res.status(200).send(profileData);
            }
        }catch(err){
            console.log(err);
            res.status(500).send("Something went wrong");
        }
    }

     // get profile by id
    getProfileById  = async (req,res) => {
        try{
            let id  = req.params.id;
            let profileData = await profileModel.find({$and: [{_id: id}, {Active: true}]});
            if(!profileData){
                res.status(500).json({
                    message: "No record found!"
                    });
            }else{
                res.status(200).send(profileData);
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }

    // update profile
    updateProfileById = async (req,res) => {
        try{
            let id  = req.params.id;
            let data = req.body
            let profile = await profileModel.findOne({_id:id});
            if(profile){
                let {error} = validateProfile(data);
                if(error){
                    res.status(400).json({
                        message: error.details[0].message
                        });
                }else{
                    if(req.files){
                        if(req.files.ProfileImage){
                            if(req.files.ProfileImage[0].size < (1024*1000*10)){
                                const ProfileImage = await cloudinary.uploader.upload(req.files.ProfileImage[0].path,{
                                    resource_type: "image",
                                    public_id: `YouTube/Images/Profile/${uuid()}-${req.files.ProfileImage[0].originalname}`
                            });
                                if(ProfileImage){
                                    if(profile.ProfileImageID){
                                        await cloudinary.uploader.destroy(profile.ProfileImageID)
                                    }
                                    data.ProfileImage = ProfileImage.secure_url;
                                    data.ProfileImageID = ProfileImage.public_id;
                                }else{
                                    res.status(400).send("ProfileImage file didn't upload");
                                }
                            }else{
                                res.status(400).send("ProfileImage File is too big! should be less then 10mb");
                            }
                        }
                    }
                    
                    let profileData = await profileModel.findOneAndUpdate({$and: [{_id: id}, {Active: true}]},
                        {
                            $set: data,
                        },
                        { new: true }
                    );
                    if(!profileData){
                        res.status(401).send("Some error occurred. Contact Admin!")
                    }else{
                        res.status(200).send(profileData);
                    }
                }
            }else{
                res.status(400).send("Profile doesn't exist.")
            }
        }catch(err){
            console.log(err)
            res.status(400).send("Something went wrong");
        }
    }

  // delete profile by id
    deleteProfileById = async (req,res) => {
        try{
            let id  = req.params.id;
            let profileData = await profileModel.findOneAndUpdate({_id: id},
                {
                    $set: { Active: false},
                },
                { new: true }
            );
            console.log(profileData)
            let userData = await userModel.findOneAndUpdate({_id: profileData.User},
                {
                    $set: { Active: false},
                },
                { new: true }
            );
            let channelData = await channelModel.findOneAndUpdate({User: profileData.User},
                {
                    $set: { Active: false},
                },
                { new: true }
            );
            if(!profileData){
                res.status(500).json({
                    message: "No record found!"
                    });
            }else{
                res.status(200).send(profileData);
            }
        }catch(err){
            console.log(err)
            res.status(400).send("Something went wrong");
        }                                                                                                      
    }

    // retrieve account
    retrieveProfileById = async (req,res) => {
        try{
            let id  = req.params.id;
            let did = await userModel.find({_id : req.decoded.id});
            if(!did){
                res.status(500).json({
                    message: "No record found!"
                    });
            }else if(id == did){
                res.status(401).json({
                    message: "You Can't reactivate your own account! Contact another admin."
                    });
            }else{
                let profileData = await profileModel.findOneAndUpdate({_id: id},
                {
                    $set: { Active: true},
                },
                { new: true }
                );
                let userData = await userModel.findOneAndUpdate({_id: profileData.User},
                    {
                        $set: { Active: true},
                    },
                    { new: true }
                );
                let channelData = await channelModel.findOneAndUpdate({User: profileData.User},
                    {
                        $set: { Active: true},
                    },
                    { new: true }
                );
                if(!profileData){
                    res.status(500).json({
                        message: "No record found!"
                        });
                }else{
                    res.status(200).send(profileData);
                }
            }
        }catch(err){
            console.log(err)
            res.status(400).send("Something went wrong");
        }                             
    }

}

// exports functions
module.exports = profileDomain;