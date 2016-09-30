import React from 'react';
import {Link} from 'react-router';
import config from '../config';

export default class InventoryItem extends React.Component {
  constructor (props) {
    super(props);
    this._onChange = this._onChange.bind(this);
    this._onPlus = this._onPlus.bind(this);
    this._onMinus = this._onMinus.bind(this);
  }

  _onChange (event) {
    const quantity = parseInt(this.refs.quantityInput.value, 10);
    if (isNaN(quantity)) {
      event.preventDefault();
      return;
    }
    this.props.changeCount(this.props.itemName, quantity);
  }

  _onPlus () {
    const quantity = parseInt(this.refs.quantityInput.value, 10);
    this.props.changeCount(this.props.itemName, quantity + 1);
  }

  _onMinus () {
    const quantity = parseInt(this.refs.quantityInput.value, 10);
    this.props.changeCount(this.props.itemName, Math.max(quantity - 1, 0));
  }

  render () {
    const uuid = (+(new Date()) + ~~(Math.random() * 999999)).toString(36);
    return (
      <div className="panel panel-default inventory-list__row">
        <div className="panel-heading">
          <div className="row">
            <div className="col-xs-6">
              <h4 className="panel-title inventory-list__item-row">
                <a
                    data-toggle="collapse"
                    href={`#${uuid}`}
                >{this.props.itemName}</a>
              </h4>
            </div>
            <div className="col-xs-6">
              <form className="form-inline row">
                <div className="form-group col-sm-6">
                  <input
                      className="form-control input-xs inventory-list__quantity-input form-control"
                      onChange={this._onChange}
                      ref="quantityInput"
                      type="text"
                      value={this.props.count}
                  />
                </div>
                <div className="form-group col-sm-6">
                  <div className="btn-group btn-group-xs">
                    <Link
                        className="btn btn-primary form-control inventory-list__control inventory-list__edit-link"
                        to={`/${config.locationRoot}/blueprint/${this.props.item.typeID}/${this.props.itemName}`}
                    >
                      <span className="glyphicon glyphicon-edit"></span>
                    </Link>
                    <button
                        className="btn btn-default form-control inventory-list__control"
                        onClick={this._onMinus}
                        type="button"
                    >
                      <span className="glyphicon glyphicon-minus"></span>
                    </button>
                    <button
                        className="btn btn-default form-control inventory-list__control"
                        onClick={this._onPlus}
                        type="button"
                    >
                      <span className="glyphicon glyphicon-plus"></span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div
            className="collapse"
            id={uuid}
        >
          <table className="table">
            <thead>
              <tr>
                <th>{'Material'}</th>
                <th className="text-right">{'Quantity'}</th>
              </tr>
            </thead>
            <tbody>
              {this.props.item.manifest.map((item, materialIndex) => (
                <tr key={materialIndex}>
                  <td>{item.typeName}</td>
                  <td className="text-right">{item.count.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

InventoryItem.PropTypes = {
  changeCount: React.PropTypes.func.isRequired,
  count: React.PropTypes.string.isRequired,
  itemName: React.PropTypes.string.isRequired,
  item: React.PropTypes.object.isRequired
};
