import { setSelectValue, setFeaturesValue } from './filters.js';
import { removeSimilarPins, renderSimilarPins } from './map.js';
import { getPreparedData } from './store.js';
import { filterOffers } from './filters.js';
import { debounce } from './utils/debounce.js';

const filterForm = document.querySelector('.map__filters');
const makeFilteredData = (evt) => {
  const element = evt.target;
  if (element.type === 'checkbox') {
    setFeaturesValue(element.value, element.checked);
    removeSimilarPins();
    renderSimilarPins(getPreparedData(filterOffers));
  } else {
    setSelectValue(element.name.split('-')[1], element.value);
    removeSimilarPins();
    renderSimilarPins(getPreparedData(filterOffers));
  }
};
const setFilterListener = () => {
  filterForm.addEventListener('change', debounce(makeFilteredData, 500));
};

export { setFilterListener };
