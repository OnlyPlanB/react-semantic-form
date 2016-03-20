import React from 'react';
import Form from './Form';

const Input = (props, context) => {
  const { name, type, label, description, prefix, suffix } = props;
  console.log("Form Input Hook is ", Form.InputHook);
  const Input = (Form.InputHook && Form.InputHook(type)) || Form.Inputs[type] || Form.DefaultInput;
  const error = context.form.getError(name);

  let inputElement = <Input className={"form-control" + (error?" form-control-danger":"")} {...props} />;

  // Attach a prefix or suffix if its provided
  if (prefix || suffix) {
    inputElement = (
      <div className="input-group">
        { prefix && <div className="input-group-addon">{prefix}</div> }
        { inputElement }
        { suffix && <div className="input-group-addon">{suffix}</div> }
      </div>
    )
  }

  // If there's a label or description create a form group and put it there
  if (label || description) {
    return (
      <Form.Fieldset name={name} label={label} description={description}>
      {inputElement}
      </Form.Fieldset>
    );
  }
  return inputElement;
}

Input.contextTypes = {
  form: React.PropTypes.object
}

export default Input;
