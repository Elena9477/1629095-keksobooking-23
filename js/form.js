const form = document.querySelector('.ad-form');
const formFieldsets = form.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersSelects = mapFilters.querySelectorAll('select');
const mapFiltersFieldset = mapFilters.querySelectorAll('fieldset');

const removeAttributeDisabled = (arr) => arr.forEach((element) => element.removeAttribute('disabled'));
const setAttributeDisabled = (arr) => arr.forEach((element) => element.setAttribute('disabled', 'disabled'));

const setFormActiveOn = (flag) => {
  if (flag) {
    form.classList.remove('ad-form--disabled');
    removeAttributeDisabled(formFieldsets);
  } else {
    form.classList.add('ad-form--disabled');
    setAttributeDisabled(formFieldsets);
  }
};

const setMapFiltersActiveOn = (flag) => {
  if (flag) {
    mapFilters.classList.remove('map__filters--disabled');
    removeAttributeDisabled(mapFiltersSelects);
    removeAttributeDisabled(mapFiltersFieldset);
  } else {
    mapFilters.classList.add('map__filters--disabled');
    setAttributeDisabled(mapFiltersSelects);
    setAttributeDisabled(mapFiltersFieldset);
  }
};

const switchOnActive = () => {
  setFormActiveOn(true);
  setMapFiltersActiveOn(true);
};

const switchOffActive = () => {
  setFormActiveOn(false);
  setMapFiltersActiveOn(false);
};

export {switchOnActive, switchOffActive};
