import {Catalog} from '../../models/';

function putCatalog (req, res) {
  if (!req.user) {
    return res.json({error: 'Not logged in !'});
  }
  const {typeID, name, manifest} = req.body;
  Catalog
  .findOrCreate({where: {typeID, UserId: req.user.ID}, defaults: {typeID, name, manifest: manifest}})
  .spread((catalog, created) => {
    if (created) {
      catalog.setUser(req.user.ID);
      res.json(catalog);
    } else {
      catalog.update({manifest});
      res.json(catalog);
    }
  });
}

export default function (router) {
  router.route('/catalog/:typeID')
  .put(putCatalog);
}
