const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  submissionDate: {
    type: Sequelize.DATE,
    validate: {
      isDate: true
    }
  },
  status: {
    type: Sequelize.STRING,
    values: ['inCart', 'Processing', 'Shipped', 'Delivered', 'Canceled'],
    defaultValue: 'inCart'
  },
  guestId: {
    type: Sequelize.TEXT
  }
})

module.exports = Order
