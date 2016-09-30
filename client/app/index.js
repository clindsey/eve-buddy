import 'bootstrap-webpack';
import './stylesheets/index.css';
import './stylesheets/react-bootstrap-table-all.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import ShoppingSearch from './containers/ShoppingSearch';
import {Router, IndexRoute, Route, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import configureStore from './stores/configureStore';
import {Provider} from 'react-redux';
import Home from './containers/Home';
import BlueprintSearch from './containers/BlueprintSearch';
import InventoryDisplay from './containers/InventoryDisplay';
import config from './config';
import Teams from './containers/Teams';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route
          component={App}
          path={`/${config.locationRoot}`}
      >
        <IndexRoute
            component={Home}
        />
        <Route
            component={ShoppingSearch}
            path="shopping"
        />
        <Route
            component={ShoppingSearch}
            path="shopping/:typeID/:typeName"
        />
        <Route
            component={BlueprintSearch}
            path="blueprint"
        />
        <Route
            component={BlueprintSearch}
            path="blueprint/:typeID/:typeName"
        />
        <Route
            component={InventoryDisplay}
            path="inventory"
        />
        <Route
            component={Teams}
            path="teams"
        />
      </Route>
    </Router>
  </Provider>
, document.getElementById('app'));
