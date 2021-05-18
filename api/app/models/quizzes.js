module.exports = (sequelize, DataTypes) => {
  const Quizzes = sequelize.define(
    'Quizzes',
    {
      id: {
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },

      name: DataTypes.STRING,

      type: DataTypes.ENUM('public', 'private'),
    },
    {}
  );

  Quizzes.associate = (models) => {
    // define association here
    // TODO - add once login function is available
    // Quizzes.belongsTo(models.Users, { foreignKey: 'userId' });
    Quizzes.hasMany(models.Questions, { foreignKey: 'quizId' });
  };

  return Quizzes;
};
