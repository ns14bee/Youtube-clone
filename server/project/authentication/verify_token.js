const jwt = require('jsonwebtoken');
let verifyToken = (req,res,next) =>{
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
            return res.status(401).json({
                 message: 'Unauthorized Access'
            });
        }
        req.decoded = decode;
        next();
    }
)};
module.exports = verifyToken; 