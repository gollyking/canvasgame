

var mapping = [
  [0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 1, 3, 1, 0, 0, 0],
  [0, 0, 1, 0, 1, 1, 1, 1],
  [1, 1, 1, 2, 0, 2, 0, 1],
  [1, 3, 0, 2, 0, 1, 1, 1],
  [1, 1, 1, 1, 2, 1, 0, 0],
  [0, 0, 0, 1, 0, 1, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0],
];

var map1 = function () {
  this.mapping = mapping;
}

if (typeof module !== 'undefined')
  module.exports = new map1();