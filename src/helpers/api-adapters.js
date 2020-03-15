export function transformOffers(data) {
  return data.map((offer) => {
    return {
      id: offer.id,
      title: offer.title,
      price: offer.price,
      pricePeriod: `night`,
      thumnnailUrl: offer.preview_image,
      objectType: offer.type,
      isPremium: offer.is_premium,
      rating: offer.rating,
      coords: [offer.location.latitude, offer.location.longitude],
      city: offer.city.name,
      cityCoords: [offer.city.location.latitude, offer.city.location.longitude],
      cityZoom: offer.city.location.zoom,
    };
  });
}
