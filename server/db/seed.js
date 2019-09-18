const {Item, User, Order, Review, OrderDetails} = require('./models/index.js')
const db = require('./db.js')
var faker = require('faker')

let itemSeed = []
let userSeed = []
let orderSeed = []
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
    password: '123'
  })
}

for (let i = 0; i < 7; i++) {
  orderSeed.push({
    submissionDate: faker.date.past(),
    status: 'inCart',
    userId: 2
  })
}

const orderDetails = [
  {
    orderId: 1,
    itemId: 2
  },
  {
    orderId: 1,
    itemId: 1
  },
  {
    orderId: 2,
    itemId: 1
  }
]

const seed = async () => {
  try {
    await db.sync({force: true})
    await Item.bulkCreate(itemSeed)
    await User.bulkCreate(userSeed)
    // const firstUser = await User.create(userSeed[0])

    await Order.bulkCreate(orderSeed)
    // const firstReview = await Review.create(reviewSeed[0])
    await OrderDetails.bulkCreate(orderDetails)
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
