import Places from "./Businesses";
import "./App.css";
import React, { Component } from "react";
import Map from "./map"


class App extends Component {
  render() {
    return (
      <div>
        <b> Nearby Open Restaurants </b>
        <Places />
        <Map/>
      </div>
    );
  }
}

export default App;
