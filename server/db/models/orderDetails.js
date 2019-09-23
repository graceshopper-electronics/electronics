const Sequelize = require('sequelize')
const db = require('../db')

const OrderDetails = db.define(
  'orderdetails',
  {
    priceAtPurchase: Sequelize.DECIMAL(10, 2),
    itemQuantity: {
      type: Sequelize.INTEGER,
      validate: {
        min: 0
      },
      defaultValue: 1
    },
    total: {
      type: Sequelize.FLOAT,
      allowNull: true
    }
  }
  // {
  //   hooks: {
  //     afterCreate: order => {
  //       order.sum = 20
  //     },
  //     afterBulkCreate: order => {
  //       order.sum = 20
  //     }
  //   }
  // }
)

OrderDetails.beforeCreate((orderinstance, options) => {
  orderinstance.total = 100
})

module.exports = OrderDetails

// Number(orderdetails.priceAtPurchase) *
//     Number(orderdetails.itemQuantity)
