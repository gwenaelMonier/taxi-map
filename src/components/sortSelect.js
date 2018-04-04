import React from "react";
import "./dropdown.css";

const sortService = require('../domain/taxi/sortService');

class SortSelect extends React.Component {

  handleChange = (event) => {
    this.props.setAppState({
      selectedSortType: event.target.value
    });
  }

  render() {
    return (
      <div className="dropdown">
        <span className="title">Sort by</span>
        <select value={this.props.selectedSortType} onChange={this.handleChange}>
          <option value={sortService.type.ASCENDING_WAITING_DURATION}>{"Waiting duration: low to hight"}</option>
          <option value={sortService.type.DESCENDING_WAITING_DURATION}>{"Waiting duration: hight to low"}</option>
          <option value={sortService.type.ASCENDING_RATING}>{"Rating: low to hight"}</option>
          <option value={sortService.type.DESCENDING_RATING}>{"Rating: hight to low"}</option>
          <option value={sortService.type.RANDOM}>{"Random"}</option>
        </select>
      </div>
    );
  }
}

export default SortSelect;
