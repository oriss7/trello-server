const dbService = require('../../services/db.js');
const { CardModel } = require('./card.model');

module.exports = {
    create,
    query,
    update
    // get,
    // remove,
}

async function create(list, title) {
    const card = await dbService.create(CardModel, { list, title })
    await dbService.save(card);
    return {
        _id: card._id,
        title: card.title
    }
}
// async function get(boardId) {
//     const board = await dbService.findById(BoardModel, boardId)
//     return board
// }
async function query(listId) {
    const cards = await dbService.findByFieldSorted(CardModel,
        'list', listId, 'list title complete', { createdAt: 1 })
    if (!cards || cards.length === 0) {
        throw Object.assign(new Error('No cards found'), { status: 404 })
    }
    return cards
}

async function update(cardId, updateData) {
    const updatedCard = await dbService.updateById(CardModel, cardId, updateData)
    return updatedCard
}