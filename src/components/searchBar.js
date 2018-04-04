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

    this.handleSearch = debouncer.debounceEventHandler(this.handleSearch, 1500);
  }

  handleSearch = (event) => {
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
      <input className="search-bar"
        type="text"
        placeholder="Place of takeover (address, metro station, district, ...)"
        onChange={this.handleSearch} />
    );
  }
}

export default SearchBar;
