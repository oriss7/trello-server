const accountService = require('./account.service.js');
const utilitisService = require('../../services/utilitis.js');

module.exports = {
    signup,
    login,
    logout,
    get,
    remove,
    update
}

async function signup(req, res) {
  try {
    const { name, email, password } = req.body
    await accountService.signup(name, email, password)
    const { account, token } = await accountService.login(email, password)
    utilitisService.setAuthCookie(res, token)
    res.status(201).json({ message: 'Account created and logged in', account });
  } catch (error) {
    const status = error.status || 500
    res.status(status).json({ message: error.message || 'Failed to create account' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body
    const { account, token } = await accountService.login(email, password)
    utilitisService.setAuthCookie(res, token)
    res.status(200).json({ message: 'Account logged in', account });
  } catch (error) {
    const status = error.status || 500
    res.status(status).json({ message: error.message || 'Failed to log in' });
  }
}

function logout(req, res) {
    try {
      utilitisService.clearAuthCookie(res);
      res.status(200).json({ message: 'Account logged out' });
    } catch (error) {
      const status = error.status || 500
      res.status(status).json({ message: error.message || 'Failed to log out' });
    }
}

async function get(req, res) {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ message: 'No token provided' })
        }
        const account = await accountService.get(token)
        if (!account) {
            return res.status(404).json({ message: 'account not found' })
        }
        return res.json({ message: 'account logged in', account })
    } catch (error) {
        const status = error.status || 500
        return res.status(status).json({ message: error.message || 'account not found' })
    }
}

async function remove(req, res) {
  try {
    const { id } = req.params
    const deletedAccount = await accountService.remove(id);
    if (!deletedAccount) {
      return res.status(404).json({ message: 'Account not found' });
    }
    return res.json({ message: 'Account and associated transactions deleted successfully', deletedAccount })
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ message: 'Server error while deleting account' })
  }
}

async function update(req, res) {
  try {
    const { id } = req.params
    const { name, email } = req.body
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: 'No update data provided' });
    }
    const updatedAccount = await accountService.update(id, updateData);
    if (!updatedAccount) {
      return res.status(404).json({ message: 'Account not found' })
    }
    return res.json({ message: 'Account updated successfully', updatedAccount })
  } catch (error) {
      const status = error.status || 500
      return res.status(status).json({ message: error.message || 'Server error while updating account' })
  }
}