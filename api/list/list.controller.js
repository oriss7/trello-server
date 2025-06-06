const listService = require('./list.service.js');

module.exports = {
    create,
    query,
    update
    // get,
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

async function update(req, res) {
    try {
        const { id } = req.params
        const { title } = req.body
        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: 'No update data provided' });
        }
        const updatedList = await listService.update(id, updateData)
        return res.json({ updatedList })
    } catch (error) {
        const status = error.status || 500
        res.status(status).json({ message: error.message || 'Failed to update list' });
    }
}