import {blueprintList} from '../../utils/blueprints';
import Promise from 'bluebird';

function getBlueprints (req, res) {
  const {itemID} = req.params;
  Promise
  .resolve(itemID)
  .then(blueprintList)
  .then((orders) => {
    res.json(orders);
  });
}

export default function (router) {
  router.route('/blueprints/:itemID')
  .get(getBlueprints);
}
