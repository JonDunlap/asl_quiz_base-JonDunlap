module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Quizzes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      name: {
        type: Sequelize.STRING,
      },

      type: {
        type: Sequelize.ENUM('public', 'private'),
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

  down: (queryInterface) => queryInterface.dropTable('Quizzes'),
};
