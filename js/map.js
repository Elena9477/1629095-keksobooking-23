import { getOffersArr } from './offers.js';
import { createCards } from './ads.js';
import { LAT, LNG } from './data.js';

const map = L.map('map-canvas');
const adAddress = document.querySelector('#address');
const basePinIcon = L.icon({
  iconUrl: '/img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});
const similarPins = [];

const mainPinIcon = L.icon({
  iconUrl: '/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
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

const renderSimilarPins = (offersArr) => {
  const cards = createCards(offersArr);
  const showCard = (i) => cards[i];
  let similarAdsMarker;

  offersArr.forEach((item, i) => {
    similarAdsMarker = L.marker(
      {
        lat: item.location.lat.toFixed(5),
        lng: item.location.lng.toFixed(5),
      },
      {
        icon: basePinIcon,
      },
    );
    similarAdsMarker
      .addTo(map)
      .bindPopup(showCard(i));
    similarPins.push(similarAdsMarker);
  });
};

const removeSimilarPins = () => {
  similarPins.forEach((similarPin) => map.removeLayer(similarPin));
};

const initMap = (setFormModeActiveOn) => {
  map.on('load', () => {
    getOffersArr(setFormModeActiveOn, renderSimilarPins);
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
  marker
    .addTo(map);

  marker.on('moveend', (evt) => {
    adAddress.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
  });
};

const createMap = (setFormModeActiveOn) => {
  initMap(setFormModeActiveOn);

};
export { createMap, removeSimilarPins, renderSimilarPins, map, marker };
