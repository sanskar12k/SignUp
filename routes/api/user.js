const express = require('express');
const router = express.Router();

//Calling user schema
const User = require('../../models/User');



// @route : /api/users/test
// @desc : To check
router.get('/test' , (req,res) =>{
    res.json({msg: 'users Works'})
   }
);

// @route : /users/register
// @desc : To register new users
router.post('/register' , async (req,res) => {
    const {fname,lname, email, phone, password, cpassword} = req.body;
    
    if ( !fname|| !lname ||!email || !phone || !password || !cpassword ){
       res.status(422).send({error: 'Please fill all the columns'});
        }
    try{
        const userExist = await  User.findOne({email:email});
       //Checking if user exist
        if(userExist) {
           res.status(422).json({error: "User already existed"});
          
        }
      //Comparing password and cpassword
        else if(password != cpassword){
           res.status(422).json({error:"Password doesn't match"});
           return;}
        
        else{
          const user = new User({fname, lname,  email,  phone, password, cpassword});
         
          //Saves data to db
          await user.save();
 
          res.status(201).json({message: "Registartion Successful!!"});
          return;
       } 
        }
       
    catch(err) {
        console.log(err);
    }
  })

  module.exports = router;