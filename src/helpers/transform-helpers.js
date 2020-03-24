export function convertRatingToProcent(rating) {
  if (rating >= 5) {
    return 100;
  }
  return 100 * Math.round(rating) / 5;
}

export function transformFieldsToCamelCase(object) {

  const newObject = {};

  const checkIsObject = function (o) {
    return o === Object(o) && !Array.isArray(o) && typeof o !== `function`;
  };

  const transformToCamel = (str) => {
    return str.replace(/([-_][a-z])/ig, ($1) => (
      $1.toUpperCase().replace(`-`, ``).replace(`_`, ``)
    ));
  };

  for (const prop in object) {
    if (checkIsObject(object[prop])) {
      newObject[transformToCamel(prop)] = transformFieldsToCamelCase(object[prop]);
    } else {
      const value = object[prop];
      newObject[transformToCamel(prop)] = Array.isArray(value) ? value.slice() : value;
    }
  }

  return newObject;
}