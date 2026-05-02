const jwt = require('jsonwebtoken');

const auth = (req, res, next)=>{
    const authHeader = req.header('Authorization');
    if(!authHeader){
        return res.status(401).json({message: 'token is not found'});
    }
    
    // Extract token from "Bearer <token>" format
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
    
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    }catch(err){
        return res.status(401).json({message: 'invalid token'});
    }
};
module.exports = auth;