const userModel = require('../Models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

function LoginController() {}

LoginController.prototype.post = async (req, res) => {
    const {email, password} = req.body

    if(!email || !password) {
        res.status(500).send({msg: 'Existem dados não preenchidos'})
        return
    }

    const user = await userModel.findOne({email: email}, '+password')

    if(!user) {
        res.status(401).send({msg: 'Não foi possível realizar o login'})
        return
    } else {
        const checkPassword = bcrypt.compare(password, user.password)

        if(!checkPassword) {
            res.status(401).send({error: 'Não foi possível realizar o login, Senha ou Usuário inválidos'})
            return
        }
    }

        try {
            const secret = process.env.SECRET

            const token = jwt.sign({
                idUser: user._id                
            }, secret
            )

            res.status(200).send({msg: "Login realizado com sucesso", token})

        } catch(error) {
            res.status(500).send({error: "Erro interno"})
        }
}

module.exports = new LoginController()
