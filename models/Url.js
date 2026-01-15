import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
    urlCode:{
        type:String,
        required:true,
    },
    longUrl:{
        type:String,
        required:true,
    },
    shortUrl:{
        type:String,
        required:true,
    },
    clicks:{
        type:Number,
        required:true,
        default:0,
    },
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

export default mongoose.model('Url', urlSchema);