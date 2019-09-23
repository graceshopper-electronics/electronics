const User = require('./user')
const Item = require('./item')
const Order = require('./order')
const Review = require('./review')
const OrderDetails = require('./orderDetails')
const Category = require('./category')

Item.hasMany(Review)
Review.belongsTo(Item)

User.hasMany(Review)
Review.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

Category.belongsToMany(Item, {through: 'itemcategories'})
Item.belongsToMany(Category, {through: 'itemcategories'})

Order.belongsToMany(Item, {through: 'orderdetails'})
Item.belongsToMany(Order, {through: 'orderdetails'})

module.exports = {
  User,
  Item,
  Order,
  Review,
  OrderDetails,
  Category
}
