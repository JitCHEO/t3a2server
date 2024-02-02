const express = require("express");
const router = express.Router();
const {User} = require('../models/UserModel');


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
// Creating new user in the DB
// localhost:3000/users/signup
router.post("/signup", async (request, response) =>{
    try{
        let newUser = await User.create(request.body);
        response.json(newUser);
    }catch (error){
        response.status(500).json({message: "Internal server error"});
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
