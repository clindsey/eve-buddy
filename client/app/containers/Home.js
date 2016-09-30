import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import config from '../config';

class Home extends React.Component {
  render () {
    return (
      <div>
        <div className="jumbotron">
          <h1 className="page-header">{'eveBuddy'}</h1>
          <p>{'Tools for EVE industrialists operating at large scales'}</p>
        </div>
        <div className="row">
          <div className="col-md-4">
            <h2>{'Catalog'}</h2>
            <p>{'Build your library of blueprints with their research levels'}</p>
            <p>
              <Link
                  className="btn btn-primary"
                  to={`/${config.locationRoot}/blueprint`}
              >{'Start Here »'}</Link>
            </p>
          </div>
          <div className="col-md-4">
            <h2>{'Projects'}</h2>
            <p>{'Manage your production jobs and shopping lists'}</p>
            <p>
              <Link
                  className="btn btn-default"
                  to={`/${config.locationRoot}/inventory`}
              >{'Go »'}</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps () {
  return {};
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
