const {
  Item,
  User,
  Order,
  OrderDetails,
  Review,
  Category
} = require('./models/index.js')
const db = require('./db.js')
var faker = require('faker')

let itemSeed = []
let userSeed = []
let orderSeed = []
let orderDetailSeed = []
let reviewSeed = []
let categorySeed = [
  {
    name: 'TVs',
    photo: 'http://getwallpapers.com/wallpaper/full/8/e/2/283694.jpg'
  },
  {
    name: 'Mobile phones',
    photo: 'https://www.hdwallpapers.in/download/iphone_x_4k-1920x1080.jpg'
  },
  {
    name: 'Audio',
    photo:
      'http://getwallpapers.com/wallpaper/full/7/d/e/724905-download-free-bose-wallpapers-1920x1080-free-download.jpg'
  },
  {
    name: 'Photography',
    photo:
      'https://images.wallpaperscraft.com/image/camera_glare_levitation_130150_1920x1080.jpg'
  },
  {
    name: 'Games',
    photo:
      'https://i.pinimg.com/originals/d2/be/b7/d2beb74d54ea324f46c6ee4d7b358313.png'
  },
  {
    name: 'Office',
    photo: 'https://wallpapercave.com/wp/wp2502942.jpg'
  },
  {
    name: 'Computers',
    photo:
      'http://i.dell.com/sites/csimages/Videos_Images/all/inspiron-15-7000-2n1-rollupimage.jpg'
  },
  {
    name: 'Accessories',
    photo:
      'https://cdn.suwalls.com/wallpapers/computers/apple-accessories-41758-1920x1080.jpg'
  }
]

for (let i = 0; i < 30; i++) {
  itemSeed.push({
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    inventory: Math.floor(Math.random() * 14),
    photo: faker.image.technics(150, 150, true),
    description: faker.lorem.sentence()
    //categoryId: Math.floor(Math.random() * 4) + 1
  })
}

for (let i = 0; i < 10; i++) {
  userSeed.push({
    email: faker.internet.email(),
    password: '123',
    shippingAddress: faker.address.streetAddress()
  })
}

const statusArray = ['inCart', 'Processing', 'Shipped', 'Delivered']

for (let i = 0; i < 6; i++) {
  orderSeed.push({
    submissionDate: faker.date.past(),
    status: statusArray[Math.floor(Math.random() * statusArray.length)],
    userId: Math.floor(i / 2) + 1
  })
}

for (let i = 0; i < 6; i++) {
  orderDetailSeed.push({
    priceAtPurchase: faker.commerce.price(),
    orderId: i + 1,
    itemId: i + 1
  })
}

for (let i = 0; i < 6; i++) {
  orderDetailSeed.push({
    priceAtPurchase: faker.commerce.price(),
    orderId: i + 1,
    itemId: i + 2,
    sum: 1
  })
}

for (let i = 0; i < 6; i++) {
  reviewSeed.push({
    submissionDate: faker.date.past(),
    rating: Math.floor(Math.random() * 5) + 1,
    content: faker.lorem.sentence(),
    userId: i + 1,
    itemId: i + 1
  })
}

for (let i = 0; i < 6; i++) {
  reviewSeed.push({
    submissionDate: faker.date.past(),
    rating: Math.floor(Math.random() * 5) + 1,
    content: faker.lorem.sentence(),
    userId: i + 1,
    itemId: i + 2
  })
}

const seed = async () => {
  try {
    await db.sync({force: true})
    await User.create({
      email: 'cody@email.com',
      password: '123',
      isAdmin: true,
      shippingAddress: faker.address.streetAddress()
    })
    await Category.bulkCreate(categorySeed)
    await Item.bulkCreate(itemSeed)
    await User.bulkCreate(userSeed)
    await Order.bulkCreate(orderSeed)
    await OrderDetails.bulkCreate(orderDetailSeed)
    await Review.bulkCreate(reviewSeed)
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
