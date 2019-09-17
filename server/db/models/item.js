const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  name: Sequelize.STRING,
  price: {
    type: Sequelize.DECIMAL(10, 2), //check if this works after seeding the file
    allowNull: false
  },
  inventory: Sequelize.INTEGER,
  category: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['TV', 'PC']]
    }
  },
  photo: {
    type: Sequelize.TEXT,
    default: 'smiley face'
  },
  description: Sequelize.TEXT
})

module.exports = Item
