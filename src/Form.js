import React, { PropTypes } from 'react';
import Fieldset from './Fieldset';

class Form extends React.Component {
  constructor(props, context) {
    super(props, context);

    // A list of input elements available on this form
    // populated through the context by the the child inputs
    this.inputs = {};

    this.state.preset = this.props.preset;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      preset: nextProps.preset
    });
  }

  getChildContext() {
    return {
      form: this
    }
  }

  /* Get all the values of the input elements in the form "async" */
  serialize() {
    return new Promise((resolve, reject) => {
      const res = {};
      const promiseNames = [];
      const promises = [];
      Object.assign(res, this.state.preset);
      for(let inp in this.inputs) {
        const v = inputs[inp].getValue();
        if (v instanceof Promise) {
          promiseNames.push(inp);
          promises.push(v);
        } else {
          res[inp] = v;
        }
      }

      if (promises.length == 0) {
        return resolve(res);
      }
      // If there are any promises wait for the promises to complete
      return Promise.all(promises).then( (values) => {
        for(let i of promiseNames) {
          res[promiseNames[i]] = values[i]
        }
        resolve(res);
      })
    });
  }

  render() {
    const { children } = this.props;
    if (!children) {
      children = Form.generate(props.attributes);
    }
    return (
      <form onSubmit={this._onSubmit.bind(this)}>
        {children}
      </form>
    );
  }

  _onSubmit() {
    const actionUrl = typeof props.action === "function" ? props.action(props) : props;
    const method = props.method;

    this.serialize().then( (res) => {
      const xhr = new XmlHttpRequest();
      xhr.open(method, actionUrl);
      xhr.onLoad = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          this.onSuccess && this.onSuccess(xhr.response);
        } else if (xhr.status >= 400 && xhr.status < 500) {
          this._handleError("Invalid server configuration. The resource could not be found.", xhr.response);
        } else if (xhr.status >= 500 && xhr.status < 600){
          this._handleError("Invalid input data", xhr.response);
        } else {
          this._handleError("Unknown error. Please contact system administrator. " + xhr.status + "::" + xhr.statusText, xhr.response);
        }
      };
      xhr.onerror = () => this._handleError("Network error", null);
    })

    if (typeof res === "object") {
      res = JSON.stringify(res);
    }

    xhr.send(res);
  }

  _handleError(msg, response) {
    this.setState({
      err: msg,
      errDef: response
    });
    console.error("Data posting error", msg, response)  
  }

  registerInput(name, element) {
    // The name should not be registered more than once
    if (this.inputs.hasOwnProperty(name)) {
      console.error("A form input with name '" + name + "' is already registered." +
            " The element you are trying to register is not going to be registered." +
            " There shouldn't be more than one input element with the same name. In " +
            " case you are using a checkbox or a radio button make sure you incapsulate " +
            " them in a parent component and use that parent component as the input element.");
    } else {
      this.inputs[name] = element;
    }
  }

  unregisterInput(name, element) {
    // Unregister only if the name and element matches, trying to avoid
    // same name regsitration error problem
    if (this.inputs[name] === element) {
      delete this.inputs[name];
    }
  }

  _defaultBody() {

  }
}

Form.METHOD_GET = "GET";
Form.METHOD_POST = "POST";

Form.Fieldset = Fieldset;
Form.Model = (props) => {
  const { attributes, ...other } = props;
  return (
    <div {...other}>
      { Form.generate(attributes) }
    </div>
  );
}

Form.ModelInput = (props) => {
  const { label, description } = props;
  return (
    <Form.Fieldset label={label} description={description}>
      { Form.generateInput(props) }
    </Form>
  )
}

/* A default body generated if one is not provided */
Form.generate = function(attributes) {
  const inputs = [];
  for(let i in attributes) {
    const attr = attributes[i];
    inputs.push(
      <Form.ModelInput key={attr.name} {...attr} />
    );
  }

  return inputs;
}

/** A method provided to make any Form Input compatible with the form.
 * Make sure when you export the form you use this. A connected form
 * is supposed to honor props - "name" and "defaultValue" and provide
 * a method 'getValue' to retrive the current value available with
 * the input.
 *
 * Ex: export default Form.connect(ComboBox)
 */
function connect(Component) {
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

Form.childContextTypes = {
  form: PropTypes.object
}

Form.propTypes = {
  action: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  method: PropTypes.oneOf([Form.METHOD_GET, Form.METHOD_POST]),
  attributes: PropTypes.object.isRequired,

  onSubmit: PropTypes.func,
  onSubmitted: PropTypes.func,
  onError: PropTypes.func
}

Form.defaultProps = {
  method: Form.METHOD_POST
}


export default Form;
