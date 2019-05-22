import React, { Component } from "react";
import axios from "axios";

class Ratings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conts: []
    };
  }

  componentDidMount() {
    axios
      .get(
        `
        https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=38.0338,-78.4985&radius=5000&type=restaurant&opennow&key=AIzaSyBkYQjshr0zGfKAxECbeRQLoni53rxsQ0M`
      )
      .then(response => {
        const conts = response.data.results;
        this.setState({ conts });
        console.log(response.data.results);
      });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.conts.map(cont => (
            <li>{cont.rating}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Ratings;
