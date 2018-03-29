
const mockedDataURL = "https://raw.githubusercontent.com/gwenaelMonier/mock-data/master/taxi-map/data/taxis.json";
const rideStepPeriod = 4000;
const rideStepsSize = 10;

function handleError (error) {
  console.warn(error);
  return null;
}

function getTaxis() {
  return fetch(mockedDataURL)
    .then(response => response.json())
    .then(function (taxis) {
      var rideStepIndex = getRideStepIndex();

      taxis.map(function (taxi) {
        // Mock position
        taxi.position = taxi.rideSteps[rideStepIndex];
        return taxi;
      });

      return taxis;
    }).catch(handleError);
}

function getRideStepIndex() {
  return Math.trunc(Date.now() / rideStepPeriod % rideStepsSize);
}

module.exports = {
  getTaxis: getTaxis
};
