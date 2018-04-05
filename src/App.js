import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import TaxiDescriptions from './components/taxiDescriptions';
import TaxiMarker from './components/markers/taxiMarker';
import PositionMarker from './components/markers/positionMarker';
import SearchBar from './components/searchBar';
import SortSelect from './components/sortSelect';
import FilterSelect from './components/filterSelect';
import ResultsInfos from './components/resultsInfos';

import './App.css';

const taxiSortService = require('./domain/taxi/sortService');
const taxiFilterService = require('./domain/taxi/filterService');
const taxiApi = require('./domain/taxi/mockedApi');
const debouncer = require('./helpers/debouncer');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: {
        lat: 48.8586927,
        lng: 2.3473009
      },
      userPosition: {
        lat: 48.8586927,
        lng: 2.3473009
      },
      selectedSortType: taxiSortService.type.RANDOM,
      selectedFilterType: taxiFilterService.type.ALL,
      taxis: [],
      selectedTaxi: null
    };

    this.debouncedRefreshTaxis = debouncer.debounce(this.refreshTaxis, 500);
  }

  componentDidMount() {
    this.refreshTaxis()

    setInterval(() => {
      this.refreshTaxis();
    }, process.env.REACT_APP_DATA_REFRESHING_PERIOD)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedSortType !== this.state.selectedSortType
      || prevState.selectedFilterType !== this.state.selectedFilterType
      || prevState.userPosition !== this.state.userPosition)
    {
      this.debouncedRefreshTaxis();
    }
  }

  refreshTaxis = () => {
    taxiApi.getTaxis(this.state.userPosition, this.state.selectedSortType, this.state.selectedFilterType)
      .then((data) => {
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
          <div className="search-header">
            <div className="search">
                <SearchBar setAppState={this.setAppState} />
            </div>
            <div className="dropdowns">
                <SortSelect
                  setAppState={this.setAppState}
                  selectedSortType={this.state.selectedSortType}
                />
                <FilterSelect
                  setAppState={this.setAppState}
                  selectedFilterType={this.state.selectedFilterType}
                />
            </div>
          </div>
          <div className="results-info">
            <ResultsInfos
              taxis={this.state.taxis}
            />
          </div>
          <div className="taxi-descriptions">
            <TaxiDescriptions
              taxis={this.state.taxis}
              userPosition={this.state.userPosition}
              setAppState={this.setAppState}
              selectedTaxi={this.state.selectedTaxi}
            />
          </div>
        </div>
        <div className="map">
          <GoogleMapReact
            bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAP_API_KEY}}
            center={this.state.center}
            zoom={14}>

            <PositionMarker
              {...this.state.userPosition}
            />

            {this.state.taxis.map((taxi) => {
              return <TaxiMarker
                  key={taxi.id}
                  {...taxi.position}
                  {...taxi}
                  setAppState={this.setAppState}
                  selected={this.state.selectedTaxi === taxi.id}
                />
            })}
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default App;
