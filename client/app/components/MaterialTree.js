import React from 'react';
import MaterialBranch from './MaterialBranch';

class MaterialTree extends React.Component {
  constructor (props) {
    super(props);
    this._onMaterialsChange = this._onMaterialsChange.bind(this);
    this._onAddClick = this._onAddClick.bind(this);
    this.materials = {};
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.typeID !== this.props.typeID) {
      this.materials = {};
    }
  }

  aggregateMaterialCounts () {
    const counts = {};
    Object.keys(this.materials).forEach((productTypeID) => {
      const materials = this.materials[productTypeID];
      Object.keys(materials).forEach((materialTypeName) => {
        const quantity = materials[materialTypeName];
        if (!counts[materialTypeName]) {
          counts[materialTypeName] = 0;
        }
        counts[materialTypeName] += quantity;
      });
    });
    const aggregates = [];
    Object.keys(counts).forEach((typeName) => {
      const count = counts[typeName];
      aggregates.push({typeName, count});
    });
    return aggregates;
  }

  buildContent (typeID, typeName, materials, quantities, tree) {
    return (
      <MaterialBranch
          count={1}
          key={1}
          material={{typeName, typeID, materials}}
          materialEfficiencyFactor={1}
          onMaterialsChange={this._onMaterialsChange}
          productTypeID={typeID}
          quantities={quantities}
          tree={tree}
      />
    );
  }

  _onMaterialsChange (productTypeID, materialTypeID, quantity) {
    if (!this.materials[productTypeID]) {
      this.materials[productTypeID] = {};
    }
    this.materials[productTypeID][materialTypeID] = quantity;
  }

  _onAddClick () {
    const {tree, typeID} = this.props;
    const {typeName} = tree[typeID];
    this.props.addItem(typeID, typeName, this.aggregateMaterialCounts());
  }

  render () {
    const {tree, typeID, quantities, blueprintExists} = this.props;
    const buttonClass = blueprintExists ? 'btn-primary' : 'btn-success';
    const buttonCopy = blueprintExists ? 'Modify Entry' : 'Add to Catalog';
    const content = [];
    if (tree[typeID]) {
      content.push([(
        <h2 key={0}>{'Required Materials'}
          <button
              className={`btn ${buttonClass} btn-xs`}
              onClick={this._onAddClick}
              style={{marginLeft: '12px'}}
              type="button"
          ><span className="glyphicon glyphicon-plus"></span> {buttonCopy}</button>
        </h2>
      )]);
      const {typeName, materials} = tree[typeID];
      content.push(this.buildContent(typeID, typeName, materials, quantities, tree));
    }
    return (
      <div>
        {content}
      </div>
    );
  }
}

MaterialTree.propTypes = {
  addItem: React.PropTypes.func,
  blueprintExists: React.PropTypes.bool.isRequired,
  quantities: React.PropTypes.object,
  tree: React.PropTypes.object,
  typeID: React.PropTypes.string
};

export default MaterialTree;
