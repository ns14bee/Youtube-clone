const videoHistoryModel = require('../models/videoHistory.model');
const {validateHistory} = require('../utils/joi.validation');

class videoHistoryDomain{

    getHistoryByChannelID = async (req,res) =>{
        let populate = [
            {
                path: "Video",
                populate: {
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
            }
        ]
        const options = {
            page: req.query.page || 1,
            limit: req.query.limit || 10,
            populate: populate,
            sort: {updatedAt: 'desc'}
        };
        try{
            let cid = req.decoded.cid;
            console.log(cid)
            let videoHistoryData = await videoHistoryModel.paginate({Channel: cid},options);
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

    getHistoryByVideoId = async (req,res) =>{
        try{
            let id = parseInt(req.params.id);
            let cid = parseInt(req.decoded.id);
            let videoHistoryData = await videoHistoryModel.findOne({$and:[{Video: id},{Channel: cid}]})
            if(videoHistoryData){
                res.status(200).send(videoHistoryData);
            }else{
                res.status(404).send("No records");
            };
        }catch(err){
            console.log(err);
            res.status(500).send("Something went wrong");
        }
    }

    addVideoHistory = async(req,res) =>{
        try{
            let data = req.body; 
            let {error} = validateHistory(data);
            if(error){
                res.status(400).json({
                    message: error.details[0].message
                });
            }else{
                data.Video = parseInt(req.params.id);
                data.Channel = parseInt(req.decoded.cid);
                let videoHistoryDataObj = new videoHistoryModel(data);
                let videoHistory = await videoHistoryDataObj.save();
                console.log(videoHistory);
                if(videoHistory){
                    res.status(200).send('Added to history');
                }else{
                    
                    res.status(400).send('Something went wrong');
                }
            }
        }catch(err){
            if(err.code == 11000){
                res.status(400).send('Duplicate Error key');
            }else{
                res.status(400).send('Something went wrong');
            }
        }
    }

    editVideoHistory = async (req,res) =>{
        try{
            let data = req.body;
            let {error} = validateHistory(data);
            console.log('history',data);
            if(error){
                res.status(400).json({
                    message: error.details[0].message
                });
            }else{
                let id = parseInt(req.params.id);
                let cid = parseInt(req.decoded.cid);
                console.log(cid);
                let exists = await videoHistoryModel.findOne({$and:[{Video: id},{Channel: cid}]});
                console.log(exists);
                if(exists){
                    let videoHistoryData = await videoHistoryModel.findOneAndUpdate({_id: exists._id},{
                        $set: data,
                    },
                    { new: true });
                    console.log(videoHistoryData);
                    if(videoHistoryData){
                        res.status(200).send('Updated Successfully');
                    }else{
                        res.status(500).send(videoHistoryData);
                    }
                }else{
                    this.addVideoHistory(req,res);
                }
            }    
        }catch(err){
            console.log(err);
            res.status(500).send("Something went wrong");
        }
    }
} 

module.exports = videoHistoryDomain;