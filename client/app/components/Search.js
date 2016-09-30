import React from 'react';

export default class Search extends React.Component {
  _onSubmit (e) {
    e.preventDefault();
  }

  componentDidMount () {
    this.refs.searchInput.value = this.props.searchQuery || '';
    this.refs.searchInput.focus();
  }

  render () {
    return (
      <form
          className="form-horizontal"
          onSubmit={this._onSubmit}
      >
        <div className="form-group">
          <label
              className="col-sm-2 control-label"
          >
            {this.props.displayLabel}
          </label>
          <div className="col-sm-10">
            <input
                className="form-control"
                onKeyUp={this.props.onKeyUp}
                ref="searchInput"
                type="text"
            />
          </div>
        </div>
      </form>
    );
  }
}

Search.propTypes = {
  displayLabel: React.PropTypes.string.isRequired,
  onKeyUp: React.PropTypes.func.isRequired,
  typeName: React.PropTypes.string
};
