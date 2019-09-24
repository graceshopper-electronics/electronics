const router = require('express').Router()
const {Item, Category} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

router.get('/', async (req, res, next) => {
  console.log(req.query)
  let whereConditions = {}
  let orderConditions = []
  let limit = req.query.limit ? Number(req.query.limit) : 15
  let offset = req.query.offset ? Number(req.query.offset) : 0
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

router.get('/categories/:categoryId', async (req, res, next) => {
  try {
    const ID = Number(req.params.categoryId)

    const items = await Item.findAll({
      include: [{model: Category, through: {attributes: []}}]
    })
    const categoryItems = items.reduce((accumulator, curr) => {
      const result = curr.categories.find(element => {
        return element.dataValues.id === ID
      })

      if (result) {
        accumulator.push(curr)
      }
      return accumulator
    }, [])
    res.json(categoryItems)
  } catch (err) {
    next(err)
  }
})

const onlyAdmins = (req, res, next) => {
  if (!req.user) {
    console.log('USER IS NOT LOGGED IN!')
    return res.sendStatus(401)
  }
  if (!req.user.isAdmin) {
    console.log('USER LOGGED IN BUT NOT AN ADMIN!')
    return res.sendStatus(401)
  }
  next()
}

router.post('/', onlyAdmins, async (req, res, next) => {
  try {
    const items = await Item.create(req.body)
    res.json(items)
  } catch (err) {
    next(err)
  }
})

router.get('/:itemid', async (req, res, next) => {
  try {
    const ID = req.params.itemid
    const item = await Item.findOne({
      where: {
        id: ID
      },
      include: [Category]
    })
    res.json(item)
  } catch (err) {
    next(err)
  }
})

router.put('/:itemid', onlyAdmins, async (req, res, next) => {
  try {
    const id = req.params.itemid
    const item = await Item.findByPk(id)
    const updatedItem = await item.update(req.body)
    res.json(updatedItem)
  } catch (err) {
    next(err)
  }
})

//creating category assignments
router.put('/assign/:itemid', onlyAdmins, async (req, res, next) => {
  try {
    const id = req.params.itemid
    const catName = req.body.category
    const item = await Item.findByPk(id)
    const category = await Category.findAll({
      where: {
        name: [catName]
      }
    })
    await item.addCategories(category)
    const itemWithCategory = await Item.findOne({
      where: {
        id: id
      },
      include: [Category]
    })
    res.json(itemWithCategory)
  } catch (err) {
    next(err)
  }
})

router.put('/unassign/:itemid', onlyAdmins, async (req, res, next) => {
  try {
    const id = req.params.itemid
    const categoryid = req.body.id
    const item = await Item.findByPk(id)
    const category = await Category.findAll({
      where: {
        id: [categoryid]
      }
    })
    await item.removeCategory(category)
    const itemWithCategory = await Item.findOne({
      where: {
        id: id
      },
      include: [Category]
    })
    res.json(itemWithCategory)
  } catch (err) {
    next(err)
  }
})

router.delete('/:itemid', onlyAdmins, async (req, res, next) => {
  try {
    const id = req.params.itemid
    await Item.destroy({
      where: {id}
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
