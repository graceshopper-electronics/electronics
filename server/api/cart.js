const router = require('express').Router()
const {Order, Item} = require('../db/models')
module.exports = router

router.use((req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = []
  }
  next()
})

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const userId = req.user.id
      const cartOrder = await Order.findOrCreateGuestUser('user', userId)
      res.json(cartOrder)
    } else {
      const guestId = req.session.id
      const guestOrder = await Order.findOrCreateGuestUser('guest', guestId)
      res.json(guestOrder)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:itemId', async (req, res, next) => {
  try {
    const itemId = req.params.itemId
    if (req.user) {
      const userId = req.user.id
      const order = await Order.findOneGuestUser('user', userId)
      await order.removeItem(itemId)
      res.status(204).end()
    } else {
      const guestId = req.session.id
      const order = await Order.findOneGuestUser('guest', guestId)
      await order.removeItem(itemId)
      res.status(204).end()
    }
  } catch (error) {
    next(error)
  }
})

router.put('/addItem/:itemId', async (req, res, next) => {
  try {
    const itemId = req.params.itemId
    if (req.user) {
      const userId = req.user.id
      const order = await Order.findOneGuestUser('user', userId)
      await order.addItemPlus(itemId)
      res.status(204).end()
    } else {
      const guestId = req.session.id
      const order = await Order.findOneGuestUser('guest', guestId)
      await order.addItemPlus(itemId)
      res.status(204).end()
    }
  } catch (error) {
    next(error)
  }
})
