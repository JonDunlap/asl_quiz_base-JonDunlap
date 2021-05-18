module.exports = (sequelize, DataTypes) => {
  const Questions = sequelize.define(
    'Questions',
    {
      id: {
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },

      title: DataTypes.STRING,
    },
    {}
  );

  Questions.associate = (models) => {
    // define association here
    Questions.belongsTo(models.Quizzes, { foreignKey: 'quizId' });
    Questions.hasMany(models.Choices, { foreignKey: 'questionId' });
  };

  return Questions;
};
