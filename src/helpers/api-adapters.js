export function transformOffers(data) {
  return data.map((offer) => {
    return {
      id: offer.id,
      title: offer.title,
      description: offer.description,
      price: offer.price,
      pricePeriod: `night`,
      thumnnailUrl: offer.preview_image,
      images: offer.images,
      objectType: offer.type,
      bedrooms: offer.bedrooms,
      maxAdults: offer.maxAdults,
      isPremium: offer.is_premium,
      isFavorite: offer.is_favorite,
      rating: offer.rating,
      goods: offer.goods,
      host: offer.host,
      coords: [offer.location.latitude, offer.location.longitude],
      city: offer.city.name,
      cityCoords: [offer.city.location.latitude, offer.city.location.longitude],
      cityZoom: offer.city.location.zoom,
    };
  });
}
