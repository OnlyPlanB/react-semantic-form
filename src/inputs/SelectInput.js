import React from 'react';
import ValidationError from '../ValidationError';

class SelectInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue || ""
    }
  }

  render() {
    const { name, defaultValue, onChange, options, ...other } = this.props;
    return (
      <select name={name} {...other} onChange={this._onChange.bind(this)} value={this.state.value}>
        { Object.keys(options).map( (key) => <option key={key} value={key}>{options[key]}</option>)}
      </select>
    );
  }

  _onChange(e) {
    this.state.value = e.target.value;
    this.setState({
      value: this.state.value
    });
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }

  getValue() {
    return new Promise(resolve => resolve(this.state.value));
  }

  validate(value) {
    //const v = value.trim();
    const { name, required } = this.props;
    return new Promise( (resolve, reject) => {
      if ( required && v ) {
        throw new ValidationError(name, "Value is required", this);
      }

      resolve(v);
    });
  }
}

export default SelectInput;
