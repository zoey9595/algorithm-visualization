export function getInsertionSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  insertionSortAlgorithm(array, animations);
  return animations;
}

class Animation {
  constructor(left, right, swap, height) {
    this.left = left;
    this.right = right;
    this.swap = swap; // 0 means comparison; other value means change the index
    this.height = height; // change the height
  }
}

function insertionSortAlgorithm(array, animations) {
  for (let i = 1; i < array.length; i++) {
    for (let j = i; j > 0; j--) {
      animations.push(new Animation(j, j - 1, -1, 0));
      animations.push(new Animation(j, j - 1, -1, 0));
      if (array[j] < array[j - 1]) {
        animations.push(new Animation(j, j - 1, j, array[j - 1]));
        animations.push(new Animation(j, j - 1, j - 1, array[j]));
        swap(array, j, j - 1);
      }
    }
  }
}

function swap(array, i, j) {
  let temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}
