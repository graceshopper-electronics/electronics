const db = require('./db')

// register models
require('./models')
require('./models/utils')

module.exports = db
