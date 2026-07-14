const router = require('express').Router()

const { sequelize } = require('../util/db')


router.post('/', async (req, res) => {
  await sequelize.truncate({ cascade: true })
  return res.end()
})

module.exports = router
