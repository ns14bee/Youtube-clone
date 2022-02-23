const jwt = require('jsonwebtoken');
let verifyToken = (req,res) =>{
    var token = req.headers['x-access-token']; 
    jwt.verify(token, global.config.secretKey,{
        algorithm: global.config.algorithm
    }, (err,decode) => {
        if(err){
            let errorData = {
                message: err.message,
                expiredAt: err.expiredAt
            };
            console.log(errorData);
            // return res.status(401).json({
            //      message: 'Unauthorized Access'
            // });
        }else{
            req.decoded = decode;
        }
    }
)};
module.exports = verifyToken; 