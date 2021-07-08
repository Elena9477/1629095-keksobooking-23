import {getOffersArr} from './offers.js';
import { TYPES } from './data.js';

const createElement = (templ, text) => {
  const fragment = document.createDocumentFragment();
  const element = templ.cloneNode(true);
  element.textContent = text;
  return fragment.appendChild(element);
};

const createCards = () => {
  const offersArr = getOffersArr();
  const cards = [];
  for (let i = 0; i < 10; i++) {
    const templateFragment = document.querySelector('#card').content;

    const artTempl = templateFragment.querySelector('.popup');
    const artElement = artTempl.cloneNode(false);

    let template = templateFragment.querySelector('.popup__avatar');
    const avaElem = template.cloneNode(true);
    avaElem.src = offersArr[i].author.avatar;
    artElement.appendChild(avaElem);

    template = templateFragment.querySelector('.popup__title');
    artElement.appendChild(createElement(template, offersArr[i].offer.title));

    template = templateFragment.querySelector('.popup__text--address');
    artElement.appendChild(createElement(template, offersArr[i].offer.address));

    template = templateFragment.querySelector('.popup__text--price');
    artElement.appendChild(createElement(template, `${offersArr[i].offer.price  }₽/ночь`));

    template = templateFragment.querySelector('.popup__type');
    artElement.appendChild(createElement(template, TYPES[offersArr[i].offer.type]));

    template = templateFragment.querySelector('.popup__text--capacity');
    artElement.appendChild(createElement(template, `${offersArr[i].offer.rooms} комнаты для ${offersArr[i].offer.guests} гостей`));

    template = templateFragment.querySelector('.popup__text--time');
    artElement.appendChild(createElement(template, `Заезд после ${offersArr[i].offer.checkin}, выезд до ${offersArr[i].offer.checkout}`));

    const featuresListTempl = templateFragment.querySelector('.popup__features');
    const featuresListElem = featuresListTempl.cloneNode(false);
    const featuresItemsTempl = templateFragment.querySelectorAll('.popup__feature');
    offersArr[i].offer.features.forEach((checkedFeature) => {
      let j = 0;
      while(j < featuresItemsTempl.length) {
        const featuresItemsElem = featuresItemsTempl[j].cloneNode(false);
        if(featuresItemsTempl[j].classList.contains(`popup__feature--${checkedFeature}`)) {
          featuresListElem.appendChild(featuresItemsElem);
          break;
        }
        j++;
      }
    });

    artElement.appendChild(featuresListElem);

    template = templateFragment.querySelector('.popup__description');
    artElement.appendChild(createElement(template, offersArr[i].offer.description));

    const photoTempl = templateFragment.querySelector('.popup__photos');
    const photoElem = photoTempl.cloneNode(false);
    const imgTempl = templateFragment.querySelector('.popup__photo');
    offersArr[i].offer.photos.forEach((photo) => {
      const imgElem = imgTempl.cloneNode(true);
      imgElem.src = photo;
      photoElem.appendChild(imgElem);
    });
    artElement.appendChild(photoElem);

    cards.push(artElement);
  }
  return cards;
};

const showCard = (i) => {
  const card = createCards();
  const map = document.querySelector('#map-canvas');
  map.append(card[i]);
};

export {showCard};
