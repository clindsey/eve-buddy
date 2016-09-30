import Promise from 'bluebird';
import {generateList, shoppingList/* , getBlueprints */} from '../../utils/shoppingList';

function getMaterials (req, res) {
  const {itemID} = req.params;
  const manifest = {};
  manifest[itemID] = 1;
  Promise
  .resolve(manifest)
  // .then(getBlueprints)
  .then(shoppingList)
  .then(generateList)
  .then(([items, counts]) => {
    const output = [];
    items.forEach(({typeID, typeName}) => {
      output.push({
        typeID,
        typeName,
        count: counts[typeID]
      });
    });
    res.json(output);
  });
}

export default function (router) {
  router.route('/materials/:itemID')
  .get(getMaterials);
}
