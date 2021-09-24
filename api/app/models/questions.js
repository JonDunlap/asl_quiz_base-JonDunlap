module.exports = (sequelize, DataTypes) => {
  const Questions = sequelize.define(
    'Questions',
    {
      id: {
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
        validate: {
          isUUID: {
            args: 4,
            msg: 'ID is not valid, please go back and try again.',
          },
        },
      },

      title: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [3, 500],
            msg: 'Title must be at least 3 characters long.',
          },
        },
      },
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
