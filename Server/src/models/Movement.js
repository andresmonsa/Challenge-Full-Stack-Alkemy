const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Movement = sequelize.define('movement', {

    concept: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM({ values: ['Income', 'Outcome'] })
    }
  }, {
    freezeTableName: true,
    sequelize,
    tableName: 'Movement'
  })
}
