const { Movement, Category, User } = require('../../db')

const getAll = async (userID) => {
  try {
    const movements = await Movement.findAll({
      where: { userId: userID },
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

const addMovement = async ({ concept, category, amount, type, userID }) => {
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

    const user = await User.findByPk(userID)

    await newMovement.setUser(user)

    await cat.addMovement(newMovement)

    return ('Movement was added')
  } catch ({ message: error }) {
    throw new Error(error)
  }
}

const modifyMovement = async (movementID, concept, date, category, amount) => {
  try {
    const movement = await Movement.findByPk(movementID)
    if (concept) movement.concept = concept
    if (date) movement.date = new Date(date)
    if (amount) movement.amount = amount
    await movement.save()

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

const deleteMovement = async (id) => {
  try {
    const movement = await Movement.findByPk(id)
    if (movement === null) throw new Error('Can´t find the movement')
    else movement.destroy()

    return `Movement ${id} has been deleted`
  } catch ({ message: error }) {
    throw new Error(error)
  }
}
module.exports = {
  getAll,
  addMovement,
  modifyMovement,
  deleteMovement
}
