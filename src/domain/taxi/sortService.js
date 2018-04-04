const sortTypes = {
  RANDOM: "RANDOM",
  ASCENDING_WAITING_DURATION: "ASCENDING_WAITING_DURATION",
  DESCENDING_WAITING_DURATION: "DESCENDING_WAITING_DURATION",
  ASCENDING_RATING: "ASCENDING_RATING",
  DESCENDING_RATING: "DESCENDING_RATING"
};

const sortFunctions = {
  [sortTypes.RANDOM]: function (a,b) {
    return 0;
  },
  [sortTypes.ASCENDING_WAITING_DURATION]: function (a,b) {
    return a.waitingInfo.duration.value - b.waitingInfo.duration.value;
  },
  [sortTypes.DESCENDING_WAITING_DURATION]: function (a,b) {
    return b.waitingInfo.duration.value - a.waitingInfo.duration.value;
  },
  [sortTypes.ASCENDING_RATING]: function (a,b) {
    return a.rating - b.rating;
  },
  [sortTypes.DESCENDING_RATING]: function (a,b) {
    return b.rating - a.rating;
  }
};

const sortPreconditions = {
  [sortTypes.RANDOM]: function (taxi) {
    return true;
  },
  [sortTypes.ASCENDING_WAITING_DURATION]: function (taxi) {
    return typeof taxi.waitingInfo !== 'undefined'
      && typeof taxi.waitingInfo.duration !== 'undefined'
      && typeof taxi.waitingInfo.duration.value !== 'undefined';
  },
  [sortTypes.DESCENDING_WAITING_DURATION]: function (taxi) {
    return typeof taxi.waitingInfo !== 'undefined'
      && typeof taxi.waitingInfo.duration !== 'undefined'
      && typeof taxi.waitingInfo.duration.value !== 'undefined';
  },
  [sortTypes.ASCENDING_RATING]: function (taxi) {
    return typeof taxi.rating !== 'undefined';
  },
  [sortTypes.DESCENDING_RATING]: function (taxi) {
    return typeof taxi.rating !== 'undefined';
  }
};

function sortTaxis(taxis, sortType) {
  if (!taxis.every(sortPreconditions[sortType])) {
    return taxis;
  }
  return taxis.sort(sortFunctions[sortType]);
}

module.exports = {
  type: sortTypes,
  sortTaxis: sortTaxis
};
