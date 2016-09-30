import {Table, Column, Cell} from 'fixed-data-table';
import Dimensions from 'react-dimensions';
import React from 'react';
import Clipboard from 'clipboard';

class MaterialTable extends React.Component {
  componentDidMount () {
    this.clipboard = new Clipboard(this.refs.clipboard, {
      text: () => {
        return this.props.options.reduce((prev, {typeName, count}) => {
          return `${prev}\n${count}\t${typeName}`;
        }, '');
      }
    });
  }

  componentWillUnmount () {
    this.clipboard.destroy();
  }

  render () {
    const options = this.props.options;
    return (
      <div>
        <h2>{'Materials List'}
          <button
              className="btn btn-link glyphicon glyphicon-copy"
              ref="clipboard"
              type="button"
          ></button>
        </h2>
        <Table
            headerHeight={38}
            height={280}
            rowHeight={38}
            rowsCount={options.length}
            width={this.props.containerWidth}
        >
          <Column
              align="right"
              cell={({rowIndex, ...props}) => {
                const {count} = options[rowIndex];
                return (
                  <Cell {...props}>
                    {count.toLocaleString()}
                  </Cell>
                );
              }}
              header={<Cell>{'Quantity'}</Cell>}
              width={100}
          />
          <Column
              cell={({rowIndex, ...props}) => {
                const {typeName} = options[rowIndex];
                return (
                  <Cell {...props}>
                    {typeName}
                  </Cell>
                );
              }}
              header={<Cell>{'Material'}</Cell>}
              width={this.props.containerWidth - 100}
          />
        </Table>
      </div>
    );
  }
}

MaterialTable.propTypes = {
  options: React.PropTypes.array.isRequired
};

export default Dimensions()(MaterialTable);
