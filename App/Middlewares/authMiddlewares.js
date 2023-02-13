const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const publicRoutes = [
        '/api/v1/registration',
        'api/v1/login'
    ]

    if(publicRoutes.includes(req.baseUrl)) {
        next()
    } else {
        const {authorization} = req.headers
        if(!authorization) {
            res.status(404).send({msg: 'Você não enviou o token'})
            return
        }

        const token = authorization.split(' ')[1]
        jwt.verify(token, process.env.SECRET, (error, decoder) => {
            if(error) {
                return res.status(500).send({msg: 'Token inválido'})
            } else {
                req.idUser = decoder.idUser
                req.idCompany = decoder.idCompany
                next()
            }
        })
    }
}
