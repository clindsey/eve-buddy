import Promise from 'bluebird';
import {industryActivityMaterials as IAMaterials, industryActivityProducts as IAProducts, invTypes as Item} from '../models/index';

export function shoppingList (orderDetails) {
  const blueprintIDs = Object.keys(orderDetails);
  const blueprintPromises = blueprintIDs.map((blueprintID) => {
    return Promise
    .resolve([
      blueprintID,
      orderDetails[blueprintID]
    ])
    .then(findMaterials);
  });
  return Promise.all(blueprintPromises)
  .then(generateManifest)
  .then(findBuildable);
}

function findBuildable (manifest) { // todo: refactor this
  return new Promise((resolve) => {
    const blueprintsPromises = Object.keys(manifest).map((materialTypeID) => {
      return Promise
      .resolve(materialTypeID)
      .then(findBlueprint);
    });
    Promise
    .all(blueprintsPromises)
    .then((groups) => {
      const orderDetails = {};
      groups.forEach(([productTypeID, blueprint]) => {
        if (!blueprint) {
          return;
        }
        orderDetails[blueprint.typeID] = manifest[productTypeID].count;
        delete manifest[productTypeID]; // trim non-leaf nodes
      });
      if (Object.keys(orderDetails).length) {
        shoppingList(orderDetails)
        .then((manifestB) => {
          mergeManifests(manifest, manifestB);
          resolve(manifest);
        });
      }
      if (Object.keys(manifest).length && !Object.keys(orderDetails).length) {
        resolve(manifest);
      } // todo: there might be a missing 3rd case here
    });
  });
}

function mergeManifests (manifest, manifestB) {
  Object.keys(manifestB).forEach((materialTypeID) => {
    const {count, material} = manifestB[materialTypeID];
    if (!manifest[materialTypeID]) {
      manifest[materialTypeID] = {material, count};
    } else {
      manifest[materialTypeID].count += count;
    }
  });
}

function findBlueprint (itemID) {
  return Promise.all([
    Promise.resolve(itemID),
    IAProducts.findOne({
      where: {
        productTypeID: itemID
      },
      attributes: ['typeID']
    })
  ]);
}

function findMaterials ([blueprintID, count]) {
  return Promise.all([
    IAMaterials.findAll({
      where: {
        typeID: blueprintID,
        activityID: 1
      },
      attributes: ['materialTypeID', 'quantity']
    }),
    Promise.resolve(count)
  ]);
}

function generateManifest (orders) {
  const manifest = {};
  orders.forEach(([items, count]) => {
    items.forEach((item) => {
      if (!manifest[item.materialTypeID]) {
        manifest[item.materialTypeID] = {
          count: 0,
          material: item
        };
      }
      manifest[item.materialTypeID].count += parseInt(item.quantity, 10) * count;
    });
  });
  return manifest;
}

export function generateList (manifest) {
  const counts = {};
  const itemPromises = Object.keys(manifest).map((materialTypeID) => {
    const {material, count} = manifest[materialTypeID];
    counts[materialTypeID] = count;
    return material.getItem();
  });
  return Promise.all([
    Promise.all(itemPromises),
    Promise.resolve(counts)
  ]);
}

export function getBlueprints (itemsManifest) {
  return new Promise((resolve) => {
    const blueprintPromises = Object.keys(itemsManifest).map((itemID) => {
      return Promise.all([
        Promise.resolve(itemID),
        IAProducts.findOne({
          where: {
            productTypeID: itemID
          },
          attributes: ['typeID']
        })
      ]);
    });
    Promise
    .all(blueprintPromises)
    .then((groups) => {
      const manifest = {};
      groups.forEach(([itemID, blueprint]) => {
        manifest[blueprint.typeID] = itemsManifest[itemID];
      });
      resolve(manifest);
    });
  });
}

export function getItemID (itemName) {
  return Item
  .findOne({
    where: {
      typeName: itemName
    },
    attributes: ['typeID']
  })
  .then(item => item.typeID);
}
