import { setSelectValue, setFeaturesValue } from './filters.js';
import { removeSimilarPins, renderSimilarPins } from './map.js';
import { getPreparedData } from './store.js';
import { filterOffers } from './filters.js';

const filterForm = document.querySelector('.map__filters');
const setFilterListener = () => {
  filterForm.addEventListener('change', (evt) => {
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
  });
};

export { setFilterListener };
