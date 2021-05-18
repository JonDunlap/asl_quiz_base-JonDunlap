module.exports = (sequelize, DataTypes) => {
  const Questions = sequelize.define(
    'Questions',
    {
      title: DataTypes.STRING,
    },
    {}
  );

  // Questions.associate = (models) => {
  //   // define association here
  // };

  return Questions;
};
