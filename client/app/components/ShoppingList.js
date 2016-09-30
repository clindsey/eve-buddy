import React from 'react';
import Clipboard from 'clipboard';

export default class ShoppingList extends React.Component {
  componentDidMount () {
    this.clipboard = new Clipboard(this.refs.clipboard, {
      text: () => {
        const materials = this.getRequiredMaterials();
        return Object.keys(materials).reduce((prev, typeName) => {
          const count = materials[typeName];
          return `${prev}\n${count}\t${typeName}`;
        }, '');
      }
    });
  }

  componentWillUnmount () {
    this.clipboard.destroy();
  }

  getRequiredMaterials () {
    const requiredMaterials = {};
    Object.keys(this.props.items).forEach((itemKey) => {
      const itemName = this.props.items[itemKey].name;
      const count = this.props.counts[itemName];
      if (count <= 0) {
        return;
      }
      const {manifest} = this.props.items[itemKey];
      manifest.forEach((material) => {
        if (!requiredMaterials[material.typeName]) {
          requiredMaterials[material.typeName] = 0;
        }
        requiredMaterials[material.typeName] += material.count * count;
      });
    });
    return requiredMaterials;
  }

  buildMaterialRows (requiredMaterials) {
    return Object.keys(requiredMaterials).map((typeName, index) => {
      const count = requiredMaterials[typeName];
      return (
        <tr key={index}>
          <td>{typeName}</td>
          <td className="text-right">{count.toLocaleString()}</td>
        </tr>
      );
    });
  }

  render () {
    const requiredMaterials = this.getRequiredMaterials();
    const materialRows = this.buildMaterialRows(requiredMaterials);
    return (
      <div>
        <h3 className="material-list__header">{'Items to Buy'}
          <button
              className="btn btn-link"
              ref="clipboard"
              title={'Copy to Clipboard'}
              type="button"
          ><span className="glyphicon glyphicon-copy"></span></button>
        </h3>
        <hr />
        <table className="table">
          <thead>
            <tr>
              <th>{'Material'}</th>
              <th className="text-right">{'Quantity'}</th>
            </tr>
          </thead>
          <tbody>
            {materialRows}
          </tbody>
        </table>
      </div>
    );
  }
}

ShoppingList.PropTypes = {
  counts: React.PropTypes.object.isRequired,
  items: React.PropTypes.object.isRequired
};
