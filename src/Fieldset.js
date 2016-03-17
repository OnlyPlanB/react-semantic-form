import React from 'react';

const Fieldset = (props) => {

  const { id, label, description } = props;

  return (
    <div className="form-group row">
      { label && <label htmlFor={id} className="col-sm-2 form-control-label">{label}</label>}
      <div className={"col-sm-10" + (label ? "" : "col-sm-offset-2")}>
        { props.children }
        { description && <small className="text-muted text-help">{description}</small>}
      </div>
    </div>
  );
}

export default Fieldset;
