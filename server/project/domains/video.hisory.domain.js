const videoHistoryModel = require('../models/videoHistory.model');

class videoHistoryClass{

    getVideoHistoryByChannelID = async (req,res) =>{
        let populate = [
            {
                path: "Video",
            },
            {
                path: "Channel",
                select: "User Name",
                populate: {
                    path: "User",
                    model: "Profile",
                    select: "ProfileImage",
                    populate: {
                        path: "User",
                        model: "UserMaster",
                        select: "UserName"
                    }
                }
            }
        ]
        const options = {
            page: req.query.page || 1,
            limit: req.query.limit || 10,
            populate: populate
        };
        try{
            let videoHistoryData = await  videoHistoryModel.paginate({$and:[{Type:1},{Active: true}]},options);
            if(videoHistoryData.docs.length < 1){
                res.status(404).send("No records");
            }else{
                res.status(200).send(videoHistoryData);
            };
        }catch(err){
            console.log(err);
            res.status(500).send("Something went wrong");
        }
    }
}