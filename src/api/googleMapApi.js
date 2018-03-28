
const google = window.google;

function handleError (error) {
  console.warn(error);
  return null;
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
  }).catch(handleError);
}

function getDistanceMatrix(origin, destination) {
  const service = new google.maps.DistanceMatrixService();

  const googleMapOrigin = origin.lat + ',' + origin.lng;
  const googleMapDestination = destination.lat + ',' + destination.lng;

  const params = {
    origins: [
      googleMapOrigin
    ],
    destinations: [
      googleMapDestination
    ],
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
    if (data.rows[0].elements[0].status === google.maps.DistanceMatrixStatus.OK) {
      return data.rows[0].elements[0];
    }
    return null;
  }).catch(handleError);
}

module.exports = {
  getGeocode: getGeocode,
  getDistanceMatrix: getDistanceMatrix
};
