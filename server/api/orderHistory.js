const router = require('express').Router()
const {Order} = require('../db/models')
const {Item} = require('../db/models')
const {OrderDetails} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  // if (req.session.user) {
  try {
    const orders = await Order.findAll({
      where: {
        userId: 1
        //userId: req.session.user,
        //include: [Items]
      },
      include: [Item]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
  // } else {
  //  res.redirect(401, '/login')
  //}
})
