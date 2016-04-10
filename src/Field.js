import React from 'react';
import Fieldset from './Fieldset';
import * as inputs from './inputs';
import { findDOMNode } from 'react-dom';

class Field extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      error: false
    }
  }

  componentDidMount() {
    const name = this.props.name;
    this.context.fieldset.registerInput(name, this);
  }

  componentWillUnmount() {
    const name = this.props.name;
    this.context.fieldset.unregisterInput(name, this);
  }

  getValue() {
    return this.refs.inp.getValue();
  }

  validate(value) {
    return this.refs.inp.validate(value).then(value => {
      this.setState({
        error: false
      });
      return value;
    }).catch(err => {
      console.log("Error ", err);
      this.setState({
        error: err.toString()
      });
    });
  }

  setFocus() {
    const inp = this.refs.inp;
    if (inp.setFocus) {
      inp.setFocus();
    } else {
      const node = findDOMNode(inp);
      if (node && node.focus) {
        node.focus();
      }
    }
  }

  render() {
    const { label, className, type, name, ...other } = this.props;
    const error = this.state.error;
    const Input = (typeof type === "string") ? (inputs.hasOwnProperty(type) ? inputs[type] : inputs.Text) : type;
    const defaultValue = this.context.fieldset.getDefaultValue(name);
    return (
      <div className={"inline fields ui grid"}>
        <div className={"four wide column field" + (error?" error":"")}>
          { label && <label>{label}</label> }
        </div>
        <div className={"twelve wide column field" + (error?" error":"")}>
          <Input ref="inp" name={name} {...other} value={defaultValue} />
          { typeof error==="string" && <p>{error}</p> }
        </div>
      </div>
    );
  }
}

Field.contextTypes = {
  fieldset: React.PropTypes.object
}

//
// Field.connect = function(component) {
//   return React.createClass({
//     contextTypes: {
//       fieldset: React.PropTypes.instanceOf(Fieldset)
//     },
//
//     componentDidMount() {
//       const name = this.props.name;
//       this.context.fieldset.registerInput(name, this.refs.inp);
//     },
//
//     componentWillUnmount() {
//       const name = this.props.name;
//       this.context.fieldset.unregisterInput(name, this.refs.inp);
//     },
//
//     render() {
//       return <component ref="inp" {...this.props} />
//     }
//
//   });
// }

export default Field;
