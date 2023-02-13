const formModel = require('../Models/Form')

function FormController() {}

FormController.prototype.get = async (req, res) => {
    try {
        const result = await formModel.find(req.query)
        res.status(200).send({msg: 'Dados recuperados com sucesso ', result})

    } catch(error) {
        res.status(500).send({msg: 'Não foi possível recuperar os dados ', error})
        return
    }

}

FormController.prototype.post = async (req, res) => {
    try{
        const {idUser, avaliation} = req.body

        const jAvaliation = {user: idUser, avaliation}
    
        if(!idUser) {
            res.status(503).send({msg: 'Serviço não está disponível'})
            return
        }
        if(avaliation >= 1 && avaliation <= 5) {

            const ServiceAvaliation = await formModel.create(jAvaliation)
            res.status(200).send({msg: 'Avaliação realizada com sucesso', ServiceAvaliation})
        } else {
            res.status(400).send({msg: 'Por favor, avalie com um número entre 1 e 5'})
        }
    } catch(error) {
        res.status(500).send({msg: 'Serviço indisponível, por favor, tente mais tarde'})
    }
}

module.exports = FormController()