module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Todo',{
    id: { type: DataTypes.STRING(100), primaryKey: true},
    content: DataTypes.STRING,
    done : {type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false},
    createdAt : DataTypes.DATE,
    updatedAt : DataTypes.DATE
  });
}