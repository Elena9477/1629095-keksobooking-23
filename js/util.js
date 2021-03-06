const getCoordsInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min === max) {
    return +Math.abs(min);
  }
  if (max > min) {
    return +Math.abs(Math.floor(Math.random() * (max - min + 1) + min));
  } else {
    return +Math.abs(Math.floor(Math.random() * (min - max + 1) + max));
  }
};

const getCoordsFloat = (min, max, number) => {
  if (min === max) {
    return +Math.abs(min.toFixed(number));
  }
  if (max > min) {
    return +Math.abs(Math.random() * (max - min) + min).toFixed(number);
  } else {
    return +Math.abs(Math.random() * (min - max) + max).toFixed(number);
  }
};

export {getCoordsInt, getCoordsFloat};
