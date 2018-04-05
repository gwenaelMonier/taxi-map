import React from "react";
import "./searchBar.css";

const googleMapApi = require('../domain/geolocation/googleMapApi');
const debouncer = require('../helpers/debouncer');

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ""
    };

    this.executeSearch = debouncer.debounceEventHandler(this.executeSearch, 1500);
  }

  handleSearch = (event) => {
    const searchText = event.target.value;

    this.setState({
      search: searchText
    });

    this.executeSearch(event);
  }

  executeSearch = (event) => {
    const searchText = event.target.value;

    googleMapApi.getGeocode(searchText)
      .then((geocode) => {
        if (geocode === null) {
          return
        }

        this.props.setAppState({
          center: {
            lat: geocode.lat,
            lng: geocode.lng
          },
          userPosition: {
            lat: geocode.lat,
            lng: geocode.lng
          }
        })
      });
  }

  render() {
    return (
      <div>
        <input className="search-bar large"
          type="text"
          value={this.state.search}
          placeholder="Place of takeover (address, metro station, district, ...)"
          onChange={this.handleSearch}
        />
        <input className="search-bar small"
          type="text"
          value={this.state.search}
          placeholder="Place of takeover"
          onChange={this.handleSearch}
        />
      </div>
    );
  }
}

export default SearchBar;
