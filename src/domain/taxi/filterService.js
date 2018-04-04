const filterTypes = {
  ALL: "ALL",
  AT_LEAST_RATING_3: "AT_LEAST_RATING_3",
  AT_MOST_WAITING_DURATION_15_MINS: "AT_MOST_WAITING_DURATION_15_MINS"
};

const filterFunctions = {
  [filterTypes.ALL]: function (_) {
    return true;
  },
  [filterTypes.AT_LEAST_RATING_3]: function (taxi) {
    return taxi.rating >= 3;
  },
  [filterTypes.AT_MOST_WAITING_DURATION_15_MINS]: function (taxi) {
    return taxi.waitingInfo.duration.value <= 15 * 60;
  }
};

const filterPreconditions = {
  [filterTypes.ALL]: function (taxi) {
    return true;
  },
  [filterTypes.AT_LEAST_RATING_3]: function (taxi) {
    return typeof taxi.rating !== 'undefined';
  },
  [filterTypes.AT_MOST_WAITING_DURATION_15_MINS]: function (taxi) {
    return typeof taxi.waitingInfo !== 'undefined'
      && typeof taxi.waitingInfo.duration !== 'undefined'
      && typeof taxi.waitingInfo.duration.value !== 'undefined';
  }
};

function filterTaxis(taxis, filterType) {
  if (!taxis.every(filterPreconditions[filterType])) {
    return taxis;
  }
  return taxis.filter(filterFunctions[filterType]);
}

module.exports = {
  type: filterTypes,
  filterTaxis: filterTaxis
};
