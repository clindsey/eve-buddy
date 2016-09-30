import React from 'react';
import NavHeader from '../components/NavHeader';
import {connect} from 'react-redux';
import {loadUser} from '../actions/user';

class App extends React.Component {
  componentDidMount () {
    this.props.loadUser();
  }

  render () {
    return (
      <div>
        <NavHeader
            user={this.props.user}
            isAuthorized={this.props.isAuthorized}
        />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12 main">
              {this.props.children}
              <hr />
              <footer>
                <p>{'© 2016 Buddy Mutt'}</p>
              </footer>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state /* , ownProps */) {
  const {user} = state;
  const {isAuthorized} = user;
  return {
    isAuthorized,
    user
  };
}

const mapDispatchToProps = {
  loadUser
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
