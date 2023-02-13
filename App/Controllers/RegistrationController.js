const userModel = require('../Models/User')
const companyModel = require('../Models/Company')

function RegistrationController() {}

// RegistrationController.prototype.get = async (req, res) => {

//     try {
//         const result = await userModel.find(req.query)
//                                             .populate({
//                                                 path: 'company',
//                                                 select: 'name cnpj'
//                                             })
//         console.log(result)
//         res.status(200).send({msg: 'Dado recuperado com sucesso ', result})
//     } catch(error) {
//         res.status(500).send({msg: 'Não foi possível recuperar os dados solicitados', error})
//     }
// }

RegistrationController.prototype.post = async (req, res) => {

    try {
      
        const {name, lastName, email, password, confirmPassword, company} = req.body // dados enviados via requisição body

        if(!name || !lastName || !email || !password || !confirmPassword || !company.name || !company.cnpj) {
            res.status(500).send({msg: 'Faltam dados'})      
           return
        }
        if(password !== confirmPassword) {
           res.status(404).send({msg: 'As senhas não coincidem'})      
           return
        }

        const userExists = await userModel.findOne({email: email})

        if(userExists) {
            res.status(422).send("Não foi possível criar conta")
            return
        }

        const Ncompany = await companyModel.create(company)

        const jRegistration = {name, lastName, email, password, confirmPassword, company: Ncompany._id}


        const registration = await userModel.create(jRegistration)
        console.log(registration)
        res.status(200).send({msg: 'Usuário registrado com sucesso', registration})   
        return
        
    } catch(error) {
        console.log(error)
        res.status(500).send({msg: 'Não foi possível realizar o registro, por favor, veja se todos os dados foram preenchidos'})
    }
}

module.exports = new RegistrationController()