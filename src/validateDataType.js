'use strict';

var validate = require('./index');

function validateDataType(candidate, dataType, models){
  models = models || {};

  var type = dataType.type || dataType.dataType || dataType.$ref;

  switch(type){
    case 'integer':
      return validate.primitive.integer(candidate, dataType);
    case 'number':
      return validate.primitive.number(candidate, dataType);
    case 'string':
      return validate.primitive.string(candidate, dataType);
    case 'boolean':
      return validate.primitive.boolean(candidate);
    case 'array':
      return validate.array(candidate, dataType, models);
    case 'void':
      return validate.primitive.void(candidate);
    case 'File':
      return validate.primitive.file();
    case 'object':
      if (dataType.properties) {
        return validate.model(candidate, dataType.properties, models)
      }
      // intentionally fall through to default here so explicit `type: object`
      // with $ref would be validated as well
    default:
      // Assumed to be object
      var model = models[type];
      if (model) {
        return validate.model(candidate, model, models);
      }
  }
}
module.exports = validateDataType;
