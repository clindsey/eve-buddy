import React from 'react';
import {Link} from 'react-router';
import config from '../config';

export default class NavHeader extends React.Component {
  buildAuth () {
    if (!this.props.isAuthorized) {
      return (
        <a href={`/${config.locationRoot}/auth/eveOnline`}>{'Log In'}</a>
      );
    }
    return (
      <p className="navbar-text">
        <img
            className="nav-bar__portrait-thumb"
            src={this.props.user.portrait['32x32'].href.replace(/^http:/, 'https:')}
        />
        {`Hello, ${this.props.user.name}`}
      </p>
    );
  }

  render () {
    const authContent = this.buildAuth();
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="nav-header">
            <button
                aria-contraols="navbar"
                aria-expanded="false"
                className="navbar-toggle collapsed"
                data-target="#navbar"
                data-toggle="collapse"
                type="button"
            >
              <span className="sr-only">{'Toggle Navigation'}</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link
                className="navbar-brand"
                to={`/${config.locationRoot}/`}
            >{'eveBuddy'}</Link>
          </div>
          <div
              className="navbar-collapse collapse"
              id="navbar"
          >
            <ul className="nav navbar-nav">
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
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>{authContent}</li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
