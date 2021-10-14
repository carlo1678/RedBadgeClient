import React, { Component } from "react";
import picture from "../assets/404.png";

export default class ErrorPage extends Component {
  render() {
    return (
      <div>
        <img src={picture} />
      </div>
    );
  }
}
