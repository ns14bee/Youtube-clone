const express = require('express');
const playlistVideoDomain = require('../domains/playlistVideo.domain');
const router = express.Router();
const {authPage, authChannel} = require('../authentication/authorization');
const verifyToken = require('../authentication/verify_token');


// class
class playlistVideoController{

    // to get all playlistVideo
    static getAllPlaylistVideos = async (req, res) => {
        const playlistVideoDomainObj = new playlistVideoDomain();
        playlistVideoDomainObj.getAllPlaylistVideos(req,res);
    }

    // get playlistVideo by id
    static getPlaylistVideoById = async (req,res) => {
        const playlistVideoDomainObj = new playlistVideoDomain();
        playlistVideoDomainObj.getPlaylistVideoById(req,res);
    }

    // get playlistVideo by playlist id
    static getPlaylistVideoByPlaylistId = async (req,res) => {
        const playlistVideoDomainObj = new playlistVideoDomain();
        playlistVideoDomainObj.getPlaylistVideoByPlaylistId(req,res);
    }

    // get playlistVideo by playlist id
    static getPlaylistVideoByVideoId = async (req,res) => {
        const playlistVideoDomainObj = new playlistVideoDomain();
        playlistVideoDomainObj.getPlaylistVideoByVideoId(req,res);
    }

    // create playlistVideo 
    static createPlaylistVideo = async (req,res) => {
        const playlistVideoDomainObj = new playlistVideoDomain();
        playlistVideoDomainObj.createPlaylistVideo(req,res);
    }
    
    // delete playlistVideo
    static deletePlaylistVideo = async (req,res) =>{
        const playlistVideoDomainObj = new playlistVideoDomain();
        playlistVideoDomainObj.deletePlaylistVideo(req,res);
    }
}

// routes
// get playlistVideo
router.get("/records", verifyToken, authPage([1]), playlistVideoController.getAllPlaylistVideos);

// get playlistVideo by id
router.get("/records/:id", playlistVideoController.getPlaylistVideoById);

// get playlistVideo by playlist id
router.get("/:id/", playlistVideoController.getPlaylistVideoByPlaylistId);

// get playlistVideo by video id
router.get("/video/:id", verifyToken, authPage([1]), playlistVideoController.getPlaylistVideoByVideoId);

// create playlistVideo
router.post("/channel/:id/playlist/:subId/create", verifyToken, authPage([1,2]), authChannel([1]), playlistVideoController.createPlaylistVideo)

// delete playlistVideo
router.delete("/channel/:id/playlist/:subId/delete",verifyToken, authPage([1,2]), authChannel([1]), playlistVideoController.deletePlaylistVideo);


// exports controller
module.exports = router;