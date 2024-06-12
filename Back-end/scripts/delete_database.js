const fs = require('fs')

fs.rm('bancodedados.db', () => {
    console.log('Banco de dados removido com sucesso!')
})