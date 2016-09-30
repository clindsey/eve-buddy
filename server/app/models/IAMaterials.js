export default function (sequelize, DataTypes) {
  const industryActivityMaterials = sequelize.define('industryActivityMaterials', {
    typeID: {
      type: DataTypes.BIGINT,
      primaryKey: true
    },
    activityID: DataTypes.BIGINT,
    materialTypeID: DataTypes.BIGINT,
    quantity: DataTypes.BIGINT
  }, {
    timestamps: false,
    classMethods: {
      associate: function (models) {
        industryActivityMaterials.belongsTo(models.invTypes, {
          as: 'Item',
          foreignKey: 'materialTypeID',
          targetKey: 'typeID',
        });
      }
    }
  });
  return industryActivityMaterials;
}
