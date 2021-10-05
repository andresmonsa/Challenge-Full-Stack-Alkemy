const bcryptjs = require('bcryptjs')
const { User } = require('../../db')

const validationEmail = async (email) => {
  const emailExist = await User.findOne({ where: { email: email } })
  if (emailExist) {
    throw new Error(`email ${email} exist`)
  }
}

const validationUser = async (email) => {
  const userExist = await User.findOne({ where: { email } })
  if (!userExist) {
    throw new Error('User not exist')
  }
}

const validationPassword = async (email, password) => {
  const user = await User.findOne({ where: { email } })
  const userPassword = bcryptjs.compareSync(password, user.password)
  if (!userPassword) {
    return 'User and password not match'
  }
}

const validationActive = async (email) => {
  const user = await User.findOne({ where: { email: email } })
  if (!user) {
    return 'User not exist'
  }
  if (!user.status) {
    return 'User not active. Contact support'
  }
}

module.exports = {
  validationEmail,
  validationUser,
  validationPassword,
  validationActive
}
