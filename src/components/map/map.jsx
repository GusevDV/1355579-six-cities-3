import React from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';
import {offerType} from '../../types/offers-types.js';
import {MapSetting, mapDisplayType} from '../../../const.js';

class Map extends React.PureComponent {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.mapConfig = {
      center: this.props.city,
      zoom: props.zoom,
      zoomControl: false,
      marker: true
    };

    this.icon = leaflet.icon({
      iconUrl: MapSetting.ICON_URL,
      iconSize: MapSetting.ICON_SIZE,
    });

    this.activeIcon = leaflet.icon({
      iconUrl: MapSetting.ICON_URL_ACTIVE,
      iconSize: MapSetting.ICON_SIZE,
    });

    this.markers = [];
  }

  componentDidMount() {
    this.map = leaflet.map(this.mapRef.current, this.MapConfig);
    this.map.setView(this.props.city, this.props.zoom);

    leaflet
    .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    })
    .addTo(this.map);
    this.addMarkers();

  }

  componentDidUpdate(prevProps) {
    if (prevProps.city !== this.props.city) {
      this.clearMarkers();
      this.map.setView(this.props.city, this.props.zoom);
      this.addMarkers();
    }
  }

  addMarkers() {
    this.props.offers.forEach((offer) => {
      let icon = this.icon;
      if (this.props.currentOffer) {
        icon = offer.id === this.props.currentOffer.id ? this.activeIcon : this.icon;
      }
      const marker = leaflet.marker(offer.coords, {icon}).addTo(this.map);
      this.markers.push(marker);
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
    if (this.props.mapType === mapDisplayType.CITIES) {
      mapClass = `cities__map`;
    } else if (this.props.mapType === mapDisplayType.PROPERTY) {
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
  mapType: PropTypes.oneOf([mapDisplayType.CITIES, mapDisplayType.PROPERTY])
};

Map.defaultProps = {
  mapType: mapDisplayType.CITIES,
};

export default Map;
