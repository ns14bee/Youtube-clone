const express = require('express');
const videoDomain = require('../domains/video.domain');
const router = express.Router();
const {authPage, authChannel} = require('../authentication/authorization');
const verifyToken = require('../authentication/verify_token');
const upload = require('../utils/video.multer');
const update = require('../utils/video.update.multer');

// class
class videoController{

    // to get active videos
    static getVideos = async (req, res) => {
        const videoDomainObj = new videoDomain();
        videoDomainObj.getVideos(req,res);
    }

    // to get deleted videos
    static getDeletedVideos = async (req, res) => {
        const videoDomainObj = new videoDomain();
        videoDomainObj.getDeletedVideos(req,res);
    }

    // to get all videos
    static getAllVideos = async (req, res) => {
        const videoDomainObj = new videoDomain();
        videoDomainObj.getAllVideos(req,res);
    }

    // get videos by user id
    static getVideosByUId = async (req,res) => {
        const videoDomainObj = new videoDomain();
        videoDomainObj.getVideosByUserId(req,res);
    }

    // get private videos by user id
    static getPrivateVideosByUId = async (req,res) => {
        const videoDomainObj = new videoDomain();
        videoDomainObj.getPrivateVideosByUserId(req,res);

    }
    // get Unlisted videos by user id
    static getUnlistedVideosByUId = async (req,res) => {
        const videoDomainObj = new videoDomain();
        videoDomainObj.getUnlistedVideosByUserId(req,res);
    }

    // get all videos by user id
    static getAllVideosByUId = async (req,res) => {
        const videoDomainObj = new videoDomain();
        videoDomainObj.getAllVideosByUserId(req,res);
    }

    // get video by  id
    static getVideoById = async (req,res) => {
        const videoDomainObj = new videoDomain();
        videoDomainObj.getVideosById(req,res);
    }

    // create video 
    static createVideos = async (req,res) => {
        const videoDomainObj = new videoDomain();
        videoDomainObj.createVideo(req,res);
    }

    // to update video
    static updateView =  async (req,res) => {
        const videoDomainObj = new videoDomain();
        videoDomainObj.updateViewByID(req,res);
    }

    // to update video
    static updateVideo =  async (req,res) => {
        const videoDomainObj = new videoDomain();
        videoDomainObj.updateVideoById(req,res);
    }

    // to delete video by id
    static deleteVideo =  async (req,res) => {
        const videoDomainObj = new videoDomain();
        videoDomainObj.deleteVideoById(req,res);
    }

    // to delete video by id
    static retrieveVideo =  async (req,res) => {
        const videoDomainObj = new videoDomain();
        videoDomainObj.retrieveVideoById(req,res);
    }

    // fileData
    static getFileType = async (req,res) =>{
        const videoDomainObj = new videoDomain();
        videoDomainObj.getFileTypes(req,res);
    }
}

// routes
// get videos
router.get("/", videoController.getVideos);

// get deleted videos
router.get("/deleted", verifyToken, authPage([1]), videoController.getDeletedVideos);

// get all videos
router.get("/all", verifyToken, authPage([1]), videoController.getAllVideos);

// get file types
router.get("/filetypes", verifyToken, authPage([1]), videoController.getFileType);

// get specific user videos
router.get("/channel/:id", videoController.getVideosByUId);

// get private specific user videos
router.get("/channel/:id/private", verifyToken, authPage([1,2]), authChannel([1]), videoController.getPrivateVideosByUId);

// get unlisted specific user videos
router.get("/channel/:id/unlisted", verifyToken, authPage([1,2]), authChannel([1]), videoController.getUnlistedVideosByUId);

// get all specific user videos
router.get("/channel/:id/all", videoController.getAllVideosByUId);

// get videos by id
router.get("/:id",videoController.getVideoById);


// create video

router.post("/channel/:id/upload", verifyToken, authPage([1,2]), authChannel([1]),upload.fields([
    {
        name: 'Video', maxCount: 1
    }, 
    {
        name: 'Thumbnail', maxCount: 1
    }
]), videoController.createVideos)

// update view
router.put("/video/:id", videoController.updateView)

// update video
router.put("/channel/:id/edit/:subId",verifyToken, authPage([1,2]), authChannel([1]),update.fields([
    {
        name: 'Video', maxCount: 1
    }, {
        name: 'Thumbnail', maxCount: 1
    }
]), videoController.updateVideo);

// delete video
router.put("/channel/:id/delete/:subId",verifyToken, authPage([1,2]), authChannel([1]), videoController.deleteVideo);

// retrieve video
router.put("/channel/:id/retrieve/:subId",verifyToken, authPage([1]), authChannel([1]), videoController.retrieveVideo);


// exports controller
module.exports = router;