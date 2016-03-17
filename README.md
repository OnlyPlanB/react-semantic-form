# react-bootstrap-form

`react-bootstrap-form` is a dynamic form for react with validation and data
posting support with customizable input components.

## Browser support
Tested in Chrome only at the moment. Please report your issues and we can check.

## Installation
Using npm
```
$ npm install --save react-bootstrap-form
```
Then with a module bundler like webpack that supports either CommonJS or ES2015
modules, import the Form:
```javascript
// Using an ES6 transpiler, like babel
import Form, { ValidationError, TextInput } from 'react-router';

// Not using an ES6 transpiler
var Form = require('react-bootstrap-form');
var ValidationError = require('react-bootstrap-form').ValidationError;
```

## Usage
**The simplest use case**
``` javascript
import React from 'react';
import { render } from 'react-dom';
import Form from 'form';

// Define your form attributes
const attributes = [
    { type: "Text", name: "username", required: true, label: "Username" },
    { type: "Date", name: "dob", required: true, label: "Date of Birth"},
    { type: "TextArea", name: "description", label: "Description" }
];

// Render the form within your UI
class App extends React.Component {
  render() {
    return <Form action="/" method="GET" className="form" attributes={attributes} />
  }
}

render( <App />, document.body);
```
The data is posted as a JSON object with the values provided. In this example
it could be
```
{ username: "...", dob: "yyyy-mm-dd", description: "......" }
```

**Customizing the Form**  
Alternatively you can use `Form.Input` to define a input and `Form.Fieldset`
for other input elements. The Form connects with only specially built
input components like `TextInput`,`DateInput`, `RadioInput`, etc which are  mapped with `type` prop in the `Form.Input`. Check out the documentation to
find out how to build your own components that connects with the Form
automatically.

```javascript
  render() {
    return (
      <Form>
        <Form.Input type="Text" name="username" label="Username"
              required=true />,
        <Form.Input type="Date" name="dob" label="Date of Birth"
              required=true />
        <Form.Input type="TextArea" name="description" label="Description" />

        <Form.Fieldset label="">
          <button className="btn btn-primary" type="submit">Post</button>
        </Form.Fieldset>
      </Form>
    );
  }
```
