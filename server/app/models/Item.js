export default function (sequelize, DataTypes) {
  const invTypes = sequelize.define('invTypes', {
    typeID: {
      type: DataTypes.BIGINT,
      primaryKey: true
    },
    groupID: DataTypes.BIGINT,
    typeName: DataTypes.TEXT,
    description: DataTypes.TEXT,
    mass: DataTypes.DOUBLE,
    volume: DataTypes.DOUBLE,
    capacity: DataTypes.DOUBLE,
    portionSize: DataTypes.BIGINT,
    raceID: DataTypes.INTEGER,
    basePrice: DataTypes.REAL,
    published: DataTypes.BOOLEAN,
    marketGroupID: DataTypes.BIGINT,
    iconID: DataTypes.BIGINT,
    soundID: DataTypes.BIGINT,
    graphicID: DataTypes.BIGINT
  }, {
    timestamps: false,
    classMethods: {
      getSearchVector: () => {
        return 'PostText';
      },

      search: (query) => {
        const Item = this;
        const escapedQuery = sequelize.getQueryInterface().escape(query);
        return sequelize.query(`SELECT "typeID", "typeName" FROM "invTypes" WHERE "typeName" @@ plainto_tsquery('english', ${escapedQuery}) AND "typeName" LIKE '%Blueprint' LIMIT 10`, Item);
      }
    }
  });
  return invTypes;
}
