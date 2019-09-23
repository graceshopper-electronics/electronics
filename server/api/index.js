const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/items', require('./items'))
router.use('/categories', require('./categories'))
router.use('/reviews', require('./reviews'))
router.use('/orders', require('./orders'))
router.use('/orders/history', require('./orderHistory'))
router.use('/cart', require('./cart'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
