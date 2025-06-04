const accountController = require('./account.controller.js');

module.exports.connectAccountRoutes = (app) => {
    const endPoint = 'api/auth';
    app.post(`/${endPoint}/signup`, accountController.signup)
    app.post(`/${endPoint}/login`, accountController.login)
    app.post(`/${endPoint}/logout`, accountController.logout)

    const accountEndPoint = 'api/account';
    app.get(`/${accountEndPoint}`, accountController.get)
    app.put(`/${accountEndPoint}/:id`, accountController.update)
    app.delete(`/${accountEndPoint}/:id`, accountController.remove)
}