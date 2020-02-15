const jwt= require('jsonwebtoken');
const config= require('../config')
module.exports = (req, res, next) => {
    try{
        const token= req.header('Authorization');
        const verifyToken=jwt.verify(token, config.secret);
        req.userData=verifyToken;
        next();
    }

    catch(e){
        return res.status(401).json({
            message:'Unauthorized'
        })
    }

}