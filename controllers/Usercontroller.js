const User=require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


//register
exports.register = async (req, res) => {
    try{
        const {name, email, password}=req.body;

        const existing = await User.findOne({email})
        if(existing){
            return res.status(400).json({message: 'User already exists'});
        }
        const hashed =  await bcrypt.hash(password, 10)

        const user =await User.create({
            name,
            email,
            password:hashed
        });
        res.status(201).json({message: 'user created successfully'});
    }catch(error){
        res.status(500).json({error: error.message});

    }
    };

    //login
    exports.login = async (req, res)=>{
        try{
            const{email, password}= req.body;
            const user = await User.findOne({email})
            if(!user){
                return res.status(400).json({message: 'user not found'});
            }
            const ismatch = await bcrypt.compare(password, user.password);
            if(!ismatch){
                return res.status(400).json({message: 'invalid credentials'});
            }
            const token= await jwt.sign(
                {id:user._id},
                process.env.JWT_SECRET,
                {expiresIn: '1d'}
            );

            res.json(token);
            
        } catch (error){
            res.status(500).json({error: error.message});

        }
    };
    //userprofile
    exports.profile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
