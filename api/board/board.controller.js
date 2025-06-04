const boardService = require('./board.service.js');

module.exports = {
    create,
    get,
    query,
    update
    // remove,
}

async function create(req, res) {
    try {
        const { id } = req.params
        const { title } = req.body   
        const board = await boardService.create(id, title)
        return res.json({ board })
    } catch (error) {
        const status = error.status || 500
        res.status(status).json({ message: error.message || 'Failed to create board' });
    }
}
async function get(req, res) {
    try{
        const { id } = req.params
        const board = await boardService.get(id)
        if (!board) {
            return res.status(404).json({ message: 'Board doesnt found' })
        }
        return res.json({ board })
    } catch (error) {
        const status = error.status || 500
        return res.status(status).json({ message: error.message || 'Board not found' })
    }
}
async function query(req, res) {
    try{
        const { accountId } = req.params
        const boards = await boardService.query(accountId)
        if (!boards) {
            return res.status(404).json({ message: 'Account doesnt have any boards yet' })
        }
        return res.json({ boards })
    } catch (error) {
        const status = error.status || 500
        return res.status(status).json({ message: error.message || 'Boards not found' })
    }
}
async function update(req, res) {
    try {
        const { id } = req.params
        const { title } = req.body
        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: 'No update data provided' });
        }
        const updatedBoard = await boardService.update(id, updateData)
        return res.json({ updatedBoard })
    } catch (error) {
        const status = error.status || 500
        res.status(status).json({ message: error.message || 'Failed to update board' });
    }
}