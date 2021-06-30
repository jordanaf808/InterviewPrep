<br>

# Hashtag Generator

---

1.  check if the input is empty or empty string, if so, return false
2.  split by " ", and capitalize first letter of words.
3.  check length is < 140 chars, if so, return false.
4.  add hashtag

My biggest problem was figuring out what combination of array and string methods I was able to use.
And not paying attention to simple mistakes like returning twice in the same statement.
I needed to push the capitalized words to an array, so I could use .join to combine them, which also convert it to a string.
Then I needed to move the length check to after hashtagged, in case that # sent it over.

```js
function generateHashtag(str) {
  let splitSpaces = '',
    capitalized = [],
    joined = '',
    hashtagged = '#', // I should have started with this. Remember to count this when checking length.
    capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);

  // Check if empty is true, !str.trim() - trims space, amd an empty array returns false, so !false=true
  if (str == ' ' || str.length == 0 || !str.trim()) {
    console.log('empty string');
    return false;
  }
  // split into each word
  splitSpaces = str.split(' ');
  //   console.log(`split spaces: ${splitSpaces}, length: ${splitSpaces.length}`);

  // capitalize each word
  for (let word of splitSpaces) {
    capitalized.push(capitalize(word));
  }
  console.log(`capitalized: ${capitalized}`, typeof capitalized);

  // if more than one word, join, otherwise just hashtag it.
  if (capitalized.length > 1) {
    // join each capitalized word, into one string
    joined = capitalized.join('');
    console.log(`joined: ${joined}, type of: `, typeof joined);
    hashtagged += joined;
  } else {
    hashtagged += capitalized;
  }
  console.log(`hashtagged: ${hashtagged}, length: `, hashtagged.length);

  // check if too long.
  if (hashtagged.length > 140) {
    console.log('Too many characters.');
    return false;
  }
  return hashtagged;
}
```
