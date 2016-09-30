export default function (sequelize, DataTypes) {
  const industryActivityProducts = sequelize.define('industryActivityProducts', {
    typeID: {
      type: DataTypes.BIGINT,
      primaryKey: true
    },
    activityID: DataTypes.BIGINT,
    productTypeID: DataTypes.BIGINT,
    quantity: DataTypes.BIGINT
  }, {
    timestamps: false,
  });
  return industryActivityProducts;
}
