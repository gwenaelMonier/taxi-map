import React from "react";

import TaxiDescription from '../components/taxiDescription';

const googleMapApi = require('../api/googleMapApi');
const google = window.google;

class TaxiDescriptions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      waitingInfos: []
    };
  }

  componentDidMount() {
    this.refreshDistanceMatrix();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userPosition !== this.props.userPosition || prevProps.taxis !== this.props.taxis) {
      this.refreshDistanceMatrix();
    }
  }

  refreshDistanceMatrix = function () {
    const origins = this.props.taxis.map(function(taxi) {
        return taxi.position;
    });

    if (origins.length === 0) {
      return;
    }

    googleMapApi.getDistanceMatrix(origins, this.props.userPosition)
      .then((waitingInfos) => {
        if (waitingInfos === null) {
          this.setState({
            waitingInfos: []
          })
        } else {
          this.setState({
            waitingInfos: waitingInfos
          })
        }
      });
  }

  render() {

    return (
      this.props.taxis.map((taxi, index) => {
        let waitingInfo = null;
        if (index in this.state.waitingInfos &&
          this.state.waitingInfos[index].status === google.maps.DistanceMatrixStatus.OK)
        {
          waitingInfo = this.state.waitingInfos[index];
        }

        return <TaxiDescription
          key={taxi.id}
          taxi={taxi}
          waitingInfo={waitingInfo}
          setAppState={this.props.setAppState}
          selected={this.props.selectedTaxi === taxi.id}
        />
      })
    );
  }
}

export default TaxiDescriptions;
