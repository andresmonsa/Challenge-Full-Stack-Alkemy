const { Category } = require('../../db')

const getAll = async () => {
  try {
    const categories = await Category.findAll()
    return categories
  } catch ({ message: error }) {
    throw new Error(error)
  }
}

const addCat = async (catName) => {
  try {
    if (catName === '') throw new Error('Must provide a Name!')
    const cat = await Category.findOne({
      where: {
        name: catName
      }
    })
    if (cat === null) {
      const newCat = await Category.create({ name: catName })
      return newCat
    } else {
      throw new Error(`The category ${catName} already exists`)
    }
  } catch ({ message: error }) {
    throw new Error(error)
  }
}

module.exports = {
  getAll,
  addCat
}
