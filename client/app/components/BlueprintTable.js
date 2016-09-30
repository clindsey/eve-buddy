import {Table, Column, Cell} from 'fixed-data-table';
import Dimensions from 'react-dimensions';
import React from 'react';
import {Link} from 'react-router';
import config from '../config';

class BlueprintTable extends React.Component {
  constructor (props) {
    super(props);
    this._onClick = this._onClick.bind(this);
  }

  _onClick (typeID) {
    return () => {
      this.props.onItemSelect(typeID);
    };
  }

  render () {
    const options = this.props.options;
    return (
      <Table
          headerHeight={38}
          height={120}
          rowHeight={38}
          rowsCount={options.length}
          width={this.props.containerWidth}
      >
        <Column
            cell={({rowIndex, ...props}) => {
              const {typeName, typeID} = options[rowIndex];
              return (
                <Cell {...props}>
                  <Link
                      onClick={this._onClick(typeID)}
                      to={`/${config.locationRoot}/${this.props.endpoint}/${typeID}/${typeName}`}
                  >{typeName}</Link>
                </Cell>
              );
            }}
            header={<Cell>{'Blueprints'}</Cell>}
            width={this.props.containerWidth}
        />
      </Table>
    );
  }
}

BlueprintTable.propTypes = {
  endpoint: React.PropTypes.string.isRequired,
  onItemSelect: React.PropTypes.func.isRequired,
  options: React.PropTypes.array.isRequired
};

export default Dimensions()(BlueprintTable);
