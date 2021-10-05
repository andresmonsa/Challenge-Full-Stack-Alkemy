const store = require('./store')
const moment = require('moment')

const getAll = async (userID) => {
  try {
    const allMovements = await store.getAll(userID)
    return allMovements
      .map(movement => (
        {
          id: movement.id,
          concept: movement.concept,
          amount: movement.amount,
          date: moment(movement.date).format('YYYY-MM-DD HH:mm'),
          type: movement.type,
          category: movement.category.name
        }
      ))
      .sort((a, b) => {
        if (a.date < b.date) {
          return 1
        }
        if (a.date > b.date) {
          return -1
        }
        return 0
      })
  } catch ({ message: error }) {
    throw new Error(error)
  }
}

const getLast = async (userID) => {
  try {
    const lastMovements = await getAll(userID)
    return lastMovements
      .splice(0, 10)
  } catch ({ message: error }) {
    throw new Error(error)
  }
}

const getBalance = async (userID) => {
  try {
    let balance = 0
    const movements = await store.getAll(userID)
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

const modifyMovement = async (movementID, body) => {
  try {
    const { concept, date, category, amount } = body
    return await store.modifyMovement(movementID, concept, date, category, amount)
  } catch ({ message: error }) {
    throw new Error(error)
  }
}

const deleteMovement = async (movementID) => {
  try {
    return await store.deleteMovement(movementID)
  } catch ({ message: error }) {
    throw new Error(error)
  }
}

module.exports = {
  getAll,
  getLast,
  getBalance,
  addMovement,
  modifyMovement,
  deleteMovement
}
