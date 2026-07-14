const bcrypt = require('bcrypt')
const router = require('express').Router()

const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['passwordhash'] },
    include: {
      model: Blog,
      attributes: {
        exclude: ['userId']
      }
    }
  })
  res.json(users)
})

router.post('/', async (req, res, next) => {
  try {
    const { username, name, password } = req.body

    const saltRounds = 10
    const passwordhash = await bcrypt.hash(password, saltRounds)

    const user = {
      username,
      name,
      passwordhash
    }

    const savedUser = await User.create(user)

    res.status(201).json(savedUser)
  } catch (err) {
    next(err)
  }
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username
    }
  })
  try {
    user.name = req.body.name
    user.save()
    res.json(user)
  } catch (err) {
    return res.status(401).json({ err })
  }
})

module.exports = router

