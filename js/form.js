import { MINPRICES, MAXPRICE, ROOMSFORGUESTS, MINLENGTHTITLE, MAXLENGTHTITLE} from './data.js';

const form = document.querySelector('.ad-form');
const formFieldsets = form.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersSelects = mapFilters.querySelectorAll('select');
const mapFiltersFieldset = mapFilters.querySelectorAll('fieldset');
const adTitle = document.querySelector('#title');
const adPrice = document.querySelector('#price');
const adType = document.querySelector('#type');
const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');

const removeAttributeDisabled = (arr) =>
  arr.forEach((element) => element.removeAttribute('disabled'));
const setAttributeDisabled = (arr) =>
  arr.forEach((element) => element.setAttribute('disabled', 'disabled'));

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
  removeAttributeDisabled(mapFiltersFieldset);
};

const setMapFiltersActiveOff = () => {
  mapFilters.classList.add('map__filters--disabled');
  setAttributeDisabled(mapFiltersSelects);
  setAttributeDisabled(mapFiltersFieldset);
};

adTitle.addEventListener('input', () => {
  if (adTitle.value.length < MINLENGTHTITLE) {
    adTitle.setCustomValidity(`Ещё ${MINLENGTHTITLE - adTitle.value.length} символов.`);
  } else if (+adTitle.value.length > MAXLENGTHTITLE) {
    adTitle.setCustomValidity(`Сократите заголовок на ${adTitle.value.length - MAXLENGTHTITLE} символов.`);
  } else {
    adTitle.setCustomValidity('');
  }

  adTitle.reportValidity();
});

adPrice.addEventListener('input', () => {
  if (adPrice.value < MINPRICES[adType.value]) {
    adPrice.setCustomValidity(`Значение должно быть не менее ${MINPRICES[adType.value]}.`);
  } else if (+adPrice.value > MAXPRICE) {
    adPrice.setCustomValidity(`Значение не должно превышать ${MAXPRICE}.`);
  } else {
    adPrice.setCustomValidity('');
  }

  adPrice.reportValidity();
});
adPrice.placeholder = MINPRICES[adType.value];
adType.addEventListener('change', () => {
  adPrice.placeholder = MINPRICES[adType.value];
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

roomNumber.addEventListener('change', () => {
  const selectedRoomNumber = roomNumber.value;
  capacity.innerHTML = '';
  capacityVariants.forEach((option) => {
    if (ROOMSFORGUESTS[selectedRoomNumber].includes(+option.value)) {
      const opt = document.createElement('option');
      opt.value = option.value;
      opt.innerHTML = option.innerHTML;
      capacity.appendChild(opt);
    }
  });
});

export { setFormModeActiveOn, setFormModeActiveOff };
