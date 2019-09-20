const router = require('express').Router()
const {Order} = require('../db/models')
const {Item} = require('../db/models')
const {OrderDetails} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.session.passport.user,
        status: {
          [Op.not]: ['inCart']
        }
      },
      attributes: ['id', 'submissionDate', 'status'],
      include: [
        {
          model: Item,
          attributes: ['id', 'name', 'photo', 'description']
        }
      ]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
