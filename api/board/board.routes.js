const boardController = require('./board.controller.js');

module.exports.connectBoardRoutes = (app) => {
    const endPoint = 'api/board';
    app.post(`/${endPoint}/:id`, boardController.create)
    app.get(`/${endPoint}/:id`, boardController.get)
    app.get(`/${endPoint}/query/:accountId`, boardController.query)
    app.put(`/${endPoint}/:id`, boardController.update)
    // app.delete(`/${endPoint}/:id`, boardController.remove)
}
// app.post(`/${endPoint}/:id`, transactionController.create)
// app.put(`/${endPoint}/:id`, transactionController.update)
// app.get(`/${endPoint}/query/:id`, transactionController.query)
// app.delete(`/${endPoint}/:id`, transactionController.remove)
// app.get(`/${endPoint}/:id`, transactionController.get)