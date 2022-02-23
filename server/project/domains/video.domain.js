const userModel = require('../models/users.model');
const videoModel = require('../models/video.model');
const videoTypeModel = require('../models/videoTypes.model');
const channelModel = require('../models/channel.model');
const fileTypeModel = require('../models/fileTypes.model');
const fileModel = require('../models/file.model');
const jwt = require('jsonwebtoken');
const cloudinary = require('../utils/cloudinary');
const uuid = require('uuid').v4;
const {validateVideo,validateUpdateVideo} = require('../utils/joi.validation');
const verifyToken = require('../authentication/verify_token_function');

class videoDomain{

    // get videos
    getVideos = async (req,res) => {
        let populate = {
                path: "Channel",
                select: "User Name",
                populate: {
                    path: "User",
                    model: "Profile",
                    select: "ProfileImage",
                    populate: {
                        path: "User",
                        model: "UserMaster",
                        select: "UserName"
                    }
                }
            }
        const options = {
            page: req.query.page || 1,
            limit: req.query.limit || 10,
            populate: populate
        };
        try{
            let videoData = await videoModel.paginate({$and:[{Type:1},{Active: true}]},options);
            if(videoData.docs.length < 1){
                res.status(404).send("No records");
            }else{
                res.status(200).send(videoData);
            }
        }catch(err){
            console.log(err);
            res.status(500).send("Something went wrong");
        }
    }

     // get deleted videos
    getDeletedVideos = async (req,res) => {
        try{
            let videoData = await videoModel.find({Active: false});
            if(videoData.length < 1){
                res.status(404).send("No records");
            }else{
                res.status(200).send(videoData);
            }
        }catch(err){
            console.log(err);
            res.status(500).send("Something went wrong");
        }
    }

     // get all videos
    getAllVideos = async (req,res) => {
        try{
            let videoData = await videoModel.find();
            if(videoData.length < 1){
                res.status(404).send("No records");
            }else{
                res.status(200).send(videoData);
            }
        }catch(err){
            console.log(err);
            res.status(500).send("Something went wrong");
        }
    }

