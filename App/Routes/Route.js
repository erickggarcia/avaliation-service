const RegistrationController = require('../Controllers/RegistrationController')

module.exports = (app) => {

    app.get('/api/v1/registration', (req, res) => RegistrationController.get(req, res))
    app.post('/api/v1/registration', (req, res) => RegistrationController.post(req, res))
    
}