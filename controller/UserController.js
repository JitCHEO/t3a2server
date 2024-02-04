const express = require("express");
const bcrypt = require('bcrypt.js')
const {User} = require('../models/UserModel');
const {comparePassword, generateJwt} = require('../utils/userAuthFunctions');

const router = express.Router();


// GET method
router.get("/", async (request, response) =>{
return null
})

// POST
router.post("/create-new-user", async (request, response) =>{

    const hashedPassword = await bcrypt.hash(request.body.password, 10)

    let newUser = await User.create({
        fname: request.body.fname,
        lname: request.body.lname,
        email: request.body.email,
        password: hashedPassword
    }).catch(error => {return error})
    
    response.status(201).json({
        newUser,
        message: "Account created successfully"
    })
})

router.post("/login", async (request, response) => {
    try {
        const check = await User.findOne({email: request.body.email})
        if (!check) {
            response.send("email not found")
        }
        const passwordMatch = await bcrypt.compare(request.body.password, check.password) 
        
        if (!passwordMatch) {
            return response.status(401).json({ error: "Invalid password" });
        }

        response.status(200).json({ message: "Login successful" });

    } catch(e) {
        console.error(e)
    }
})


