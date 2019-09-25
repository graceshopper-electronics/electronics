const {
  Item,
  User,
  Order,
  OrderDetails,
  Review,
  Category,
  ItemCategories
} = require('./models/index.js')
const db = require('./db.js')
var faker = require('faker')

let itemSeed = []
let userSeed = []
let orderSeed = []
let orderDetailSeed = []
let reviewSeed = []
let categoryToItemSeed = []
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
      'https://gizchina.it/wp-content/uploads/2019/06/huawei-nova-mini-bluetooth-speaker-2.jpg'
  },
  {
    name: 'Computers',
    photo:
      'http://i.dell.com/sites/csimages/Videos_Images/all/inspiron-15-7000-2n1-rollupimage.jpg'
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
    name: 'Accessories',
    photo:
      'https://cdn.suwalls.com/wallpapers/computers/apple-accessories-41758-1920x1080.jpg'
  }
]

let itemPhotoSeed = [
  'https://cdn.wallpapersafari.com/64/67/dCBAnI.png',
  'https://46c4ts1tskv22sdav81j9c69-wpengine.netdna-ssl.com/wp-content/uploads/2015/10/Peregrine_Hero_01_B_BL.png',
  'https://www.freeiconspng.com/uploads/3d-apple-iphone-x-image-7.png',
  'https://bab-assets2.babapi.ooo/img/othe/8687242/9f/f2/jetblackglossy.png.6376f49ff2.999x600x550.png',
  'https://www.imore.com/sites/imore.com/files/field/image/2015/12/topic_apple-pencil3.png',
  'https://assets1.ignimgs.com/2019/07/18/up-right-1-1563470657102.png',
  'https://smedia.webcollage.net/rwvfp/wc/cp/1538746688581_66dda36d-14e0-4c6d-9f35-4681389ad596/module/bose//_cp/products/1505584033394/tab-e1c24241-2979-45c9-b833-8be7fac18490/99dbc5fa-1c21-46c5-aa64-edccc22f08d7.jpg.w960.jpg',
  'https://www.mynavyexchange.com/products/images/xlarge/11298729_0.jpg',
  'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Ferikkain%2Ffiles%2F2017%2F01%2FSwitch.jpg',
  'https://farm1.staticflickr.com/883/42708961752_d5dbcd80bb_o_d.png',
  'https://blog.glocalzone.com/wp-content/uploads/2018/03/apple-watch.png',
  'https://images-eu.ssl-images-amazon.com/images/I/41c9KqRil1L._SL500_AC_SS350_.jpg',
  'https://static.bhphoto.com/images/images1500x1500/1491329149_1318772.jpg',
  'https://www.notebookcheck.net/fileadmin/Notebooks/Apple/iPad_Air_2/teaser.jpg',
  'https://www.pbtech.co.nz/imgprod/T/V/TVSAM11932__2.jpg',
  'https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c04904760.png',
  'http://personal.psu.edu/jxr5398/assignment6/2.png',
  'http://pluspng.com/img-png/printer-png-printer-png-image-1500.png',
  'https://store.hp.com/wcsstore/hpusstore/Treatment/eb1050_q3fy18_hero3.png',
  'https://img.favpng.com/0/16/4/call-of-duty-wwii-call-of-duty-black-ops-4-playstation-4-second-world-war-video-game-png-favpng-45fRWcuTB7bcAHAPMpTA6dV6P.jpg',
  'https://timedotcom.files.wordpress.com/2017/01/nintendoswitch_hardware_box_01_final.jpg',
  'https://www.lifewire.com/thmb/75sPuyfF_6hFEIPlpIrsbZMU_xs=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/GalaxyNote9withStylus-5bc763f2c9e77c005161a5ff.jpg',
  'https://www.rubidium.com/wp-content/uploads/2017/07/5871217c38315b0eebc1da26.png',
  'https://images-na.ssl-images-amazon.com/images/G/01/kindle/dp/2018/100495/d_cc.png',
  'https://static.bhphoto.com/images/images2500x2500/1517391978_1297281.jpg',
  'https://ksassets.timeincuk.net/wp/uploads/sites/54/2018/01/home-mini-1024x576.jpg',
  'https://www.mynavyexchange.com/products/images/xlarge/12716229_000.jpg',
  'https://sickr.files.wordpress.com/2015/10/gamecube_large_purple.png',
  'https://i-love-png.com/images/n64-png-11553950175zmytrtdgkr.png',
  'http://pluspng.com/img-png/xbox-png-xbox-png-pic-1267.png',
  'https://blog.codinghorror.com/content/images/2015/08/asus-PB279Q.jpg',
  'https://www.mmoga.com/images/games/_ext/1041292/league-of-legends-riot-points-card-10-eur_large.png',
  'https://3roodq8.com/image/cache/catalog/products%20image/K568-3_1024x1024@2x%20(1)-700x700.png'
]

for (let i = 0; i < 100; i++) {
  itemSeed.push({
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    inventory: Math.floor(Math.random() * 14),
    photo: itemPhotoSeed[Math.floor(itemPhotoSeed.length * Math.random())],
    description: faker.lorem.sentence()
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

    let categories = []
    const forLoop = async _ => {
      for (let i = 0; i < categorySeed.length; i++) {
        let ctg = await Category.create(categorySeed[i])
        categories.push(ctg)
      }
    }
    await forLoop()

    let items = []
    const forLoop2 = async _ => {
      for (let i = 0; i < itemSeed.length; i++) {
        let itm = await Item.create(itemSeed[i])

        items.push(itm)
      }
    }
    await forLoop2()

    const forLoop3 = async _ => {
      for (let i = 0; i < items.length; i++) {
        let catNum = Math.floor(Math.random() * 8)
        await categories[catNum].addItems(items[i])
      }
    }

    await forLoop3()

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
