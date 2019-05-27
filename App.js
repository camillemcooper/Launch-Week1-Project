import "./App.css";
import React, { Component } from "react";
import UserInput from "./Userinput";

class App extends Component {
  state = {
    data: null
  };

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch("/express_backend");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

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
