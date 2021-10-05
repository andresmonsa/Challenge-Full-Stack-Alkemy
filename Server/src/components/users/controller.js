const bcryptjs = require('bcryptjs')
const store = require('./store')
const { tokenValidator } = require('../middlewares/tokenValidator')

const newUser = async ({ name, lastName, email, password }) => {
  const salt = bcryptjs.genSaltSync()
  const userInfo = {
    name,
    lastName,
    email,
    password: bcryptjs.hashSync(password, salt)
  }
  const user = await store.newUser(userInfo)

  const res = {
    id: user.user.id,
    name: user.user.name,
    lastName: user.user.lastName,
    password: bcryptjs.hashSync(password, salt),
    token: user.token.token
  }
  return res
}

const login = async (email, password) => {
  try {
    const tokenValidation = await tokenValidator(email, password)
    if (tokenValidation) {
      throw new Error(tokenValidation)
    }
    const user = await store.login(email)
    const res = {
      id: user.user.id,
      name: user.user.name,
      lastName: user.user.lastName,
      password: user.user.password,
      token: user.token.token
    }
    return res
  } catch ({ message: error }) {
    console.log(error)
    throw new Error('can´t login')
  }
}

module.exports = {
  newUser,
  login
}
