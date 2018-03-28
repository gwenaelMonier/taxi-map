import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import PositionMarker from './components/markers/positionMarker';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: {
        lat: 48.8586927,
        lng: 2.3473009
      }
    };
  }

  render() {
    return (
      <div className="app">
        <div className="main">
          <div className="search">
          </div>
          <div className="taxi-descriptions">
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
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default App;
