const Sequelize = require('sequelize')
const db = require('../db')

const OrderDetails = ('orderdetails', {
  priceAtPurchase: Sequelize.DECIMAL(10, 2)
})

module.exports= OrderDetails
