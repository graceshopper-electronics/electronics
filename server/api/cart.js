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

router.put('/quantity/:itemId', async (req, res, next) => {
  try {
    const itemId = req.params.itemId
    const quantity = req.body.quantity
    if (req.user) {
      const userId = req.user.id
      const order = await Order.findOneGuestUser('user', userId)
      await order.changeQuantity(itemId, quantity)
      res.status(204).end()
    } else {
      const guestId = req.session.id
      const order = await Order.findOneGuestUser('guest', guestId)
      await order.changeQuantity(itemId, quantity)
      res.status(204).end()
    }
  } catch (error) {
    next(error)
  }
})

router.put('/placeOrder/:orderId', async (req, res, next) => {
  try {
    const orderId = req.params.orderId
    const order = await Order.findByPk(orderId)
    await order.update({
      status: 'Processing'
    })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

// router.put('/cancelOrder/:orderId', async (req, res, next) => {
//   try {
//     const orderId = req.params.orderId
//     if (req.user) {
//       const userId = req.user.id
//       const order = await Order.findProcessingOrder('user', userId)
//       await order.update({
//         status: 'Canceled'
//       })
//       res.status(204).end()
//     } else {
//       const guestId = req.session.id
//       const order = await Order.findByPk()
//       await order.update({
//         status: 'Canceled'
//       })
//       res.status(204).end()
//     }
//   }
//   catch (error) {
//     next(error)
//   }
// })
