const joi = require('joi');

// User validation 
let validateUser = (file) => {
    const schema = joi.object({
        UserName: joi.string().min(3).required(),
        Email: joi.string().email().max(255).required(),
        Password: joi.string().max(255).required(),
        Role: joi.number().required()

    });
    return schema.validate(file);
};

// Login Validation
let validateLogin = (file) => {
    const schema = joi.object({
        Email: joi.string().email().max(255).required(),
        Password: joi.string().max(255).required()
    });
    return schema.validate(file);
}

// Channel Validation
let validateChannel = (file) => {
    const schema = joi.object({
        Name: joi.string().min(3).max(30),
        About: joi.string(),

    })
    return schema.validate(file);
}

// Profile validation
let validateProfile = (file) => {
    const schema = joi.object({
        FirstName: joi.string().min(3).max(30),
        LastName: joi.string().min(3).max(30),
        DOB: joi.date(),
        Mobile: joi.number(),
        Country: joi.number()
    });
    return schema.validate(file);
}

// Video Validation
let validateVideo = (file) => {
    const schema = joi.object({
        Title: joi.string().max(255).required(),
        Description: joi.string(),
        Type: joi.number().required(),
    });
    return schema.validate(file);
}

// Video Validation
let validateUpdateVideo = (file) => {
    const schema = joi.object({
        Title: joi.string().max(255),
        Description: joi.string(),
        Type: joi.number(),
    });
    return schema.validate(file);
}

// Rating Validation
let validateRating = (file) => {
    const schema = joi.object({
        LikeStatus: joi.number().required()
    });
    return schema.validate(file);
}

// Subscription Validation
let validateSubscription = (file) =>{
    const schema = joi.object({

    })
}

// Playlist Validation
let validatePlaylist = (file) =>{
    const schema = joi.object({
        Title: joi.string().required().min(1),
        Type: joi.number().required()
    })
    return schema.validate(file);
}

// Playlist Validation
let validatePlaylistUpdate = (file) =>{
    const schema = joi.object({
        Title: joi.string().min(1),
        Type: joi.number()
    })
    return schema.validate(file);
}


let validatePlaylistVideos = (file) => {
    const schema = joi.object({
        Videos: joi.array().required()
    })
    return schema.validate(file);
}
module.exports = {
    validateUser, 
    validateLogin,
    validateProfile,
    validateChannel,
    validateVideo,
    validateRating,
    validatePlaylist,
    validatePlaylistVideos,
    validateUpdateVideo,
    validatePlaylistUpdate
};