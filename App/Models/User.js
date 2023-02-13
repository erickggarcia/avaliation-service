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
        select: false,
        set: value => bcrypt.hashSync(value, 10)
    }
})

module.exports = mongoose.model('user', schema)