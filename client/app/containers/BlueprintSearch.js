import React from 'react';
import Search from '../components/Search';
import {connect} from 'react-redux';
import {loadItems} from '../actions/items';
import {loadBlueprint} from '../actions/blueprints';
import _ from 'lodash';
import BlueprintTable from '../components/BlueprintTable';
import {browserHistory} from 'react-router';
import MaterialTree from '../components/MaterialTree';
import {addItem} from '../actions/inventory';
import LogInPrompt from '../components/LogInPrompt';

let blueprintSearchBound = false;

class BlueprintSearch extends React.Component {
  constructor (props) {
    super(props);
    this._onSearchKeyUp = this._onSearchKeyUp.bind(this);
    this._onItemSelect = this._onItemSelect.bind(this);
    this._onPathChange = this._onPathChange.bind(this);
    this.performSearch = _.throttle(this.performSearch, 125, {leading: false, trailing: true});
    if (!blueprintSearchBound) { // todo: this is so wrong
      browserHistory.listen(this._onPathChange);
      blueprintSearchBound = true;
    }
  }

  performSearch (query) {
    this.props.loadItems(query);
  }

  _onPathChange ({pathname}) {
    const [_unused, _alsoUnused, base, typeID, typeName] = pathname.split('/'); // eslint-disable-line no-unused-vars
    if (base === 'blueprint' && typeID && typeName) {
      this.props.loadItems(decodeURI(typeName));
      this.props.loadBlueprint(typeID);
    }
  }

  _onSearchKeyUp (event) {
    this.performSearch(event.target.value);
  }

  _onItemSelect (typeID) {
    this.props.loadBlueprint(typeID);
  }

  buildContent () {
    const itemsList = [];
    this.props.items.forEach((item) => {
      if (item) {
        itemsList.push(item);
      }
    });
    return (
      <div>
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
                endpoint="blueprint"
                onItemSelect={this._onItemSelect}
                options={itemsList}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-10 col-md-offset-2">
            <MaterialTree
                addItem={this.props.addItem}
                blueprintExists={this.props.blueprintExists}
                quantities={this.props.quantities}
                tree={this.props.blueprints}
                typeID={this.props.typeID}
            />
          </div>
        </div>
      </div>
    );
  }

  render () {
    let content;
    if (this.props.isAuthorized) {
      content = this.buildContent();
    } else {
      content = (
        <LogInPrompt />
      );
    }
    return (
      <div>
        <h1 className="page-header">{'Catalog'}</h1>
        <p className="lead">{'Build your library of blueprints with their research levels'}</p>
        {content}
      </div>
    );
  }
}

function mapStateToProps (state, ownProps) {
  const {
    entities: {items, blueprints, quantities},
    inventory,
    user: {isAuthorized}
  } = state;
  const {typeID, typeName} = ownProps.params;
  const blueprintExists = !!inventory.items[typeName];
  return {
    blueprintExists,
    blueprints,
    items,
    quantities,
    typeID,
    typeName,
    isAuthorized
  };
}

const mapDispatchToProps = {
  addItem,
  loadBlueprint,
  loadItems
};

export default connect(mapStateToProps, mapDispatchToProps)(BlueprintSearch);
