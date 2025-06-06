const listController = require('./list.controller.js');

module.exports.connectListRoutes = (app) => {
    const endPoint = 'api/list';
    app.post(`/${endPoint}/:boardId`, listController.create)
    app.get(`/${endPoint}/query/:boardId`, listController.query)
    
    // app.get(`/${endPoint}/:id`, listController.get)
    app.put(`/${endPoint}/:id`, listController.update)
    // app.delete(`/${endPoint}/:id`, listController.remove)
}