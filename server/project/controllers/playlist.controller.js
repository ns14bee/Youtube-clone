const express = require('express');
const playlistDomain = require('../domains/playlist.domain');
const playlistVideo = require('./playlistVideo.controller');
const router = express.Router();
const {authPage, authChannel} = require('../authentication/authorization');
const verifyToken = require('../authentication/verify_token');


// class
class playlistController{

    // to get all playlist
    static getAllPlaylist = async (req, res) => {
        const playlistDomainObj = new playlistDomain();
        playlistDomainObj.getAllPlaylist(req,res);
    }

    // to get public playlist
    static getPublicPlaylist = async (req, res) => {
        const playlistDomainObj = new playlistDomain();
        playlistDomainObj.getPublicPlaylist(req,res);
    }

    // get playlist by id
    static getPlaylistById = async (req,res) => {
        const playlistDomainObj = new playlistDomain();
        playlistDomainObj.getPlaylistById(req,res);
    }

    // get playlist by channel id
    static getPlaylistByChannel = async (req,res) => {
        const playlistDomainObj = new playlistDomain();
        playlistDomainObj.getPlaylistByChannel(req,res);
    }

    // to get public playlist
    static getPublicPlaylistByChannel = async (req, res) => {
        const playlistDomainObj = new playlistDomain();
        playlistDomainObj.getPublicPlaylistByChannel(req,res);
    }

    // to get private playlist
    static getPrivatePlaylistByChannel = async (req, res) => {
        const playlistDomainObj = new playlistDomain();
        playlistDomainObj.getPrivatePlaylistByChannel(req,res);
    }

    // to get unlisted playlist
    static getUnlistedPlaylistByChannel = async (req, res) => {
        const playlistDomainObj = new playlistDomain();
        playlistDomainObj.getUnlistedPlaylistByChannel(req,res);
    }

    // create playlist 
    static createPlaylist = async (req,res) => {
        const playlistDomainObj = new playlistDomain();
        playlistDomainObj.createPlaylist(req,res);
    }

    // update playlist
    static updatePlaylist =  async (req,res) => {
        const playlistDomainObj = new playlistDomain();
        playlistDomainObj.updatePlaylist(req,res);
    }

    // delete playlist
    static deletePlaylist = async (req,res) =>{
        const playlistDomainObj = new playlistDomain();
        playlistDomainObj.deletePlaylist(req,res);
    }
}

// routes

// get public playlist
router.get("/", playlistController.getPublicPlaylist);

// get all playlist
router.get("/all", verifyToken, authPage([1]), playlistController.getAllPlaylist);

// get playlist by id
router.get("/:id", playlistController.getPlaylistById);

// get playlist by channel id
router.get("/channel/:id/all", verifyToken, authPage([1,2]), authChannel([1]), playlistController.getPlaylistByChannel);

// get playlist by channel id
router.get("/channel/:id/public", playlistController.getPublicPlaylistByChannel);

// get playlist by channel id
router.get("/channel/:id/private", verifyToken, authPage([1,2]), authChannel([1]), playlistController.getPrivatePlaylistByChannel);

// get playlist by channel id
router.get("/channel/:id/unlisted", verifyToken, authPage([1,2]), authChannel([1]), playlistController.getUnlistedPlaylistByChannel);


// create playlist
router.post("/:id/create/", verifyToken, authPage([1,2]), authChannel([1]), playlistController.createPlaylist)

// update playlist
router.put("/:id/edit/:subId/",verifyToken, authPage([1,2]), authChannel([1]), playlistController.updatePlaylist);

// delete playlist
router.delete("/:id/delete/:subId",verifyToken, authPage([1,2]), authChannel([1]), playlistController.deletePlaylist);

// playlist video router
router.use("/videos/",  playlistVideo);

// exports controller
module.exports = router;