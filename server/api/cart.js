const router = require('express').Router()
const {Order} = require('../db/models')
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
      const cart = await Order.findOrCreate({
        where: {
          userId,
          status: 'inCart'
        }
      })
      req.session.cart = cart
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
      console.log('order: ', order)
      order.addItem(req.body)
      res.json(order)
    } else {
      console.log('req.session.cart: ', req.session.cart)
      console.log('req.body: ', req.body)
      console.log('req.user: ', req.user)
      req.session.cart.push(req.body)
      res.json(req.session.cart)
    }
  } catch (error) {
    next(error)
  }
})
