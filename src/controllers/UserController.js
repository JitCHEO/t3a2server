const express = require("express");
const bcrypt = require('bcryptjs')
const {User} = require('../models/UserModel');
const {comparePassword, generateJwt, verifyToken, getUserIdFromToken} = require('../utils/userAuthFunctions')


const router = express.Router();



router.get('/favourites', async(request, response) => {
    const id = getUserIdFromToken(request.headers.jwt)
    let result = await User.findOne({_id: id})
    console.log(result)
    if (!result) {
        return response.json({
            favourites: null
        })
    }
    const { favourites } = result.toObject()
    return response.json({
        favourites: favourites
    })
})

// GET method
// Find all user in DB
//localhost:3000/users/
// GOOD
router.get("/", async (request, response) =>{
    let result = await User.find();
    response.json({result});
})

// GET method
//Find user by ID in the DB
//localhost:3000/users/:id
router.get("/:id", async(request, response) => {
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

//Add Favourites

router.patch('/favourites', async (request, response) => {

    try {
        const id = getUserIdFromToken(request.headers.jwt);
        if (!id) {
            return response.status(401).json({ error: 'Invalid token' });
        }

        const result = await User.findOneAndUpdate(
            { _id: id },
            { $set: { favourites: request.body.favourite } },
            { new: true }
        );

        if (!result) {
            return response.status(404).json({ error: 'User not found' });
        }
        const { favourites } = result.toObject()
        return response.json(favourites);
    } catch (error) {
        console.error('Error updating favourites:', error);
        return response.status(500).json({ error: 'Internal server error' });
    }
});

// POST
router.post("/create-new-user", async (request, response) =>{

    try {
        let newUser = await User.create({
            fname: request.body.fname,
            lname: request.body.lname,
            email: request.body.email,
            password: request.body.password
        });

        let jwt = generateJwt(newUser._id.toString())
    
        response.status(201).json({
            jwt: jwt,
            message: "Account created successfully"
        });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
})

//login route 
/*
{
    "email": "email@email.com",
    "password": "password"
}
*/
router.post("/login", async (request, response) => {
    try {
        const user = await User.findOne({ email: request.body.email });
        
        if (!user) {
            return response.status(403).json({ error: "Invalid email or password." });
        }
        
        const isPasswordCorrect = await comparePassword(request.body.password, user.password);

        if (!isPasswordCorrect) {
            return response.status(403).json({ error: "Incorrect password, please try again." });
        }

        const jwt = generateJwt(user._id.toString());

        response.json({ jwt: jwt });
    } catch (error) {
        console.error("Error during login:", error);
        response.status(500).json({ error: "Internal server error" });
    }
});

router.post("/token-refresh", verifyToken, async (request, response) => {
    
    const refreshToken = generateJwt(request._id.toString())
    console.log(refreshToken)
    response.json({
        jwt: refreshToken
    })
})

router.post("/auth-checker", verifyToken, async (request, response) => {
    response.json({message: "you're still authorized"})
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
