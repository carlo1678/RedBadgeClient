import React, { Component } from "react";

export default class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      comment: "",
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

  // Write a function, grab the id from the song that needs to be added to the playlist, then that Id gets inserted into the fetch.

  addComment = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/comments/add/`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.sessionToken}`,
      }),
      body: JSON.stringify({
        comments: {
          comment: this.state.comment,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Succesfully Added Comment!");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // updateSongId = (newSongId) => {
  //   this.setState({ songId: newSongId });
  // };

  render() {
    return (
      <div>
        <h1>Your Favorites!</h1>
        {this.state.results.map((url) => {
          return (
            <div>
              <ol>
                <a href={url.url}>{url.url}</a>
                <form onSubmit={(e) => this.addComment(e)}>
                  <input
                    placeholder="Add Comment Here!"
                    onChange={(e) => this.setState({ comment: e.target.value })}
                    value={this.state.comment}
                  ></input>
                  <button type="submit">Add Comment!</button>
                </form>
              </ol>
            </div>
          );
        })}
        <button onClick={this.displayFavorites}>Grab Favorites</button>
      </div>
    );
  }
}
