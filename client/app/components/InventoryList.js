import React from 'react';
import InventoryItem from './InventoryItem';
import _ from 'underscore';
import {Link} from 'react-router';
import config from '../config';

export default class InventoryList extends React.Component {
  constructor (props) {
    super(props);
    this._onClear = this._onClear.bind(this);
    this._onBlueprintFilter = _.debounce(this._onBlueprintFilter.bind(this), 125);
  }

  buildInventoryList (filteredIndices) {
    return Object.keys(this.props.items).map((itemKey, index) => {
      const itemName = this.props.items[itemKey].name;
      if (filteredIndices.length && filteredIndices.indexOf(index) < 0) {
        return null;
      }
      if (this.props.filterTerm && !filteredIndices.length) {
        return null;
      }
      return (
        <InventoryItem
            changeCount={this.props.changeCount}
            count={this.props.counts[itemName]}
            item={this.props.items[itemKey]}
            itemName={itemName}
            key={index}
        />
      );
    });
  }

  findFilteredIndices () {
    return Object.keys(this.props.items).reduce((prev, curr, index) => {
      const match = curr.toLowerCase().match(new RegExp(this.props.filterTerm, 'i'));
      if (match) {
        prev.push(index);
      }
      return prev;
    }, []);
  }

  _onClear () {
    this.props.clearCount();
  }

  _onBlueprintFilter () {
    this.props.filter(this.refs.blueprintFilter.value);
  }

  buildFilter () {
    return (
      <div className="row">
        <div className="col-md-12">
          <form className="clearfix form-horizontal blueprint-list__filter-input">
            <div className="from-group">
              <label className="col-sm-2 control-label">{'Filter'}</label>
              <div className="col-sm-10">
                <input
                    className="form-control"
                    onKeyDown={this._onBlueprintFilter}
                    ref="blueprintFilter"
                    type="text"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  render () {
    const filteredIndices = this.findFilteredIndices();
    const inventoryList = this.buildInventoryList(filteredIndices);
    const filter = this.props.emptyItems ? null : this.buildFilter();
    let content = inventoryList;
    if (this.props.emptyItems) {
      content = (
        <div>
          <h2>{'Oops! No blueprints in catalog yet'}</h2>
          <p className="alert-content bg-danger">{'Search for blueprints you own and create a catalog with their research levels'}</p>
          <Link
              className="btn btn-primary"
              to={`/${config.locationRoot}/blueprint`}
          >{'Start Here »'}</Link>
        </div>
      );
    }
    return (
      <div>
        <h3 className="material-list__header">{'Blueprints'}
          <button
              className="btn btn-link"
              onClick={this._onClear}
              ref="clearQuantities"
              title={'Clear Quantities'}
              type="button"
          ><span className="glyphicon glyphicon-remove-sign"></span></button>
        </h3>
        <hr />
        {filter}
        <div className="row">
          <div className="col-md-12">
            {content}
          </div>
        </div>
      </div>
    );
  }
}

InventoryList.PropTypes = {
  changeCount: React.PropTypes.func.isRequired,
  clearCount: React.PropTypes.func.isRequired,
  counts: React.PropTypes.object.isRequired,
  filter: React.PropTypes.func.isRequired,
  filterTerm: React.PropTypes.string.isRequired,
  items: React.PropTypes.object.isRequired,
  emptyItems: React.PropTypes.bool.isRequired
};
