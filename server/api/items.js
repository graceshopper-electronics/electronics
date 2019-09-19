const router = require('express').Router()
const {Item} = require('../db/models')
const {Review} = require('../db/models')
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const items = await Item.findAll({})
    res.json(items)
  } catch (err) {
    next(err)
  }
})

router.get('/:itemid', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      where: {
        itemId: req.params.itemid
      },
      include: [User]
    })
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})
