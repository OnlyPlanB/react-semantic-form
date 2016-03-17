import React from 'react';

const Fieldset = (props) => {

  const { id, label, description, error } = props;

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

export default Fieldset;
