import request from 'request';
import {Catalog} from '../../models';

function handleCharacter (req, res) {
  return (err, httpResponse, body) => {
    const {name, id, portrait} = JSON.parse(body);
    Catalog
    .findAll({where: {UserId: id}})
    .then((catalog) => {
      res.json({ID: 0, user: {name, id, portrait}, catalog});
    });
  };
}

function getCharacter (req, res) {
  if (req.user) {
    const {accessToken, ID} = req.user;
    request.get({
      url: `${'https://'}crest-tq.eveonline.com/characters/${ID}/`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }, handleCharacter(req, res));
  } else {
    res.json({ID: 0, user: {error: 'User not logged in.'}});
  }
}

export default function (router) {
  router.route('/user')
  .get(getCharacter);
}
