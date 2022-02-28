const userModel = require("../models/users.model");
const profileModel = require("../models/profile.model");
const channelModel = require("../models/channel.model");

 //get role
    getRole = async (id) =>{
        try{
            let userData = await userModel.findById(id);
            return userData.Role;
        }catch(err){
            console.log(err);
        }
    }


const authPage = (permissions) =>{
    return async (req,res,next) => {
        let id = req.decoded.id;
        let userRole = await getRole(id);
        if(permissions.includes(userRole)){
            next();
        }
        else{
            res.status(401).json("authPage You don't have permission!");
        }
    
    }
}

const authPermission = (permissions) => {
    return async (req,res,next) => {
        const userId = parseInt(req.decoded.id);
        const id = parseInt(req.params.id);
        let user = await userModel.findOne({_id : id});
        if(user){
            if(userId == id){
                next();
            }
            else{
                let userRole = await getRole(userId);
                if(permissions.includes(userRole)){
                    let role = await getRole(id);
                    if(userRole != role){
                        next();
                    }
                    else{
                        res.status(401).json("authPermission You don't have permission!");
                    }
                }else{
                    res.status(401).json("authPermission You don't have permission!");
                }
            }
        }else{
            res.status(400).json("User doesn't exist");
        }
    }
}

const authProfile = (permissions) => {
    return async (req,res,next) => {
        const userId = parseInt(req.decoded.id);
        const profile = await profileModel.findOne({_id: req.params.id});
        if(profile){
            if(userId == profile.User){
                next();
            }
            else{
                let userRole = await getRole(userId);
                if(permissions.includes(userRole)){
                    let role = await getRole(profile.User);
                    if(userRole != role){
                        next();
                    }
                    else{
                        res.status(401).json("authPermission You don't have permission!");
                    }
                }else{
                    res.status(401).json("authPermission You don't have permission!");
                }
            }
        }else{
            res.status(401).json("authPermission User Not Found!");
        }       
    }
}

const authChannel = (permissions) => {
    return async (req,res,next) => {
        const userId = parseInt(req.decoded.id);
        const channel = await channelModel.findOne({_id: parseInt(req.params.id) });
        if(channel){
            if(userId == channel.User){
                next();
            }
            else{
                let userRole = await getRole(userId);
                if(permissions.includes(userRole)){
                    let role = await getRole(channel.User);
                    if(userRole != role){
                        next();
                    }
                    else{
                        res.status(401).json("authPermission You don't have permission!");
                    }
                }else{
                    res.status(401).json("authPermission You don't have permission!");
                }
            }
        }else{
            res.status(401).json("authPermission User Not Found!");
        }     
    }
}

module.exports = {
    authPage,
    authPermission,
    authProfile,
    authChannel
}