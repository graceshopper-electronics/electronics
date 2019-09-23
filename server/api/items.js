const router = require('express').Router()
const {Item, Category} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const items = await Item.findAll()
    res.json(items)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
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

router.put('/:itemid', async (req, res, next) => {
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
router.put('/assign/:itemid', async (req, res, next) => {
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

// const onlyAdmins = (req, res, next) => {
//   if (!req.user) {
//     console.log('USER IS NOT LOGGED IN!')
//     return res.sendStatus(401)
//   }
//   if (!req.user.isAdmin) {
//     console.log('USER LOGEED IN BUT NOT AN ADMIN!')
//     return res.sendStatus(401)
//   }
//   next()
// }

// router.param('id', (req, res, next, id) => {
//   User.findById(id)
//     .then(user => {
//       if (!user) throw HttpError(404)
//       req.requestedUser = user
//       next()
//       return null
//     })
//     .catch(next)
// })

router.delete('/:itemid', async (req, res, next) => {
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
