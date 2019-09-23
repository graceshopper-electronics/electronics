const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/:userid', async (req, res, next) => {
  if (req.body.email) {
    try {
      User.findByPk(req.params.userid)
        .then(user => user.update({email: req.body.email}))
        .then(user => res.json(user))
        .catch(next)
    } catch (err) {
      next(err)
    }
  }
  if (req.body.password) {
    try {
      console.log(req.body.password)
      User.findByPk(req.params.userid)
        .then(user => user.update({password: req.body.password}))
        .then(user => res.json(user))
        .catch(next)
    } catch (err) {
      next(err)
    }
  } else if (req.body.shippingAddress) {
    try {
      User.findByPk(req.params.userid)
        .then(user => user.update({shippingAddress: req.body.shippingAddress}))
        .then(user => res.json(user))
        .catch(next)
    } catch (err) {
      next(err)
    }
  }
})
