import React from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';
import {offerType} from '../../types/offers-types.js';
import {MapSetting, MapDisplayType} from '../../const.js';

class Map extends React.PureComponent {
  constructor(props) {
    super(props);

    this.mapRef = React.createRef();
    this.mapConfig = {
      center: props.city,
      zoom: props.zoom,
      zoomControl: false,
      marker: true,
      layers: [
        leaflet
        .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
          attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
        })
      ]
    };

    this.icon = leaflet.icon({
      iconUrl: MapSetting.ICON_URL,
      iconSize: MapSetting.ICON_SIZE,
    });

    this.activeIcon = leaflet.icon({
      iconUrl: MapSetting.ICON_URL_ACTIVE,
      iconSize: MapSetting.ICON_SIZE,
    });

  }

  componentDidMount() {
    this.map = leaflet.map(this.mapRef.current, this.mapConfig);
    this.layer = leaflet.layerGroup().addTo(this.map);
    this.addMarkers(this.props.offers);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.city !== this.props.city) {
      this.map.setView(this.props.city, this.props.zoom);
    }
    if (prevProps.offers !== this.props.offers || prevProps.currentOffer !== this.props.currentOffer) {
      this.addMarkers(this.props.offers);
    }
  }

  addMarkers(offers) {
    this.layer.clearLayers();
    offers.forEach((offer) => {
      leaflet.
        marker(offer.coords, {icon: this.props.currentOffer && offer.id === this.props.currentOffer.id ? this.activeIcon : this.icon})
        .addTo(this.layer);
    });
  }

  clearMarkers() {
    if (this.map !== null) {
      this.markers.forEach((marker) => {
        this.map.removeLayer(marker);
      });
    }
    this.markers = [];
  }

  render() {
    let mapClass = ``;
    if (this.props.mapType === MapDisplayType.CITIES) {
      mapClass = `cities__map`;
    } else if (this.props.mapType === MapDisplayType.PROPERTY) {
      mapClass = `property__map`;
    }
    return (
      <section className={`map ${mapClass}`} id="map" ref={this.mapRef}></section>
    );
  }
}

Map.propTypes = {
  offers: PropTypes.arrayOf(offerType.isRequired).isRequired,
  currentOffer: offerType,
  city: PropTypes.arrayOf(PropTypes.number).isRequired,
  zoom: PropTypes.number.isRequired,
  mapType: PropTypes.oneOf([MapDisplayType.CITIES, MapDisplayType.PROPERTY])
};

Map.defaultProps = {
  mapType: MapDisplayType.CITIES,
};

export default Map;
