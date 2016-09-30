import config from '../../config';
import passport from 'passport';
import OAuth2Strategy from 'passport-oauth2';
import {User} from '../../models';

class EveOnlineStrategy extends OAuth2Strategy {
  constructor (options, verify) {
    super(options, verify);
    if (!options.verifyURL) { throw new TypeError('EveOnlineStrategy requires a verifyURL option'); }
    this.verifyURL = options.verifyURL;
    this._oauth2.useAuthorizationHeaderforGET(true);
  }

  userProfile (accessToken, done) {
    this._oauth2.get(this.verifyURL, accessToken, (err, body) => {
      done(err, JSON.parse(body));
    });
  }
}

const eveOnlineStrategy = new EveOnlineStrategy({
  authorizationURL: 'https://login.eveonline.com/oauth/authorize',
  tokenURL: 'https://login.eveonline.com/oauth/token',
  verifyURL: 'https://login.eveonline.com/oauth/verify',
  clientID: config.eve.clientID,
  clientSecret: config.eve.clientSecret,
  callbackURL: 'https://56clindsey.com/eveBuddy/auth/eveOnline/callback'
}, (accessToken, refreshToken, profile, done) => {
  eveOnlineStrategy.userProfile(accessToken, (err, character) => {
    if (err) {
      return done(err);
    }
    User
    .findOrCreate({where: {id: character.CharacterID}, defaults: {name: character.CharacterName}})
    .spread((user/* , created */) => {
      done(null, {
        accessToken,
        ID: user.get('id'),
        name: user.get('name')
      });
    });
  });
});

passport.use(eveOnlineStrategy);

function auth (options) {
  return passport.authenticate('oauth2', options);
}

function loginSuccess (req, res) {
  res.redirect('/eveBuddy');
}

export default function (router) {
  router.route('/eveOnline').get(auth({scope: ['publicData', 'characterSkillsRead']}));
  router.route('/eveOnline/callback').get(auth({failureRedirect: '/login'}), loginSuccess);
}
