export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const duplicateArray = array.slice();
  mergeSortAlgorithm(array, duplicateArray, 0, array.length - 1, animations);
  return animations;
}

function mergeSortAlgorithm(array, duplicateArray, l, r, animations) {
  if (l === r) return;
  const m = Math.floor((l + r) / 2);
  mergeSortAlgorithm(duplicateArray, array, l, m, animations);
  mergeSortAlgorithm(duplicateArray, array, m + 1, r, animations);
  merge(array, duplicateArray, l, m, r, animations);
}

function merge(array, duplicateArray, l, m, r, animations) {
  let k = l;
  let i = l;
  let j = m + 1;

  while (i <= m && j <= r) {
    animations.push([i, j]);
    animations.push([i, j]);

    if (duplicateArray[i] <= duplicateArray[j]) {
      animations.push([k, duplicateArray[i]]);
      array[k++] = duplicateArray[i++];
    } else {
      animations.push([k, duplicateArray[j]]);
      array[k++] = duplicateArray[j++];
    }
  }

  while (i <= m) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, duplicateArray[i]]);
    array[k++] = duplicateArray[i++];
  }

  while (j <= r) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, duplicateArray[j]]);
    array[k++] = duplicateArray[j++];
  }
}
