import { setPureData, getPreparedData } from './store.js';

const getOffersArr = (onSucces, createMarkers) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((json) => {
      setPureData(json);
      const preparedData = getPreparedData();
      return preparedData;
    })
    .then((data) => {
      onSucces();
      return data;
    })
    .then((data) => {
      createMarkers(data);
    })
    .catch(() => {
      onSucces();
    });
};

export { getOffersArr };
