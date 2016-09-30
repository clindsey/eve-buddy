import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import config from '../config';

class Teams extends React.Component {
  render () {
    return (
      <div>
        <h1 className="page-header">{'Teams'}</h1>
        <p className="lead">{'Invite your manufacture collaborators and assign them to your projects'}</p>
      </div>
    );
  }
}

function mapStateToProps () {
  return {};
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Teams);
