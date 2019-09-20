const router = require('express').Router()
const {Review} = require('../db/models')
const {User} = require('../db/models')
module.exports = router

router.get('/:itemid', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      where: {
        itemId: req.params.itemid
      },
      attributes: ['content', 'rating', 'submissionDate'],
      include: [
        {
          model: User,
          attributes: ['email']
        }
      ]
    })
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const submissionDate = new Date()
    const content = req.body.content
    const rating = req.body.rating
    const itemId = req.body.itemId
    const userId = req.session.passport.user
    const result = await Review.create(
      {content, submissionDate, rating, itemId, userId},
      {
        attributes: ['content', 'rating', 'submissionDate'],
        include: [
          {
            model: User,
            attributes: ['email']
          }
        ]
      }
    )
    res.status(201).json(result)
  } catch (err) {
    next(err)
  }
})
