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
