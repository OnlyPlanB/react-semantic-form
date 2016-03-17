import React from 'react';
import TextInput from './TextInput';
import ValidationError from '../ValidationError';
import moment from 'moment';

class DateInput extends React.Component {
  render() {
    return <TextInput ref="inp" {...this.props} type="date" />
  }

  getValue() {
    return this.refs.inp.getValue();
  }

  validate(value) {
    const {name, format, min, max} = this.props;
    return this.refs.inp.validate(value).then( (value) => {
      if (value === undefined) {
        return undefined;
      }
      const date = moment(value);
      if (!date.isValid()) {
        throw new ValidationError(name, "Input is not a valid date", this);
      }
      if (min !== undefined && date.isBefore(min)) {
        throw new ValidationError(name, "Input must be after " + moment(min).format("YYYY-MMM-DD"));
      }
      if (max !== undefined && date.isAfter(max)) {
        throw new ValidationError(name, "Input must be before " + moment(max).format("YYYY-MMM-DD"));
      }

      return format ? date.format(format) : date.toISOString();
    })
  }
}

export default DateInput;
