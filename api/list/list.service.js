const dbService = require('../../services/db.js');
const { ListModel } = require('./list.model');

module.exports = {
    create,
    query
    // get,
    // update
    // remove,
}

async function create(board, title) {
    const list = await dbService.create(ListModel, { board, title })
    await dbService.save(list);
    return {
        _id: list._id,
        title: list.title
    }
}

// async function get(boardId) {
//     const board = await dbService.findById(BoardModel, boardId)
//     return board
// }
async function query(boardId) {
    const lists = await dbService.findByFieldSorted(ListModel,
        'board', boardId, 'board title', { createdAt: 1 })
    if (!lists || lists.length === 0) {
        throw Object.assign(new Error('No lists found'), { status: 404 })
    }
    return lists
}