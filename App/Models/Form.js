const mongoose = require('mongoose')
const {Schema} = mongoose

const schema = new Schema({
    avaliation: {
        type: Number,
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
})

module.exports = mongoose.model('form', schema)