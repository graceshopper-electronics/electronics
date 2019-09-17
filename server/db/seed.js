const {Item, User, Order, Review} = require('./models/index.js')
const db = require('./db.js')
var faker = require('faker')

let itemSeed = []
let userSeed = []

// const userSeed = new Array(10)
// const orderSeed = new Array(10)
// const reviewSeed = new Array(10)

for (let i = 0; i < 10; i++) {
  itemSeed.push({
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    inventory: 10,
    photo: faker.image.technics(),
    description: faker.lorem.sentence()
  })
}

for (let i = 0; i < 10; i++) {
  userSeed.push({
    email: faker.internet.email(),
    password: faker.internet.password()
  })
}

const seed = async () => {
  try {
    await db.sync({force: true})
    await Item.bulkCreate(itemSeed)
    await User.bulkCreate(userSeed)
    // const firstUser = await User.create(userSeed[0])

    // await Order.bulkCreate(orderSeed)
    // const firstReview = await Review.create(reviewSeed[0])

    // await firstReview.setUser(firstUser)
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
