const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  name: Sequelize.STRING,
  price: {
    type: Sequelize.DECIMAL(10, 2), //check if this works after seeding the file
    allowNull: false
  },
  inventory: Sequelize.INTEGER,
  photo: {
    type: Sequelize.TEXT,
    default:
      'https://cdn2.iconfinder.com/data/iconsets/previews/medium-2x/electronics-consumer-electronics-electronics-store.png'
  },
  description: Sequelize.TEXT
})

module.exports = Item
