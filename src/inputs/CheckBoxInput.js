import React from 'react';
import ValidationError from '../ValidationError';

class CheckBoxInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: props.defaultValue || []
    }
  }

  _onChange(e) {
    const res = this.state.values;
    if (e.target.checked) {
      res.push(e.target.value);
    } else {
      res.splice(res.indexOf(e.target.value), 1);
    }

    this.setState({
      values: res
    });

    this.props.onChange && this.props.onChange(e);
  }

  getValue() {
    return new Promise( resolve => resolve(this.state.values) );
  }

  validate(value) {
    const {name, minSelection, maxSelection, required} = this.props;
    return new Promise( (resolve, reject) => {
      if (required && value.length === 0) {
        throw new ValidationError(name, "One of the value must be selected", this);
      }
      if (minSelection !== undefined && value.length < minSelection) {
        throw new ValidationError(name, "At least " + minSelection + " options must be selected", this);
      }
      if (maxSelection !== undefined && value.length > maxSelection) {
        throw new ValidationError(name, "Only upto " + maxSelection + " options can be selected", this);
      }

      resolve(value.length === 0 ? undefined : value);
    });
  }

  render() {
    const { options, name, optionClass } = this.props;
    let values, texts;
    if (options instanceof Array) {
      values = texts = options;
    } else if (typeof options === "object") {
      values = Object.keys(options);
      texts = values.map( key => options[key] );
    } else {
      values = texts = [];
    }
    
    return (
      <div>
        { texts.map( (text, index) => (
          <div className={ optionClass || "checkbox" } key={values[index]}>
            <label>
              <input type="checkbox" name={name} value={values[index]}
                    onChange={this._onChange.bind(this)}
                    checked={this.state.values.indexOf(values[index]) > -1} />
              {text}
            </label>
          </div>
        ))}
      </div>
    );
  }
}

export default CheckBoxInput;