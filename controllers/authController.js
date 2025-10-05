const User = require('../models/User');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */

const loginUser = async (req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({success : false , message : 'please provide credentials'});
        }
        const user = await User.findOne({email}).select('+password');

        if(!user || !(await bcrypt.compare(password,user.password))){
            return res.status(400).json({success : false , message : 'incorrect login credentials!'});

        }
        const payload = {
            user : {
                id:user._id,
            }
        };
        const token = jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn : '1h',
        })
        
        res.status(200).json({
            success : true,
            token : token,
        })
        


    }
    catch(err){
        console.error('login error',err);
        res.status(500).json({success : false , message : 'internal server error'});
    }
}
const registerUser = async(req , res)=>{

   try {

    const { name , email , password } = req.body;

    if(!name || !email || !password ){
        return res.status(400).json({success : false , message : 'please provie name ,email , password '});
    }
    
    const existingUser = await User.findOne({email});

    if (existingUser){
        return res.status(400).json({success : false , message : 'user with the same email already exist!'});
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password,salt);

    const newUser = await User.create({
        name, 
        email,
        password : hashedPassword,
    });

    res.status(201).json({
        success : true,
        data : {
        _id : newUser._id,
        name : newUser.name,
        email:newUser.email,

        },

    })


   }
   catch(err){
    console.error ('registration error',err);
    res.status(500).json({success : false , message : 'internal server error'})
   }
}

module.exports = {
    registerUser,
    loginUser,
};