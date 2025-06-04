const cardController = require('./card.controller.js');

module.exports.connectCardRoutes = (app) => {
    const endPoint = 'api/card';
    app.post(`/${endPoint}/:listId`, cardController.create)
    app.get(`/${endPoint}/query/:listId`, cardController.query)
    app.put(`/${endPoint}/:id`, cardController.update)
}