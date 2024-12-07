const crypto = require('node:crypto');

/* 
Given an array like [123, 456, 789], returns 'rgb(123,456,789)'
*/
const convertColorsArrToRGB = ([color1, color2, color3]) => {
  return `rgb(${color1}, ${color2}, ${color3})`;
};

const getRandomBytes = () => {
  return new Promise((resolve, reject) => {
    // we're basically turning this code below into a Promise
    crypto.randomFill(new Uint8Array(3), (err, buffer) => {
      if (err) return reject(err);
      // Focus here!
      // An array like this will be resolved: [123, 211, 105]
      const colorsArr = [...buffer]
      resolve(colorsArr);
    });
  })
};

// Hints: 
// - understand what getRandomBytes() resolves to
// - take the resolved colorsArr, turn it into an rgb color, and add it to colors
// - understand how to chain together getRandomBytes
// - make sure to return colors at the end
const return4RandomColors = () => {
  const colors = [];
  return getRandomBytes()
    .then(() => {
    })
    .then(() => {
    })
    .then(() => {
    })
    .then(() => {
    })
    .catch((err) => {
      console.error(err);
    });
};

return4RandomColors().then(console.log);

module.exports = {
  convertColorsArrToRGB,
  getRandomBytes,
  return4RandomColors,
};
