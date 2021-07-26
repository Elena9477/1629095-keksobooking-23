const TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const MIN_PRICES = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
  hotel: 3000,
};

const MAX_PRICE = 1000000;

const ROOMS_FOR_GUESTS = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const MIN_LENGTH_TITLE = 30;

const MAX_LENGTH_TITLE = 100;

const LAT = 35.6895;
const LNG = 139.692;

const URL_FOR_SEND_DATA = 'https://23.javascript.pages.academy/keksobooking';

export { TYPES, MIN_PRICES, MAX_PRICE, ROOMS_FOR_GUESTS, MIN_LENGTH_TITLE, MAX_LENGTH_TITLE, LAT, LNG, URL_FOR_SEND_DATA };
