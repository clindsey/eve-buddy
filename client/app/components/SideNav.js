import React from 'react';
import {Link} from 'react-router';
import config from '../config';

export default class SideNav extends React.Component {
  render () {
    return (
      <div>
        <ul className="nav nav-sidebar">
          <li>
            <Link
                activeClassName="active"
                onlyActiveOnIndex
                to={`/${config.locationRoot}`}
            >{'Home'}</Link>
          </li>
          <li>
            <Link
                activeClassName="active"
                to={`/${config.locationRoot}/blueprint`}
            >{'Catalog'}</Link>
          </li>
          <li>
            <Link
                activeClassName="active"
                to={`/${config.locationRoot}/inventory`}
            >{'Projects'}</Link>
          </li>
          <li>
            <Link
                activeClassName="active"
                to={`/${config.locationRoot}/teams`}
            >{'Teams'}</Link>
          </li>
        </ul>
      </div>
    );
  }
}
