const router = require('express').Router()
const {Order, Item, User, OrderDetails} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [{all: true}]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

// const orders = await Order.findAll({
//   include: [
//     {
//       model: User
//     },
//     {
//       model: Item,
//       through: {attributes: []}
//     }
//   ]
// })
