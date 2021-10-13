import React from "react";
import "./App.css";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import NavigationBar from "./components/Navbar";
import Signup from "./components/Signup";
import Auth from "./components/Auth";
import { Switch, Route } from "react-router-dom";
import SongSearch from "./components/SongSearch";

import "bootstrap/dist/css/bootstrap.min.css";
import Favorites from "./components/Favorites";
import Playlist from "./components/Playlist";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionToken: "",
    };
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ sessionToken: localStorage.getItem("token") });
    }
  }

  updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    this.setState({ sessionToken: newToken });
  };

  clearToken = () => {
    localStorage.clear();
    this.setState({ sessionToken: "" });
  };

  protectedViews = () => {
    console.log("Protected Views");
    return this.state.sessionToken === localStorage.getItem("token") ? (
      <div>
        {/* <NavigationBar
          clearToken={this.clearToken}
          sessionToken={this.sessionToken}
        /> */}
        <LandingPage />
      </div>
    ) : (
      <Auth updateToken={this.updateToken} />
    );
  };

  render() {
    return (
      <div className="App">
        {this.state.sessionToken && (
          <NavigationBar
            clearToken={this.clearToken}
            sessionToken={this.state.sessionToken}
          />
        )}
        <Switch>
          <Route exact path="/">
            {this.protectedViews()}
          </Route>
          <Route exact path="/songs">
            <SongSearch sessionToken={this.state.sessionToken} />
          </Route>
          <Route exact path="/favorites">
            <Favorites sessionToken={this.state.sessionToken} />
          </Route>
          <Route exact path="/playlist">
            <Playlist sessionToken={this.state.sessionToken} />
          </Route>
        </Switch>
        {/* <LandingPage /> */}
        {/* <Login
          sessionToken={this.sessionToken}
          updateToken={this.updateToken}
        />
        <Signup
          sessionToken={this.sessionToken}
          updateToken={this.updateToken}
        /> */}
      </div>
    );
  }
}

export default App;
