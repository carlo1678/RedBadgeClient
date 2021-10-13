import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import SongSearch from "./SongSearch";

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Navbar className="navbar-primary" variant="dark">
          <Navbar.Brand className="homeTitle" href="/">
            <span className="commerce">Music Site!</span>
          </Navbar.Brand>
          <div className="mainNav">
            <Nav className="mr-auto">
              <Link className="navlinks" to="/">
                Home
              </Link>
              <Link className="navlinks" to="/songs">
                Song Search!
              </Link>
              <Link className="navlinks" to="/playlist">
                Playlists
              </Link>
              <Link className="favorites" to="/favorites">
                Favorites
              </Link>
              {/* {this.props.sessionToken && ( */}
              <button
                onClick={this.props.clearToken}
                className="logoutButton"
                id="logoutButton"
              >
                Logout
              </button>
              {/* )} */}
            </Nav>
          </div>
        </Navbar>
        {/* <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route exact path="/songs">
              <SongSearch />
            </Route>
          </Switch> */}
      </div>
    );
  }
}
