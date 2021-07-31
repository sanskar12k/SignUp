const express = require('express');
const mongoose = require('mongoose');

const app = express();
const user = require('./routes/api/user');

require('./db/conn');

//Converting data to string
app.use(express.json());

const port = process.env.PORT || 8000;
//Linking router file
app.use('/users' , user);

if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
}
//Listening to the port
app.listen(port, () =>{
    console.log(`Server on ${port}`);
})