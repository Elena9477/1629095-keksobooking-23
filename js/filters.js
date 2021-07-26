const criteriasValue = {
  type: 'any',
  price: 'any',
  rooms: 'any',
  guests: 'any',
};

const featuresValue = {
  wifi: false,
  dishwasher: false,
  parking: false,
  washer: false,
  elevator: false,
  conditioner: false,
};

const MIN_MIDDLE_PRICE = 10000;
const MIN_HIGH_PRICE = 10000;

const setSelectValue = (name, value) => {
  criteriasValue[name] = value;
};

const setFeaturesValue = (name, value) => {
  featuresValue[name] = value;
};

const filterOffers = (offer) => {
  const criteriaKeys = Object.keys(criteriasValue);
  const featuresKeys = Object.keys(featuresValue);

  for (const key of criteriaKeys) {
    const criteria = criteriasValue[key];
    if (criteria !== 'any') {
      if (key !== 'price' && String(offer.offer[key]) !== criteria) {
        return false;
      }
      if (key === 'price') {
        const price = offer.offer[key];

        switch (criteria) {
          case 'low':
            if (price > MIN_MIDDLE_PRICE) {
              return false;
            }
            break;
          case 'middle':
            if (price < MIN_MIDDLE_PRICE || price >= MIN_HIGH_PRICE) {
              return false;
            }
            break;
          case 'high':
            if (price < MIN_HIGH_PRICE) {
              return false;
            }
            break;
        }
      }
    }
  }
  const offerFeatures = offer.offer.features || [];
  for (const key of featuresKeys) {
    if (featuresValue[key] && !offerFeatures.includes(key)) {
      return false;
    }
  }

  return true;
};

export { setSelectValue, setFeaturesValue, filterOffers };
