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
                "https://stream-lined.netlify.app/", "https://stream-lined.netlify.app"
        ],
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Middleware to parse JSON body
app.use(express.json());

// JWT functionality (Users)
app.get("/", (request, response) => {
    response.json({
        message: "Welcome to Stream-Lined API"
    })
});
const userRouter = require('./controllers/UserController');
const { JsonWebTokenError } = require("jsonwebtoken");
app.use("/users", userRouter);


// Defining routes for form template creation
const formTemplateRouter = require('./controllers/FormTemplateController');
app.use("/formTemplates", formTemplateRouter)

//defining routes for form Submission
const formRouter = require('./controllers/FormController')
app.use("/forms", formRouter)

// Defining routes for form template deletion
const formTemplateDeleteRouter = require('./controllers/FormTemplateController');
app.use("/formTemplateId/delete", formTemplateDeleteRouter)


module.exports = {
    app
}