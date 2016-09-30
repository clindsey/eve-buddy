import Promise from 'bluebird';
import {industryActivityMaterials as IAMaterials, industryActivityProducts as IAProducts, invTypes as Item} from '../models/index';

/*
 * refactor: the output json structure is inefficient,
 *    it has a lot of reptetition in the materials,
 *    flatten it
*/

function extractQuantities ([materials, productTypeID]) {
  const quantities = {};
  materials.forEach((material) => {
    const key = `${productTypeID}_${material.typeID}`;
    const count = material.quantity;
    quantities[key] = {
      ID: key,
      count,
      materialTypeID: material.typeID,
      productTypeID
    };
    delete material.quantity;
    if (!material.materials) {
      return;
    }
    const [mats, quants] = extractQuantities([material.materials, material.typeID]); // eslint-disable-line no-unused-vars
    Object.keys(quants).forEach((ID) => {
      if (!quantities[ID]) {
        quantities[ID] = quants[ID];
        // quantities[ID].count = quants[ID].count * count;
      } else {
        // does this ever even run?
        // quantities[ID].count += quants[ID].count * count;
      }
    });
  });
  return [materials, quantities];
}

export function blueprintList (typeID) {
  let baseItem;
  return Promise
  .resolve(typeID)
  .then(findItem)
  .then((item) => {
    baseItem = item;
    return item;
  })
  .then(findMaterials)
  .then((materials) => {
    return [materials, baseItem.typeID];
  })
  .then(extractQuantities)
  .then(([materials, quantities]) => {
    return {
      typeName: baseItem.typeName,
      typeID,
      materials,
      quantities
    };
  });
}

function findMaterials ({typeID}) {
  return IAMaterials.findAll({
    where: {
      typeID,
      activityID: 1
    },
    attributes: ['materialTypeID', 'quantity']
  })
  .then((materials) => {
    const blueprintPromises = materials.map(({materialTypeID, quantity}) => {
      return findBlueprint(materialTypeID, +quantity);
    });
    return Promise
    .all(blueprintPromises)
    .then((groups) => {
      return Promise.all(groups.map(([materialTypeID, quantity, blueprint]) => {
        return Promise
        .resolve(materialTypeID)
        .then(findItem)
        .then((i) => {
          if (blueprint) {
            return Promise
            .resolve(blueprint.typeID)
            .then(findItem)
            .then(findMaterials)
            .then((mats) => {
              const quantityFactor = 1 / +blueprint.quantity;
              const adjustedMats = mats.map((material) => {
                return Object.assign({}, material, {
                  quantity: Math.ceil(material.quantity * quantityFactor)
                });
              });
              return {
                typeID: i.typeID,
                typeName: i.typeName,
                materials: adjustedMats,
                quantity
              };
            });
          } else {
            return Promise
            .resolve({
              typeID: i.typeID,
              typeName: i.typeName,
              quantity
            });
          }
        });
      }));
    });
  });
}

function findItem (typeID) {
  return Item
  .findOne({
    where: {
      typeID
    },
    attributes: ['typeID', 'typeName']
  });
}

function findBlueprint (productTypeID, quantity) {
  return Promise.all([
    Promise.resolve(productTypeID),
    Promise.resolve(quantity),
    IAProducts.findOne({
      where: {
        productTypeID
      },
      attributes: ['typeID', 'quantity']
    })
  ]);
}
