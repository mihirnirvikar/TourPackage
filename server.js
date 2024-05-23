const express = require("express");
const mongoose = require("mongoose");
const { User, Contact, Person } = require("./db/User");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const jwt = require("jsonwebtoken");
const validator = require("express-validator");
const nodemailer = require("nodemailer");

const receiveEmail = require("./middleware/receiveEmail");
const fetchUserDetail = require("./middleware/fetchUserDetail");
require("dotenv").config();

const port = 3000;
app.use(express.static("public"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// app.get('/',fetchUserDetail,(req,res)=>{
//     if(auth==null){
//       res.sendfile('index.html');
//     }
//     else{
//       res.sendFile('userPage.html');
//     }
// })
app.get("/booking", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "booking.html"));
});
app.post("/submit", async (req, res) => {
  const {
    name,
    email,
    phone,
    destination,
    departure_date,
    return_date,
    num_travelers,
    special_requests,
  } = req.body; // Assuming form fields are 'fullname' and 'email'

  if (return_date <= departure_date ) {
    return res.status(400).json("error");
  }
  if(phone.length<10 ||phone.length>10){
    return res.status(400).json("error");
  }

  const user = new User({
    name,
    email,
    phone,
    destination,
    departure_date,
    return_date,
    num_travelers,
    special_requests,
  });

  console.log(user);
  user.save();

  res.status(200).sendFile(path.join(__dirname, "public", "success.html"));
});

app.post("/sendEmail", receiveEmail, async (req, res) => {
  //to the sender
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const data = `
  Dear ${req.body.name},
  Thank you for reaching out to us via our contact form. We greatly appreciate you taking the time to connect with us.
  Our team is dedicated to providing excellent service and we have received your message. We will review your inquiry thoroughly and get back to you as soon as possible. Our goal is to ensure that we address your questions or concerns promptly and effectively.
  If you have any additional information to provide or if there's anything else we can assist you with in the meantime, please don't hesitate to let us know.
  Once again, thank you for choosing us. We look forward to assisting you further.
  Best regards,
  
  Mihir Nirvikar
  CEO
  TOUR`;
    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: req.body.email,
      subject: "Thank You for Reaching Out!",
      text: data,
    });
    console.log(info);
    const { name, email, phone, message } = req.body;
    const contact = new Contact({
      name,
      email,
      phone,
      message,
    });
    contact.save();
    res.redirect("/");
  } catch (e) {
    console.log(e);
  }
});

// app.post('/signup',async (req,res)=>{

//   const {name,email,password,confirmPassword} = req.body;
//   // const person = new Person();
//   const p = await Person.findOne({ "email":email });
//   if(p){
//     return res.status(400).json("Already Exists");
//   }
//   const person = new Person({name,email,password});
//   person.save();
//   res.status(200).json("Success");
// });
// app.get('/user',(req,res)=>{
//   res.sendFile(path.join(__dirname, 'public', 'userPage.html'))
// })
// app.post('/login',async (req,res)=>{
//   const {email,password} = req.body;
//   console.log(email);
//   const user = await Person.findOne({"email":email});
//   console.log(user)
//   if(!user){
//     return res.status(404).json("Invalid Credentials");
//   }
//   if(user.password!=password){
//     return res.status(404).json("Invalid Credentials");
//   }

//   const data = {
//       id:user._id,
//       email:user.email,
//       password:user.password
//    }
//   const authtoken = jwt.sign(data,process.env.JWT_SECRET);
//   res.json(authtoken);

// });

app.listen(port, () => {
  console.log(`Server is listening on port http://127.0.0.1:${port}`);
});
