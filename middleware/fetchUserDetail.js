const jwt = require('jsonwebtoken');
const path= require('path')
require('dotenv').config();
const {Person} = require('../db/User');

const fetchUserDetails = async (req,res,next) =>{
    const auth  = req.header('auth-token');
    if(auth!=null){
        // const data = jwt.verify(auth,process.env.JWT_SECRET);
        // const  userdata =await Person.findOne({_id:data.id});
        // console.log(userData);
        // return userData;
        return auth;
    }
    else{
       return res.sendFile(path.join(__dirname,'..','public','login.html'));
    }
    next();
}

module.exports = fetchUserDetails;