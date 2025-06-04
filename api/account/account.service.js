const dbService = require('../../services/db.js');
const utilitisService = require('../../services/utilitis.js');
const { AccountModel } = require('./account.model');

module.exports = {
    signup,
    login,
    get,
    remove,
    update
}

async function signup(name, email, password) {
    const accountExists = await dbService.findOne(AccountModel, { email })
    if (accountExists) {
        const error = new Error('Account with this email already exists')
        error.status = 400
        throw error
    }
    const hashedPassword = await utilitisService.createHashedPassword(password)
    const account = await dbService.create(AccountModel, { name, email, password: hashedPassword })
    await dbService.save(account)
    return account
}

async function login(email, password) {
    const accountDoc = await dbService.findOne(AccountModel, { email })
    if (!accountDoc) {
        const error = new Error('Account not found')
        error.status = 404
        throw error
    }
    const account = accountDoc.toObject()
    const isMatch = await utilitisService.comparePassword(password, account.password)
    if (!isMatch) {
        const error = new Error('Invalid email or password')
        error.status = 401
        throw error
    }
    delete account.password
    const token = utilitisService.generateToken(account)
    return { account, token }
}

async function get(token) {
    const info = utilitisService.verifyToken(token)
    if (!info) {
        throw Object.assign(new Error('Invalid or expired token'), { status: 401 })
    }
    const accountDoc = await dbService.findById(AccountModel, info.id)
    if (!accountDoc) {
        throw Object.assign(new Error('Account not found'), { status: 404 })
    }
    const account = accountDoc.toObject()
    delete account.password
    return account
}

async function remove(accountId) {
    const deletedAccount = await dbService.deleteById(AccountModel, accountId)
    return deletedAccount
}

async function update(accountId, updateData) {
    if (updateData.email) {
        const accountExists = await dbService.findOne(AccountModel, { email: updateData.email });
        if (accountExists && accountExists._id.toString() !== accountId) {
            const error = new Error('Email is already taken');
            error.status = 400;
            throw error;
        }
    }
    const updatedAccount = await dbService.updateById(AccountModel, accountId, updateData)
    return updatedAccount
}