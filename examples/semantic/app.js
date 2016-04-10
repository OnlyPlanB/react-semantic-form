import React from 'react';
import { render } from 'react-dom';
import Form from 'react-bootstrap-form';

const modelAttributes = [
  { name: "name", type: "Text", label:"Name", description: "Enter your name", required: true },
  { name: "title", type: "Deferred", label: "Title", required: true, minLength: 3 },
  { name: "sex", type: "Radio", label: "Sex", required: true, options: { male: "Male", female: "Female" }, optionClass: "radio-inline" },
  { name: "sn", type: "Integer", label: "SN", description: "Your Serial Number", max: 999, min: 100 },
  { name: "dob", type: "Date", label: "Date of Birth", description: "The day you were born", format: "YYYY-MM-DD", suffix: "A.D."},
  { name: "human", type: "Boolean", label: "Is Human", defaultValue: true },
  { name: "hobbies", type: "Select", label: "Hobbies", searchable: true, multiple: true, placeholder: "Choose a hobby", options: {
      football: "FootBall",
      cricket: "Cricket",
      basket: "Basket Ball",
      volley: "Volley Ball",
      swim: "Swimming",
      horse: "Horse Riding"
    }, minSelection: 2, maxSelection: 4 },
  { name: "select", type: "Select", label: "Select One", placeholder: "Options", options : {
    "one": "Option 1",
    "two": "Option 2",
    "three": "Option 3"
  }, required: true},
  { name: "description", type: "TextArea", label: "Description" },
  { name: "file", type: "File", label: "Attach File" }
];



class App extends React.Component {
  render() {
    return (
      <div className="main ui container">

          <Form name="semantic" attributes={modelAttributes} suppress={{sex: "female"}} onSuccess={ (res) => console.log(res) }/>

      </div>
    );
  }
}

render(<App />, document.getElementById('example'));
