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
  console.log('going')
  let whereConditions = {}
  let orderConditions = []
  let limit = req.query.limit ? Number(req.query.limit) : 15
  let offset = req.query.offset ? Number(req.query.offset) : 0
  if (req.query.status) {
    whereConditions.status = req.query.status
  }
  if (req.query.user) {
    whereConditions.userId = req.query.user
  }
  if (req.query.date) {
    orderConditions.push(['submissionDate', req.query.date])
  }
  try {
    console.log('a try')
    const orders = await Order.findAll({
      limit,
      offset,
      order: orderConditions,
      where: whereConditions,
      include: [{all: true}]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.put('/:orderid', async (req, res, next) => {
  try {
    Order.update(
      {status: req.body.status},
      {returning: true, where: {id: req.params.orderid}}
    )
      .then(order => res.json(order))
      .catch(next)
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
