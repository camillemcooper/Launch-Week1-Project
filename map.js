import "./App.css";
import React from "react";
import L from "leaflet";

export default class Map extends React.Component {
  componentDidMount() {
    var mymap = L.map("mapid").setView([38.0338, -78.4985], 18);

    L.tileLayer(
      "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 15,
        id: "mapbox.streets",
        accessToken:
          "pk.eyJ1IjoiY2FteWNvb3AiLCJhIjoiY2p2eTdtN2M5MGN3ZTQzcDg5YW1pcjFyeCJ9._yE8h4okcxZVUlgPZkhwuw"
      }
    ).addTo(mymap);
    let data = this.props.map;
    for (let i = 0; i < data.length; i++) {
      var marker = L.marker([data[i].lat, data[i].long]).addTo(mymap);
      marker.bindPopup(data[i].name + " at " + data[i].address);
    }
  }

  render() {
    return <div />;
  }
}
