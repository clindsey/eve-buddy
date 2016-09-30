import express from 'express';
import bodyParser from 'body-parser';
import config from './config';
import session from 'express-session';
import fallback from 'express-history-api-fallback';
import passport from 'passport';

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

const app = express();
const apiRouter = express.Router();
const authRouter = express.Router();

import eveOnlineRoute from './routes/auth/eveOnline';
eveOnlineRoute(authRouter);

import itemsRoute from './routes/api/items';
import materialsRoute from './routes/api/materials';
import blueprintsRoute from './routes/api/blueprints';
import userRoute from './routes/api/user';
import catalogRoute from './routes/api/catalog';

itemsRoute(apiRouter);
materialsRoute(apiRouter);
blueprintsRoute(apiRouter);
userRoute(apiRouter);
catalogRoute(apiRouter);

const root = `${__dirname}/${config.appAssetsLocation}`;

app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  secret: config.crypto.password,
  resave: false,
  saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use('//auth', authRouter); // i think the double slash is required because of the reverse proxy with apache?
app.use('//api', apiRouter);
app.use(express.static(root));
app.use(fallback('index.html', {root}));
app.listen(config.port);

console.log(`listening on port ${config.port}`);
