const store = require('./store')
const moment = require('moment')

const getAll = async () => {
  try {
    const allMovements = await store.getAll()
    return allMovements
      .map(movement => (
        {
          id: movement.id,
          concept: movement.concept,
          amount: movement.amount,
          date: moment(movement.createdAt).format('YYYY-MM-DD HH:mm'),
          type: movement.type,
          category: movement.category.name
        }
      ))
      .sort((a, b) => {
        if (a.id < b.id) {
          return 1
        }
        if (a.id > b.id) {
          return -1
        }
        return 0
      })
  } catch ({ message: error }) {
    throw new Error(error)
  }
}

const getLast = async () => {
  try {
    const lastMovements = await getAll()
    return lastMovements
      .splice(0, 10)
  } catch ({ message: error }) {
    throw new Error(error)
  }
}

const getBalance = async () => {
  try {
    let balance = 0
    const movements = await store.getAll()
    movements.forEach(movement => {
      if (movement.type === 'Income') balance = balance + movement.amount
      else balance = balance - movement.amount
    })
    return balance
  } catch ({ message: error }) {
    throw new Error(error)
  }
}

const addMovement = async (movement) => {
  try {
    return await store.addMovement(movement)
  } catch ({ message: error }) {
    throw new Error(error)
  }
}

module.exports = {
  getAll,
  getLast,
  getBalance,
  addMovement
}
