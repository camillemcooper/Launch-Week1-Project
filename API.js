import React, { Component } from "react";
import axios from "axios";
import Map from "./map";

const API_KEY = process.env.REACT_APP_API_KEY;

class API {
  static searchRestaurants(latitude, longitude) {
    return new Promise((resolve, reject) => {
      console.log(latitude);
      let center = latitude + "," + longitude;
      let radius = "3000";
      let url =
        "https://cors-anywhere-hclaunch.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
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
        resolve(arr);
      });
    });
  }
  static searchCuisine(latitude, longitude, cuisine) {
    return new Promise((resolve, reject) => {
      let center = latitude + "," + longitude;
      let radius = "3000";
      let url =
        "https://cors-anywhere-hclaunch.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
        center +
        "&radius=" +
        radius +
        "&type=restaurant&opennow&keyword=" +
        cuisine +
        "&key=" +
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
        resolve(arr);
      });
    });
  }
}

export default API;
