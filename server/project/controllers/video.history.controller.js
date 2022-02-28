const express = require('express');
const videoHistoryDomain = require('../domains/video.history.domain');
const router = express.Router();
const {authPage, authChannel} = require('../authentication/authorization');
const verifyToken = require('../authentication/verify_token');

class videoHistoryController{

    // to get UserVideoHistory
    static getVideoHistoryByChannelID  = async (req, res) => {
        const videoHistoryDomainObj = new videoHistoryDomain();
        videoHistoryDomainObj.getHistoryByChannelID(req,res);
    }

    // to get UserVideoHistory
    static getVideoHistoryByVideoID  = async (req, res) => {
        const videoHistoryDomainObj = new videoHistoryDomain();
        videoHistoryDomainObj.getHistoryByVideoId(req,res);
    }

    // to add video watch history
    static addVideoHistory = async (req, res) => {
        const videoHistoryDomainObj = new videoHistoryDomain();
        videoHistoryDomainObj.addVideoHistory(req,res);
    }

    // to edit video watch history
    static editVideoHistory = async (req, res) => {
        const videoHistoryDomainObj = new videoHistoryDomain();
        videoHistoryDomainObj.editVideoHistory(req,res);
    }
}

// routes

// get videoHistory by 
router.get("/channel", verifyToken, authPage([1,2]), videoHistoryController.getVideoHistoryByChannelID);

// get videoHistory by 
router.get("/video/:id", verifyToken, authPage([1,2]), videoHistoryController.getVideoHistoryByVideoID);

// get add videoHistory
router.post("/add/video/:id", verifyToken, authPage([1,2]), videoHistoryController.addVideoHistory);

// get add videoHistory
router.put("/edit/video/:id", verifyToken, authPage([1,2]), videoHistoryController.editVideoHistory);

// exports controller
module.exports = router;
