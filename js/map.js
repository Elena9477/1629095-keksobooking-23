import { createCards } from './ads.js';

const card = createCards();

const showCard = (i) => {
  const map = document.querySelector('#map-canvas');
  map.append(card[i]);
};

export { showCard };
