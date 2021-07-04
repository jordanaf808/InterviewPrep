# Merge Sorted Arrays

```js
const myArray = [3, 4, 6, 10, 11, 15];
const otherArray = [1, 5, 8, 12, 14, 19];
// expected output: logs [1, 3, 4, 5, 6, 8, 10, 11, 12, 14, 15, 19]
```

My first tries attempted a for loop and conditional statement, if the index of the array was larger than the next index, the add it to the end of a new array.

```js
const mergeArrays = (a, b) => {
  const arrays = a.concat(b);
  const lengthOfArrays = arrays.length;
  console.log(`length of arrays: ${lengthOfArrays}`);
  console.log(`${arrays}`);
  const newArray = [];
  for (let i = 0, j = 1; newArray.length < lengthOfArrays; i++, j++) {
    console.log('i=' + i, 'j=' + j, arrays[i], arrays[j]);
    arrays[i] > arrays[j]
      ? newArray.push(arrays[i])
      : newArray.unshift(arrays[i]);
    console.log(newArray);
  }
  return newArray;
};
```

returned this array:

```json
length of arrays: 12
3,4,6,10,11,15,1,5,8,12,14,19
i=0 j=1 3 4
 [3]
i=1 j=2 4 6
 (2) [4, 3]
i=2 j=3 6 10
 (3) [6, 4, 3]
i=3 j=4 10 11
 (4) [10, 6, 4, 3]
i=4 j=5 11 15
 (5) [11, 10, 6, 4, 3]
i=5 j=6 15 1
 (6) [11, 10, 6, 4, 3, 15]
i=6 j=7 1 5
 (7) [1, 11, 10, 6, 4, 3, 15]
i=7 j=8 5 8
 (8) [5, 1, 11, 10, 6, 4, 3, 15]
i=8 j=9 8 12
 (9) [8, 5, 1, 11, 10, 6, 4, 3, 15]
i=9 j=10 12 14
 (10) [12, 8, 5, 1, 11, 10, 6, 4, 3, 15]
i=10 j=11 14 19
 (11) [14, 12, 8, 5, 1, 11, 10, 6, 4, 3, 15]
i=11 j=12 19 undefined
 (12) [19, 14, 12, 8, 5, 1, 11, 10, 6, 4, 3, 15]
(12) [19, 14, 12, 8, 5, 1, 11, 10, 6, 4, 3, 15]
```

# BUT!!!!!!

There actually is a `SORT` array method...

```js
const results = array.sort((a, b) => {
  return a - b;
  // if you return a NEGATIVE number:
  // A is sorted BEFORE B
  // if you return a POSITIVE number:
  // B is sorted BEFORE A
  // if 0, no change is made
  // you could flip it: b - a
});
```

```js
const mergeArrays = (array, otherArray) => {
  let combineArrays = array.concat(otherArray);
  combineArrays.sort((a, b) => a - b);
  return combineArrays;
};
//(12) [1, 3, 4, 5, 6, 8, 10, 11, 12, 14, 15, 19]
```

> "What would the time cost be?
>
> O(n lg n), where n is the total length of our output array (the sum of the lengths of our inputs).
>
> We can do better. With this algorithm, we're not really taking advantage of the fact that the input arrays are themselves already sorted. How can we save time by using this fact?"

Since the arrays are separately in order, we can grab both arrays at the 0th index, compare them, and add it to the merged array in order. To do this we need to keep track of what index we are at in each array.

```js
const mergeArrays = (array, otherArray) => {
  let newArray = [];
  let indexArray = 0;
  let indexOtherArray = 0;
  let indexMergedArray = 0;

  // while the counter of the merged array is less than the length of both arrays combined, do this...
  while (indexMergedArray < array.length + otherArray.length) {
    let firstUnmergedArray = array[indexArray];
    let firstUnmergedOtherArray = otherArray[indexOtherArray];

    // If the value of array[i] < otherArray[i], add array[i] to the new merged array, then add 1 to the counter of the first array.
    if (firstUnmergedArray < firstUnmergedOtherArray) {
      newArray[indexMergedArray] = firstUnmergedArray;
      indexArray++;
    } else {
      // Or add otherArray, and add 1 to it's counter.
      newArray[indexMergedArray] = firstUnmergedOtherArray;
      indexOtherArray++;
    }
    // add 1 to the index of the merged array
    indexMergedArray++;
  }
  return newArray;
};
```

> "Here are some edge cases:
>
> 1. One or both of our input arrays is 0 elements or 1 element
> 2. One of our input arrays is longer than the other.
> 3. One of our arrays runs out of elements before we're done merging.
>
> Actually, (3) will always happen. In the process of merging our arrays, we'll certainly exhaust one before we exhaust the other."

To fix that we need to check if our `indexArray` variable for the first array is >= the length of the first array, meaning we have run through that entire array

> "The if statement is carefully constructed to avoid indexing past the end of an array, because JavaScript would give us undefined and we don't want to compare undefined with an integer. We take advantage of JavaScript's short circuit evaluation ↴ and check first if the arrays are exhausted."

```js
function mergeArrays(myArray, alicesArray) {
  // Set up our mergedArray
  const mergedArray = [];

  let currentIndexAlices = 0;
  let currentIndexMine = 0;
  let currentIndexMerged = 0;

  while (currentIndexMerged < myArray.length + alicesArray.length) {
    const isMyArrayExhausted = currentIndexMine >= myArray.length;
    const isAlicesArrayExhausted = currentIndexAlices >= alicesArray.length;

    // Case: next comes from my array
    // My array must not be exhausted, and EITHER:
    // 1) Alice's array IS exhausted, or
    // 2) The current element in my array is less
    //    than the current element in Alice's array
    if (
      !isMyArrayExhausted &&
      (isAlicesArrayExhausted ||
        myArray[currentIndexMine] < alicesArray[currentIndexAlices])
    ) {
      mergedArray[currentIndexMerged] = myArray[currentIndexMine];
      currentIndexMine++;

      // Case: next comes from Alice's array
    } else {
      mergedArray[currentIndexMerged] = alicesArray[currentIndexAlices];
      currentIndexAlices++;
    }

    currentIndexMerged++;
  }

  return mergedArray;
}
```
