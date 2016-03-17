import React from 'react';
import { render } from 'react-dom';
import Form from 'react-bootstrap-form';

class App extends React.Component {
  render() {
    return <div className="row"><div className="col-md-offset-3 col-md-6">
            <Form action="" attributes={[
      { name: "name", type: "string", label:"Name", description: "Enter your name" },
      { name: "title", type: "string", label: "Title", descrpition: "The title that you have received" },
      { name: "sn", type: "integer", label: "SN", description: "Your Serial Number" },
      { name: "dob", type: "date", label: "Date of Birth", description: "The day you were born" }
    ]}/></div></div>
  }
}

render(<App />, document.getElementById('example'));
