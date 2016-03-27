import React from 'react';
import ValidationError from '../ValidationError';

class BooleanInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue || false
    }
  }

  _onChange(e) {
    this.state.value = e.target.checked;
    this.setState({
      value: this.state.value
    });
    if(this.props.onChange) {
      this.props.onChange(e);
    }
  }

  getValue() {
    return Promise.resolve(this.state.value);
  }

  validate(value) {
    return Promise.resolve(value);
  }

  render() {
    const { name, defaultValue, onChange, ...other } = this.props;
    return (
      <div {...other} className="checkbox" >
        <label>

          <input name={name} type="checkbox"
                checked={this.state.value} onChange={this._onChange.bind(this)}
                />
        </label>
      </div>
    );
  }
}

export default BooleanInput;
