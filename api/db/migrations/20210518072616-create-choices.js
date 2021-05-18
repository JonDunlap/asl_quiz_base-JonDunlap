module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Choices', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
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
