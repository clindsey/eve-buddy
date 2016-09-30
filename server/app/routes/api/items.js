import {invTypes as Item} from '../../models';
import url from 'url';

function getItems (req, res) {
  const {query} = url.parse(req.url, true);
  Item.search(query.q)
  .then(function ([items]) {
    res.json(items);
  });
}

export default function (router) {
  router.route('/items')
  .get(getItems);
}
