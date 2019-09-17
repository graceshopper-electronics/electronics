const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  submissionDate: {
    type: Sequelize.STRING
  }
})

module.exports = Category
