import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3001/user/login", {
      method: "POST",
      body: JSON.stringify({
        user: {
          email: this.state.email,
          password: this.state.password,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.props.updateToken(data.sessionToken);
      });
  }

  render() {
    return (
      <div>
        <div className="loginAll" id="loginAll">
          <h1 className="websiteTitle">Welcome Back</h1>
          <h1 className="loginHere">Login Here!</h1>
          <Form onSubmit={(e) => this.handleSubmit(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                className="formInputs"
                type="email"
                placeholder="Enter email"
                onChange={(e) => this.setState({ email: e.target.value })}
                value={this.state.email}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className="formInputs"
                type="password"
                placeholder="Password"
                onChange={(e) => this.setState({ password: e.target.value })}
                value={this.state.password}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="loginButton">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}
