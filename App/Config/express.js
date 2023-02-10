const express = require('express')
const cors = require('cors')
const consign = require('consign')
const bodyParse = require('body-parser')
require('dotenv')

const app = express()
app.use(cors())
app.options('*', cors()) // Permite a conecxão de todas as rotas a api
app.use(bodyParse.urlencoded({extended: true, limit: '10mb'}))
app.use(bodyParse.json({'limit': '10mb'}))

consign({cwd: 'App', verbose: true})  //cwd is a relative path to the parent folder App 
    .include('Config/db') //incluindo todas as configurações abaixo em app
    .include('Controllers')
    .include('Routes')
    .into(app)

module.exports = app