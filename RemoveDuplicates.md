<br>

# Remove Duplicates

---

<br>

Using A combination of the `for` loop and `indexOf()` string method, we pass in each item to our new array, checking if it already exists in the new array, if so, don't add it to the new array. You could also use the string method `includes` which returns `true` or `false`.

```js
let duplicates = [
  'alpha',
  'beta',
  'lima',
  'alpha',
  'delta',
  'alpha',
  'delta',
  'lima'
];

function removeDuplicates(items) {
  let originals = [];
  for (let count = 0; count < items.length - 1; count++) {
    if (originals.indexOf(items[count]) === -1) {
      originals.push(items[count]);
    }
  }
  return originals;
}

const result = removeDuplicates(duplicates);
console.log(result);
```

refactor with `filter` Array Method.

For each item in _dupes_ we test whether the `indexOf()` the _item_ is equal to the (_array method_) `index`. Remember, the _string method_ indexOf() will return the first index it finds in the array. So, if we find a duplicate item in the array, `indexOf()` will return the first occurrence of item, while `filter()` will return the duplicate. Since the index of the duplicates in the array are different we can `filter()` the duplicate out. This code is shorter and more efficient.

```js
function filterDuplicates(dupes) {
  return dupes.filter((item, index) => dupes.indexOf(item) === index);
}

const result = filterDuplicates(duplicates);
console.log(result);
```
