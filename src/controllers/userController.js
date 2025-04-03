const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../database/userModel")
const asyncHandler = require("express-async-handler")

exports.user_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: user list")
});

exports.user_create = asyncHandler(async (req, res, next) => {
    if(req.body.username && req.body.email && req.body.password){
        let user = await User.findUserByEmail({email: req.body.email})
        
        if (user){
            return res.status(400).send("User already exists!")
        }
        
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = {
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        }
        console.log(newUser)
        try{
            await User.createNewUser(newUser)
            return res.status(201).json({message: 'User registered successfully'})
        } catch(err){
            return res.status(500).json({ error: 'Internal server error' })
        }

    } else{
        return res.status(404).send("Must supply username, email, & password")
    }
});

exports.user_login = asyncHandler(async (req, res, next) => {
    try{
        let user = await User.findUserByEmail({email: req.body.email})
        
        if (!user){
            return res.status(401).send("Invalid credentials")
        }

        const passwordMatch = await bcrypt.compare(req.body.password, user.password)

        if (!passwordMatch){
            return res.status(401).send("Invalid credentials")
        }   

        // TODO: replace with env secret, add expiry
        const token = jwt.sign({ id: user.id, role: user.role }, 'secret');

        return res.status(200).json({token: token})
    } catch (err){
        return res.status(500).json({error : 'Internal server error'})
    }
});