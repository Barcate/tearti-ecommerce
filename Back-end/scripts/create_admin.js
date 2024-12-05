const { createUsuario } = require('../utils/database')

createUsuario('admininastro', 'admin@email.com', '123', 1)
console.log('Administrador criado com sucesso.')