require('dotenv').config()

const express = require('express')
const http = require('http')

const expressApp = express()
const httpServer = http.createServer(expressApp)

expressApp.use(express.json())

expressApp.get('/status', (request, response) => {
    response.json({ status: 'OK' })
})

expressApp.post('/login', (request, response) => {
    const { user, password } = request.body

    if (user === 'marselo' && password === 'slkdixavei') {
        const jwt = require('jsonwebtoken')
        const userData = {
            nome: 'marselo',
            email: 'marselo@gmail.com',
            id: 1
        }

        jwt.sign(userData, process.env.JWT_KEY, (error, token) => {
            if (error) {
                return response.status(500).json({ mensagem: 'Erro ao gerar o JWT!' })
            }

            response.set('x-access-token', token)
            response.end()
        })
    } else {
        response.status(401)
        response.end()
    }
})

const port = process.env.PORT || 5000
httpServer.listen(port, () => {
    console.log(`Servidor HTTP servindo na porta ${port}!`)
})