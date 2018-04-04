const hydrator = require('./hydrator');
const sortService = require('./sortService');
const filterService = require('./filterService');

const mockedDataURL = "https://raw.githubusercontent.com/gwenaelMonier/mock-data/master/taxi-map/data/taxis.json";

function handleError (error) {
  console.warn("Fail to call mocked taxi api: ", error);
  return [];
}

function getTaxis(userPosition, sortType, filterType) {
  return getRawTaxis()
    .then(function (taxis) {
      return hydrator.hydrate(taxis, userPosition);
    }).then(function (taxis) {
      return filterService.filterTaxis(taxis, filterType);
    }).then(function (taxis) {
      return sortService.sortTaxis(taxis, sortType);
    }).catch(handleError);
}

function getRawTaxis() {
  return fetch(mockedDataURL)
    .then(response => response.json())
    .catch(handleError);
}

module.exports = {
  getTaxis: getTaxis
};
