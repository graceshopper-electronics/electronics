const Sequelize = require('sequelize')
const db = require('../db')

const OrderDetails = db.define('orderdetails', {
  priceAtPurchase: Sequelize.DECIMAL(10, 2),
  itemQuantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    },
    defaultValue: 1
  }
})

module.exports = OrderDetails
