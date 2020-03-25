import {convertRatingToProcent, transformFieldsToCamelCase} from './transform-helpers.js';

describe(`transform rating tests`, () => {
  it(`Should transform rating correctly`, () => {
    const data = [0, 2.75, 5, 3.21, 3.8, 4.5];
    const expectedData = [0, 60, 100, 60, 80, 100];

    const converted = data.map((rating) => convertRatingToProcent(rating));

    expect(converted).toEqual(expectedData);
  });

  it(`Should convertRatingToProcent return 100`, () => {
    const data = [7, 5.3, 5.1, 10, 100];

    const converted = data.map((rating) => convertRatingToProcent(rating));

    expect(converted).toEqual(data.map(() => 100));
  });

});

describe(`transformFieldsToCamelCase tests`, () => {

  const object = {
    field: `param`,
    field_name: `param`, /* eslint-disable-line camelcase */
    field_name_one_two: `param`, /* eslint-disable-line camelcase */
    fieldObject: {
      field: `param`,
      fieldObject_type: { /* eslint-disable-line camelcase */
        field: `param`
      },
      field_object: { /* eslint-disable-line camelcase */
        field: `param`,
        field_array: [1, 2, 3], /* eslint-disable-line camelcase */
      },
    },
    field_array_one: [1, 2, 3], /* eslint-disable-line camelcase */
  };

  const expectedObject = {
    field: `param`,
    fieldName: `param`,
    fieldNameOneTwo: `param`,
    fieldObject: {
      field: `param`,
      fieldObjectType: {field: `param`},
      fieldObject: {field: `param`, fieldArray: [1, 2, 3]}
    },
    fieldArrayOne: [1, 2, 3]
  };

  it(`Should transform fields to CamelCase correctly`, () => {
    expect(transformFieldsToCamelCase(object)).toEqual(expectedObject);
  });

  it(`Should transform fields to CamelCase correctly in array of objects`, () => {
    // eslint-disable-next-line camelcase

    let objects = [];
    let expectedObjects = [];

    for (let i = 0; i < 10; i++) {
      objects[i] = Object.assign({}, object);
      expectedObjects[i] = Object.assign({}, expectedObject);
    }

    expect(transformFieldsToCamelCase(objects)).toEqual(expectedObjects);
  });

});
