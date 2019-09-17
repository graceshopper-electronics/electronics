const User = require('./user')
const Item = require('./item')
const Order = require('./order')
const Review = require('./review')
const OrderDetails = require('./orderDetails')

Item.hasMany(Review)
Review.belongsTo(Item)

User.hasMany(Review)
Review.belongsTo(User)

User.hasMany(Order)

Order.belongsToMany(Item, {through: 'orderdetails'})
Item.belongsToMany(Order, {through: 'orderdetails'})

module.exports = {
  User,
  Item,
  Order,
  Review,
  OrderDetails
}
