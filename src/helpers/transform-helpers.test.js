/* eslint-disable camelcase */
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

  it(`Should transform fields to CamelCase correctly`, () => {
    // eslint-disable-next-line camelcase

    const data = {
      field: `param`,
      field_name: `param`,
      field_name_one_two: `param`,
      fieldObject: {
        field: `param`,
        fieldObject_type: {
          field: `param`
        },
        field_object: {
          field: `param`,
          field_array: [1, 2, 3],
        },
      },
      field_array_one: [1, 2, 3],
    };

    const expectedData = {
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

    expect(transformFieldsToCamelCase(data)).toEqual(expectedData);
  });

});
