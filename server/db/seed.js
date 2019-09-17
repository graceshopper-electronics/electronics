const {db, Item, User} = require('../server/db')
const itemSeed = require('./item.json')
const userSeed = require('./user.json')

// const seed = () => {
// 	console.log('TEST', seedData[0]);
// };

const seed = async () => {
  try {
    await db.sync({force: true})
    await Item.bulkCreate(itemSeed)
    await User.bulkCreate(userSeed)
  } catch (err) {
    console.log('Error seeding bulk file', err)
  }
}

seed()
  .then(() => {
    console.log(green('Seeding success!'))
    db.close()
  })
  .catch(err => {
    console.error(red('Oh noes! Something went wrong!'))
    console.error(err)
    db.close()
  })

module.exports = seed
