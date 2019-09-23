const router = require('express').Router()
const {Order, Item} = require('../db/models')
const stripe = require('stripe')('sk_test_xuAO2kKxFAcc4bmggmiPCXYW00aQRcRhSh')
const uuid = require('uuid/v4')
module.exports = router

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

router.get('/:guestId', async (req, res, next) => {
  try {
    const guestId = req.params.guestId
    const guestOrder = await Order.findOrCreateGuestUser('guest', guestId)
    res.json(guestOrder)
  } catch (error) {
    next(error)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const userOrder = await Order.findOrCreate({
      where: {
        userId
      },
      include: {
        model: Item
      }
    })
    res.json(userOrder)
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
    console.log('req.user: ', req.user)
    if (req.user) {
      const userId = req.user.id
      const order = await Order.findOneGuestUser('user', userId)
      await order.addItemPlus(itemId)
      res.status(204).end()
    } else {
      const guestId = req.session.id
      const order = await Order.findOrCreateGuestUser('guest', guestId)
      await order.addItemPlus(itemId)
      res.status(204).end()
    }
  } catch (error) {
    next(error)
  }
})

router.put('/mergeItem/:itemId/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const itemId = req.params.itemId
    const order = await Order.findOneGuestUser('user', userId)
    await order.addItemPlus(itemId)
    res.status(204).end()
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

router.put('/cancelOrder/:orderId', async (req, res, next) => {
  try {
    const orderId = req.params.orderId
    const order = await Order.findByPk(orderId)
    if (order.status === 'Processing') {
      // make sure to only cancel Processing Orders, not those that are already shipped
      await order.update({
        status: 'Canceled'
      })
    }
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

router.put('/clear/:orderId', async (req, res, next) => {
  try {
    const orderId = req.params.orderId
    const order = await Order.findByPk(orderId)
    await order.destroy()
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

router.post('/checkout', async (req, res, next) => {
  console.log('req.body: ', req.body)
  let error
  let status
  try {
    const token = req.body.token
    const items = req.body.items
    const price = items.reduce((acc, item) => {
      return acc + Number(item.price * item.orderdetails.itemQuantity)
    }, 0.0)
    const customer = await stripe.customers.create({
      email: token.email,
      id: token.id
    })
    const idempotency_key = uuid()
    const charge = await stripe.charges.create(
      {
        amount: price,
        currency: 'usd',
        customer: customer.id,
        receipt_email: token.email,
        description: `Order Placed`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      },
      {
        idempotency_key
      }
    )
    console.log('Charge:', {charge})
    status = 'success'
  } catch (error) {
    status = 'failure'
    console.error('Error: ', error)
  }
  res.json({error, status})
})
