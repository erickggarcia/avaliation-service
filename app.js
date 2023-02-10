const app = require('./App/Config/express')
const port = 3000

app.listen(port, () => {
    console.log('Rodando na porta ', port)
})