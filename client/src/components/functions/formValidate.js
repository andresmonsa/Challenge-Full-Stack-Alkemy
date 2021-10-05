function validate (value, target, setErrors) {
  if (target === 'name' || target === 'lastName') {
    setErrors((prev) => ({ ...prev, [target]: null }))
    const nameformat = /^[a-zA-Z 1-9 áéíóú ü]{3,15}$/
    if (!value) {
      setErrors((prev) => ({ ...prev, [target]: `${target} is required` }))
    } else if (!value.match(nameformat)) {
      setErrors((prev) => ({ ...prev, [target]: `${target} is invalid` }))
    }
  }

  if (target === 'email') {
    setErrors((prev) => ({ ...prev, email: null }))
    const rex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (value === '') {
      setErrors((prev) => ({ ...prev, email: 'email is required' }))
    }
    const tester = rex.test(String(value).toLowerCase())
    if (tester !== true) {
      setErrors((prev) => ({ ...prev, email: 'email is invalid' }))
    }
  }
}

module.exports = { validate }
