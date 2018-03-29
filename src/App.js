import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import TaxiDescription from './components/taxiDescription';
import TaxiMarker from './components/markers/taxiMarker';
import PositionMarker from './components/markers/positionMarker';
import SearchBar from './components/searchBar';

import './App.css';

const taxiApi = require('./api/mockedTaxiApi');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: {
        lat: 48.8586927,
        lng: 2.3473009
      },
      search: "",
      taxis: []
    };
  }

  componentDidMount() {
    this.refreshTaxis()

    setInterval(() => {
      this.refreshTaxis();
    }, process.env.REACT_APP_DATA_REFRESHING_PERIOD)
  }

  refreshTaxis = () => {
    taxiApi.getTaxis()
      .then((data) => {
        data = data || [];

        this.setState({
          taxis: data,
        })
      })
  }

  setAppState = (state) => {
    this.setState(state)
  }

  render() {
    return (
      <div className="app">
        <div className="main">
          <div className="search">
              <SearchBar setAppState={this.setAppState} />
          </div>
          <div className="taxi-descriptions">
            {this.state.taxis.map((taxi) => {
              return <TaxiDescription
                  key={taxi.id}
                  taxi={taxi}
                  userPosition={this.state.center}
                />
            })}
          </div>
        </div>
        <div className="map">
          <GoogleMapReact
            bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAP_API_KEY}}
            center={this.state.center}
            zoom={14}>

            <PositionMarker
              {...this.state.center}
            />

            {this.state.taxis.map((taxi) => {
              return <TaxiMarker
                  key={taxi.id}
                  {...taxi.position}
                  {...taxi}
                />
            })}
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default App;
