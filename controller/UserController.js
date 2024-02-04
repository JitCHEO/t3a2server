const express = require("express");

const {User} = require('../models/UserModel');
const {comparePassword, generateJwt} = require('../utils/userAuthFunctions');
const { Collection } = require("mongoose");

const router = express.Router();


// GET method
router.get("/", async (request, response) =>{
return null
})

// POST
router.post("/signup", async (request, response) =>{
    return null
})

router.post("/login", async (request, response) => {
    try {
        const check = await Collection.findOne({email: request.body.email})
        if (!check) {
            response.send("email not found")
        }  
    } catch(e) {
        console.warn(e)
    }
})
