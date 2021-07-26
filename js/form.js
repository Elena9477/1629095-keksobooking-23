import {
  MIN_PRICES,
  MAX_PRICE,
  ROOMS_FOR_GUESTS,
  MIN_LENGTH_TITLE,
  MAX_LENGTH_TITLE,
  LAT,
  LNG,
  URL_FOR_SEND_DATA,
  URL_AVATAR_EMPTY_IMG
} from './data.js';

import { removeSimilarPins, renderSimilarPins, map, marker } from './map.js';
import { getPreparedData } from './store.js';

const form = document.querySelector('.ad-form');
const formFieldsets = form.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersSelects = mapFilters.querySelectorAll('select');
const mapFiltersFieldsets = mapFilters.querySelectorAll('fieldset');
const adTitle = document.querySelector('#title');
const adPrice = document.querySelector('#price');
const adType = document.querySelector('#type');
const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const adAddress = document.querySelector('#address');
const adFormReset = document.querySelector('.ad-form__reset');
const preview = document.querySelector('.ad-form__photo img');
const previewAvatar = document.querySelector('.ad-form-header__preview img');

const removeAttributeDisabled = (elements) =>
  elements.forEach((element) => element.removeAttribute('disabled'));
const setAttributeDisabled = (elements) =>
  elements.forEach((element) => element.setAttribute('disabled', 'disabled'));

const setFormActiveOn = () => {
  form.classList.remove('ad-form--disabled');
  removeAttributeDisabled(formFieldsets);
};

const setFormActiveOff = () => {
  form.classList.add('ad-form--disabled');
  setAttributeDisabled(formFieldsets);
};

const setMapFiltersActiveOn = () => {
  mapFilters.classList.remove('map__filters--disabled');
  removeAttributeDisabled(mapFiltersSelects);
  removeAttributeDisabled(mapFiltersFieldsets);
};

const setMapFiltersActiveOff = () => {
  mapFilters.classList.add('map__filters--disabled');
  setAttributeDisabled(mapFiltersSelects);
  setAttributeDisabled(mapFiltersFieldsets);
};

adTitle.addEventListener('input', () => {
  if (adTitle.value.length < MIN_LENGTH_TITLE) {
    adTitle.setCustomValidity(`Ещё ${MIN_LENGTH_TITLE - adTitle.value.length} символов.`);
  } else if (+adTitle.value.length > MAX_LENGTH_TITLE) {
    adTitle.setCustomValidity(`Сократите заголовок на ${adTitle.value.length - MAX_LENGTH_TITLE} символов.`);
  } else {
    adTitle.setCustomValidity('');
  }

  adTitle.reportValidity();
});

adPrice.addEventListener('input', () => {
  if (adPrice.value < MIN_PRICES[adType.value]) {
    adPrice.setCustomValidity(`Значение должно быть не менее ${MIN_PRICES[adType.value]}.`);
  } else if (+adPrice.value > MAX_PRICE) {
    adPrice.setCustomValidity(`Значение не должно превышать ${MAX_PRICE}.`);
  } else {
    adPrice.setCustomValidity('');
  }

  adPrice.reportValidity();
});
adType.addEventListener('change', () => {
  adPrice.setAttribute('placeholder', MIN_PRICES[adType.value]);
});

const setFormModeActiveOn = () => {
  setFormActiveOn();
  setMapFiltersActiveOn();
};

const setFormModeActiveOff = () => {
  setFormActiveOff();
  setMapFiltersActiveOff();
};

const capacityVariants = capacity.querySelectorAll('option');

const synchronizeRoomsForCapacity = () => {
  const selectedRoomNumber = roomNumber.value;
  capacity.textContent = '';
  capacityVariants.forEach((option) => {
    if (ROOMS_FOR_GUESTS[selectedRoomNumber].includes(+option.value)) {
      const opt = document.createElement('option');
      opt.value = option.value;
      opt.textContent = option.textContent;
      capacity.appendChild(opt);
    }
  });
};

adPrice.setAttribute('placeholder', MIN_PRICES[adType.value]);

adAddress.value = `${LAT}, ${LNG}`;

synchronizeRoomsForCapacity();

roomNumber.addEventListener('change', () => {
  synchronizeRoomsForCapacity();
});

timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});

const resetFunction = () => {
  form.reset();
  mapFilters.reset();
  adPrice.placeholder = MIN_PRICES[adType.value];
  synchronizeRoomsForCapacity();
  removeSimilarPins();
  renderSimilarPins(getPreparedData());
  map.setView({ lat: LAT, lng: LNG }, 10);
  const newLatLng = new L.LatLng(LAT, LNG);
  marker.setLatLng(newLatLng);
  adAddress.value = `${LAT}, ${LNG}`;
  preview.src = '';
  previewAvatar.src = URL_AVATAR_EMPTY_IMG;
};

const setUserFormSubmit = (onSuccess, onError) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    fetch(URL_FOR_SEND_DATA,
      {
        method: 'POST',
        body: new FormData(evt.target),
      },
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw new Error(`${response.status} ${response.statusText}`);
      })
      .then(() => onSuccess())
      .then(() => resetFunction())
      .catch(() => onError());
  });
};

adFormReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetFunction();
});

export { setFormModeActiveOn, setFormModeActiveOff, setUserFormSubmit };
