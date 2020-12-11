export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  bubbleSortAlgorithm(array, animations);
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

function bubbleSortAlgorithm(array, animations) {
  for (let i = 0; i < array.length - 1; i++) {
    let min = i;
    for (let j = i + 1; j < array.length; j++) {
      animations.push(new Animation(min, j, -1, 0));
      animations.push(new Animation(min, j, -1, 0));
      if (array[j] < array[min]) {
        min = j;
      }
    }
    animations.push(new Animation(i, min, min, array[i]));
    animations.push(new Animation(i, min, i, array[min]));
    swap(array, i, min);
  }
}

function swap(array, i, j) {
  let temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}
