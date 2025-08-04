//importing mongoose library
const mongoose = require('mongoose');

//establishing connection with mongodb
 const connectDB = async() =>{
    try{
        //attempt to connect with mongoDB cluster

        const conn = await mongoose.connect(process.env.MONGO_URI);

        //IF connection successful , confirmation message will be sent to console
        console.log(`mongoDB connected : ${conn.connection.host}`);
    }
    catch(error){
       //if error occured while connecting to mongoDB , catch will be executed
        console.error(`Error connecting to mongoDB : ${error.message}`);
        process.exit(1);
    }
 };

 //exporting connnectDB function so it can be used in other parts of project
 module.exports = connectDB;