const router = require('express').Router()
const { fn, col } = require('sequelize')

const { Blog } = require('../models')


router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: [
      'author',
      [fn('COUNT', col('id')), 'blogs'],
      [fn('SUM', col('likes')), 'likes']
    ],
    group: ['author']
  })
  console.log(blogs, 'group by author')
  res.json(blogs)
})

module.exports = router
