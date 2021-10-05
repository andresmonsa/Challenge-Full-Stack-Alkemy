const { SECRET } = process.env
const jwt = require('jsonwebtoken')

const tokenGenerator = async (email) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ email }, SECRET, {
      expiresIn: '1h'
    }, (err, token) => {
      if (err) {
        console.log(err, 'err')
        reject(new Error('JWT not generate'))
      } else {
        resolve({ token })
      }
    })
  })
}

module.exports = { tokenGenerator }
