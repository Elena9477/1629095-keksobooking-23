let pureData = [];
const setPureData = (data) => {
  pureData = data;
};

const getPureData = () => pureData;

const getPreparedData = (filterFn) => {
  const data = [...pureData];
  const preparedData = (typeof (filterFn) === 'function') ? data.filter(filterFn).slice(0, 10) : data.slice(0, 10);
  return preparedData;
};

export { getPureData, getPreparedData, setPureData };
