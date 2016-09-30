export default function (sequelize, DataTypes) {
  var Catalog = sequelize.define('Catalog', {
    typeID: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    manifest: DataTypes.JSON
  }, {
    classMethods: {
      associate: function (models) {
        Catalog.belongsTo(models.User);
      }
    }
  });
  return Catalog;
}
