const store = require('./store')

const getAll = async () => {
  try {
    const categories = await store.getAll()
    return categories.map(category => category.name)
  } catch ({ message: error }) {
    throw new Error(error)
  }
}

const addCat = async (catName) => {
  try {
    const newCat = await store.addCat(catName)

    const res = {
      name: newCat.name,
      id: newCat.id
    }
    return res
  } catch ({ message: error }) {
    throw new Error(error)
  }
}

module.exports = {
  getAll,
  addCat
}
