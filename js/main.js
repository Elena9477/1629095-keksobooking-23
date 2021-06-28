function getCoordsInt(min, max) {
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
}

function getCoordsFloat(min, max, number) {
  if (min === max) {
    return +Math.abs(min.toFixed(number));
  }
  if (max > min) {
    return +Math.abs(Math.random() * (max - min) + min).toFixed(number);
  } else {
    return +Math.abs(Math.random() * (min - max) + max).toFixed(number);
  }
}

function createArr(ar, obj) {
  return ar.push(obj);
}

function getType() {
  const types = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
  return types[getCoordsInt(0, 4)];
}

function getTime() {
  const times = ['12:00', '13:00', '14:00'];
  return times[getCoordsInt(0, times.length - 1)];
}

function getFeatures() {
  const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  const featuresNumber = getCoordsInt(0, features.length - 1);
  const copy = features.slice();
  let feature = '';
  const checkedFeatures = [];
  for(let i = 0; i < featuresNumber; i++) {
    feature = copy.splice(getCoordsInt(0, copy.length - 1), 1);
    checkedFeatures.push(feature);
  }
  return checkedFeatures;
}

function getDescr() {
  const descriptions = [
    'Новый дом, высокие потолки, удобная планировка - набор превосходных характеристик',
    'Все необходимые для бизнеса коммуникации, хороший подъезд и отсутствие соседей делают помещение идеальным местом для локации предприятия!',
    'В новой квартире простор сочетается с уютом, универсальность - с функциональностью, без этого в современном жилье никак не обойтись. А парк рядом с домом - просто мечта!',
    'Функциональность помещения позволяет осуществлять все задумки босса - производственная часть, зона отдыха и кухня - есть всё что нужно в работе фирмы.',
    'Делать бизнес в таком помещении не только важно, но и приятно!',
  ];
  return descriptions[getCoordsInt(0, descriptions.length - 1)];
}

function getPhotos() {
  const photos = [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
  ];
  const photosNumber = getCoordsInt(1, 20);
  const photosList = [];
  for(let i = 0; i < photosNumber; i++) {
    photosList.push(photos[getCoordsInt(0, photos.length - 1)]);
  }
  return photosList;
}

function getObj(i) {
  const locationLat = getCoordsFloat(35.65000, 35.70000, 5);
  const locationLng = getCoordsFloat(139.70000, 139.80000, 5);
  const obj = {
    author: {
      avatar: `img/avatars/user${(i < 10) ? `0${i}` : i}.png`,
    },
    offer: {
      title: 'Дом моей мечты',
      address: `${locationLat}, ${locationLng}`,
      price: getCoordsInt(1, 1000),
      type: getType(),
      rooms: getCoordsInt(1, 100),
      guests: getCoordsInt(1, 200),
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
}

const arr = [];

for(let i = 0; i < 10; i++) {
  createArr(arr, getObj(i+1));
}


