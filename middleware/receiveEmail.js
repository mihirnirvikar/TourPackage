const nodemailer = require('nodemailer')
const receiveEmail = async (req,res,next)=>{
    try{
    const transporter2 = nodemailer.createTransport({
      service:'gmail',
      port: 587,
      secure: false, 
      auth: {
        user: process.env.EMAIL2,
        pass: process.env.PASSWORD2,
      },
    })
    const data =`
        EMAIL FROM TOUR:
        NAME:${req.body.name}\n
        EMAIL:${req.body.email}\n
        PHONE:${req.body.phone}\n
        MESSAGE:${req.body.message}`;
    const senderInfo = await transporter2.sendMail({
      from: process.env.EMAIL2,
      to:process.env.EMAIL,
      text:data,
    });
    console.log(senderInfo)
    next();
  }
  catch(e){
    console.log(e);
  // res.status(404).json({"Error"});
  }
  }

  module.exports = receiveEmail;