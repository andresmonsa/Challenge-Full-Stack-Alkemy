const { Category } = require('../db.js')

const categoriesList = [
  'Food',
  'House',
  'Shopping',
  'Work'
]

const categoriesLoader = async () => {
  const categoriesInDB = await Category.findAndCountAll()
  if (categoriesInDB.count === 0) {
    try {
      categoriesList.forEach(categ => Category.create({ name: categ }))
      console.log('Categories loaded')
    } catch (error) {
      console.log('Error filling DB with Categories')
    }
  } else {
    console.log('Categories table allready has data... loader skipped')
  }
}

module.exports = { categoriesLoader }
