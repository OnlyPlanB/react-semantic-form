import React from 'react';
import { findDOMNode } from 'react-dom';
import ValidationError from '../ValidationError';

class Boolean extends React.Component {
  getValue() {
    return Promise.resolve(findDOMNode(this.refs.inp).checked);
  }

  validate(value) {
    return Promise.resolve(value);
  }

  render() {
    const { name } = this.props;
    return (
      <div className="ui toggle checkbox">
        <input ref="inp" type="checkbox" name={name}/>
        <label />
      </div>
    )
  }
}

export default Boolean;
