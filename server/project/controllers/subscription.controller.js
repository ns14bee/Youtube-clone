const express = require('express');
const  subscriptionDomain = require('../domains/subscription.domain');
const router = express.Router();
const {authPage, authPermission} = require('../authentication/authorization');
const verifyToken = require('../authentication/verify_token');

// class
class subscriptionController{

    // to get all subscription
    static getAllSubscription = async (req, res) => {
        const subscriptionDomainObj = new subscriptionDomain();
        subscriptionDomainObj.getAllSubscription(req,res);
    }

    // get subscription by current user id
    static getSubscriptionByCurrent = async (req,res) => {
        const subscriptionDomainObj = new subscriptionDomain();
        subscriptionDomainObj.getSubscriptionOfCurrent(req,res);
    }

    // get subscription by Subscriber  id
    static getSubscriptionBySubscriber = async (req,res) => {
        const subscriptionDomainObj = new subscriptionDomain();
        subscriptionDomainObj.getSubscriptionBySubscriber(req,res);
    }

    // get subscription by creator id
    static getSubscriptionByCreator = async (req,res) => {
        const subscriptionDomainObj = new subscriptionDomain();
        subscriptionDomainObj.getSubscriptionByCreator(req,res);
    }

    // check subscription 
    static checkSubscription = async (req,res) => {
        const subscriptionDomainObj = new subscriptionDomain();
        subscriptionDomainObj.checkSubscription(req,res);
    }

    // get total sub by creator
    static getSubCountByCreator = async (req,res) => {
        const subscriptionDomainObj = new subscriptionDomain();
        subscriptionDomainObj.getSubCountByCreator(req,res);
    }

    // get total sub by subscriber
    static getSubCountBySubscriber = async (req,res) => {
        const subscriptionDomainObj = new subscriptionDomain();
        subscriptionDomainObj.getSubCountBySubscriber(req,res);
    }

    // create subscription
    static createSubscription = async (req,res) => {
        const subscriptionDomainObj = new subscriptionDomain();
        subscriptionDomainObj.createSubscription(req,res);
    }

    // to update subscription
    static updateSubscription =  async (req,res) => {
        const subscriptionDomainObj = new subscriptionDomain();
        subscriptionDomainObj.updateSubscription(req,res);
    }

}

// routes

// get subscription
router.get("/records", verifyToken, authPage([1]), subscriptionController.getAllSubscription);

// get subscription by current user  id
router.get("/subscriber/current/", verifyToken, subscriptionController.getSubscriptionByCurrent);

// get subscription by Subscriber  id
router.get("/subscriber/:id/", subscriptionController.getSubscriptionBySubscriber);

// get subscription by user
router.get("/creator/:id/", subscriptionController.getSubscriptionByCreator);

// get subscription by user
router.get("/check/:id/", verifyToken, subscriptionController.checkSubscription);

// get count of subscription by subscriber
router.get("/subscriber/:id/count", subscriptionController.getSubCountBySubscriber);

// get count of subscription by creator
router.get("/creator/:id/count", subscriptionController.getSubCountByCreator);

// create Subscription
router.post("/channel/:id/create", verifyToken, authPage([1,2]), subscriptionController.createSubscription);

// update subscription
router.put("/channel/:id/edit", verifyToken, authPage([1, 2]), subscriptionController.updateSubscription);

// exports controller
module.exports = router;