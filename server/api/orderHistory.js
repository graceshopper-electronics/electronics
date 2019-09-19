const router = require('express').Router()
const {Order} = require('../db/models')
const {Item} = require('../db/models')
const {OrderDetails} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.session.passport.user
      },
      include: [Item]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
