
const googleMapApi = require('../geolocation/googleMapApi');
const rideStepPeriod = 4000;
const rideStepsSize = 10;

function hydrate(taxis, userPosition) {
  taxis = hydratePosition(taxis);
  return hydrateWaitingInfos(taxis, userPosition);
}

function hydratePosition(taxis) {
  const rideStepIndex = getRideStepIndex();

  taxis.map(function (taxi) {
    // Mock position
    taxi.position = taxi.rideSteps[rideStepIndex];
    return taxi;
  });

  return taxis;
}

function hydrateWaitingInfos(taxis, userPosition) {
  const origins = taxis.map(function(taxi) {
      return taxi.position;
  });

  return googleMapApi.getDistanceMatrix(origins, userPosition)
    .then((waitingInfos) => {
      return taxis = taxis.map(function(taxi, index) {
          taxi.waitingInfo = waitingInfos[index];
          return taxi;
      });
    });
}

function getRideStepIndex() {
  return Math.trunc(Date.now() / rideStepPeriod % rideStepsSize);
}

module.exports = {
  hydrate: hydrate
};
