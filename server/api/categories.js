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
    const ctg = await Category.create(req.body)
    res.json(ctg)
  } catch (err) {
    next(err)
  }
})

router.put('/:categoryid', onlyAdmins, async (req, res, next) => {
  try {
    const id = req.params.categoryid
    const category = await Category.findByPk(id)
    const postUpdate = await category.update(req.body)
    res.json(postUpdate)
  } catch (err) {
    next(err)
  }
})

router.delete('/:categoryid', onlyAdmins, async (req, res, next) => {
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
