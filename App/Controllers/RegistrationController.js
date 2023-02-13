const userModel = require('../Models/User')

function RegistrationController() {}

RegistrationController.prototype.get = async (req, res) => {

    try {
        const result = await userModel.findOne(req.query)
        console.log(result)
        res.status(200).send({msg: 'Dado recuperado com sucesso ', result})
    } catch(error) {
        res.status(500).send({msg: 'Não foi possível recuperar os dados solicitados', error})
    }
}

RegistrationController.prototype.post = async (req, res) => {

    try {
        const {name, lastName, email, password, confirmPassword} = req.body
        const jRegistration = {name, lastName, email, password}

        if(password !== confirmPassword) {
           res.status(404).send({msg: 'As senhas não coincidem'})      
           return
        }

        const registration = await userModel.create(jRegistration)
        console.log(registration)
        res.status(200).send({msg: 'Usuário registrado com sucesso', registration})   
        return
        
    } catch(error) {
        res.status(500).send({msg: 'Não foi possível realizar o registro, por favor, veja se todos os dados foram preenchidos'})
    }
}

module.exports = new RegistrationController()