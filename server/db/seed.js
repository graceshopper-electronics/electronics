const {Item, User, Order, Review} = require('./models/index.js')
const db = require('./db.js')

const itemSeed = require('./item.json')
const userSeed = require('./user.json')
const orderSeed = require('./orders.json')
const reviewSeed = require('./reviews.json')
// const seed = () => {
// 	console.log('TEST', seedData[0]);
// };

const seed = async () => {
  try {
    await db.sync({force: true})
    await Item.bulkCreate(itemSeed)
    const firstUser = await User.create(userSeed[0])

    await Order.bulkCreate(orderSeed)
    const firstReview = await Review.create(reviewSeed[0])

    await firstReview.setUser(firstUser)
  } catch (err) {
    console.log('Error seeding bulk file', err)
  }
}

seed()
  .then(() => {
    console.log('Seeding success!')
    db.close()
  })
  .catch(err => {
    console.error('Oh noes! Something went wrong!')
    console.error(err)
    db.close()
  })

module.exports = seed
