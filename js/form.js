import {
  MIN_PRICES,
  MAX_PRICE,
  ROOMS_FOR_GUESTS,
  MIN_LENGTH_TITLE,
  MAX_LENGTH_TITLE,
  LAT,
  LNG, URL_FOR_SEND_DATA
} from './data.js';

const FORM = document.querySelector('.ad-form');
const FORM_FIELDSET = FORM.querySelectorAll('fieldset');
const MAP_FILTERS = document.querySelector('.map__filters');
const MAP_FILTERS_SELECTS = MAP_FILTERS.querySelectorAll('select');
const MAP_FILTERS_FIELDSETS = MAP_FILTERS.querySelectorAll('fieldset');
const AD_TITLE = document.querySelector('#title');
const AD_PRICE = document.querySelector('#price');
const AD_TYPE = document.querySelector('#type');
const ROOM_NUMBER = document.querySelector('#room_number');
const CAPACITY = document.querySelector('#capacity');
const TIME_IN = document.querySelector('#timein');
const TIME_OUT = document.querySelector('#timeout');
const AD_ADDRESS = document.querySelector('#address');

const removeAttributeDisabled = (elements) =>
  elements.forEach((element) => element.removeAttribute('disabled'));
const setAttributeDisabled = (elements) =>
  elements.forEach((element) => element.setAttribute('disabled', 'disabled'));

const setFormActiveOn = () => {
  FORM.classList.remove('ad-form--disabled');
  removeAttributeDisabled(FORM_FIELDSET);
};

const setFormActiveOff = () => {
  FORM.classList.add('ad-form--disabled');
  setAttributeDisabled(FORM_FIELDSET);
};

const setMapFiltersActiveOn = () => {
  MAP_FILTERS.classList.remove('map__filters--disabled');
  removeAttributeDisabled(MAP_FILTERS_SELECTS);
  removeAttributeDisabled(MAP_FILTERS_FIELDSETS);
};

const setMapFiltersActiveOff = () => {
  MAP_FILTERS.classList.add('map__filters--disabled');
  setAttributeDisabled(MAP_FILTERS_SELECTS);
  setAttributeDisabled(MAP_FILTERS_FIELDSETS);
};

AD_TITLE.addEventListener('input', () => {
  if (AD_TITLE.value.length < MIN_LENGTH_TITLE) {
    AD_TITLE.setCustomValidity(`Ещё ${MIN_LENGTH_TITLE - AD_TITLE.value.length} символов.`);
  } else if (+AD_TITLE.value.length > MAX_LENGTH_TITLE) {
    AD_TITLE.setCustomValidity(`Сократите заголовок на ${AD_TITLE.value.length - MAX_LENGTH_TITLE} символов.`);
  } else {
    AD_TITLE.setCustomValidity('');
  }

  AD_TITLE.reportValidity();
});

AD_PRICE.addEventListener('input', () => {
  if (AD_PRICE.value < MIN_PRICES[AD_TYPE.value]) {
    AD_PRICE.setCustomValidity(`Значение должно быть не менее ${MIN_PRICES[AD_TYPE.value]}.`);
  } else if (+AD_PRICE.value > MAX_PRICE) {
    AD_PRICE.setCustomValidity(`Значение не должно превышать ${MAX_PRICE}.`);
  } else {
    AD_PRICE.setCustomValidity('');
  }

  AD_PRICE.reportValidity();
});
AD_TYPE.addEventListener('change', () => {
  AD_PRICE.placeholder = MIN_PRICES[AD_TYPE.value];
});

const setFormModeActiveOn = () => {
  setFormActiveOn();
  setMapFiltersActiveOn();
};

const setFormModeActiveOff = () => {
  setFormActiveOff();
  setMapFiltersActiveOff();
};

const capacityVariants = CAPACITY.querySelectorAll('option');

const synchronizeRoomsForCapacity = () => {
  const selectedRoomNumber = ROOM_NUMBER.value;
  CAPACITY.textContent = '';
  capacityVariants.forEach((option) => {
    if (ROOMS_FOR_GUESTS[selectedRoomNumber].includes(+option.value)) {
      const opt = document.createElement('option');
      opt.value = option.value;
      opt.textContent = option.textContent;
      CAPACITY.appendChild(opt);
    }
  });
};

AD_PRICE.placeholder = MIN_PRICES[AD_TYPE.value];

AD_ADDRESS.value = `${LAT}, ${LNG}`;

synchronizeRoomsForCapacity();

ROOM_NUMBER.addEventListener('change', () => {
  synchronizeRoomsForCapacity();
});

TIME_IN.addEventListener('change', () => {
  return TIME_OUT.value = TIME_IN.value;
});

TIME_OUT.addEventListener('change', () => {
  return TIME_IN.value = TIME_OUT.value;
});

const setUserFormSubmit = (onSuccess, onError) => {
  FORM.addEventListener('submit', (evt) => {
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
      .catch(() => onError());
  });
};

const resetFunction = () => {
  AD_PRICE.placeholder = MIN_PRICES[AD_TYPE.value];
  AD_ADDRESS.value = `${LAT}, ${LNG}`;
  synchronizeRoomsForCapacity();
};

FORM.addEventListener('reset', resetFunction);

export { setFormModeActiveOn, setFormModeActiveOff, setUserFormSubmit };
