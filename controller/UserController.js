const express = require("express");

const {User} = require('../models/UserModel');
const {comparePassword, generateJwt} = require('../utils/userAuthFunctions');

const router = express.Router();


// GET method
router.get("/", async (request, response) =>{
return null
})

// POST
router.post("/signup", async (request, response) =>{
    return null
})
