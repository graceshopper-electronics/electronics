const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'isAdmin']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// const onlyAdmins = (req, res, next) => {
//   if (!req.user) {
//     console.log('USER IS NOT LOGGED IN!')
//     return res.sendStatus(401)
//   }
//   if (!req.user.isAdmin) {
//     console.log('USER LOGEED IN BUT NOT AN ADMIN!')
//     return res.sendStatus(401)
//   }
//   next()
// }

// router.param('id', (req, res, next, id) => {
//   User.findById(id)
//     .then(user => {
//       if (!user) throw HttpError(404)
//       req.requestedUser = user
//       next()
//       return null
//     })
//     .catch(next)
// })

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    await User.destroy({
      where: {id}
    })
    res.status(204).end()
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

router.put('/admin/:userid', async (req, res, next) => {
  try {
    const id = req.params.userid
    const user = await User.findByPk(id)
    let adminStatus
    if (!user.isAdmin) {
      adminStatus = true
    } else {
      adminStatus = false
    }
    await user.update({isAdmin: adminStatus})
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
