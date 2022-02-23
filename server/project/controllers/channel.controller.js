const express = require('express');
const channelDomain = require('../domains/channel.domain');
const router = express.Router();
const {authPage, authChannel} = require('../authentication/authorization');
const verifyToken = require('../authentication/verify_token');
const update = require('../utils/Image.update.multer');

// class
class channelController{

    // to get current channel
    static getCurrentUserChannel = async(req,res) => {
        const channelDomainObj = new channelDomain();
        channelDomainObj.getCurrentChannelById(req,res);
    }

    // to get all channel
    static getChannels = async (req, res) => {
        const channelDomainObj = new channelDomain();
        channelDomainObj.getAllChannel(req,res);
    }

    // get channel by id
    static getChannelById = async (req,res) => {
        const channelDomainObj = new channelDomain();
        channelDomainObj.getChannelById(req,res);
    }

    // to update channel
    static updateChannel =  async (req,res) => {
        const channelDomainObj = new channelDomain();
        channelDomainObj.updateChannelById(req,res);
    }

    // to delete channel by id
    static deleteChannel =  async (req,res) => {
        const channelDomainObj = new channelDomain();
        channelDomainObj.deleteChannelById(req,res);
    }

    // to retrieve channel by id
    static retrieveChannel =  async (req,res) => {
        const channelDomainObj = new channelDomain();
        channelDomainObj.retrieveChannelById(req,res);
    }
}

// routes

// get current channel
router.get("/current",verifyToken, channelController.getCurrentUserChannel);

// get records
router.get("/records", channelController.getChannels);

// get specific record
router.get("/:id/details", channelController.getChannelById);

// update records
router.put("/:id/edit",verifyToken, authPage([1, 2]), authChannel([1]), update.fields([
    {
        name: 'Banner', maxCount: 1
    }
]), channelController.updateChannel);

// delete channel
router.put("/:id/delete",verifyToken, authPage([1]), channelController.deleteChannel);

// retrieve channel
router.put("/:id/retrieve",verifyToken, authPage([1]), channelController.retrieveChannel);


// exports controller
module.exports = router;