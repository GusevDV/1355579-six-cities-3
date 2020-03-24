export function convertRatingToProcent(rating) {
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

  getProp(object);

  function getProp(obj) {
    for (const prop in obj) {
      if (checkIsObject(obj[prop])) {
        newObject[transformToCamel(prop)] = transformFieldsToCamelCase(obj[prop]);
      } else {
        const value = obj[prop];
        newObject[transformToCamel(prop)] = Array.isArray(value) ? value.slice() : value;
      }
    }
  }
  return newObject;
}
