import React from "react";

import TaxiDescription from '../components/taxiDescription';

const google = window.google;

class TaxiDescriptions extends React.Component {

  render() {

    return (
      this.props.taxis.map((taxi) => {
        let waitingInfo = null;
        if (taxi.waitingInfo && taxi.waitingInfo.status === google.maps.DistanceMatrixStatus.OK)
        {
          waitingInfo = taxi.waitingInfo;
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