    // get videos by user id
    getVideosByUserId  = async (req,res) => {
        try{
            let id  = req.params.id;
            let videoData = await videoModel.find({$and: [{Channel: id}, {Active: true},{Type:1}]});
            if(videoData.length < 1){
                res.status(404).send("No records")
            }else{
                res.status(200).send(videoData);
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }

    // get private videos by user id
    getPrivateVideosByUserId  = async (req,res) => {
        try{
            let id  = req.params.id;
            let videoData = await videoModel.find({$and: [{Channel: id}, {Active: true},{Type:2}]});
            if(videoData.length < 1){
                res.status(404).send("No records")
            }else{
                res.status(200).send(videoData);
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }

    // get Unlisted videos by user id
    getUnlistedVideosByUserId  = async (req,res) => {
        try{
            let id  = req.params.id;
            let videoData = await videoModel.find({$and: [{Channel: id}, {Active: true},{Type:3}]});
            if(videoData.length < 1){
                res.status(404).send("No records")
            }else{
                res.status(200).send(videoData);
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }

    // get All videos by user id
    getAllVideosByUserId  = async (req,res) => {
        let type = req.query.type || [0];
        if(type == '0'){
            type = [1,2,3]
        }
        let order = req.query.sort || 1;
        let sort = {};
        if(order == 1){
            sort = {createdAt: 'asc'}
        }else if(order == 2){
            sort = {createdAt: 'desc'}
        }else{
            sort = {Views: 'desc'}
        }
        let populate = {
                path: "Channel",
                select: "User Name",
                populate: {
                    path: "User",
                    model: "Profile",
                    select: "ProfileImage",
                    populate: {
                        path: "User",
                        model: "UserMaster",
                        select: "UserName"
                    }
                }
            }
        const options = {
            page: req.query.page || 1,
            limit: req.query.limit || 10,
            populate: populate,
            sort: sort
        };
        try{
            let id  = req.params.id;
            let videoData = await videoModel.paginate({$and: [{Channel: id}, {Active: true},{Type:{$in:type}}]},options);
            if(videoData.docs.length < 1){
                res.status(400).send("No records")
            }else{
                res.status(200).send(videoData);
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }

    // get video by id
    getVideosById  = async (req,res) => {
        try{
            let id  = parseInt(req.params.id);
            let videoData = await videoModel.aggregate([
                {$match:{_id: id}},
                {
                    $lookup: {
                        from: 'channels',
                        localField: 'Channel',
                        foreignField: '_id',
                        as: 'Channel',
                    }
                },{

                    $lookup: {
                        from: 'usermasters',
                        localField: 'Channel.User',
                        foreignField: '_id',
                        as: 'User',
                    }
                },{
                    $lookup: {
                        from: 'profiles',
                        localField: 'User._id',
                        foreignField: 'User',
                        as: 'Profile',
                    },
                },
                {
                    $project: {
                        Title : 1,
                        Description: 1,
                        Video:1,
                        Type: 1,
                        Thumbnail:1,
                        VideoID:1,
                        ThumbnailId:1,
                        Views:1,
                        Active: 1,
                        createdAt: 1,
                        updatedAt:1,
                        Profile:{
                            _id:1,
                            ProfileImage:1
                        },
                        Channel:{
                            _id:1,
                            Name:1,
                            Banner:1,
                            About:1
                        },
                        User:{
                            _id:1,
                            UserName:1
                        },
                    }
                }
            ]);
            if(videoData[0]){
                if(videoData[0].Type == 2){
                    verifyToken(req,res);
                    try{
                        let cid = req.decoded.cid;
                        if(!cid){
                            res.status(401).send("Private Content! Authentication required!")
                        }else if(videoData[0].Channel[0]._id == cid){
                            res.status(200).send(videoData);
                        }else{
                            res.status(401).send("Private Video!")
                        }
                    }catch(err){
                        
                        res.status(401).send("Authorization required! Please login!");
                    }
                }else{
                    
                    res.status(200).send(videoData[0]);
                }
            }else{
                res.status(404).send("No record found!")
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }

    // create video
    createVideo = async (req,res) => {
        try{
            let data = req.body;
            let {error} = validateVideo(data);
            if(error){
                res.status(400).json({
                    message: error.details[0].message
                });
            }else{
                if(!req.files){
                        res.status(400).json({
                        message: "Files are Required!"
                    });
                }else{
                    if(req.files.Video[0].size < (1024*1000*100) && req.files.Thumbnail[0].size <= (1024*1000*10))
                    {
                        const Video = await cloudinary.uploader.upload(req.files.Video[0].path,{
                            resource_type: "video",
                            public_id: `YouTube/Videos/${uuid()}-${req.files.Video[0].originalname}`
                        });
                        if(Video){
                            const Thumbnail = await cloudinary.uploader.upload(req.files.Thumbnail[0].path,{
                                resource_type: "image",
                                public_id: `YouTube/Images/Thumbnails/${uuid()}-${req.files.Thumbnail[0].originalname}`
                            });
                            if(Thumbnail){
                                data = {
                                    ...data,
                                    Channel : req.decoded.cid,
                                    Video : Video.secure_url,
                                    VideoID : Video.public_id,
                                    Thumbnail : Thumbnail.secure_url,
                                    ThumbnailId : Thumbnail.public_id,
                                }
                                let videoObj = new videoModel(data);
                                let video = await videoObj.save();
                                res.status(200).send(video);
                            }else{
                                await cloudinary.uploader.destroy(Video.public_id)
                                res.status(400).send("Thumbnail file didn't upload");
                            }
                        }else{
                            res.status(400).send("Video file didn't upload");
                        }
                    }else{
                        if(req.files.Video[0].size > (1024*1000*100)){
                            res.status(400).send("Video File is too big! should be less then 100mb");
                        }else{
                            res.status(400).send("Thumbnail File is too big! should be less then 10mb");
                        }
                    }
                }
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }
    

    // update view by id
    updateViewByID = async (req,res) => {
        try{
            let id = parseInt(req.params.id);
            let data = await videoModel.findOne({_id:id});
            let videoData = await videoModel.findOneAndUpdate({_id:id},
                {
                    $set: {Views: data.Views+1},
                },
                { new: true }
            );
            if(!videoData){
                res.status(401).send("Some error occurred. Contact Admin!")
            }else{
                res.status(200).send({Views: videoData.Views});
            }
        }catch(err){
            console.log(err)
            res.status(400).send("Something went wrong");
        }
    }

    // update video
    updateVideoById = async (req,res) => {
        try{
            let id  = req.params.subId;
            const channelId = req.params.id;
            let data = req.body
            let {error} = validateUpdateVideo(data);
            if(error){
                res.status(400).json({
                    message: error.details[0].message
                });
            }else{
                let video = await videoModel.findOne({$and:[{_id: id}, {Channel: channelId}, {Active: true}]});
                if(!video){
                    res.status(400).json({
                        message: 'Video Does not exist'
                    });
                }else{
                    if(req.files){
                        if(req.files.Video){
                            if(req.files.Video[0].size < (1024*1000*100)){
                                const newVideo = await cloudinary.uploader.upload(req.files.Video[0].path,{
                                    resource_type: "video",
                                    public_id: `YouTube/Videos/${uuid()}-${req.files.Video[0].originalname}`
                                });
                                if(newVideo){
                                    await cloudinary.uploader.destroy(video.VideoID)
                                    data.Video = newVideo.secure_url;
                                    data.VideoID = newVideo.public_id;
                                }else{

                                    res.status(400).send("Video file didn't upload");
                                }
                            }else{
                                res.status(400).send("Video File is too big! should be less then 100mb");
                            }
                        }
                        if(req.files.Thumbnail){
                            if(req.files.Thumbnail[0].size < (1024*1000*10)){
                                const Thumbnail = await cloudinary.uploader.upload(req.files.Thumbnail[0].path,{
                                    resource_type: "image",
                                    public_id: `YouTube/Images/Thumbnails/${uuid()}-${req.files.Thumbnail[0].originalname}`
                            });
                                if(Thumbnail){
                                    await cloudinary.uploader.destroy(video.ThumbnailId)
                                    data.Thumbnail = Thumbnail.secure_url;
                                    data.ThumbnailId = Thumbnail.public_id;
                                }else{
                                    res.status(400).send("Thumbnail file didn't upload");
                                }
                            }else{
                                res.status(400).send("Thumbnail File is too big! should be less then 10mb");
                            }
                        }
                    }
                    let videoData = await videoModel.findOneAndUpdate({$and: [{_id: id}, {Active: true}]},
                            {
                                $set: data,
                            },
                            { new: true }
                            );
                    if(!videoData){
                        res.status(401).send("Some error occurred. Contact Admin!")
                    }else{
                        res.status(200).send(videoData);
                    }
                }                    
            }
        }catch(err){
            console.log(err)
            res.status(400).send("Something went wrong");
        }
    }

    // delete video by id
    deleteVideoById = async (req,res) => {
        try{
            let id  = req.params.subId;
            let videoData = await videoModel.findOneAndUpdate({$and: [{_id: id}, {Active: true}]},
                {
                    $set: { Active: false},
                },
                { new: true }
            );
            if(videoData){
                res.status(200).send(videoData);
            }else{
                res.status(400).send("No Data found");
            }
        }catch(err){
            console.log(err)
            res.status(400).send("Something went wrong");
        }                                                                                                       
        
    }

    // retrieve video by id
    retrieveVideoById = async (req,res) => {
        try{
            let id  = req.params.subId;
            let videoData = await videoModel.findOneAndUpdate({$and: [{_id: id}, {Active: false}]},
                {
                    $set: { Active: true},
                },
                { new: true }
            );
            if(videoData){
                res.status(200).send(videoData);
            }else{
                res.status(400).send("No Data found");
            }
        }catch(err){
            console.log(err)
            res.status(400).send("Something went wrong");
        }                                                                                                       
        
    }

     // get FileTypes
    getFileTypes = async (req,res) => {
        try{
            let fileData = await fileTypeModel.find();
            if(fileData.length < 1){
                res.status(200).send("No records");
            }else{
                res.status(200).send(fileData);
            }
        }catch(err){
            console.log(err)
            res.status(400).send("Something went wrong");
        }    
    }

}

// exports functions

module.exports = videoDomain;
