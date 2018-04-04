import React from "react";
import Marker from './marker';
import './taxiMarker.css';

class TaxiMarker extends React.Component {
    handleClick = () => {
      this.props.setAppState(
        {
          center: this.props.position,
          selectedTaxi: this.props.id
        }
      );
    }

  render() {
    return  <div className="taxi" onClick={this.handleClick}>
              <Marker selected={this.props.selected}/>
            </div>;
  }
}

export default TaxiMarker;
