const expressApp = require('./utils/app')

const port = process.env.PORT || 5000
expressApp.listen(port, () => {
    console.log(`Servidor HTTP servindo na porta ${port}!`)
})