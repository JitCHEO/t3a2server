const express = require("express");
const bcrypt = require('bcryptjs')
const {User} = require('../models/UserModel');

const router = express.Router();


// GET method
// Find all user in DB
//localhost:3000/users/
// GOOD
router.get("/", async (request, response) =>{
    let result = await User.find();
    response.json({result});``
})

// GET method
//Find user by ID in the DB
//localhost:3000/users/:id
router.get("/:id", async(request, response) => {
    let result = await User.findById(request.params.id).catch(error => {return "Id not found"});
    try{
        let result = await User.findById(request.params.id);
        if(!result){
            return response.status(404).json({message:"User not found"});
        }
        return response.json({result});
    }catch(error){
        return response.status(500).json({message: " Internal server error"});
    }
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

// DELETE method
// Deleting user by ID
// localhost:3000/users/:id
router.delete("/:id", async (request, response) => {
    try {
        const userId = request.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);
        
        if (!deletedUser) {
            return response.status(404).json({ message: "User not found" });
        }
        
        response.json({ message: "User deleted successfully", deletedUser });
    } catch (error) {
        response.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router
