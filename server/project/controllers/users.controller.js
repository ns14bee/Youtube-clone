const express = require('express');
const usersDomain = require('../domains/users.domain');
const profile = require('./profile.controller');
const router = express.Router();
const {authPage, authPermission} = require('../authentication/authorization');
const verifyToken = require('../authentication/verify_token');


// class
class usersController{

    // home
    static home = async (req,res) => {
        res.send("Home")
    }

    // login
    static login = async (req, res) => {
        const usersDomainObj = new usersDomain();
        usersDomainObj.authLogin(req,res);
    }

    // register
    static register = async (req,res) => {
        const usersDomainObj = new usersDomain();
        usersDomainObj.registerUser(req,res);
    }

    // to get current user

    static getCurrent = async (req,res) => {
        const usersDomainObj = new usersDomain();
        usersDomainObj.getCurrentUser(req,res);
    }

    // to get users
    static getUsers =  async (req,res) => {
        const usersDomainObj = new usersDomain();
        usersDomainObj.getAllUsers(req,res);
    }

    // to get user by id
    static getUsersByID =  async (req,res) => {
        const usersDomainObj = new usersDomain();
        usersDomainObj.getUserById(req,res);
    }

    // to deactivate user by id
    static deactivateByID =  async (req,res) => {
        const usersDomainObj = new usersDomain();
        usersDomainObj.deactivateById(req,res);
    }

    // to reactivate by id
    static reactivateByID =  async (req,res) => {
        const usersDomainObj = new usersDomain();
        usersDomainObj.reactivateById(req,res);
    }
}

// routes

// home
router.get("",usersController.home);

// login
router.post("/login",usersController.login);

// register
router.post("/register",usersController.register);

// get user by id
router.get("/records/:id",  usersController.getUsersByID);

// get current users
router.get("/current",verifyToken, usersController.getCurrent);

// all records
router.get("/records", verifyToken, authPage([1]), usersController.getUsers);

// deactivate and reactivate user
router.put("/deactivate/:id", verifyToken, authPage([1]), authPermission([1]), usersController.deactivateByID);

router.put("/reactivate/:id", verifyToken, authPage([1]), authPermission([1]), usersController.reactivateByID);


router.use("/profile/", verifyToken, profile);

// exports controller
module.exports = router;