const listService = require('./list.service.js');

module.exports = {
    create,
    query
    // get,
    // update,
    // remove,
}

async function create(req, res) {
    try {
        const { boardId } = req.params
        const { title } = req.body   
        const list = await listService.create(boardId, title)
        return res.json({ list })
    } catch (error) {
        const status = error.status || 500
        res.status(status).json({ message: error.message || 'Failed to create list' });
    }
}
async function query(req, res) {
    try{
        const { boardId } = req.params
        const lists = await listService.query(boardId)
        if (!lists) {
            return res.status(404).json({ message: 'Board doesnt have any lists yet' })
        }
        return res.json({ lists })
    } catch (error) {
        const status = error.status || 500
        return res.status(status).json({ message: error.message || 'Lists not found' })
    }
}