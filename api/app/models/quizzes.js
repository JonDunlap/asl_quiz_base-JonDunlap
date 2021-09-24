module.exports = (sequelize, DataTypes) => {
  const Quizzes = sequelize.define(
    'Quizzes',
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

      name: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [3, 500],
            msg: 'Name must be at least 3 characters long.',
          },
        },
      },

      type: {
        type: DataTypes.ENUM('public', 'private'),
        validate: {
          isIn: {
            args: [['public', 'private']],
            msg: 'Type must be public or private.',
          },
        },
      },
    },
    {}
  );

  Quizzes.associate = (models) => {
    // define association here
    Quizzes.hasMany(models.Questions, { foreignKey: 'quizId' });
    Quizzes.belongsTo(models.Users, { foreignKey: 'userId' });
  };

  return Quizzes;
};
