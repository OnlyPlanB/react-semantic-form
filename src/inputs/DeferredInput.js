import React from 'react';
import TextInput from './TextInput';

class DeferredInput extends React.Component {
  render() {
    return <TextInput ref="inp" {...this.props} />
  }

  getValue() {
    return this.refs.inp.getValue();
  }

  validate(value) {
    console.log("Deferring input validation for 1 second", value);
    return new Promise( resolve => {
      setTimeout( () => {
        console.log("Validating Deferred Input after 1 second", value);
        resolve(this.refs.inp.validate(value));
      }, 1000);
    });
  }

}

export default DeferredInput;
