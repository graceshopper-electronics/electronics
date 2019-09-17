const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  submissionDate: {
    type: Sequelize.DATE,
    validate: {
      isDate: true
    }
  },
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 5
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
