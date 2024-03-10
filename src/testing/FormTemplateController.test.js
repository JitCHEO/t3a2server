const request = require('supertest')
const {User} = require('../models/UserModel');
const { FormTemplate } = require("../models/FormTemplateModel")
const { Form } = require("../models/FormModel")
const {generateJwt} = require('../utils/userAuthFunctions')
const {app} = require('../server');
const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')

let mongoServer
let authToken
let user
let testId

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const mongoUri = mongoServer.getUri()
    await mongoose.connect(mongoUri)

        user = new User({
            fname: 'test',
            lname: 'test',
            email: 'test@example.com',
            password: 'password!1', 
            auth: 'user' 
        });
        await user.save();
        testId = user._id
         authToken = generateJwt(user._id.toString());

         jest.spyOn(console, 'error').mockImplementation(() => {});
})

afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
    console.error.mockRestore();
    
});

describe('Form Template Routes', () => {
    describe('GET /', () => {
        it('should return all form templates', async () => {
            const res = await request(app)
                .get('/formTemplates')
                
            expect(res.statusCode).toEqual(200);
            expect(res.body.result).toBeDefined();
        });
    });

    describe('GET /:formName', () => {
        it('should return a specific form template by name', async () => {
            const res = await request(app)
                .get('/formTemplates/formTemplateName')
        
                
            expect(res.statusCode).toEqual(200);
            expect(res.body.template).toBeDefined();
            // Add more expectations as needed
        });

        it('should return 404 if form template not found', async () => {
            const res = await request(app)
                .get('/formTemplate/nonexistentFormTemplateName')
                .set('Authorization', `Bearer ${authToken}`);
                
            expect(res.statusCode).toEqual(404);
            expect(res.body.error).toEqual('Template not found');
        });
    });

    describe('POST /add', () => {
        it('should add a new form template', async () => {
            const newTemplateData = {
                formName: 'New Form Template',
                assignedTo: 'Assigned User',
                components: [],
                questionHeaders: []
            };

            const res = await request(app)
                .post('/formTemplate/add')
                .send(newTemplateData)
                .set('Authorization', `Bearer ${authToken}`);
                
            expect(res.statusCode).toEqual(201);
            expect(res.body.newTemplate).toBeDefined();
            // Add more expectations as needed
        });

        // Add more test cases for error handling, validation, etc.
    });

    describe('DELETE /:formTemplateName', () => {
        it('should delete a form template and associated forms', async () => {
            const res = await request(app)
                .delete(`/formTemplate/formTemplateName`)
                .set('Authorization', `Bearer ${authToken}`);
                
            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toEqual('Form template and associated forms deleted successfully');
        });

        // Add more test cases for error handling, etc.
    });
});