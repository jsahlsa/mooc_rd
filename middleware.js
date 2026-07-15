const jwt = require('jsonwebtoken')
const { SECRET } = require('./util/config')

const errorHandler = (error, req, res, next) => {
  console.error('This error was handled by middleware: ', error.errors[0].message, 'end!!!!!')
  if (error.name === 'SequelizeValidationError') {
    console.log('it was sequelize validation')
    return res.status(400).json({ error: error.errors[0].message })
  }
  next(error)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch {
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

module.exports = {
  errorHandler,
  tokenExtractor
}
