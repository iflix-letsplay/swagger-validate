var pathMatchesPattern = require('./dataPaths').pathMatchesPattern;

function runHooks(hooks, eventName, candidate, dataType, models, dataPath) {
  Object.keys(hooks).forEach(function (pattern) {
    var currentHooks = hooks[pattern];
    if (!currentHooks) return;
    var hooksForEvent = currentHooks[eventName];
    if (!hooksForEvent) return;
    if (hooksForEvent.forEach) {
      hooksForEvent.forEach(function (hook) {
        hook.call(null, candidate, dataType, models, dataPath);
      });
    } else {
      var hook = hooksForEvent;
      hook.call(null, candidate, dataType, models, dataPath);
    }
  })
}

function matchingHooks(hooks, dataPath) {
  hooks = hooks || {};

  return Object.keys(hooks)
    .filter(function (pattern) {
      return pathMatchesPattern(dataPath, pattern);
    })
    .map(function (pattern) {
      return hooks[pattern]
    });
}

module.exports = {
  matchingHooks: matchingHooks,
  runHooks: runHooks,
}
