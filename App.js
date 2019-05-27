import "./App.css";
import React, { Component } from "react";
import UserInput from "./Userinput";

class App extends Component {
  render() {
    return (
      <div>
        <h1> Open Restaurants </h1>
        <p>
          Enter as much info as you'd like. The more specific the more accurate
          the recommendations will be.
        </p>
        <h2>
          {" "}
          Where do you wanna look?
          <UserInput />
        </h2>
      </div>
    );
  }
}

export default App;
