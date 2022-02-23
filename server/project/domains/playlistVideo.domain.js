const playlistModel = require('../models/playlist.model');
const playlistVideosModel = require('../models/playlistVideos.model');
const videoModel = require('../models/video.model');
const jwt = require('jsonwebtoken');
const {validatePlaylistVideos} = require('../utils/joi.validation');
const playListVideoModel = require('../models/playlistVideos.model');
const verifyToken = require('../authentication/verify_token_function');

class playlistVideoDomain{

    // get all playlistVideos
    getAllPlaylistVideos = async (req,res) => {
        try{
            let playlistVideoData = await playlistVideosModel.find();
            if(playlistVideoData.length > 0){
                res.status(200).send(playlistVideoData);
            }else{
                res.status(400).send("No data found!");
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }

    // get playlistVideo by id
    getPlaylistVideoById = async (req,res) => {
        try{
            let id  = req.params.id;
            let playlistVideoData = await playlistVideosModel.findOne({_id: id});
            if(playlistVideoData){
                let playlist = await playlistModel.findOne({_id:playlistVideoData.Playlist});
                if(playlist.Type == 2){
                    try{
                        verifyToken(req,res);
                        let cid = req.decoded.cid;
                        if(playlist.Channel == cid){
                            res.status(200).send(playlistVideoData);
                        }else{
                            res.status(401).send("You don't have a permission to access this private content!");
                        }
                    }catch(err){                       
                        res.status(401).send("Authorization required! Please login!");
                    }
                }else{
                    res.status(200).send(playlistVideoData);
                }
            }else{
                res.status(400).send("Playlist doesn't exist.");
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }

    // get playlistVideo by playlistId
    getPlaylistVideoByPlaylistId = async (req,res) => {
        try{
            let id  = req.params.id;
            let playlist = await playlistModel.findOne({_id:id});
            if(playlist){
                if(playlist.Type == 2){
                    verifyToken(req,res);
                    try{
                        let cid = req.decoded.cid;
                        if(playlist.Channel == cid){
                            let playlistVideoData = await playlistVideosModel.find({Playlist: id});
                            if(playlistVideoData.length > 0){
                                res.status(200).send(playlistVideoData);
                            }else{
                                res.status(400).send("No data found!");
                            }
                        }else{
                            res.status(401).send("You don't have a permission to access this private content!");
                        }
                    }catch(err){                       
                        res.status(401).send("Authorization required! Please login!");
                    }
                }else{
                    let playlistVideoData = await playlistVideosModel.find({Playlist: id});
                    if(playlistVideoData.length > 0){
                        res.status(200).send(playlistVideoData);
                    }else{
                        res.status(400).send("No data found!");
                    }
                }
            }else{
                res.status(400).send("Playlist doesn't exist");
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }

    // get playlistVideo by videoId
    getPlaylistVideoByVideoId = async (req,res) => {
        try{
            let id  = req.params.id;
            let playlistVideoData = await playlistVideosModel.find({Video: id});
            if(playlistVideoData.length>0){
                res.status(200).send(playlistVideoData);
            }else{
                res.status(400).send("Video not found in any playlist.");
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }

    // create playlistVideo 
    createPlaylistVideo = async (req,res) => {
        try{
            let id = req.params.subId;
            let cid = req.params.id;
            let playlist = await playlistModel.findOne({$and: [{_id: id},{Channel:cid}]});
            if(playlist){
                let {error} = validatePlaylistVideos(req.body);
                if(error){
                    res.status(400).json({
                        message: error.details[0].message
                        });
                }else{
                    let data = req.body;
                    let playlistVideos = [];
                    let NotUploaded = [];
                    let counter = 0;
                    for(let video of data.Videos){
                        let exists = await playListVideoModel.findOne({$and: [{Playlist:id},{Video:video}]});
                        if(!exists){
                            let newData = {
                                Playlist:id,
                                Video: video
                            };
                            let playlistVideoObj = new playlistVideosModel(newData)
                            let temp = await playlistVideoObj.save();
                            playlistVideos.push(temp)
                        }else{
                            NotUploaded.push({id:video})
                            counter ++;
                        }
                    }
                    let stats = {
                        Added: playlistVideos.length,
                        Failed: counter
                    }
                    let Result = {
                        Result: stats,
                        Uploaded: playlistVideos,
                        NotUploaded: NotUploaded
                    }
                    res.status(200).send(Result);
                }
            }else{
                res.status(400).send("Playlist doesn't exist!");
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }

    // delete playlistVideo
    deletePlaylistVideo = async (req,res) => {
        try{
            let id = req.params.subId;
            let cid = req.params.id;
            let data = req.body;
            let playlist = await playlistModel.findOne({$and: [{_id: id},{Channel:cid}]});
            if(playlist){
                let playlistVideoData = await playlistVideosModel.deleteMany(
                    {$and: [
                        {Playlist:id},
                        {Video: {$in:data.Videos}}
                    ]});
                res.status(200).send(playlistVideoData);
            }else{
                res.status(400).send("Playlist doesn't exist!");
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }

}

// exports functions
module.exports = playlistVideoDomain;
