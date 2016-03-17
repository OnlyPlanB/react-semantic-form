import React from 'react';

function connectToForm(Component) {
  const FormInput = React.createClass({
    propTypes: {
      name: React.PropTypes.string.isRequired
    }

    contextTypes: {
      form: React.PropTypes.object
    }

    componentDidMount() {
      if (!this.refs.input.getValue) {
        console.warn("A form component must provide a getValue method that " +
                    "provides the value for the value for the component");
      }
      
      this.context.form.registerInput(this.props.name, this);
    }

    componentWillUnmount() {
      this.context.form.unregisterInput(this.props.name, this);
    }

    /**
     * This is the method called by the form to get the value.
     * It is allowed for the getValue method to return a promise. Make
     * sure the getValue method is provided in the component
     */
    getValue() {
      return this.refs.input.getValue();
    }

    render() {
      /* get the default value and provide it to the underlying component */
      const defaultValue = this.context.form.getDefaultValue(this.props.name);

      /* Override the defaultValue prop if its provided */
      return <Component ref="input" {...this.props} defaultValue={defaultValue} />;
    }
  });

  return FormInput;
}
