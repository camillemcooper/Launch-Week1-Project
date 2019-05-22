import Places from "./Businesses";
import "./App.css";
import React, { Component } from "react";

class App extends Component {
  render() {
    return (
      <div>
        <h1> Nearby Open Restaurants </h1>
        <article>
          <Places />
        </article>
      </div>
    );
  }
}

export default App;
