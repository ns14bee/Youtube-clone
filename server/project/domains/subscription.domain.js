const channelModel = require('../models/channel.model');
const subscriptionModel = require('../models/subscription.model');
const jwt = require('jsonwebtoken');


class subscriptionDomain{

    // get all subscription
    getAllSubscription = async (req,res) => {
        try{
            let subscriptionData = await subscriptionModel.find();
            if(subscriptionData.length>0){
                res.status(200).send(subscriptionData);
            }else{
                res.status(400).send("No records");
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }

     // get subscription of current user
    getSubscriptionOfCurrent  = async (req,res) => {
        try{
            let id  = req.decoded.id;
            let subscriptionData = await subscriptionModel.find({$and:[{Subscriber: id},{Active: true}]}).populate({
                path: "Creator",
                model: "Channel",
                select: "User Name",
                populate: {
                    path: "User",
                    model: "Profile",
                    select: "ProfileImage",
                    as:"Profile",
                    populate: {
                        path: "User",
                        model: "UserMaster",
                        select: "UserName"
                    }
                }});
            if(subscriptionData.length>0){
                res.status(200).send(subscriptionData);
            }else{
                res.status(400).send("No records");
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    } 

     // get subscription by subscriber id
    getSubscriptionBySubscriber  = async (req,res) => {
        try{
            let id  = req.params.id;
            let subscriptionData = await subscriptionModel.find({Subscriber: id});
            if(subscriptionData.length>0){
                res.status(200).send(subscriptionData);
            }else{
                res.status(400).send("No records");
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    } 

    // get subscription by creator id
    getSubscriptionByCreator  = async (req,res) => {
        try{
            let id  = req.params.id;
            let subscriptionData = await subscriptionModel.find({Creator: id});
            if(subscriptionData.length>0){
                res.status(200).send(subscriptionData);
            }else{
                res.status(400).send("No records");
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    } 

     // get total number of subscriber (subscriber count)
    getSubCountByCreator = async (req,res) => {
        try{
            let id  = req.params.id;
            let subscriptionData = await subscriptionModel.find({$and: [{Creator: id},{Active: true}]}).count();
            res.status(200).send({'Total':subscriptionData});
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }
    checkSubscription = async (req,res) => {
        try{
            let id = parseInt(req.params.id);
            let cid = parseInt(req.decoded.cid);
            let subscriptionData = await subscriptionModel.findOne({$and:[{Creator: id},{Subscriber: cid}]});
            if(subscriptionData){
                res.status(200).send(subscriptionData);
            }else{
                res.status(400).send("No records");
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }

    // get total number of subscriber (subscription count)
    getSubCountBySubscriber = async (req,res) => {
        try{
            let id  = req.params.id;
            let subscriptionData = await subscriptionModel.find({$and: [{Subscriber: id},{Active: true}]}).count();
            res.status(200).send({'Total':subscriptionData});
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }

    // create subscription
    createSubscription = async (req,res) => {
        try{
            let subId = parseInt(req.decoded.cid);
            let creatorId= parseInt(req.params.id);
            let creator = await channelModel.findOne({_id: creatorId});
            let exists = await subscriptionModel.findOne({$and: [{Subscriber:subId},{Creator:creatorId}]});
            if(subId==creatorId){
                res.status(400).json({
                    message: 'Can not subscribe to your own channel'
                });
            }else if(!creator){
                res.status(400).json({
                    message: 'Channel Doesn\'t not exist'
                });
            }else{
                if(!exists){
                    let data = {
                        Subscriber : subId,
                        Creator : creatorId
                    };
                    let subscriptionData = new subscriptionModel(data);
                    let subscription = await subscriptionData.save();
                    res.status(200).send(subscription);
                }else{
                    res.status(400).json({
                    message: 'Already Subscribed'
                });
                }
            }
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }

    // update subscription
    updateSubscription= async (req,res) => {
        try{
            let subId = parseInt(req.decoded.cid);
            let creatorId= parseInt(req.params.id);
            console.log(subId);
            let exists = await subscriptionModel.findOne({$and: [{Subscriber:subId},{Creator:creatorId}]});
            if(!exists){
                this.createSubscription(req,res);
            }else{
                let oldData = await subscriptionModel.findOne({$and: [{Subscriber: subId}, {Creator: creatorId}]});
                let data = {
                    Active: !oldData.Active
                }
                let subscriptionData = await subscriptionModel.findOneAndUpdate({$and: [{Subscriber: subId}, {Creator: creatorId}]},
                    {
                        $set: data,
                    },
                    { new: true }
                );
                if(!subscriptionData){
                    res.status(401).send("Some error occurred. Contact Admin!")
                }else{
                    res.status(200).send(subscriptionData);
                }
            }
        }catch(err){
            console.log(err)
            res.status(400).send("Something went wrong");
        }
    }
}

// exports functions
module.exports = subscriptionDomain;
