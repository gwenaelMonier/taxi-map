import React from "react";
import "./taxiDescription.css";

const googleMapApi = require('../api/googleMapApi');

class TaxiDescription extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      waitingDuration: null,
      waitingDistance: null,
    };
  }

  componentDidMount() {
    this.getDistanceMatrix(this.props.userPosition, this.props.taxiPosition);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userPosition !== this.props.userPosition || prevProps.taxiPosition !== this.props.taxiPosition) {
      this.getDistanceMatrix(this.props.userPosition, this.props.taxiPosition);
    }
  }

  getDistanceMatrix = function (origin, destination) {
    googleMapApi.getDistanceMatrix(origin, destination)
      .then((information) => {
        if (information === null) {
          return
        }

        this.setState({
          waitingDuration: information.duration.text,
          waitingDistance: information.distance.text,
        })
      });
  }

  render() {
    const style = {
      backgroundImage: `url('${this.props.taxi.imageUrl}')`
    };
    const roundedRating = Math.round(this.props.taxi.rating);

    return (
      <div className="taxi-description" onClick={this.handleClick}>
        <div className="taxi-picture" style={style}></div>
        <div className="taxi-title">
          <span><b>{`${this.state.waitingDuration} d'attente (${this.state.waitingDistance})`}</b>{' - '}</span>
          <span className="taxi-rating">
            {this.props.taxi.rating}
            <span className={'rating-' + roundedRating}></span>
          </span>
          <span>{' - ' + this.props.taxi.name}</span>
        </div>
      </div>);
  }
}

export default TaxiDescription;
