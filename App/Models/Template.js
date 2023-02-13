const mongoose = require('mongoose')
const {Schema} = mongoose

const schema = new Schema({
    searchType: {
        type: String,
        require: true
    }, 
    company: {
        type: Schema.Types.ObjectId,
        ref: 'company',
        require: true
    },
    name: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('template', schema)