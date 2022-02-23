const express = require('express');
const profileDomain = require('../domains/profile.domain');
const router = express.Router();
const {authPage, authProfile} = require('../authentication/authorization');
const update = require('../utils/Image.update.multer');
const verifyToken = require('../authentication/verify_token');

// class
class profileController{

    // to get current user profile
    static getCurrentUserProfile = async (req,res) => {
        const profileDomainObj = new profileDomain();
        profileDomainObj.getCurrentProfileById(req,res)
    }

    // to get all profiles
    static getProfiles = async (req, res) => {
        const profileDomainObj = new profileDomain();
        profileDomainObj.getAllProfiles(req,res);
    }

    // get profile by id
    static getProfileId = async (req,res) => {
        const profileDomainObj = new profileDomain();
        profileDomainObj.getProfileById(req,res);
    }

    // to update profile
    static updateProfile =  async (req,res) => {
        const profileDomainObj = new profileDomain();
        profileDomainObj.updateProfileById(req,res);
    }

    // to delete profile by id
    static deleteProfile =  async (req,res) => {
        const profileDomainObj = new profileDomain();
        profileDomainObj.deleteProfileById(req,res);
    }

    // to retrieve profile by id
    static retrieveProfile =  async (req,res) => {
        const profileDomainObj = new profileDomain();
        profileDomainObj.retrieveProfileById(req,res);
    }
}

// routes
// get current profile
router.get("/current",verifyToken, profileController.getCurrentUserProfile);

// get records
router.get("/records",authPage([1]), profileController.getProfiles);

// get specific record
router.get("/records/:id",authPage([1, 2]), profileController.getProfileId);

// update records
router.put("/edit/:id", authPage([1, 2]), authProfile([1]), update.fields([
    {
        name: 'ProfileImage', maxCount: 1
    }
]), profileController.updateProfile);

// delete profile
router.put("/delete/:id", authPage([1]), profileController.deleteProfile);

// retrieve profile
router.put("/retrieve/:id", authPage([1]), profileController.retrieveProfile);


// exports controller
module.exports = router;