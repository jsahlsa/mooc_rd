const router = require('express').Router()
const { Op } = require('sequelize')

const { Blog, User } = require('../models')
const { tokenExtractor } = require('../middleware')


router.get('/', async (req, res) => {
  const where = {}

  if (req.query.search) {
    where[Op.or] = [
      { title: { [Op.iLike]: `%${req.query.search}%` } },
      { author: { [Op.iLike]: `%${req.query.search}%` } }
    ]


  }
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    where,
    order: [
      ['likes', 'DESC']
    ]
  })
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({ ...req.body, likes: 0, userId: user.id })
    if (blog) {
      res.json(blog)
    } else {
      res.status(404).end
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', tokenExtractor, async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  const user = await User.findByPk(req.decodedToken.id)
  console.log(blog.userId, user.id, 'do ids match?')
  if (blog) {
    if (blog.userId === user.id) {
      await blog.destroy()
      res.status(204).send()
    } else {
      res.status(401).json({ error: 'only owner of blog may delete' })
    }
  } else {
    res.status(404).end()
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    if (blog) {
      blog.likes = req.body.likes
      blog.save()
      res.json(blog)
    } else {
      return res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
