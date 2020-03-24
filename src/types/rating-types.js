export function createRatingPropType(isRequired, min, max) {
  return function (props, propName) {
    const prop = props[propName];
    if (prop === null) {
      if (isRequired) {
        return new Error(`The prop ${propName} is marked as required`);
      }
    } else {
      if (props[propName] < min || props[propName] > max) {
        return new Error(`The ${propName} must be between ${min} and ${max}`);
      }
    }
    return null;
  };
}
