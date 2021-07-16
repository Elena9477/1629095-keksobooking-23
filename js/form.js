const form = document.querySelector('.ad-form');
const formFieldsets = form.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersSelects = mapFilters.querySelectorAll('select');
const mapFiltersFieldset = mapFilters.querySelectorAll('fieldset');

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

const setFormModeActiveOn = () => {
  setFormActiveOn();
  setMapFiltersActiveOn();
};

const setFormModeActiveOff = () => {
  setFormActiveOff();
  setMapFiltersActiveOff();
};

export {setFormModeActiveOn, setFormModeActiveOff };
