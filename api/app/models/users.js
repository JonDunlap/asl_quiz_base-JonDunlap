module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
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

      username: {
        type: DataTypes.STRING,
        unique: { args: true, msg: 'Username is already in use.' },
        allowNull: { args: false, msg: 'Username is required.' },
      },

      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      access_token: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      type: {
        type: DataTypes.ENUM('github', 'regular'),
        validate: {
          isIn: {
            args: [['github', 'regular']],
            msg: 'User type must be GitHub or regular',
          },
        },
      },
    },
    {}
  );

  Users.associate = (models) => {
    // define association here
    Users.hasMany(models.Quizzes, { foreignKey: 'userId' });
  };

  return Users;
};
