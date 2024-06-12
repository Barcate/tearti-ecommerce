require('dotenv').config()
const express = require('express')
const {
    createProduto,
    getProduto,
    updateProduto,
    deleteProduto,
    createThumbnail,
    getThumbnail,
    updateThumbnail,
    deleteThumbnail
} = require('./database')

const expressApp = express()

expressApp.use(express.json())

expressApp.get('/status', (request, response) => {
    response.json({ status: 'OK' })
})

// Rotas CRUD para Produto

expressApp.post('/produtos', async (request, response) => {
    const { nome, descricao, preco, estoque, disponivel } = request.body
    try {
        const id = await createProduto(nome, descricao, preco, estoque, disponivel)
        response.status(201).json({ id })
    } catch (error) {
        response.status(500).json({ error: error.message })
    }
})

expressApp.get('/produtos/:id', async (request, response) => {
    const { id } = request.params
    try {
        const produto = await getProduto(id)
        if (produto) {
            response.json(produto)
        } else {
            response.status(404).json({ error: 'Produto não encontrado!' })
        }
    } catch (error) {
        response.status(500).json({ error: error.message })
    }
})

expressApp.put('/produtos/:id', async (request, response) => {
    const { id } = request.params
    const { nome, descricao, preco, estoque, disponivel } = request.body
    try {
        await updateProduto(id, nome, descricao, preco, estoque, disponivel)
        response.json({ message: 'Produto atualizado com sucesso!' })
    } catch (error) {
        response.status(500).json({ error: error.message })
    }
})

expressApp.delete('/produtos/:id', async (request, response) => {
    const { id } = request.params
    try {
        await deleteProduto(id)
        response.json({ message: 'Produto deletado com sucesso!' })
    } catch (error) {
        response.status(500).json({ error: error.message })
    }
})

// Rotas CRUD para Thumbnail

expressApp.post('/thumbnails', async (request, response) => {
    const { base64, produtoID } = request.body
    try {
        const id = await createThumbnail(base64, produtoID)
        response.status(201).json({ id })
    } catch (error) {
        response.status(500).json({ error: error.message })
    }
})

expressApp.get('/thumbnails/:id', async (request, response) => {
    const { id } = request.params
    try {
        const thumbnail = await getThumbnail(id)
        if (thumbnail) {
            response.json(thumbnail)
        } else {
            response.status(404).json({ error: 'Thumbnail não encontrado!' })
        }
    } catch (error) {
        response.status(500).json({ error: error.message })
    }
})

expressApp.put('/thumbnails/:id', async (request, response) => {
    const { id } = request.params
    const { base64, produtoID } = request.body
    try {
        await updateThumbnail(id, base64, produtoID)
        response.json({ message: 'Thumbnail atualizado com sucesso!' })
    } catch (error) {
        response.status(500).json({ error: error.message })
    }
})

expressApp.delete('/thumbnails/:id', async (request, response) => {
    const { id } = request.params
    try {
        await deleteThumbnail(id)
        response.json({ message: 'Thumbnail deletado com sucesso!' })
    } catch (error) {
        response.status(500).json({ error: error.message })
    }
})

module.exports = expressApp