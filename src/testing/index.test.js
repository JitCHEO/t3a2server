const request = require('supertest')

const {app} = require('../server')

describe('Starter routes exist.', () => {
    it("Server can be viewed", async () => {
        const res = await request(app).get('/')
        expect(res.statusCode).toEqual(200)
    })
})