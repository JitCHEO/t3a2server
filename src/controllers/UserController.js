const express = require("express");

const {User} = require('../models/UserModel');


const router = express.Router();


// GET method
router.get("/", async (request, response) =>{
return null
})

// POST
router.post("/signup", async (request, response) =>{
    return null
})

module.exports = router
