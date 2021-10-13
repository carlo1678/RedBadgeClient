import React, { Component } from "react";

export default class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      songUrl: "",
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

  // addToPlaylist = (e) => {
  //   e.preventDefault();
  //   fetch(`http://localhost:3001/playlist/addSong/${song.id}`, {
  //     method: "POST",
  //     headers: new Headers({
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${this.props.sessionToken}`,
  //     }),
  //     // body: JSON.stringify({
  //     //   playlist: {
  //     //     songUrl: this.state.songUrl,
  //     //   },
  //     // }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(this.state.results);
  //       this.setState({ songUrl: data.songUrl });
  //     });
  // };

  render() {
    return (
      <div>
        <h1>Your Favorites!</h1>
        {this.state.results.map((url) => {
          return (
            <ol>
              <a href={url.url}>{url.url}</a>
              <button onClick={this.addToPlaylist}>Add to Playlist!</button>
            </ol>
          );
        })}
        <button onClick={this.displayFavorites}>Grab Favorites</button>
      </div>
    );
  }
}
