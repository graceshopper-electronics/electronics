const router = require('express').Router()
const {Order, Item, User, OrderDetails} = require('../db/models')

module.exports = router

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

router.get('/', onlyAdmins, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [{all: true}]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
