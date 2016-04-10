import React from 'react';
import Fieldset from './Fieldset';
import { findDOMNode } from 'react-dom';

class Form extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  getChildContext() {
    return {
      fieldset: this
    }
  }
  componentDidMount() {
    // Find out the first input component and set focus on that
    const inp = this.refs.set.getFirstInput();
    if (inp) {
      if (inp.setFocus) {
        inp.setFocus();
      } else {
        const node = findDOMNode(inp);
        if (node && node.focus) {
          node.focus();
        }
      }
    }

  }
  registerInput(name, component) {
    //return this.refs.set.registerInput(name, component);
  }

  unregisterInput(name, component) {
    //return this.refs.set.unregisterInput(name, component);
  }

  getDefaultValue(name) {
    //return this.refs.set.getDefaultValue(name);
  }

  getValue() {
    return this.refs.set.getValue();
  }

  validate(value) {
    return this.refs.set.validate(value);
  }
  _onKeyDown(e) {
    if (e.keyCode == 13) {
      // Try to submit this form
      this.getValue().then(v => {
        return this.validate(v);
      }).then(v => {
        console.log("Submit::", JSON.stringify(v));
      })
    }
  }


  render() {
    const {children, ...other} = this.props;

    return (
      <Fieldset ref="set" className="ui form" {...other}
            onKeyDown={this._onKeyDown.bind(this)}>
        {children}
      </Fieldset>
    );
  }
}

Form.childContextTypes = {
  fieldset: React.PropTypes.object
}

Form.propTypes = {
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.object,
  attributes: React.PropTypes.arrayOf(React.PropTypes.object),
  suppress: React.PropTypes.object
}

export default Form;
