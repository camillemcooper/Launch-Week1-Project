import Places from "./Businesses";
import Ratings from "./Ratings";
import Prices from "./Price";
import "./App.css";
import React, { Component } from "react";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Table: []
    };
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.Table.map(Table => (
            <li>{Places} </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Table;
