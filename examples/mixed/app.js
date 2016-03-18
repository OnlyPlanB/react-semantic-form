import React from 'react';
import { render } from 'react-dom';
import Form, { Model, Input, Fieldset } from 'react-bootstrap-form';

const modelAttributes = [
  { name: "name", type: "Text", label:"Name", description: "Enter your name", required: true },
  { name: "title", type: "Deferred", label: "Title", required: true, minLength: 3 },
  { name: "sex", type: "Radio", label: "Sex", required: true, options: { male: "Male", female: "Female" }, optionClass: "radio-inline" },
  { name: "sn", type: "Integer", label: "SN", description: "Your Serial Number", max: 999, min: 100 },
  { name: "dob", type: "Date", label: "Date of Birth", description: "The day you were born", format: "YYYY-MM-DD", suffix: "A.D."},
  { name: "hobbies", type: "CheckBox", label: "Hobbies", options: {
      football: "FootBall",
      cricket: "Cricket",
      basket: "Basket Ball",
      volley: "Volley Ball",
      swim: "Swimming",
      horse: "Horse Riding"
    }, minSelection: 2, maxSelection: 4, optionClass: "col-md-4 checkbox"},
  { name: "description", type: "TextArea", label: "Description" }
];



class App extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-offset-1 col-md-10">
          <Form action="" attributes={modelAttributes}>
            <Model />
            <Input type="Text" name="additional" label="Additional Input" />
            <Fieldset label="">
              <button type="submit" className="btn btn-secondary">Submit</button>
            </Fieldset>
          </Form>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('example'));
