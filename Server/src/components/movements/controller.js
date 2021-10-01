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
          date: moment(movement.date).format('YYYY-MM-DD'),
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
  } catch (error) { return (error) }
}

module.exports = {
  getAll
}
