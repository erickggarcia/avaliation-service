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

        if(!template || isNaN(answer) || !observation) {
            res.status(503).send({msg: 'Serviço não está disponível'})
            return
        }

        const jAvaliation = {template, answer, observation}
        const Ntemplate = await templateModel.findOne({_id: template}) //Buscando o template inteiro através do Id --> findOne, pois quero trazer apenas um item e não uma lista

        console.log(jAvaliation, Ntemplate)
        if(Ntemplate.searchType === 'nps' && answer >= 1 && answer <= 10) {

            const ServiceAvaliation = await formModel.create(jAvaliation) 
            res.status(200).send({msg: 'Avaliação realizada com sucesso', ServiceAvaliation})

        } else if(Ntemplate.searchType === 'like' && answer === 0 || Ntemplate.searchType === 'like' && answer === 1) { //validação do template

            const ServiceAvaliation = await formModel.create(jAvaliation)
            res.status(200).send({msg: 'Avaliação realizada com sucesso', ServiceAvaliation})

        } else {
            res.status(404).send({msg: 'Por favor, preencha os dados novamente', template})
            console.log(Ntemplate)
        }   
        
    } catch(error) {
        res.status(500).send({msg: 'Serviço indisponível, por favor, tente mais tarde', error})
        console.log(error)
    }
}

module.exports = new FormController()