import React from "react";
import "./dropdown.css";

const filterService = require('../domain/taxi/filterService');

class FilterSelect extends React.Component {

  handleChange = (event) => {
    this.props.setAppState({
      selectedFilterType: event.target.value
    });
  }

  render() {
    return (
      <div className="dropdown">
        <span className="title">Filter by</span>
        <select value={this.props.selectedFilterType} onChange={this.handleChange}>
          <option value={filterService.type.ALL}>{"All taxis"}</option>
          <option value={filterService.type.AT_MOST_WAITING_DURATION_15_MINS}>{"Wait at most 15 mins"}</option>
          <option value={filterService.type.AT_LEAST_RATING_3}>{"At least rated 3/5"}</option>
        </select>
      </div>
    );
  }
}

export default FilterSelect;
