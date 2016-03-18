import React from 'react';
import { render } from 'react-dom';
import Form, { Input, Fieldset } from 'react-bootstrap-form';



class App extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-offset-1 col-md-10">
          <Form action="">
            <Input type="Text" name="name" label="Name" description="Enter your name" required={true} />
            <Input type="Deferred" name="title" label="Title" required={true} minLength={3} />
            <Input type="Radio" name="sex" label="Sex" options={{male: "Male", female: "Female"}} optionClass="radio-inline" />
            <Input type="Integer" name="sn" label="SN" description="Between 100 and 1000" max={999} min={100} />
            <Input type="Date" name="dob" label="Date of Birth" format="YYYY-MM-DD" suffix="A.D." />
            <Input type="CheckBox" name="hobbies" label="Hobbies" options={{
                football: "FootBall",
                cricket: "Cricket",
                basket: "Basket Ball",
                volley: "Volley Ball",
                swim: "Swimming",
                horse: "Horse Riding"
              }} minSelection={2} maxSelection={4} optionClass="col-md-4 checkbox" />
            <Fieldset label="">
              <button type="submit" className="btn btn-primary">Save</button>
            </Fieldset>
          </Form>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('example'));
