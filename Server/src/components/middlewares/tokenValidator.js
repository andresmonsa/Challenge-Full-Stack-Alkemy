const { validationUser, validationPassword } = require('./dbValidators')

const tokenValidator = async (email, password) => {
  const responseValidationActive = await validationUser(email)
  if (responseValidationActive) return responseValidationActive
  const responseValidationPassword = await validationPassword(email, password)
  if (responseValidationPassword) return responseValidationPassword

  return false
}

module.exports = { tokenValidator }
