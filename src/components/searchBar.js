import React from "react";
import "./searchBar.css";

const googleMapApi = require('../api/googleMapApi');
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

    this.setState({
      search: searchText,
    })

    googleMapApi.getGeocode(searchText)
      .then((geocode) => {
        if (geocode === null) {
          return
        }

        this.props.setAppState({
          center: {
            lat: geocode.lat,
            lng: geocode.lng
          }
        })
      });
  }

  render() {
    return (
      <input type="text" placeholder="Enter your place of takeover (address, metro station, district, ...)"
        onChange={this.handleSearch} />
    );
  }
}

export default SearchBar;
