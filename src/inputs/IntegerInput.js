import React from 'react';
import TextInput from './TextInput';

class IntegerInput extends React.Component {

  getValue() {
    return this.inp.getValue();
  }

  validate(value) {
    const v = parseInt(this.inp.validate(value), 10);
    if (v === NaN) {
      throw "Input must be a numeric integer";
    }

    if (this.props.max !== undefined && v > this.props.max) {
      throw "Input must be less than " + this.props.max;
    }

    if (this.props.min !== undefined && v < this.props.min) {
      throw "Input must be greater than " + this.props.min;
    }

    return v;
  }

  render() {
    return <TextInput ref="inp" {...this.props} />
  }
}

export default IntegerInput;
