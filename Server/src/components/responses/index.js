exports.success = (req, res, status, message) => {
  res.status(status || 200).json(message)
}

exports.error = (req, res, status, message, details) => {
  console.log(details, 'det'.red)
  console.log(message.message, 'msg'.red)
  res.status(status || 404).json(message.message)
}
