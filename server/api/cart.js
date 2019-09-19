const router = require('express').Router()
const {Order, Items} = require('../db/models')
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
        }
      })
      console.log('cartOrder: ', cartOrder)
      const cart = await Order.findByPk(cartOrder[0].id, {
        include: {
          Items
        }
      })
      req.session.cart = cart
      console.log('req.session.cart: ', req.session.cart)
    }
    res.json(req.session.cart)
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
      order.addItem(req.body)
      res.json(order)
    } else {
      req.session.cart.push(req.body)
      res.json(req.session.cart)
    }
  } catch (error) {
    next(error)
  }
})
