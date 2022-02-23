const playlistVideosModel = require('../models/playlistVideos.model');
const playlistModel = require('../models/playlist.model');
const jwt = require('jsonwebtoken');
const {validatePlaylist , validatePlaylistUpdate} = require('../utils/joi.validation');
const verifyToken = require('../authentication/verify_token_function');

class playlistDomain{

    // get all playlist
    getAllPlaylist = async (req,res) => {
        try{
            let playlistData = await playlistModel.find();
            if(playlistData.length>0){
                res.status(200).send(playlistData);
            }else{
                res.status(400).send("No records found");
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }

    // get public playlist
    getPublicPlaylist = async (req,res) => {
        try{
            let playlistData = await playlistModel.find({Type:1});
            if(playlistData.length>0){
                res.status(200).send(playlistData);
            }else{
                res.status(400).send("No records found");
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }

    // get playlist by id
    getPlaylistById  = async (req,res) => {
        try{
            let id  = req.params.id;
            let playlistData = await playlistModel.findOne({_id: id});
            if(playlistData){
                if(playlistData.Type == 2){
                    verifyToken(req,res);
                    try{
                        let cid = req.decoded.cid;
                        if(playlistData.Channel == cid){
                            res.status(200).send(playlistData);
                        }else{
                            res.status(401).send("You don't have a permission to access this private content!");
                        }
                    }catch(err){
                        
                        res.status(401).send("Authorization required! Please login!");
                    }
                }else{
                    res.status(200).send(playlistData);
                }
            }else{
                res.status(400).send("playlist not found");
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    } 

    // get playlist by channel
    getPlaylistByChannel  = async (req,res) => {
        try{
            let id  = req.params.id;
            let playlistData = await playlistModel.find({Channel: id});
            if(playlistData.length>0){
                res.status(200).send(playlistData);
            }else{
                res.status(400).send("No records found");
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    } 

     // get Public playlist by channel
    getPublicPlaylistByChannel  = async (req,res) => {
        try{
            let id  = req.params.id;
            let playlistData = await playlistModel.find({$and: [{Channel: id},{Type:1}]});
            if(playlistData.length>0){
                res.status(200).send(playlistData);
            }else{
                res.status(400).send("No records found");
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    } 

    // get Private playlist by channel
    getPrivatePlaylistByChannel  = async (req,res) => {
        try{
            let id  = req.params.id;
            let playlistData = await playlistModel.find({$and: [{Channel: id},{Type:2}]});
            if(playlistData.length>0){
                res.status(200).send(playlistData);
            }else{
                res.status(400).send("No records found");
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }

    // get Unlisted playlist by channel
    getUnlistedPlaylistByChannel  = async (req,res) => {
        try{
            let id  = req.params.id;
            let playlistData = await playlistModel.find({$and: [{Channel: id},{Type:3}]});
            if(playlistData.length>0){
                res.status(200).send(playlistData);
            }else{
                res.status(400).send("No records found");
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }

    // create playlist
    createPlaylist = async (req,res) => {
        try{
            let {error} = validatePlaylist(req.body);
            if(error){
                res.status(400).json({
                    message: error.details[0].message
                    });
            }else{
                let data = req.body;
                data.Channel = req.params.id;
                let playlistObj = new playlistModel(data);
                let playlist = await playlistObj.save();
                if(playlist){
                    res.status(200).send(playlist);
                }else{
                    res.status(400).send("Something went wrong");
                }
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }

    // update playlist
    updatePlaylist = async (req,res) => {
        try{
            let {error} = validatePlaylistUpdate(req.body);
            if(error){
                res.status(400).json({
                    message: error.details[0].message
                    });
            }else{
                let id = req.params.subId;
                let channel = req.params.id;
                let playlist = await playlistModel.findOne({$and: [{Channel: channel},{_id: id}]});
                if(playlist){
                    let data = req.body;
                    let playlistData = await playlistModel.findOneAndUpdate({$and: [{Channel: channel},{_id: id}]},
                        {
                            $set: data,
                        },
                        { new: true }
                    );
                    if(playlistData){
                        res.status(200).send(playlistData);
                    }else{
                        res.status(400).send("Some error occurred. Contact Admin!")
                    }
                }else{
                    res.status(400).send("Playlist Doesn't exist");
                }
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }

    // delete playlist
    deletePlaylist = async (req,res) => {
        try{
            let id = req.params.subId;
            let playlistData = await playlistModel.deleteOne({_id:id});
            let playlistVideoData = await playlistVideosModel.deleteMany({Playlist: id})
            res.status(200).send(playlistData);
            
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    } 

}

// exports functions
module.exports = playlistDomain;
