//import mongoose
const mongoose = require('mongoose');

//def schema for url model
const urlSchema = new mongoose.Schema({
    //url code will store all unique short code generated for each url
    urlCode:{
        type:String,
        required:true,
    },
    //long url code which will be given by user
    longUrl:{
        type:String,
        required:true,
    },
    //short url generated for the user
    shortUrl:{
        type:String,
        required:true,
    },
    //how many clicks on the url 
    clicks:{
        type:Number,
        required:true,
        default:0,
    },
    //date of the url given
    date:{
        type:Date,
        default:Date.now,
    },
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'User',
        required : false,
    }
    
});

module.exports = mongoose.model('Url',urlSchema);