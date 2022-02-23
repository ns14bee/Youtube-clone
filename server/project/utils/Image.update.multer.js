const multer =  require('multer');
const path  =  require('path');

const fileTypeModel = require('../models/fileTypes.model');

const fileFilter = async (req, file, cb) => {
    if (!file) {
        return;
    }
    let ext = path.extname(file.originalname);
    let newExt = ext.substring(1);
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

module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: fileFilter
});
