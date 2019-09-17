const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  submissionDate: {
    type: Sequelize.DATE,
    validate: {
      isDate: true
    }
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  }
})

module.exports = Review
