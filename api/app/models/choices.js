module.exports = (sequelize, DataTypes) => {
  const Choices = sequelize.define(
    'Choices',
    {
      value: DataTypes.STRING,
      type: DataTypes.ENUM('correct', 'incorrect'),
    },
    {}
  );

  // Choices.associate = (models) => {
  //   // define association here
  // };

  return Choices;
};
