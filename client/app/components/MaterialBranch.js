import React from 'react';
import ReactSliderNativeBootstrap from 'react-bootstrap-native-slider';

class MaterialBranch extends React.Component {
  constructor (props) {
    super(props);
    this._onChangeME = this._onChangeME.bind(this);
    this.state = {
      materialEfficiencyPercent: 10
    };
  }

  _onChangeME (event) {
    this.setState({ // eslint-disable-line react/no-set-state
      materialEfficiencyPercent: parseInt(event.target.value, 10)
    });
  }

  buildMaterial (count) {
    return (materialTypeID) => {
      const key = `${this.props.material.typeID}_${materialTypeID}`;
      const material = this.props.tree[materialTypeID];
      return (
        <MaterialBranch
            count={this.props.quantities[key].count * count}
            key={key}
            material={material}
            materialEfficiencyFactor={1 - (this.state.materialEfficiencyPercent / 100)}
            onMaterialsChange={this.props.onMaterialsChange}
            productTypeID={this.props.material.typeID}
            quantities={this.props.quantities}
            tree={this.props.tree}
        />
      );
    };
  }

  buildSlider () {
    return (
      <div className="row">
        <div className="col-md-2">
          <h4><span className="glyphicon glyphicon-open-file"></span>{`${this.state.materialEfficiencyPercent}%`}</h4>
        </div>
        <div className="col-md-4 material-efficiency-slider">
          <ReactSliderNativeBootstrap
              handleChange={this._onChangeME}
              max={10}
              min={0}
              step={1}
              value={this.state.materialEfficiencyPercent}
          />
        </div>
      </div>
    );
  }

  buildBranch (typeID, typeName, slider, materials, count) {
    const uuid = (+(new Date()) + ~~(Math.random() * 999999)).toString(36);
    return (
      <div className="panel panel-default">
        <div
            className="panel-heading"
        >
          <div className="pull-right">
            <button
                className="btn btn-link"
                data-target={`#${uuid}`}
                data-toggle="collapse"
            ><span className="glyphicon glyphicon-triangle-bottom"></span></button>
          </div>
          <img
              alt={typeName}
              src={`https://image.eveonline.com/Type/${typeID}_32.png`}
              style={{width: '32px', height: '32px', display: 'inline-block'}}
          />&nbsp;
          <h3
              className="panel-title"
              style={{display: 'inline-block'}}
          >{typeName} <span className="badge">{count.toLocaleString()}</span></h3>
          {slider}
        </div>
        <div
            className="panel-collapse collapse in"
            id={uuid}
        >
          <div className="panel-body">
            {materials}
          </div>
        </div>
      </div>
    );
  }

  buildLeaf (typeID, typeName, slider, materials, count) {
    return (
      <div className="media">
        <div className="media-left">
          <img
              alt={typeName}
              className="media-object"
              src={`https://image.eveonline.com/Type/${typeID}_32.png`}
              style={{width: '32px', height: '32px'}}
          />
        </div>
        <div className="media-body">
          <h4 className="media-heading">{typeName} <span className="badge">{count.toLocaleString()}</span></h4>
          {slider}
          {materials}
        </div>
      </div>
    );
  }

  render () {
    const meFactor = this.props.materialEfficiencyFactor;
    const count = Math.ceil(meFactor * this.props.count);
    let materials = [];
    let slider = '';
    const hasMaterials = !!this.props.material.materials;
    if (hasMaterials) {
      materials = this.props.material.materials.map(this.buildMaterial(count));
      slider = this.buildSlider();
    } else { // no materials, a leaf-node
      this.props.onMaterialsChange(this.props.productTypeID, this.props.material.typeName, count);
    }
    const {typeID, typeName} = this.props.material;
    if (hasMaterials) {
      return this.buildBranch(typeID, typeName, slider, materials, count);
    } else {
      return this.buildLeaf(typeID, typeName, slider, materials, count);
    }
  }
}

MaterialBranch.propTypes = {
  count: React.PropTypes.number,
  material: React.PropTypes.object,
  materialEfficiencyFactor: React.PropTypes.number,
  onMaterialsChange: React.PropTypes.func,
  productTypeID: React.PropTypes.string,
  quantities: React.PropTypes.object,
  tree: React.PropTypes.object
};

export default MaterialBranch;
