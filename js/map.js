import { createCards } from './ads.js';

const card = createCards();
const map = document.querySelector('#map-canvas');

const showCard = (i) => {
  map.append(card[i]);
};

export { showCard };
