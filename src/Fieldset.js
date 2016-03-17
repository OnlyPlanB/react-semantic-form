import React from 'react';

const Fieldset = (props, context) => {

  const { id, name, label, description } = props;
  const error = context.form.getError(name);


  return (
    <div className={ "form-group row" + (error ? " has-danger":"")}>
      { label && <label htmlFor={id} className="col-sm-3 form-control-label">{label}</label>}
      <div className={"col-sm-9" + ( (label==="") ? " col-sm-offset-3":"")}>
        { props.children }
        { description && <small className="text-muted">{description}</small>}
        { typeof error ==="string" && <small className="text-muted text-help"> {error}</small>}
      </div>
    </div>
  );
}

Fieldset.contextTypes = {
  form: React.PropTypes.object
}
export default Fieldset;
