import React, { Component } from "react";

export default class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
  }

  displayFavorites = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/songs/mine", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.sessionToken}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({ results: data });
      });
  };

  render() {
    return (
      <div>
        <h1>Your Favorites!</h1>
        {this.state.results.map((url) => {
          return <a href={url.url}>{url.url}</a>;
        })}
        <button onClick={this.displayFavorites}>Grab Favorites</button>
      </div>
    );
  }
}
