import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3001/user/register", {
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
      <div className="registerAll" id="registerAll">
        <h1 className="websiteTitle">Music Space</h1>
        <h1 className="register">Register here!</h1>
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
              min="5"
              onChange={(e) => this.setState({ password: e.target.value })}
              value={this.state.password}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="regButton">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}
