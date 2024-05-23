const mongoose = require('mongoose');
require('dotenv').config();

// const mongo_uri = 
const mongo_uri = process.env.MONGO_URI;

mongoose.connect(mongo_uri)
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log("error");
});
const userSchema = mongoose.Schema({
    name:String,
    email:String,
    phone:Number,
    destination:String,
    departure_date:Date,
    return_date:Date,
    num_travelers:Number,
    special_requests:String
});

const contactSchema = mongoose.Schema({
    name:String,
    email:String,
    phone:Number,
    message:String
});

const personSchema = mongoose.Schema({
    email:String,
    password:String
});

const User  = mongoose.model('User',userSchema);
const Contact = mongoose.model('Contact',contactSchema);
const Person = mongoose.model('Persons',personSchema);
module.exports = {User,Contact,Person};
