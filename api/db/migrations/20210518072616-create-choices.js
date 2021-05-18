module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Choices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      value: {
        type: Sequelize.STRING,
      },

      type: {
        type: Sequelize.ENUM('correct', 'incorrect'),
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: (queryInterface) => queryInterface.dropTable('Choices'),
};
