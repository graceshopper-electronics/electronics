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
    console.log('req.user: ', req.user)
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
      console.log('cartOrder: ', cartOrder[0])
      console.log('req.session.cart: ', req.session.cart)
      res.json(cartOrder[0])
    } else {
      console.log('req.session.cart: ', req.session.cart)
      const guestCart = {items: req.session.cart}
      console.log('guestCart: ', guestCart)
      res.json(guestCart)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:itemId', async (req, res, next) => {
  try {
    console.log('hit delete route!')
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
      console.log('order: ', order)
      await order.addItem(req.body.id)
      res.json(order)
    } else {
      req.session.cart.push(req.body)
      console.log('req.session.cart: ', req.session.cart)
      res.json(req.session.cart)
    }
  } catch (error) {
    next(error)
  }
})
