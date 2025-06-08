const dbService = require('../../services/db.js');
const { ListModel } = require('./list.model');

module.exports = {
    create,
    query,
    update
    // get,
    // remove,
}
// const position = await ListModel.countDocuments({ board });
async function create(board, title) {
    const position = await dbService.countDocuments(ListModel, { board })
    const list = await dbService.create(ListModel, { board, title, position })
    await dbService.save(list);
    return {
        _id: list._id,
        title: list.title,
        position: list.position
    }
}

// async function get(boardId) {
//     const board = await dbService.findById(BoardModel, boardId)
//     return board
// }
async function query(boardId) {
    const lists = await dbService.findByFieldSorted(ListModel,
        'board', boardId, 'board title  position', { createdAt: 1 })
    if (!lists || lists.length === 0) {
        throw Object.assign(new Error('No lists found'), { status: 404 })
    }
    return lists
}

async function update(listId, updateData) {
    const updatedList = await dbService.updateById(ListModel, listId, updateData)
    return updatedList
}