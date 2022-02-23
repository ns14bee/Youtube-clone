const ratingModel = require('../models/rating.model');
const rateModel = require('../models/rateObj.model');
const videoModel = require('../models/video.model');
const channelModel = require('../models/channel.model');
const jwt = require('jsonwebtoken');
const {validateRating} = require('../utils/joi.validation');

// class
class ratingDomain{

    // get ratings
    getAllRatings = async (req,res) => {
        try{
            let ratingData = await ratingModel.find();
            if(ratingData.length>0){
                res.status(200).send(ratingData);
            }else{
                res.status(400).send("No records");
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }

     // get ratings by video id
    getRatingsByVideoId  = async (req,res) => {
        try{
            let id  = req.params.id;
            let video = await videoModel.find({_id: id});
            if(video){
                let ratingData = await ratingModel.find({Video: id});
                if(ratingData.length>0){
                    res.status(200).send(ratingData);
                }else{
                    res.status(400).send("No records");
                }
            }else{
                res.status(400).send("No video found");
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }

    // get ratings by channel id
    getRatingsByUserId  = async (req,res) => {
        try{
            let id  = req.params.id;
            let channel = await channelModel.find({_id: id});
            if(channel){
                let ratingData = await ratingModel.find({Channel: id});
                if(ratingData.length>0){
                    res.status(200).send(ratingData);
                }else{
                    res.status(400).send("No records");
                }
            }else{
                res.status(400).send("No channel found");
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }

     // get Liked ratings by channel id
    getLikedRatingsByUserId  = async (req,res) => {
        try{
            let id  = req.params.id;
            let channel = await channelModel.find({_id: id});
            if(channel){
                let ratingData = await ratingModel.find({$and :[{Channel: id},{LikeStatus:1}]});
                if(ratingData.length>0){
                    res.status(200).send(ratingData);
                }else{
                    res.status(400).send("No records");
                }
            }else{
                res.status(400).send("No channel found");
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }

     // get Disliked ratings by channel id
    getDislikedRatingsByUserId  = async (req,res) => {
        try{
            let id  = req.params.id;
            let channel = await channelModel.find({_id: id});
            if(channel){
                let ratingData = await ratingModel.find({$and :[{Channel: id},{LikeStatus:2}]});
                if(ratingData.length>0){
                    res.status(200).send(ratingData);
                }else{
                    res.status(400).send("No records");
                }
            }else{
                res.status(400).send("No channel found");
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }

    // get rating of channel by video id
    getRatingByIdAndChannel = async (req,res) => {
        try{
            let id  = parseInt(req.params.id);
            let cid =  parseInt(req.decoded.cid);
            let video = await videoModel.findOne({_id:id});
            if(video){
                let ratingData = await ratingModel.findOne({$and: [{Video: id},{Channel: cid}]});
                console.log(ratingData);
                if(ratingData){
                    res.status(200).send(ratingData);
                }else{
                    res.status(400).send("No video found");
                }
            }else{
                res.status(400).send("No video found");
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }

    // get rating by id
    getRatingById = async (req,res) => {
        try{
            let id  = parseInt(req.params.id);
            let status =  parseInt(req.query.status);
            let video = await videoModel.findOne({_id:id});
            if(video){
                let ratingData = await ratingModel.find({$and: [{Video: id},{LikeStatus: status}]}).count();
                res.status(200).send({'Total':ratingData});
            }else{
                res.status(400).send("No video found");
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }

    // get total number of likes
    getLikesById = async (req,res) => {
        try{
            let id  = req.params.id;
            let video = await videoModel.findOne({_id:id});
            if(video){
                let ratingData = await ratingModel.find({$and: [{Video: id},{LikeStatus: 1}]}).count();
                res.status(200).send({'Likes':ratingData});
            }else{
                res.status(400).send("No video found");
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }

    // get total number of dislikes
    getDislikeById = async (req,res) => {
        try{
            let id  = req.params.id;
            let video = await videoModel.findOne({_id:id});
            if(video){
                let ratingData = await ratingModel.find({$and: [{Video: id},{LikeStatus: 2}]}).count();
                res.status(200).send({'Dislikes':ratingData});
            }else{
                res.status(400).send("No video found");
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }

    // create rating
    createRating = async (req,res) => {
        try{
            let data = req.body;
            let channelId = parseInt(req.decoded.cid);
            let videoId = parseInt(req.params.id);
            let exists = await ratingModel.findOne({$and: [{Video:videoId},{Channel:channelId}]});
            let video = await videoModel.findOne({_id:videoId});
            if(!exists && video){
                let {error} = validateRating(data);
                if(error){
                    res.status(400).json({
                        message: error.details[0].message
                    });
                }else{
                    data.Video = videoId;
                    data.Channel = channelId;
                    let ratingObj = new ratingModel(data);
                    let rating = await ratingObj.save();
                    res.status(200).send(rating);
                }
            }else{
                if(exists){
                    res.status(400).send("Rated already");
                }else{
                    res.status(400).send("Video doesn't exists");
                }
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }

    // update rating
    updateRatingById = async (req,res) => {
        try{
            let data = req.body;
            let channelId = parseInt(req.decoded.cid);
            let videoId = parseInt(req.params.id);
            let exists = await ratingModel.findOne({$and: [{Video:videoId},{Channel:channelId}]});
            if(exists){
                let {error} = validateRating(data);
                if(error){
                    res.status(400).json({
                        message: error.details[0].message
                    });
                }else{
                    let RatingData = await ratingModel.findOneAndUpdate({$and: [{Video: videoId}, {Channel: channelId}]},
                        {
                            $set: data,
                        },
                        { new: true }
                    );
                    if(!RatingData){
                        res.status(401).send("Some error occurred. Contact Admin!")
                    }else{
                        res.status(200).send(RatingData);
                    }
                }
            }else{
                this.createRating(req,res);
            }
        }catch(err){
            console.log(err)
            res.status(400).send("Something went wrong");
        }
    }

    // delete rating
    deleteNeutralRating = async (req,res) => {
        try{
            let RatingData = await ratingModel.deleteMany({LikeStatus: 3});
            res.status(200).send(RatingData);
        }catch(err){
            console.log(err)
            res.status(400).send("Something went wrong");
        }
    }
}

// exports functions
module.exports = ratingDomain;