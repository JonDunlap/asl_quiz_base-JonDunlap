module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      access_token: DataTypes.STRING,
      type: DataTypes.ENUM('github', 'regular'),
    },
    {}
  );

  // Users.associate = (models) => {
  //   // define association here
  // };

  return Users;
};
