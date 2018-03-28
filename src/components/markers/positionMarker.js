import React from "react";
import Marker from './marker';
import './positionMarker.css';

class PositionMarker extends React.Component {

  render() {
    return  <div className="position">
              <Marker />
            </div>;
  }
}

export default PositionMarker;
