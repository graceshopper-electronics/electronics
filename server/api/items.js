const router = require('express').Router()
const {Item} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

router.get('/', async (req, res, next) => {
  console.log(req.query)
  let whereConditions = {}
  let orderConditions = []
  let limit = req.query.limit ? Number(req.query.limit) : 15
  let offset = req.query.offset ? Number(req.query.offset) : 0
  if (req.query.categoryid) {
    whereConditions.categoryId = req.query.categoryid
  }
  if (req.query.search) {
    let search = req.query.search[0].toUpperCase() + req.query.search.slice(1)
    whereConditions.name = {[Op.substring]: search}
  }
  if (req.query.price) {
    orderConditions.push(['price', req.query.price])
  }
  try {
    const items = await Item.findAll({
      limit,
      offset,
      order: orderConditions,
      where: whereConditions,
      subQuery: false
    })
    res.json(items)
  } catch (err) {
    next(err)
  }
})
