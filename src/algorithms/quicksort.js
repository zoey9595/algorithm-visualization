export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  quickSortAlgorithm(array, 0, array.length - 1, animations);
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

function quickSortAlgorithm(array, l, h, animations) {
  if (l < h) {
    let i = partition(array, l, h, animations);
    quickSortAlgorithm(array, l, i - 1, animations);
    quickSortAlgorithm(array, i + 1, h, animations);
  }
}

function partition(array, l, h, animations) {
  let i = l;
  let j = h + 1;
  let pivot = array[l];

  while (true) {
    while (array[++i] < pivot && i !== h) {
      animations.push(new Animation(i, l, -1, 0));
      animations.push(new Animation(i, l, -1, 0));
    }
    while (array[--j] > pivot && j !== l) {
      animations.push(new Animation(j, l, -1, 0));
      animations.push(new Animation(j, l, -1, 0));
    }
    if (i >= j) break;
    animations.push(new Animation(i, j, j, array[i]));
    animations.push(new Animation(i, j, i, array[j]));
    swap(array, i, j);
  }
  animations.push(new Animation(l, j, l, array[j]));
  animations.push(new Animation(l, j, j, array[l]));
  swap(array, l, j);
  return j;
}

function swap(array, i, j) {
  let temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}
