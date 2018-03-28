import React from "react";
import Marker from './marker';
import './taxiMarker.css';

class TaxiMarker extends React.Component {

  render() {
    return  <div className="taxi">
              <Marker selected={this.props.selected}/>
            </div>;
  }
}

export default TaxiMarker;
