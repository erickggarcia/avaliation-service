const mongoose = require('mongoose')
const {Schema} = mongoose

const schema = new Schema({
    name: {
        type: String,
        require: true
    }, 
    cnpj: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('company', schema)