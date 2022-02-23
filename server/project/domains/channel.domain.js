const profileModel = require('../models/profile.model');
const userModel = require('../models/users.model');
const channelModel = require('../models/channel.model');
const jwt = require('jsonwebtoken');
const {validateChannel} = require('../utils/joi.validation');
const cloudinary = require('../utils/cloudinary');
const uuid = require('uuid').v4;

class channelDomain{
    
    // get current channelModel
    getCurrentChannelById  = async (req,res) => {
        try{
            let id  = req.decoded.id;
            let channelData = await channelModel.findOne({$and: [{User: id}, {Active: true}]});
            if(channelData){
                res.status(200).send(channelData);
            }else{
                res.status(400).send("No Data Found");
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }

    // get channel
    getAllChannel = async (req,res) => {
        try{
            let channelData = await channelModel.find({Active: true});
            if(channelData.length>0){
                res.status(200).send(channelData);
            }else{
                res.status(400).send("No Data Found");
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }

     // get channel by id
    getChannelById  = async (req,res) => {
        try{
            let id  = req.params.id;
            let channelData = await channelModel.findOne({$and: [{_id: id}, {Active: true}]});
            if(channelData){
                res.status(200).send(channelData);
            }else{
                res.status(400).send("No Data Found");
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }

      // update channel
    updateChannelById = async (req,res) => {
        try{
            let id  = req.params.id;
            let data = req.body
            let channel = await channelModel.findOne({$and: [{_id: id},{Active: true}]});
            if(channel){
                let {error} = validateChannel(data);
            if(error){
                res.status(400).json({
                    message: error.details[0].message
                    });
            }else{
                    if(req.files){ 
                        if(req.files.Banner){
                            if(req.files.Banner[0].size < (1024*1000*10)){
                                const Banner = await cloudinary.uploader.upload(req.files.Banner[0].path,{
                                    resource_type: "image",
                                    public_id: `YouTube/Images/Banner/${uuid()}-${req.files.Banner[0].originalname}`
                            });
                                if(Banner){
                                    if(channel.BannerID){
                                        await cloudinary.uploader.destroy(channel.BannerID)
                                    }
                                    data.Banner = Banner.secure_url;
                                    data.BannerID = Banner.public_id;
                                }else{
                                    res.status(400).send("Banner file didn't upload");
                                }
                            }else{
                                res.status(400).send("Banner File is too big! should be less then 10mb");
                            }
                        }
                    }
                let channelData = await channelModel.findOneAndUpdate({$and: [{_id: id}, {Active: true}]},
                    {
                        $set: data,
                    },
                    { new: true }
                );
                if(!channelData){
                    res.status(401).send("Some error occurred. Contact Admin!")
                }else{
                    res.status(200).send(channelData);
                }
            }
            }else{
                res.status(401).send("No channel found");
            }
        }catch(err){
            console.log(err)
            res.status(400).send("Something went wrong");
        }
    }

  // delete channel by id
    deleteChannelById = async (req,res) => {
        try{
            let id  = req.params.id;
            let channelData = await channelModel.findOneAndUpdate({_id: id},
                {
                    $set: { Active: false},
                },
                { new: true }
            );
            let profileData = await profileModel.findOneAndUpdate({User: channelData.User},
                {
                    $set: { Active: false},
                },
                { new: true }
            );
            let userData = await userModel.findOneAndUpdate({_id: channelData.User},
                {
                    $set: { Active: false},
                },
                { new: true }
            );
            res.status(200).send(channelData);
        }catch(err){
            console.log(err)
            res.status(400).send("Something went wrong");
        }                                                                                                                                                                                                      
    }

    // retrieve account
    retrieveChannelById = async (req,res) => {
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
                let channelData = await channelModel.findOneAndUpdate({_id: id},
                    {
                        $set: { Active: true},
                    },
                    { new: true }
                );
                let userData = await userModel.findOneAndUpdate({_id: channelData.User},
                    {
                        $set: { Active: true},
                    },
                    { new: true }
                );
                let profileData = await profileModel.findOneAndUpdate({User: channelData.User},
                    {
                        $set: { Active: true},
                    },
                    { new: true }
                );
                if(!channelData){
                    res.status(500).json({
                        message: "No record found!"
                        });
                }else{
                    res.status(200).send(channelData);
                }
            }
        }catch(err){
            console.log(err)
            res.status(400).send("Something went wrong");
        }                             
    }

}

// exports functions
module.exports = channelDomain;