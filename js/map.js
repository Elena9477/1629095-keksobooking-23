import { createCards, offersArr } from './ads.js';
import {LAT, LNG} from './data.js';

const card = createCards();
const adAddress = document.querySelector('#address');

// const map = document.querySelector('#map-canvas');
const showCard = (i) => card[i];
const map = L.map('map-canvas')
  .on('load', () => {
  })
  .setView({
    lat: LAT,
    lng: LNG,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const basePinIcon = L.icon({
  iconUrl: '/img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

let similarAdsMarker;

offersArr.forEach((item, i) => {
  similarAdsMarker = L.marker(
    {
      lat: item.location.lat,
      lng: item.location.lng,
    },
    {
      draggable: true,
      icon: basePinIcon,
    },
  );
  similarAdsMarker
    .addTo(map)
    .bindPopup(showCard(i));
});

const marker = L.marker(
  {
    lat: LAT,
    lng: LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

marker
  .addTo(map)
  .bindPopup(showCard(0));

marker.on('moveend', (evt) => {
  adAddress.value = evt.target.getLatLng();
});

export { showCard };
