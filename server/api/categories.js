const router = require('express').Router()
const {Category} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const ctg = await Category.findAll({})
    res.json(ctg)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const ctg = await Category.create(req.body)
    res.json(ctg)
  } catch (err) {
    next(err)
  }
})

router.put('/:categoryid', async (req, res, next) => {
  try {
    const id = req.params.categoryid
    const category = await Category.findByPk(id)
    const postUpdate = await category.update(req.body)
    res.json(postUpdate)
  } catch (err) {
    next(err)
  }
})

router.delete('/:categoryid', async (req, res, next) => {
  try {
    const id = req.params.categoryid
    await Category.destroy({
      where: {id}
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
