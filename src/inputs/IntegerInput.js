import React from 'react';
import TextInput from './TextInput';
import ValidationError from '../ValidationError';

class IntegerInput extends React.Component {

  getValue() {
    return this.refs.inp.getValue();
  }

  validate(value) {
    const {name, min, max} = this.props;
    return this.refs.inp.validate(value).then( (v) => {
      if (v === undefined) {
        return;
      }

      v = parseInt(value, 10);
      if (isNaN(v)) {
        throw new ValidationError(name, "Input must be a numeric integer", this);
      }

      if (max !== undefined && v > max) {
        throw new ValidationError(name, "Input must be less than " + this.props.max, this);
      }

      if (min !== undefined && v < min) {
        throw new ValidationError(name, "Input must be greater than " + this.props.min, this);
      }

      return v;
    });
  }

  render() {
    return <TextInput ref="inp" {...this.props} />
  }
}

export default IntegerInput;
