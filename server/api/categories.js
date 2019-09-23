const router = require('express').Router()
const {Category, Item} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const ctg = await Category.findAll({})
    res.json(ctg)
  } catch (err) {
    next(err)
  }
})

router.get('/:categoryid', async (req, res, next) => {
  try {
    const items = await Item.findAll({
      where: {
        categoryId: req.params.categoryid
      },
      include: [
        {
          model: Category,
          attributes: ['name']
        }
      ]
    })
    res.json(items)
  } catch (err) {
    next(err)
  }
})
