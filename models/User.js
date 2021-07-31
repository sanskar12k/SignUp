const mongoose = require('mongoose');
const Schema =  mongoose.Schema; //Data structuring 
const bcrypt = require('bcryptjs'); //Hashing our password
const dotenv = require('dotenv'); //to hide our password for db and other secret code from source code
dotenv.config({path: './config.env'});


const userSchema = new Schema({

    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    
    date: {
        type: Date,
        default: Date.now()
    }

})

//Hashing our password    
userSchema.pre('save' , async function(next) {  //Calling this function before saving our data to db
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
 });
 
//Collection creation
const  User = mongoose.model('users' ,userSchema);

module.exports = User;