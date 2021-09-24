module.exports = (sequelize, DataTypes) => {
  const Choices = sequelize.define(
    'Choices',
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

      value: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [3, 500],
            msg: 'Value must be at least 3 characters long.',
          },
        },
      },

      type: {
        type: DataTypes.ENUM('correct', 'incorrect'),
        validate: {
          isIn: {
            args: [['correct', 'incorrect']],
            msg: 'Type must be correct or incorrect.',
          },
        },
      },
    },
    {}
  );

  Choices.associate = (models) => {
    // define association here
    Choices.belongsTo(models.Questions, { foreignKey: 'questionId' });
  };

  return Choices;
};
