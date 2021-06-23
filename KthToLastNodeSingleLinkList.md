<br>

# Find the `Kth`-to-Last Node in a Singly Linked-List

---

<br>

You can't traverse backwards through a _Singly-Linked-List_, you only know the next item from your position on the list.

The first solution might require that you traverse through the whole list until you reach the end,

```js
  function kthToLastNode(k, head) {
  // STEP 1: get the length of the list
  // Start at 1, not 0
  // else we'd fail to count the head node!
  let listLength = 1;
  let currentNode = head;
while (currentNode.next) {
  currentNode = currentNode.next;
  listLength += 1;
}
```

subtract `k` from the length of the list (init. `let length = 1` not `0` to account for the head of the list.), and traverse the list _again_ to return the `Kth`-to-last node. This takes O(n)time and O(1)space

> "More precisely, it takes nn steps to get the length of the list, and another `n-k` steps to reach the target node. In the worst case `k=1`, so we have to walk all the way from head to tail again to reach the target node. This is a total of `2n` steps, which is `O(n)`."

```js
  const howFarToGo = listLength - k;

  currentNode = head;
  for (let i = 0; i < howFarToGo; i++) {
    currentNode = currentNode.next;
  }

  return currentNode;
}
```

> "We can do this in `O(n)` time. We can do this in `O(1)` space. If you're recursing, you're probably taking `O(n)` space on the call stack!"

> "A Call-Stack usually stores:
>
> - Local Variables
> - Arguments
> - Information about the caller's stack frame
> - _The Return Address_ - What the program does after the function returns"

- A `Recursive` approach calls the same function within itself, increasing the size of the _call stack_ with each function call, it returns the result of the first function to the callback of the next function call, until complete. like a big nesting doll.

- An `Iterative` approach passes the result of each call into local state variable(s) and recalling the same function with the updated variables, until complete. This method uses only `O^1`space on the call stack.

## Second Approach

What if we had a "_stick_" that was `K` long? We could traverse the list at two points. Starting with the "head" of the stick until it hits the `Kth` node and then the start counting the tail of the stick `K` nodes back. We would iterate over each node in the list until the head of the stick hits the end, and the tail of our stick will return the `Kth-to-last` node. Both approaches use `O(n)`time and `O(1)`space. But this approach could be faster depending on system caching and processor.

```js
function kthToLastNode(k, head) {
  if (k < 1) {
    throw new Error(`Impossible to find less than first to last node: ${k}`);
  }
  let leftNode = head;
  let rightNode = head;

  // Move rightNode to the kth node - 1 to account for starting at 0.
  for (let i = 0; i < k - 1; i++) {
    // But along the way, if a rightNode doesn't have a next,
    // then k is greater than the length of the list and there
    // can't be a kth-to-last node! we'll raise an error
    if (!rightNode.next) {
      throw new Error(`k is larger than the length of the linked list: ${k}`);
    }

    rightNode = rightNode.next;
  }

  // Starting with leftNode on the head,
  // move leftNode and rightNode down the list,
  // maintaining a distance of k between them,
  // until rightNode hits the end of the list
  while (rightNode.next) {
    leftNode = leftNode.next;
    rightNode = rightNode.next;
  }

  // Since leftNode is k nodes behind rightNode,
  // leftNode is now the kth to last node!
  return leftNode;
}
```

> "In the second approach, rightNode also walks all the way from head to tail, and leftNode also walks from the head to the target node.

So in both cases, we have two pointers taking the same steps through our list. The only difference is the order in which the steps are taken. The number of steps is the same either way.

However, the second approach might still be slightly faster, due to some caching and other optimizations that modern processors and memory have."
