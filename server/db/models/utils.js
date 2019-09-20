const {User, Item, Order, Review, OrderDetails, Category} = require('./index')

// this file is adds custom Sequelize methods to certain models to make requests to the Db cleaner
OrderDetails.updateQuantity = async function(orderId, itemId, type) {
  try {
    const orderItem = await OrderDetails.findOne({
      where: {
        orderId,
        itemId
      }
    })
    let itemQuantity = 1
    if (type === 'increment') {
      itemQuantity = orderItem.itemQuantity + 1
    } else {
      itemQuantity = type.quantity
    }
    await orderItem.update({
      itemQuantity
    })
  } catch (error) {
    console.log('updateQuantity Error in Database!')
  }
}

Order.findOrCreateGuestUser = async function(type, id) {
  try {
    if (type === 'guest') {
      const guestId = id
      const guestOrder = await Order.findOrCreate({
        where: {
          guestId,
          status: 'inCart'
        },
        include: [
          {
            model: Item
          }
        ]
      })
      return guestOrder[0]
    } else if (type === 'user') {
      const userId = id
      const userOrder = await Order.findOrCreate({
        where: {
          userId,
          status: 'inCart'
        },
        include: [
          {
            model: Item
          }
        ]
      })
      return userOrder[0]
    }
  } catch (error) {
    console.log('findOrCreateGuestUser Error in Database!')
  }
}

Order.findOneGuestUser = async function(type, id) {
  try {
    if (type === 'guest') {
      const guestId = id
      const guestOrder = await Order.findOne({
        where: {
          guestId,
          status: 'inCart'
        }
      })
      return guestOrder
    } else if (type === 'user') {
      const userId = id
      const userOrder = await Order.findOne({
        where: {
          userId,
          status: 'inCart'
        }
      })
      return userOrder
    }
  } catch (error) {
    console.log('findOneGuestUser Error in Database!')
  }
}

Order.prototype.addItemPlus = async function(itemId) {
  try {
    const orderId = this.id
    const currentItems = []
    const orderItems = await this.getItems()
    orderItems.forEach(item => {
      currentItems.push(item.id)
    })
    if (!currentItems.includes(parseInt(itemId))) {
      await this.addItem(itemId)
    } else {
      await OrderDetails.updateQuantity(orderId, itemId, 'increment')
    }
  } catch (error) {
    console.log('addItemPlus Error in Database!')
  }
}

Order.prototype.changeQuantity = async function(itemId, quantity) {
  try {
    const orderId = this.id
    const update = {
      quantity
    }
    await OrderDetails.updateQuantity(orderId, itemId, update)
  } catch (error) {
    console.log('changeQuantity Error in Database!')
  }
}

module.exports = {
  User,
  Item,
  Order,
  Review,
  OrderDetails,
  Category
}
