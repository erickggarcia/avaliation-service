const formModel = require('../Models/Form')
const templateModel = require('../Models/Template')

function FormController() {}

FormController.prototype.get = async (req, res) => {
    try {
        const result = await formModel.find(req.query)
                                            .populate({
                                                path: 'search_type',
                                                select: 'searchType name message'
                                            })
        res.status(200).send({msg: 'Dados recuperados com sucesso ', result})

    } catch(error) {
        res.status(500).send({msg: 'Não foi possível recuperar os dados ', error})
        return
    }

}

FormController.prototype.post = async (req, res) => {
    try{
        const {template, answer, observation} = req.body // mandando id

        if(!template || !answer || !observation) {
            res.status(503).send({msg: 'Serviço não está disponível'})
            return
        }

        const jAvaliation = {template, answer, observation}
        const Ntemplate = await templateModel.find({_id: template})

        if(template.searchType === 'nps' && answer > 0 && answer < 11) {

            const ServiceAvaliation = await formModel.create(jAvaliation)
            res.status(200).send({msg: 'Avaliação realizada com sucesso', ServiceAvaliation})

        } else if(Ntemplate.searchType === 'like' && answer === 0 || answer === 1) {

            const ServiceAvaliation = await formModel.create(jAvaliation)
            res.status(200).send({msg: 'Avaliação realizada com sucesso', ServiceAvaliation})

        } else {
            res.status(404).send({msg: 'Por favor, preencha os dados novamente'})
        }   
        
    } catch(error) {
        res.status(500).send({msg: 'Serviço indisponível, por favor, tente mais tarde', error})
        console.log(error)
    }
}

module.exports = new FormController()