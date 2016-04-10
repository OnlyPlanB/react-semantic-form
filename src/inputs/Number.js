import React from 'react';
import Text from './Text';
import ValidationError from '../ValidationError';

class Number extends React.Component {

  getValue() {
    return this.refs.inp.getValue();
  }

  validate(value) {
    const { name, minValue, minValueMsg, maxValue, maxValueMsg } = this.props;
    return this.refs.inp.validate(value).then( v => {
      const num = parseFloat(v);
      if (isNaN(num)) {
        return Promise.reject(new ValidationError(this, name, "Value is not a number"));
      }

      if (minValue !== undefined && num < minValue) {
        return Promise.reject(new ValidationError(this, name, minValueMsg || ("Value must be greater than or equals to " + minValue)));
      }
      if (maxValue !== undefined && num > maxValue) {
        return Promise.reject(new ValidationError(this, name, maxValueMsg || ("Value must be less than or equals to " + maxValue)));
      }

      return num;
    });
  }

  render() {
    return <Text ref="inp" {...this.props}/>
  }
}

export default Number;
