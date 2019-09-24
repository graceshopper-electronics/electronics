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
    photo: 'https://www.lg.com/us/experience-tvs/oled-tv/i/bg-shopoled.jpg'
  },
  {
    name: 'Mobile phones',
    photo:
      'https://cdn.vox-cdn.com/thumbor/vFbxezqB4fgK1-VirclQI8roaD8=/0x0:2040x1360/1200x675/filters:focal(1398x346:1724x672)/cdn.vox-cdn.com/uploads/chorus_image/image/65253817/akrales_190912_3656_0027.0.jpg'
  },
  {
    name: 'Audio',
    photo:
      'https://speaker.ninja/wp-content/uploads/2017/09/What-Causes-Popping-and-Crackling-Sounds-in-Your-Speakers-featured.jpg'
  },
  {
    name: 'Photography',
    photo:
      'https://cdn.thewirecutter.com/wp-content/uploads/2018/04/canon-dslrs-march-2018-2x1-lowres3496.jpg'
  },
  {
    name: 'Games',
    photo:
      'https://d3atagt0rnqk7k.cloudfront.net/wp-content/uploads/2016/09/12150402/best-single-multiplayer-video-games-to-pair-with-cannabis.jpg'
  },
  {
    name: 'Office',
    photo:
      'https://www.tds-office.com/wp-content/uploads/2018/10/office-electronics-printers-copiers.jpg'
  },
  {
    name: 'Computers',
    photo:
      'http://hpsuppliesfirstclass.com/newsletter/images/i_essential_01_big_image_tcm245_2268831_tcm245_2193389_tcm245-2268831.jpg'
  },
  {
    name: 'Accessories',
    photo:
      'http://electronicgalaxyandmore.com/wp-content/uploads/2016/01/Computer-Accessories.jpg'
  }
]

for (let i = 0; i < 32; i++) {
  itemSeed.push({
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    inventory: Math.floor(Math.random() * 14),
    photo: faker.image.technics(150, 150, true),
    description: faker.lorem.sentence(),
    categoryId: Math.floor(Math.random() * 4) + 1
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
    total: 0
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
    const cat = await Category.create(categorySeed[0])
    const cat2 = await Category.create(categorySeed[1])
    const cat3 = await Category.create(categorySeed[2])
    const cat4 = await Category.create(categorySeed[3])

    const itm = await Item.create(itemSeed[0])
    const itm2 = await Item.create(itemSeed[1])
    const itm3 = await Item.create(itemSeed[2])
    const itm4 = await Item.create(itemSeed[3])

    cat2.addItems(itm3)
    cat2.addItems(itm4)

    itm.addCategories(cat)
    itm.addCategories(cat3)
    itm.addCategories(cat4)
    itm2.addCategories(cat2)

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
