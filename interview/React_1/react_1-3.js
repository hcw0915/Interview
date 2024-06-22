/**
 *
 * Please write down a function is used to create an array of unique values
 *
 * let items = [1, 1, 1, 2, 5, 6, 3, 4, 5, 6, 7, 8, 8, 8, 8, 8, 9, 3, 4, 1, 6, 7, 7, 8, 2]
 *
 * output = [1, 5, 2, 3, 4, 5, 7, 8, 9, 0, 6]
 */

const { duplicateList } = require("./constants");

function getUniqueNumber(items) {
  // const result = [];
  // for (let i = 0; i < items.length; i++) {
  //   const isAlreadyExist = result.includes(items[i]);
  //   if (!isAlreadyExist) result.push(items[i]);
  // }

  // const result = items.reduce((acc, cur) => {
  //   const isAlreadyExist = acc.includes(cur);
  //   if (!isAlreadyExist) acc.push(cur);
  //   return acc;
  // }, []);

  const result = Array.from(new Set(items));

  return result;
}

console.log(getUniqueNumber(duplicateList));
