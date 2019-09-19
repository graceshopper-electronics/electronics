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
      const cartOrder = await Order.findOrCreate({
        where: {
          userId,
          status: 'inCart'
        },
        include: [
          {
            model: Item
          }
        ]
      })
      res.json(cartOrder[0])
    } else {
      const guestCart = {items: req.session.cart}
      res.json(guestCart)
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
      const order = await Order.findOne({
        where: {
          userId,
          status: 'inCart'
        }
      })
      await order.removeItem(itemId)
      res.status(204).end()
    } else {
      console.log('user is not authenticated')
    }
  } catch (error) {
    next(error)
  }
})

router.put('/addItem', async (req, res, next) => {
  try {
    if (req.user) {
      const userId = req.user.id
      const order = await Order.findOne({
        where: {
          userId,
          status: 'inCart'
        }
      })
      await order.addItem(req.body.id)
      res.status(204).end()
    } else {
      req.session.cart.push(req.body)
      res.status(204).end()
    }
  } catch (error) {
    next(error)
  }
})
