const RegistrationController = require('../Controllers/RegistrationController')
const LoginController = require('../Controllers/LoginController')
const FormController = require('../Controllers/FormController')
const TemplateController = require('../Controllers/templateController')

module.exports = (app) => {

    app.get('/api/v1/registration', (req, res) => RegistrationController.get(req, res))
    app.post('/api/v1/registration', (req, res) => RegistrationController.post(req, res))

    app.post('/api/v1/login', (req, res) => LoginController.post(req, res))

    app.get('/api/v1/form', (req, res) => FormController.get(req, res))
    app.post('/api/v1/form', (req, res) => FormController.post(req, res))

    app.get('/api/v1/form', (req, res) => FormController.get(req, res))
    app.post('/api/v1/form', (req, res) => FormController.post(req, res))

    app.get('/api/v1/template', (req, res) => TemplateController.get(req, res))
    app.post('/api/v1/template', (req, res) => TemplateController.post(req, res))
    app.put('/api/v1/template', (req, res) => TemplateController.get(req, res))
    app.delete('/api/v1/template', (req, res) => TemplateController.post(req, res))
}