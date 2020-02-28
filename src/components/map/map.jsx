import React from 'react';
import leaflet from 'leaflet';

const city = [52.38333, 4.9];
const zoom = 12;

class Map extends React.PureComponent {
  constructor(props) {
    super(props);

    this.mapRef = React.createRef();
  }

  componentDidMount() {

    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });
    const map = leaflet.map(this.mapRef.current.id, {
      center: city,
      zoom,
      zoomControl: false,
      marker: true
    });
    map.setView(city, zoom);

    leaflet
    .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    })
    .addTo(map);

    const offerCords = [52.3709553943508, 4.89309666406198];
    leaflet
    .marker(offerCords, {icon})
    .addTo(map);

  }
  render() {
    return (
      <section className="cities__map map" id="map" ref={this.mapRef}></section>
    );
  }
}

export default Map;
