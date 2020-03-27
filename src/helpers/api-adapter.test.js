import serverData from '../test-mocks/server-offers';
import {transformOffers} from './api-adapters';


it(`Should transform data correctly`, () => {

  const expectedData = [
    {
      id: 1,
      title: `Tile House`,
      description: `A new spacious villa, one floor. All commodities, jacuzzi and beautiful scenery. Ideal for families or friends.`,
      price: 283,
      pricePeriod: `night`,
      thumnnailUrl: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/11.jpg`,
      images: [
        `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/14.jpg`,
        `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/1.jpg`
      ],
      objectType: `room`,
      bedrooms: 1,
      maxAdults: 2,
      isPremium: false,
      isFavorite: false,
      rating: 2.5,
      goods: [
        `Baby seat`,
        `Laptop friendly workspace`
      ],
      host: {
        "id": 25,
        "name": `Angelina`,
        "isPro": true,
        "avatarUrl": `img/avatar-angelina.jpg`
      },
      coords: [
        50.869557,
        4.332697
      ],
      city: `Brussels`,
      cityCoords: [
        50.846557,
        4.351697
      ],
      cityZoom: 13
    }
  ];

  const transformedData = transformOffers(serverData);

  expect(transformedData).toEqual(expectedData);
});
