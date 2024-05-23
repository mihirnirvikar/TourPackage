const {Person} = require('../db/User');
const loginMiddleware = (req,res,next)=>{
  const {email,password} = req.body;
  const user = Person.find({"email":email});
  if(!user){
    return res.status(404).json("Invalid Credentials");
  }
  if(user.password!=password){
    return res.status(404).json("Invalid Credentials");
  }
  
  next();
}

module.exports = loginMiddleware;  
