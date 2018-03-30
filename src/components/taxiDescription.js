import React from "react";
import "./taxiDescription.css";

class TaxiDescription extends React.Component {

  render() {
    const pictureStyle = {
      backgroundImage: `url('${this.props.taxi.imageUrl}')`
    };
    const roundedRating = Math.round(this.props.taxi.rating);

    return (
      <div className="taxi-description" onClick={this.handleClick}>
        <div className="taxi-picture" style={pictureStyle}></div>
        <div className="taxi-title">
          {this.props.waitingInfo !== null &&
            <span>
              <b>{`Waiting ${this.props.waitingInfo.duration.text} (${this.props.waitingInfo.distance.text})`}</b>
              {' - '}
            </span>
          }
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
