const { User } = require('../../db')
const { tokenGenerator } = require('../middlewares/tokenGenerator')

const newUser = async ({ name, lastName, email, password }) => {
  try {
    const user = await User.create({
      name,
      lastName,
      email,
      password
    })
    const token = await tokenGenerator(user.email)
    return {
      user,
      token
    }
  } catch ({ message: error }) {
    throw new Error(error)
  }
}

const login = async (email, password) => {
  try {
    const user = await User.findOne({
      where: {
        email
      }
    })
    const token = await tokenGenerator(user.email)
    if (user === null) throw new Error('No session')
    return {
      user,
      token
    }
  } catch ({ message: error }) {
    throw new Error('No session')
  }
}

module.exports = {
  newUser,
  login
}
