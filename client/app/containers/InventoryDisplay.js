import React from 'react';
import {connect} from 'react-redux';
import InventoryList from '../components/InventoryList';
import ShoppingList from '../components/ShoppingList';
import {filter, changeCount, clearCount} from '../actions/inventory';
import LogInPrompt from '../components/LogInPrompt';

class InventoryDisplay extends React.Component {
  buildContent () {
    return (
      <div className="row">
        <div className="col-md-6">
          <InventoryList
              changeCount={this.props.changeCount}
              clearCount={this.props.clearCount}
              counts={this.props.counts}
              emptyItems={this.props.emptyItems}
              filter={this.props.filter}
              filterTerm={this.props.filterTerm}
              items={this.props.items}
          />
        </div>
        <div className="col-md-6">
          <ShoppingList
              counts={this.props.counts}
              items={this.props.items}
          />
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
        <h1 className="page-header">{'Projects'}</h1>
        <p className="lead">{'Manage your production jobs and shopping lists'}</p>
        {content}
      </div>
    );
  }
}

function mapStateToProps (state) {
  const {
    inventory: {items, counts, filterTerm},
    user: {isAuthorized}
  } = state;
  const emptyItems = Object.keys(items).length === 0;
  return {
    isAuthorized,
    counts,
    emptyItems,
    filterTerm,
    items
  };
}

const mapDispatchToProps = {
  changeCount,
  clearCount,
  filter
};

export default connect(mapStateToProps, mapDispatchToProps)(InventoryDisplay);
