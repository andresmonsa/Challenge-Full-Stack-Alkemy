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
  } catch ({ message: error }) {
    throw new Error(error)
  }
}

const addMovement = async ({ concept, category, amount, type }) => {
  try {
    const cat = await Category.findOne({
      where: {
        name: category
      }
    })

    if (cat === null) {
      throw new Error('Must include a valid Category')
    }
    const newMovement = await Movement.create({
      concept,
      date: new Date(),
      amount,
      type
    })

    cat.addMovement(newMovement)

    return ('Movement was added')
  } catch ({ message: error }) {
    throw new Error(error)
  }
}

const modifyMovement = async (movementID, concept, date, category, amount) => {
  try {
    const movement = await Movement.findByPk(movementID)
    if (concept) movement.concept = concept
    if (date) movement.date = date
    if (amount) movement.amount = amount
    movement.save()

    if (category) {
      const newCategory = await Category.findOne({
        where: { name: category }
      })
      newCategory.addMovement(movement)
    }

    return `Movement ${movementID} has been modified`
  } catch ({ message: error }) {
    throw new Error(error)
  }
}
module.exports = {
  getAll,
  addMovement,
  modifyMovement
}
