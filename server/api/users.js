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

const onlyAdmins = (req, res, next) => {
  if (!req.user) {
    console.log('USER IS NOT LOGGED IN!')
    return res.sendStatus(401)
  }
  if (!req.user.isAdmin) {
    console.log('USER LOGEED IN BUT NOT AN ADMIN!')
    return res.sendStatus(401)
  }
  next()
}

router.param('id', (req, res, next, id) => {
  User.findById(id)
    .then(user => {
      if (!user) throw HttpError(404)
      req.requestedUser = user
      next()
      return null
    })
    .catch(next)
})

router.delete('/:id', onlyAdmins, async (req, res, next) => {
  try {
    const user = req.requestedUser
    await user.destroy()
    res.status(204)
  } catch (err) {
    next(err)
  }
})
