const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const {Schema} = mongoose
const schema = new Schema({
    name: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
        select: false, //não selecionado na busca, apenas forçando com "+"
        set: value => bcrypt.hashSync(value, 10)
    },
    company: {
        type: Schema.Types.ObjectId, //necessário criar a empresa para obter o id
        ref: 'company',
        require: true
    }
})

module.exports = mongoose.model('user', schema)