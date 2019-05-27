import React from "react";
import API from "./API";
import axios from "axios";
import Map from "./map";

const API_KEY = process.env.REACT_APP_API_KEY;

export default class UserInput extends React.Component {
  state = {
    streetNumber: "",
    streetName: "",
    city: "",
    STATE: "",
    streetType: "",
    latitude: "unknown",
    longitude: "unknown",
    cuisine: "any",
    choose_cuisine: ""
  };

  changeStreetName = input => {
    this.setState({ streetName: input });
  };
  changeStreetNumber = input => {
    this.setState({ streetNumber: input });
  };
  changeCity = input => {
    this.setState({ city: input });
  };
  changeState = input => {
    this.setState({ STATE: input });
  };

  changeStreetType = input => {
    this.setState({ streetType: input });
  };

  changeCuisine = input => {
    this.setState({ cuisine: input });
  };

  submitAddress = () => {
    let base = "https://maps.googleapis.com/maps/api/geocode/json?address=";
    let address =
      this.state.streetNumber +
      "+" +
      this.state.streetName +
      "+" +
      this.state.streetType +
      "+" +
      this.state.city +
      "+" +
      this.state.STATE;
    let url = base + address + "&key=" + API_KEY;
    axios.get(url).then(response => {
      console.log(response);
      let lat = response.data.results[0].geometry.location.lat;
      let lng = response.data.results[0].geometry.location.lng;

      API.searchRestaurants(lat, lng).then(data => {
        this.setState({ latitude: lat, longitude: lng, results: data });
      });
    });
  };

  submitCuisine = () => {
    API.searchCuisine(
      this.state.latitude,
      this.state.longitude,
      this.state.cuisine
    );
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="  Street Number (i.e. 420)"
          onChange={e => this.changeStreetNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="  Street (i.e. Old Town)"
          onChange={e => this.changeStreetName(e.target.value)}
        />
        <input
          type="text"
          placeholder="  Street type (i.e. Rd)"
          onChange={e => this.changeStreetType(e.target.value)}
        />
        <input
          type="text"
          placeholder="  City (i.e. Dogtown)"
          onChange={e => this.changeCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="  State (i.e. VA)"
          onChange={e => this.changeState(e.target.value)}
        />
        <button onClick={this.submitAddress}> Submit </button>
        <input
          type="text"
          placeholder="  Cuisine"
          onChange={e => this.changeCuisine(e.target.value)}
        />
        <button onClick={this.submitCuisine}> Submit </button>
        {this.state.latitude !== "unknown" ? (
          <div>
            <Map
              map={this.state.results}
              longitude={this.state.longitude}
              latitude={this.state.latitude}
            />
            <ul>
              {this.state.results.map(cont => (
                <li>
                  <b>{cont.name} </b> is rated at <b>{cont.rating}</b> ({" "}
                  <b>
                    {" "}
                    {cont.price === "unknown"
                      ? "N/A"
                      : "$".repeat(cont.price)}{" "}
                  </b>{" "}
                  )
                </li>
              ))}
            </ul>{" "}
          </div>
        ) : (
          <div />
        )}
        {this.state.choose_cuisine == "" ? (
          <div />
        ) : (
          <div>
            <Map
              map={this.state.results}
              longitude={this.state.longitude}
              latitude={this.state.latitude}
            />
            <ul>
              {this.state.results.map(cont => (
                <li>
                  <b>{cont.name} </b> is rated at <b>{cont.rating}</b> ({" "}
                  <b>
                    {" "}
                    {cont.price === "unknown"
                      ? "N/A"
                      : "$".repeat(cont.price)}{" "}
                  </b>{" "}
                  )
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}
