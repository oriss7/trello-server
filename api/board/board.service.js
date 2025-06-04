const dbService = require('../../services/db.js');
const { BoardModel } = require('./board.model');

module.exports = {
    create,
    get,
    query,
    update
    // remove,
}
async function create(owner, title) {
  const board = await dbService.create(BoardModel, { owner, title, members: [owner] })
  await dbService.save(board);
  return {
    _id: board._id,
    title: board.title
  }
}

async function get(boardId) {
    const board = await dbService.findById(BoardModel, boardId)
    return board
}
async function query(accountId) {
    const boards = await dbService.findByFieldSorted(BoardModel,
        'members', accountId, 'owner title members', { createdAt: -1 })
    if (!boards || boards.length === 0) {
        throw Object.assign(new Error('No boards found'), { status: 404 })
    }
    return boards
}
async function update(boardId, updateData) {
    const updatedBoard = await dbService.updateById(BoardModel, boardId, updateData)
    return updatedBoard
}