const multer =  require('multer');
const path  =  require('path');

const fileTypeModel = require('../models/fileTypes.model');

const fileFilter = async (req, file, cb) => {
    if (!file) {
        return;
    }
    let ext = path.extname(file.originalname);
    let newExt = ext.substring(1);
    
    if (file.fieldname === "Video"){
        //video
        let fileData = await fileTypeModel.findOne({$and : [
            {FileType:{ $regex : newExt, $options: 'i'}}, 
            {File:1}
        ]});  
        if (!fileData) {
            cb(new Error("File type is not supported"), false);
            return;
        }else{
            cb(null, true);
        }
    }else{
        //image
        let fileData = await fileTypeModel.findOne({$and : [
            {FileType:{ $regex : newExt, $options: 'i'}}, 
            {File:2}
        ]});  
        if (!fileData) {
            cb(new Error("File type is not supported"), false);
            return;
        }else{
            cb(null, true);
        }
    }
}

// const fileLimit =  async (req, file, cb) => {
//     if (file.fieldname === "Video"){
//         return 1024*100
//     }else{
//         return 1024*10
//     }
// }
 // limits:{
    //     fileSize: fileLimit
    // },
module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: fileFilter
});
