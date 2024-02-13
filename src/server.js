const express = require("express");
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Creating EXPRESS APP
const app = express();


var corsOptions = {
    origin: [
                "http://localhost:3000", "http://localhost:3000/", 
                "https://stream-linedd-8391d4c8cf39.herokuapp.com/", "https://stream-linedd-8391d4c8cf39.herokuapp.com"
        ],
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Middleware to parse JSON body
app.use(express.json());

// JWT functionality

app.get("/", (request, response) => {
    response.json({
        message: "Welcome to Stream-Lined API"
    })
});
const userRouter = require('./controllers/UserController');
const { JsonWebTokenError } = require("jsonwebtoken");
app.use("/users", userRouter);

// Defining routes for form submissions

const formSubmissionRouter = require('./controllers/FormSubmissionController');
app.use("/formsubmissions", formSubmissionRouter )


module.exports = {
    app
}