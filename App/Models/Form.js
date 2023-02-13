const mongoose = require('mongoose')
const {Schema} = mongoose

const schema = new Schema({
    template: {
        type: Schema.Types.ObjectId,
        ref: 'template',
        require: true
    },
    answer: {
        type: Number,
        require: true
    },
    observation: {
        type: String
    }
})

module.exports = mongoose.model('form', schema)