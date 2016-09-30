import React from 'react';

export default class LogInPrompt extends React.Component {
  render () {
    return (
      <div className="row">
        <div className="col-md-12 text-center">
          <h1>{'Not logged in'}</h1>
          <p className="lead">{'Please log in to use this feature'}</p>
          <a
              className="btn btn-lg btn-success"
              href="/eveBuddy/auth/eveOnline"
          >{'Log In »'}</a>
        </div>
      </div>
    );
  }
}
