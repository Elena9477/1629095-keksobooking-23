const TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const MINPRICES = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
  hotel: 3000,
};

const MAXPRICE = 1000000;

const ROOMSFORGUESTS = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const MINLENGTHTITLE = 30;

const MAXLENGTHTITLE = 100;

export { TYPES, MINPRICES, MAXPRICE, ROOMSFORGUESTS, MINLENGTHTITLE, MAXLENGTHTITLE};
