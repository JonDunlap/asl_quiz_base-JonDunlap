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

  // Questions.associate = (models) => {
  //   // define association here
  // };

  return Questions;
};
