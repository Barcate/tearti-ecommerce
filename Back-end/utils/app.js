require('dotenv').config()
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken') // Adicionando o jsonwebtoken

const {
    getAllProduto,
    getProduto,
    getAllThumbnail,
    getThumbnail,
    createUsuario,
    getUsuarioPorEmail,
    getUsuarioPorNome,
    verificarLogin,
    createItemCarrinho,
    getItensCarrinho,
    updateItemCarrinho,
    deleteItemCarrinho,
    isItemCarrinhoDoUsuario
} = require('./database')

const expressApp = express()

expressApp.use(express.json())
expressApp.use(cors())

expressApp.get('/status', (request, response) => {
    response.json({ status: 'OK' })
})

// Middleware para verificar o token JWT
function verificarToken(request, response, next) {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return response.status(401).json({ error: 'Token de autenticação não fornecido!' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
        if (err) {
            return response.status(403).json({ error: 'Token inválido!' });
        }

        request.usuario = usuario;
        next();
    })
}

expressApp.get('/produtos', async (request, response) => {
    try {
        const produto = await getAllProduto()
        if (produto) {
            response.json(produto)
        } else {
            response.status(404).json({ error: 'Produto não encontrado!' })
        }
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

expressApp.get('/thumbnails', async (request, response) => {
    try {
        const thumbnail = await getAllThumbnail()
        if (thumbnail) {
            response.json(thumbnail)
        } else {
            response.status(404).json({ error: 'Thumbnail não encontrado!' })
        }
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

// Rota de Login com geração do token JWT
expressApp.post('/usuarios/login', async (request, response) => {
    const { email, senha } = request.body
    try {
        const usuario = await verificarLogin(email, senha)
        if (usuario) {
            // Gerar o token JWT
            const token = jwt.sign(
                { id: usuario.id, email: usuario.email }, 
                process.env.JWT_SECRET, 
                { expiresIn: process.env.JWT_EXPIRATION }
            )
            response.json({ message: 'Login bem-sucedido', token }) // Devolvendo o token no login
        } else {
            response.status(401).json({ error: 'Credenciais inválidas' })
        }
    } catch (error) {
        response.status(500).json({ error: error.message })
    }
})

expressApp.post('/usuarios', async (request, response) => {
    const { nome, email, senha } = request.body
    try {
        const usuarioExistentePorEmail = await getUsuarioPorEmail(email)
        const usuarioExistentePorNome = await getUsuarioPorNome(nome)
        if (usuarioExistentePorEmail) {
            return response.status(400).json({ error: 'E-mail já está em uso!' })
        }
        if (usuarioExistentePorNome) {
            return response.status(400).json({ error: 'Nome de usuário já está em uso!' })
        }

        const id = await createUsuario(nome, email, senha)
        response.status(201).json({ id })
    } catch (error) {
        response.status(500).json({ error: error.message })
    }
})

expressApp.get('/usuarios/me', verificarToken, async (request, response) => {
    try {
        const usuario = await getUsuarioPorEmail(request.usuario.email); // Busca o usuário no banco de dados pelo email

        if (!usuario) {
            return response.status(404).json({ error: 'Usuário não encontrado!' });
        }

        // Retorna as informações do usuário (exceto a senha)
        response.json({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

expressApp.post('/carrinho', verificarToken, async (request, response) => {
    const { quantidade, produtoId } = request.body;
    const usuarioId = request.usuario.id; // ID do usuário autenticado
    try {
        const id = await createItemCarrinho(quantidade, produtoId, usuarioId);
        response.status(201).json({ id });
        console.log('hellooo!')
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

expressApp.get('/carrinho', verificarToken, async (request, response) => {
    const usuarioId = request.usuario.id; // ID do usuário autenticado
    try {
        const itens = await getItensCarrinho(usuarioId);
        response.json(itens);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

// Rota para atualizar um item do carrinho
expressApp.put('/carrinho/:id', verificarToken, async (request, response) => {
    const { id } = request.params;
    const { quantidade, produtoId } = request.body;
    const usuarioId = request.usuario.id; // ID do usuário autenticado

    // Verificar se o item pertence ao usuário
    const isDoUsuario = await isItemCarrinhoDoUsuario(id, usuarioId);
    if (!isDoUsuario) {
        return response.status(403).json({ error: 'Acesso negado. Este item não pertence ao usuário.' });
    }

    try {
        await updateItemCarrinho(id, quantidade, produtoId);
        response.status(200).json({ message: 'Item atualizado com sucesso!' });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

expressApp.delete('/carrinho/:id', verificarToken, async (request, response) => {
    const { id } = request.params;
    const usuarioId = request.usuario.id; // ID do usuário autenticado

    // Verificar se o item pertence ao usuário
    const isDoUsuario = await isItemCarrinhoDoUsuario(id, usuarioId);
    if (!isDoUsuario) {
        return response.status(403).json({ error: 'Acesso negado. Este item não pertence ao usuário.' });
    }

    try {
        await deleteItemCarrinho(id);
        response.status(200).json({ message: 'Item removido com sucesso!' });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

module.exports = expressApp
