const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = ('orderitem', {
  priceAtPurchase: Sequelize.DECIMAL(10, 2)
})

module.exports= OrderItem
