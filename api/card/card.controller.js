const cardService = require('./card.service.js');

module.exports = {
    create,
    query,
    update
    // get,
    // remove,
}

async function create(req, res) {
    try {
        const { listId } = req.params
        const { title } = req.body   
        const card = await cardService.create(listId, title)
        return res.json({ card })
    } catch (error) {
        const status = error.status || 500
        res.status(status).json({ message: error.message || 'Failed to create card' });
    }
}
async function query(req, res) {
    try{
        const { listId } = req.params
        const cards = await cardService.query(listId)
        if (!cards) {
            return res.status(404).json({ message: 'List doesnt have any cards yet' })
        }
        return res.json({ cards })
    } catch (error) {
        const status = error.status || 500
        return res.status(status).json({ message: error.message || 'Cards not found' })
    }
}

async function update(req, res) {
    try {
        const { id } = req.params
        const { complete } = req.body
        const updateData = {};
        if (complete !== undefined) updateData.complete = complete;
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: 'No update data provided' });
        }
        const updatedCard = await cardService.update(id, updateData)
        return res.json({ updatedCard })
    } catch (error) {
        const status = error.status || 500
        res.status(status).json({ message: error.message || 'Failed to update card' });
    }
}