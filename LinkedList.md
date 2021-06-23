## <br>

# Algorithms and Data-Structures

---

## - Reverse A Linked Node List

---

<br>

```
A --> B --> C --> D --> none
D --> C --> B --> A --> none
```

<br>

```js
const reverseLinkedList = head => {
  let currentNode = head; // A | B | C
  let previousNode = null; // null | A | B
  let newHead = null;
  if (currentNode) {
    originalHead = head; // A | B | C
    originalNext = head.next; // B | C | D
    // reset original Head's .next
    originalHead.next = previousNode; // A --> null | B --> A | C --> B
    // reset previous Node
    previousNode = originalHead; // A | B | C
    // reset head
    newHead = originalNext; // B | C | D
    // reassign new Head's .next
    newHead.next = originalHead; // B --> A | C --> B | D --> C
  }
};

const reverseList = list => {
  console.log(list);
  for (i in list) {
    reverseLinkedList(i);
  }
  console.log(list);
};
```
