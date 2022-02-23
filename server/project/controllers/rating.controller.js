const express = require('express');
const  ratingDomain = require('../domains/rating.domain');
const router = express.Router();
const {authPage, authChannel} = require('../authentication/authorization');
const verifyToken = require('../authentication/verify_token');

// class
class ratingController{

    // to get all ratings
    static getRatings = async (req, res) => {
        const ratingDomainObj = new ratingDomain();
        ratingDomainObj.getAllRatings(req,res);
    }

    // get Ratings by video id
    static getRatingVideoId = async (req,res) => {
        const ratingDomainObj = new ratingDomain();
        ratingDomainObj.getRatingsByVideoId(req,res);
    }

    // get Ratings by User id
    static getRatingUserId = async (req,res) => {
        const ratingDomainObj = new ratingDomain();
        ratingDomainObj.getRatingsByUserId(req,res);
    }

    // get Likes Ratings by User id
    static getLikedRatingUserId = async (req,res) => {
        const ratingDomainObj = new ratingDomain();
        ratingDomainObj.getLikedRatingsByUserId(req,res);
    }

    // get Dislikes Ratings by User id
    static getDislikeRatingUserId = async (req,res) => {
        const ratingDomainObj = new ratingDomain();
        ratingDomainObj.getDislikedRatingsByUserId(req,res);
    }

    // get Ratings by id
    static getRatingByVideoId = async (req,res) => {
        const ratingDomainObj = new ratingDomain();
        ratingDomainObj.getRatingById(req,res);
    }

    // get Ratings by id
    static getRatingByIdAndChannel = async (req,res) => {
        const ratingDomainObj = new ratingDomain();
        ratingDomainObj.getRatingByIdAndChannel(req,res);
    }

    // get total likes
    static getLikes = async (req,res) => {
        const ratingDomainObj = new ratingDomain();
        ratingDomainObj.getLikesById(req,res);
    }

    // get total dislikes
    static getDislikes = async (req,res) => {
        const ratingDomainObj = new ratingDomain();
        ratingDomainObj.getDislikeById(req,res);
    }

    // create rating
    static createRatings = async (req,res) => {
        const ratingDomainObj = new ratingDomain();
        ratingDomainObj.createRating(req,res);
    }

    // to update ratings
    static updateRatings =  async (req,res) => {
        const ratingDomainObj = new ratingDomain();
        ratingDomainObj.updateRatingById(req,res);
    }

    // to delete rating 
    static deleteRating =  async (req,res) => {
        const ratingDomainObj = new ratingDomain();
        ratingDomainObj.deleteNeutralRating(req,res);
    }
}

// routes

// get rating
router.get("/records", verifyToken, authPage([1]), ratingController.getRatings);

// get rating by video
router.get("/video/:id/",  ratingController.getRatingByVideoId);

// get rating by channel
router.get("/channel/:id/", verifyToken, authPage([1,2]), authChannel([1]), ratingController.getRatingUserId);

// get rating by channel
router.get("/channel/:id/like", verifyToken, authPage([1,2]), authChannel([1]), ratingController.getLikedRatingUserId);

// get rating by channel
router.get("/channel/:id/dislike", verifyToken, authPage([1,2]), authChannel([1]), ratingController.getDislikeRatingUserId);

/// get rating
router.get("/video/:id/rating", ratingController.getRatingVideoId);

/// get rating
router.get("/video/:id/current", verifyToken, ratingController.getRatingByIdAndChannel);

// get total likes
router.get("/video/:id/likes", ratingController.getLikes);

// get total dislikes
router.get("/video/:id/dislikes", ratingController.getDislikes);

// create rating
router.post("/video/:id/create", verifyToken, authPage([1,2]), ratingController.createRatings);

// update rating
router.put("/video/:id/edit", verifyToken, ratingController.updateRatings);

// delete rating
router.delete("/delete", verifyToken, authPage([1]), ratingController.deleteRating);


// exports controller
module.exports = router;