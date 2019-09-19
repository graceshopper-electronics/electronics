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

const onlyAdmins = (req, res, next) => {
  if (!req.user) {
    console.log('USER IS NOT LOGGED IN!')
    return res.sendStatus(401)
  }
  if (!req.user.isAdmin) {
    console.log('USER LOGEED IN BUT NOT AN ADMIN!')
    return res.sendStatus(401)
  }
  next()
}

router.param('id', (req, res, next, id) => {
  User.findById(id)
    .then(user => {
      if (!user) throw HttpError(404)
      req.requestedUser = user
      next()
      return null
    })
    .catch(next)
})

router.delete('/:itemid', onlyAdmins, async (req, res, next) => {
  try {
    const itemToRemove = await Item.findByPk(req.params.itemid)
    await itemToRemove.destroy()
    res.status(204)
  } catch (err) {
    next(err)
  }
})
