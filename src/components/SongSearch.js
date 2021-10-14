import React, { Component } from "react";
import { Card, Button, CardTitle, CardText, Row, Col } from "reactstrap";
import ErrorPage from "./ErrorPage";

export default class SongSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songName: "",
      artistName: "",
      songInfo: {
        name: "",
        image: "",
        summary: "",
        url: "",
      },
    };
  }

  getSongs = async () => {
    const response = await fetch(
      `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=e928437a23fd16cc7f4a92e24c210f84&artist=${this.state.artistName}&track=${this.state.songName}&format=json`
    );
    const json = await response.json();
    if (json === undefined) return <ErrorPage />;
    const name = json.track.name;
    const url = json.track.url;
    const image = json.track.album.image[3]["#text"];
    // const actualImage = image.map((images) => {
    //   if (images.size === "extralarge") {
    //     this.setState({ image: actualImage })
    //   };
    // });

    const summary = json.track.wiki.summary;
    this.setState({
      songInfo: {
        name: name,
        url: url,
        image: image,
        summary: summary,
      },
    });
  };

  addFavorite = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/songs/add", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.sessionToken}`,
      }),
      body: JSON.stringify({
        songs: {
          url: this.state.songInfo.url,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Successfully added to favorites!");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  render() {
    return (
      <div>
        <h1>Search our library of songs!</h1>
        <input
          placeholder="Type Song Name Here!"
          onChange={(e) => this.setState({ songName: e.target.value })}
          value={this.state.songName}
        ></input>
        <input
          placeholder="Type Artist Name Here!"
          onChange={(e) => this.setState({ artistName: e.target.value })}
          value={this.state.artistName}
        ></input>
        <button onClick={() => this.getSongs()}>Search!</button>
        {/* <div className="songInfo">
          <h3>{this.state.songInfo.name}</h3>
          <p>{this.state.songInfo.url}</p>
          <img src={this.state.songInfo.image} alt="Artist"></img>
          <p>{this.state.songInfo.summary}</p>
          <button onClick={this.addFavorite}>Add to Favorites!</button>
        </div>
      </div> */}
        <Card body>
          <CardTitle tag="h5">{this.state.songInfo.name}</CardTitle>
          <CardText>{this.state.songInfo.url}</CardText>
          <img className="songPic" src={this.state.songInfo.image}></img>
          <CardText>{this.state.songInfo.summary}</CardText>
          <Button
            className="picButton"
            color="primary"
            onClick={this.addFavorite}
          >
            Add to Favorites!
          </Button>
        </Card>
      </div>
    );
  }
}
