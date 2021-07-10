import { getOffersArr } from './offers.js';
import { TYPES } from './data.js';

const createElement = (template, text) => {
  const fragment = document.createDocumentFragment();
  const element = template.cloneNode(true);
  element.textContent = text;
  return fragment.appendChild(element);
};

const createCards = () => {
  const offersArr = getOffersArr();
  const cards = [];
  offersArr.forEach((offerElem) => {
    const templateFragment = document.querySelector('#card').content;

    const cardTemplate = templateFragment.querySelector('.popup');
    const cardElement = cardTemplate.cloneNode(false);

    let template = templateFragment.querySelector('.popup__avatar');
    const avaElem = template.cloneNode(true);
    avaElem.src = offerElem.author.avatar;
    if (avaElem.src) {
      cardElement.appendChild(avaElem);
    }

    template = templateFragment.querySelector('.popup__title');
    if (offerElem.offer.title) {
      cardElement.appendChild(createElement(template, offerElem.offer.title));
    }

    template = templateFragment.querySelector('.popup__text--address');
    if (offerElem.offer.address) {
      cardElement.appendChild(createElement(template, offerElem.offer.address));
    }

    template = templateFragment.querySelector('.popup__text--price');
    if (offerElem.offer.price) {
      cardElement.appendChild(createElement(template, `${offerElem.offer.price}₽/ночь`));
    }

    template = templateFragment.querySelector('.popup__type');
    if (offerElem.offer.type) {
      cardElement.appendChild(createElement(template, TYPES[offerElem.offer.type]));
    }

    template = templateFragment.querySelector('.popup__text--capacity');
    if (offerElem.offer.rooms || offerElem.offer.guests) {
      cardElement.appendChild(createElement(template, `${offerElem.offer.rooms} комнаты для ${offerElem.offer.guests} гостей`));
    }

    template = templateFragment.querySelector('.popup__text--time');
    if (offerElem.offer.checkin || offerElem.offer.checkout) {
      cardElement.appendChild(createElement(template, `Заезд после ${offerElem.offer.checkin}, выезд до ${offerElem.offer.checkout}`));
    }

    let flag = false;
    const featuresListTempl = templateFragment.querySelector('.popup__features');
    const featuresListElem = featuresListTempl.cloneNode(false);
    const featuresItemsTempl = templateFragment.querySelector('.popup__features');
    offerElem.offer.features.forEach((checkedFeature) => {
      const featuresItem = featuresItemsTempl.querySelector(`.popup__feature--${checkedFeature}`);
      if (featuresItem) {
        featuresListElem.appendChild(featuresItem);
        flag = true;
      }
    });
    if (flag) {
      cardElement.appendChild(featuresListElem);
    }

    template = templateFragment.querySelector('.popup__description');
    if (offerElem.offer.description) {
      cardElement.appendChild(createElement(template, offerElem.offer.description));
    }

    const photoTempl = templateFragment.querySelector('.popup__photos');
    const photoElem = photoTempl.cloneNode(false);
    const imgTempl = templateFragment.querySelector('.popup__photo');
    flag = false;
    offerElem.offer.photos.forEach((photo) => {
      const imgElem = imgTempl.cloneNode(true);
      imgElem.src = photo;
      if (photo) {
        photoElem.appendChild(imgElem);
        flag = true;
      }
    });
    if (flag) {
      cardElement.appendChild(photoElem);
    }

    cards.push(cardElement);
  });
  return cards;
};


export { createCards };
