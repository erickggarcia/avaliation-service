const mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose.set('strictQuery', false)

mongoose.connect('mongodb://127.0.0.1/ServiceAvaliation', {})
.then(() => console.log('Conectado ao banco... ', mongoose.connections[0].name)) //posição da conexão no banco
.catch(error => console.log(error)) 