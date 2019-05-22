import React, { Component } from "react";
import axios from "axios";
import Map from "./map";

const API_KEY = process.env.REACT_APP_API_KEY;
let center = "38.0338,-78.4985";
let radius = "1000";

class Places extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }

  componentDidMount() {
    let url =
      "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
      center +
      "&radius=" +
      radius +
      "&type=restaurant&opennow&key=" +
      API_KEY;

    axios.get(url).then(response => {
      let results = response.data.results;
      console.log(response.data.results);

      let arr = [];

      for (let i = 0; i < results.length; i++) {
        if (results[i].price_level == null) {
          results[i].price_level = "unknown";
        }
        arr.push({
          name: results[i].name,
          price: results[i].price_level,
          rating: results[i].rating,
          lat: results[i].geometry.location.lat,
          long: results[i].geometry.location.lng,
          address: results[i].vicinity
        });
      }

      this.setState({ results: arr });
      console.log(arr);
    });
  }

  render() {
    if (this.state.results.length != 0) {
      return (
        <div>
          <Map map={this.state.results} />
          <ul>
            {this.state.results.map(cont => (
              <li>
                <b>{cont.name} </b> is rated at <b>{cont.rating}</b> ({" "}
                <b> {"$".repeat(cont.price)}</b> )
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Places;
