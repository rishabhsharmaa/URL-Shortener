//import .env
require('dotenv').config();

//importing connectdb
const connectDB = require('./config/db.js');

//importing express package 
const express = require('express');

//calling the function to connect with database
connectDB();

//initializing an instance of the express server app 
//which will be used to configure this server 'app'
const app = express();

//allowing the use of express.json
app.use(express.json());

//to check whether the server is working correctly
//when a get request is made to the root , we'll send a response
app.get('/',(req,res)=>{
    res.send('API is running with nodemon!');
});

//import URL routes
// Any request starting with /api will be handled by urlRoutes.
const urlRoutes = require('./routes/urls');

//use the urlRoutes function for any request that starts with /
app.use('/api',urlRoutes);


// Any other GET request will be potentially handled by this router.
const indexRoutes = require('./routes/index');
app.use('/',indexRoutes);

//def port where server will run on 
const PORT = process.env.PORT || 5000;

//start server and make it listen for connections on specific port 
//app.listen() function takes the port number and a callback function as args
//callback function gets executed once the server successfully starts

app.listen(PORT,()=>console.log(`server is alive and running on port ${PORT}`));
