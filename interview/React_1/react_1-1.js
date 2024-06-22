/**
 * There is an array, each item has such format
 * {
 *  firstName: 'xxx',
 *  lastName: 'xxx',
 *  customerID: 'xxx',
 *  note: 'xxx',
 *  profession: 'xxx',
 * }
 *
 * lastName, note can be empty
 * customerID can only be a set of digital numbers.
 * profession can only have 'student', 'freelancer', 'productOwner', 'engineer' or 'systemAnalytics'
 */

const { users, professionOrder } = require("./constants");
/**
 * Q1. Please follow the principle of (`firstName` + `lastName` + `customerID`)
 *     to sort this array an print it out
 */

function sortUserName(user) {
  const sortedUser = user.sort((cur, next) => {
    const _curName = `${cur.firstName}${cur.lastName}${cur.customerID}`;
    const _nextName = `${next.firstName}${next.lastName}${next.customerID}`;

    if (_curName < _nextName) return -1;
    if (_curName > _nextName) return 1;
    return 0;
  });

  return sortedUser;
}

/**
 * Q2. Please sort by `profession` to follow the principle of
 *     (`systemAnalytics` > `engineer` > `productOwner` > `freelancer` > `student`)
 */

function sortByType(user) {
  console.log(professionOrder);

  const sortedUser = user.sort((cur, next) => {
    const _curWeight = professionOrder[cur.profession];
    const _nextWeight = professionOrder[next.profession];

    if (_curWeight < _nextWeight) return 1;
    if (_curWeight > _nextWeight) return -1;
    return 0;
  });

  return sortedUser;
}

console.log(sortUserName(users));
console.log(sortByType(users));
