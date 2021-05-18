module.exports = (sequelize, DataTypes) => {
  const Quizzes = sequelize.define(
    'Quizzes',
    {
      name: DataTypes.STRING,
      type: DataTypes.ENUM('public', 'private'),
    },
    {}
  );

  // Quizzes.associate = (models) => {
  //   // define association here
  // };

  return Quizzes;
};
