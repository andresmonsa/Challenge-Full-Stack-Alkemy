const { Movement, Category } = require('../../db')

const getAll = async () => {
  try {
    const movements = await Movement.findAll({
      include: {
        model: Category,
        attributes: ['name']
      }
    })
    return movements
  } catch (error) { return (error) }
}

module.exports = {
  getAll
}