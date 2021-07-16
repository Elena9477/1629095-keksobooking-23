import { MINPRICES } from './data.js';

const form = document.querySelector('.ad-form');
const formFieldsets = form.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersSelects = mapFilters.querySelectorAll('select');
const mapFiltersFieldset = mapFilters.querySelectorAll('fieldset');
const adTitle = document.querySelector('#title');
const adPrice = document.querySelector('#price');
const adType = document.querySelector('#type');

const removeAttributeDisabled = (arr) => arr.forEach((element) => element.removeAttribute('disabled'));
const setAttributeDisabled = (arr) => arr.forEach((element) => element.setAttribute('disabled', 'disabled'));

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

const setModeErrorField = (field) => {
  field.style.borderColor = 'red';
};

const validateTitle = (text) => {
  if (text.length < 30 || text.length > 100) {
    setModeErrorField(adTitle);
    return false;
  }
  return true;
};

const validatePrice = (price) => {
  if (+price < +MINPRICES[adType.value] || +price > 1000000 || !price) {
    setModeErrorField(adPrice);
    return false;
  }
  return true;
};

const validateForm = (evt) => {
  const validateTitleResult = validateTitle(adTitle.value);
  const validatePriceResult = validatePrice(adPrice.value);
  if (!validateTitleResult || !validatePriceResult) {
    evt.preventDefault();
  }
};

adType.addEventListener('change', () => {
  adPrice.placeholder = MINPRICES[adType.value];
});

const createRequiredCollection = () => {
  form.querySelectorAll('[required]').forEach((element) => {
    element.required = false;
    element.classList.add('required');
  });
};

createRequiredCollection();
form.addEventListener('submit', (evt) => validateForm(evt));

const setFormModeActiveOn = () => {
  setFormActiveOn();
  setMapFiltersActiveOn();
};

const setFormModeActiveOff = () => {
  setFormActiveOff();
  setMapFiltersActiveOff();
};

export {setFormModeActiveOn, setFormModeActiveOff };

