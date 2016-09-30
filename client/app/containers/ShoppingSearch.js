import React from 'react';
import Search from '../components/Search';
import {connect} from 'react-redux';
import {loadItems} from '../actions/items';
import {loadMaterials} from '../actions/shopping';
import _ from 'lodash';
import BlueprintTable from '../components/BlueprintTable';
import MaterialTable from '../components/MaterialTable';
import {browserHistory} from 'react-router';

let shoppingSearchBound = false;

class ShoppingSearch extends React.Component {
  constructor (props) {
    super(props);
    this._onSearchKeyUp = this._onSearchKeyUp.bind(this);
    this._onItemSelect = this._onItemSelect.bind(this);
    this._onPathChange = this._onPathChange.bind(this);
    this.performSearch = _.throttle(this.performSearch, 125, {leading: false, trailing: true});
    if (!shoppingSearchBound) { // todo: this is so wrong
      browserHistory.listen(this._onPathChange);
      shoppingSearchBound = true;
    }
  }

  performSearch (query) {
    this.props.loadItems(query);
  }

  _onPathChange ({pathname}) {
    const [_unused, base, typeID, typeName] = pathname.split('/'); // eslint-disable-line no-unused-vars
    if (base === 'shopping' && typeID && typeName) {
      this.props.loadItems(decodeURI(typeName));
      this.props.loadMaterials(typeID);
    }
  }

  _onSearchKeyUp (event) {
    this.performSearch(event.target.value);
  }

  _onItemSelect (typeID) {
    this.props.loadMaterials(typeID);
  }

  render () {
    const itemsList = [];
    this.props.items.forEach((item) => {
      if (item) {
        itemsList.push(item);
      }
    });
    const materials = this.props.materials;
    const materialsList = Object.keys(materials).map((typeID) => {
      const material = materials[typeID];
      return material;
    });
    return (
      <div>
        <h1 className="page-header">{'Shopping'}</h1>
        <p className="lead">{'Get a list of materials required to build a blueprint, including t2.'}</p>
        <div className="row">
          <div className="col-md-12">
            <Search
                displayLabel={'Search'}
                onKeyUp={this._onSearchKeyUp}
                searchQuery={this.props.typeName}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-10 col-md-offset-2">
            <BlueprintTable
                endpoint="shopping"
                onItemSelect={this._onItemSelect}
                options={itemsList}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-10 col-md-offset-2">
            <MaterialTable
                options={materialsList}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state, ownProps) {
  const {
    entities: {items, materials}
  } = state;
  const {typeID, typeName} = ownProps.params;
  return {
    items,
    materials,
    typeID,
    typeName
  };
}

const mapDispatchToProps = {
  loadItems,
  loadMaterials
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingSearch);
