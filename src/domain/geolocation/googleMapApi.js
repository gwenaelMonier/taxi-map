
const google = window.google;

function logError (error) {
  console.warn("Fail to call google map api: ", error);
}

function getGeocode(address) {
  const geocoder = new google.maps.Geocoder();

  return new Promise(function(resolve,reject) {
    geocoder.geocode({address:address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        resolve(results);
      } else {
        reject(status);
      }
    });
  }).then(function (results) {
    return {
      lat: results[0].geometry.location.lat(),
      lng: results[0].geometry.location.lng(),
    };
  }).catch(function (error) {
    logError(error);
    return null;
  });
}

function getDistanceMatrix(origins, destination) {
  if (origins == null || origins.length === 0 || destination == null) {
    return Promise.reject(new Error('Invalid params given to distance matrix service'));
  }

  const service = new google.maps.DistanceMatrixService();

  const params = {
    origins: origins,
    destinations: [destination],
    travelMode: google.maps.TravelMode.DRIVING
  };

  return new Promise(function(resolve,reject) {
    service.getDistanceMatrix(params, function(data, status) {
      if (status === google.maps.DistanceMatrixStatus.OK) {
        resolve(data);
      } else {
        reject(status);
      }
    });
  }).then(function (data) {
    return data.rows.map(function (row) {
      return row.elements[0];
    });
  }).catch(function (error) {
    logError(error);
    return [];
  });
}

module.exports = {
  getGeocode: getGeocode,
  getDistanceMatrix: getDistanceMatrix
};
