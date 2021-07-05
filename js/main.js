const OBJNUM = 10;
const MINLAT = 35.65000;
const MAXLAT = 35.70000;
const FIXTONUMBER = 5;
const MINLNG = 139.70000;
const MAXLNG =  139.80000;

const MINPRICE = 1;
const MAXPRICE = 1000;

const MINROOMS = 1;
const MAXROOMS = 100;

const MINGUESTS = 1;
const MAXGUESTS = 200;

const TIMES = ['12:00', '13:00', '14:00'];
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTIONS = [
  'Новый дом, высокие потолки, удобная планировка - набор превосходных характеристик',
  'Все необходимые для бизнеса коммуникации, хороший подъезд и отсутствие соседей делают помещение идеальным местом для локации предприятия!',
  'В новой квартире простор сочетается с уютом, универсальность - с функциональностью, без этого в современном жилье никак не обойтись. А парк рядом с домом - просто мечта!',
  'Функциональность помещения позволяет осуществлять все задумки босса - производственная часть, зона отдыха и кухня - есть всё что нужно в работе фирмы.',
  'Делать бизнес в таком помещении не только важно, но и приятно!',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const MINPHOTOSNUMBER = 1;
const MAXPHOTOSNUMBER = 20;

const getCoordsInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min === max) {
    return +Math.abs(min);
  }
  if (max > min) {
    return +Math.abs(Math.floor(Math.random() * (max - min + 1) + min));
  } else {
    return +Math.abs(Math.floor(Math.random() * (min - max + 1) + max));
  }
};

const getCoordsFloat = (min, max, number) => {
  if (min === max) {
    return +Math.abs(min.toFixed(number));
  }
  if (max > min) {
    return +Math.abs(Math.random() * (max - min) + min).toFixed(number);
  } else {
    return +Math.abs(Math.random() * (min - max) + max).toFixed(number);
  }
};

const getType = () => TYPES[getCoordsInt(0, TYPES.length - 1)];

const getTime = () => TIMES[getCoordsInt(0, TIMES.length - 1)];

const getFeatures = () => {
  const featuresNumber = getCoordsInt(0, FEATURES.length - 1);
  const copy = FEATURES.slice();
  let feature = '';
  const checkedFeatures = [];
  for(let i = 0; i < featuresNumber; i++) {
    feature = copy.splice(getCoordsInt(0, copy.length - 1), 1);
    checkedFeatures.push(...feature);
  }
  return checkedFeatures;
};

const getDescr = () => DESCRIPTIONS[getCoordsInt(0, DESCRIPTIONS.length - 1)];

const getPhotos = () => {
  const photosNumber = getCoordsInt(MINPHOTOSNUMBER, MAXPHOTOSNUMBER);
  const photosList = [];
  for(let i = 0; i < photosNumber; i++) {
    photosList.push(PHOTOS[getCoordsInt(0, PHOTOS.length - 1)]);
  }
  return photosList;
};

const getObj = (i) => {
  const locationLat = getCoordsFloat(MINLAT, MAXLAT, FIXTONUMBER);
  const locationLng = getCoordsFloat(MINLNG, MAXLNG, FIXTONUMBER);
  const obj = {
    author: {
      avatar: `img/avatars/user${(i < 10) ? `0${i}` : i}.png`,
    },
    offer: {
      title: 'Дом моей мечты',
      address: `${locationLat}, ${locationLng}`,
      price: getCoordsInt(MINPRICE, MAXPRICE),
      type: getType(),
      rooms: getCoordsInt(MINROOMS, MAXROOMS),
      guests: getCoordsInt(MINGUESTS, MAXGUESTS),
      checkin: getTime(),
      checkout: getTime(),
      features: getFeatures(),
      description: getDescr(),
      photos: getPhotos(),
    },
    location: {
      lat: locationLat,
      lng: locationLng,
    },
  };
  return obj;
};

const getOffersArr = () => {
  const array = [];
  for(let i = 1; i <= OBJNUM; i++) {
    array.push(getObj(i));
  }
  return array;
};

getOffersArr();

