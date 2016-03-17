import React from 'react';

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue
    }
  }

  _onChange(e) {
    this.setState({
      value: e.target.value
    });

    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }

  getValue() {
    return this.state.value;
  }

  validate(value) {
    const v = value.trim();

    if (this.props.required && v.length===0) {
      throw "Value is required";
    }

    if (v.length === 0) {
      return null;
    }

    if (this.props.minLength !== undefined && v.length < this.props.minLength) {
      throw "Value must be at least " + this.props.minLength + " characters";
    }

    if (this.props.maxLength !== undefined && v.length > this.props.maxLength) {
      throw "Value must be less than " + this.props.maxLength + " characters";
    }

    return value;
  }

  render() {
    const { name, defaultValue, onChange, ...other } = this.props;
    return (
      <input name={name} {...other}
          value={this.state.value} onChange={this._onChange.bind(this)}
          />
    );
  }
}

export default TextInput;
