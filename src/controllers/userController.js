const User = require("../database/userModel")
const asyncHandler = require("express-async-handler")

exports.user_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: user list")
});

exports.user_create = asyncHandler(async (req, res, next) => {
    // res.send("NOT IMPLEMENTED: user create")
    if(req.body.username && req.body.email && req.body.password){
        let user = await User.findUserByEmail({email: req.body.email})
        
        if (user){
            res.status(400).send("User already exists!")
        }
    
        // TODO hash password before
        const newUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
        try{
            await User.createNewUser(newUser)
            res.status(201).json({message: 'User registered successfully'})
        } catch(err){
            res.status(500).json({ error: 'Internal server error' })
        }

    }
});