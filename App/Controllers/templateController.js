const templateModel = require('../Models/Template')

function TemplateController() {}

TemplateController.prototype.get = async (req, res) => {
    try {
        const result = await templateModel.findOne(req.query)
        res.status(200).send({msg: 'Dados recuperados com sucesso ', result})

    } catch(error) {
        res.status(500).send({msg: 'Não foi possível recuperar os dados ', error})
        return
    }

}

TemplateController.prototype.post = async (req, res) => {
    try{
        const {searchType, name, message, idCompany} = req.body

        if(!searchType || !name || !message || !idCompany ) {
            console.log(searchType)
            console.log(name)
            console.log(message)
            console.log(idCompany) // Fazer o cadastro para pegar o id da company
            res.status(503).send({msg: 'Serviço não está disponível'})
            return
        }
            const jTemplate = {searchType, name, message, company: idCompany}
            const template = await templateModel.create(jTemplate)
            res.status(200).send({msg: 'Template de pesquisa criado com sucesso', template})
        
    } catch(error) {
        res.status(500).send({msg: 'Serviço indisponível, por favor, tente mais tarde', error})
        console.log(error)
    }
}

module.exports = new TemplateController()