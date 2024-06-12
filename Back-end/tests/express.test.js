const request = require('supertest')
const app = require('../utils/app')

describe('Testar página /status', () => {
    test('Precisa responder GET com 200', done => {
        request(app)
            .get('/status')
            .then(response => {
                expect(response.statusCode).toBe(200)
                done()
            })
    })

    test('Precisa responder GET com { "status": "OK" }', done => {
        request(app)
            .get('/status')
            .then(response => {
                expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 'OK' }))
                done()
            })
    })
})