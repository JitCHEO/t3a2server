const express = require("express");

const {User} = require('../models/UserModel');


const router = express.Router();


// GET method
router.get("/", async (request, response) =>{
    return null
})

// POST
router.post("/signup", async (request, response) =>{
    try {
        // Extract username and password from request body
        const { username, password } = request.body;

        // Create a new user instance
        const newUser = new User({
            username,
            password
        });

        // Save the user to the database
        await newUser.save();

        return response.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        return response.status(500).json({ message: "Internal server error" });
    }
})

module.exports = router
