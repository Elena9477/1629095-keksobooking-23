function getCoords (min, max, number) {
  if (min == max) {
    return Math.abs(min.toFixed(number));
  }
  while(true) {
    let rand;
    if (max > min) {
      rand = min - 0.5 + Math.random() * (max - min + 1);
    } else {
      rand = max - 0.5 + Math.random() * (min - max + 1);
    }
    console.log(rand);
      return Math.abs(rand.toFixed(number));
  }

}

console.log(`вызов функции getCoords(). ответ: ${getCoords(1, 1, 5)}`);

