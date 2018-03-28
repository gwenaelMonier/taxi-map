
function debounce(func, period) {
  let timeout;

  return function () {
    const context = this, args = arguments;

    clearTimeout(timeout);
    timeout = setTimeout(function () {
      func.apply(context, args);
    }, period);
  };
}

function debounceEventHandler(func, period) {
  const debounced = debounce(func, period)
  return function(e) {
    e.persist()
    return debounced(e)
  }
}

/*
Other way to do it with Underscore.js (https://stackoverflow.com/questions/35435074/using-debouncer-with-react-event#answer-37312154)

function debounceEventHandler(...args) {
  const debounced = _.debounce(...args)
  return function(e) {
    e.persist()
    return debounced(e)
  }
}
*/

module.exports = {
  debounce: debounce,
  debounceEventHandler: debounceEventHandler
};
