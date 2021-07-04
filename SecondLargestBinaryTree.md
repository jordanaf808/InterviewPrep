<br>

# Find The Second Largest Element In A Binary Search Tree

---

[link](https://www.interviewcake.com/question/javascript/second-largest-item-in-bst?utm_source=weekly_email&utm_source=drip&utm_campaign=weekly_email&utm_campaign=Interview%20Cake%20Weekly%20Problem%20%23354:%202nd%20Largest%20Item%20in%20a%20Binary%20Search%20Tree&utm_medium=email&utm_medium=email)

Here is a simple Binary Node class:

```js
class BinaryTreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insertLeft(value) {
    this.left = new BinaryTreeNode(value);
    return this.left;
  }

  insertRight(value) {
    this.right = new BinaryTreeNode(value);
    return this.right;
  }
}
```

<br>

For each node, compare the value of that node with the value of the next two nodes. Which ever node is the largest and 2nd largest and store it in a variable/array. For each next node, check if they are greater than one of the values we stored, if so replace that value. Return the second largest value.

<br>

### My First Attempt...

my initial attempt is a function which takes each node, and compares it's value with the value of the left and right node and return the first and second largest.

```js
const secondLargest = (headNode) => {
  const largestValues = []
  const headValue = headNode.value;
  for (let node of headValue){
    if (headValue > node.left.value){
      if (node.left.value > node.right.value){
          return largestValues.splice( 0, largestValues.length, headValue, node.left.value);
          // if left value !> right value, is right value the largest or 2nd largest.
        } else if (headValue > node.right.value){
            return largestValues[1] = node.right.value;
          } else {
            return largestValues.splice( 0, largestValues.length, node.right.value, headValue);
          }
    // if left value > head value, is it > right value?
    } else if (node.left.value > node.right.value){
      if (headValue > node.right.value){
        return largestValues.splice( 0, largestValues.length, node.left.value, headValue)
      } else {
        return largestValues.splice( 0, largestValues.length, node.left.value, node.right.value)
      }
    } else {
      return largestValues.splice( 0, largestValues.length, node.right.value, node.left.value);
    }
  }
  console.log(`second largest value currently = ${largestValues[1]});
}
```

or use .sort()

```js
const secondLargest = (headNode) => {
  const headValue = headNode.value;
  const leftValue = headNode.left.value
  const rightValue = headNode.right.value
  const largestValues = [headValue, leftValue, rightValue]
  console.log(largestValues.sort());
```

<br>

# This was really dumb...

because I should have looked up what a binary search tree is.

<br>

# What Is A Binary Search Tree?

<br>

A `Binary Search Tree` is a _Binary Tree_ where the nodes are ordered in a specific way.

> - the nodes to the left are smaller than the current node
>
> - the nodes to the right are larger than the current node.
>
> - the left and right sub-trees are also binary search trees

<br>

Since we now know that the right-most node is the largest, he uses a `RECURSIVE` approach to traverse the right-most nodes of the tree, until we hit the last right node, which should be the largest.

```js
const findLargest = rootNode => {
  if (!rootNode) {
    throw new Error('Tree must have at least 1 node');
  }
  if (rootNode.right) {
    // if this right-most node is the largest...
    return findLargest(rootNode.right);
  }
  // otherwise, we must be at the largest, right-most node.
  return rootNode.value;
};
```

So if the right-most node is the largest, the parent of that node is the second largest. Unless....

What if the last `right-most node` has a _left_ subtree of nodes?
We must handle both cases

>           ( 5 )
>          /     \
>        (3)     (8)
>       /  \     /  \
>     (1)  (4) (7)  (12)
>                   /
>                 (10)
>                 /  \
>               (9)  (11)

<br>

We take the node returned from our last findLargest function, then traverse that to find the largest node in the left subtree, which will be our `Second Largest`

```js
function findSecondLargest(rootNode) {
  // check if a left/right subtree exists, if not...
  if (!rootNode || (!rootNode.left && !rootNode.right)) {
    throw new Error('no more subtrees');
  }
  // case: we are at our largest and it has a left sub-tree
  // if a left node exists, use our findLargest function to traverse the subtree and return what will be the second largest to our rootNode.
  if (rootNode.left && !rootNode.right) {
    return findLargest(rootNode.left);
  }
  // if a right node exists, and there is no left sub-tree, the rootNode must be the 2nd largest.
  if (rootNode.right && !rootNode.right.left && !rootNode.right.right) {
    return rootNode.value;
  }
  // if a right node exists and it has a sub-tree of its own, recursively run this program again.
  return findSecondLargest(rootNode.right);
}
```

<br>

> "It'll take `O(h)` time (where `h` is the height of the tree) and `O(h)` space."
>
> We can, however, avoid `O(h)` of space...
>
> The largest value is simply the right-most node.

```js
function findLargest(rootNode) {
  let current = rootNode;
  while (current) {
    // if there are no more right nodes, return current node.
    if (!current.right) return current.value;
    // otherwise assign the right node to current and continue the while loop.
    current = current.right;
  }
}
```

If there is a `left subtree` (but _no_ `right sub-tree`), then the **current node** is the _largest_, and the **2nd Largest** node is in the `left subtree`.

After we find the largest with `findLargest()`, we traverse the Binary Tree again to find the second largest with... `findSecondLargest()`. If the largest node has no left subtree, than the 2nd largest node is above the largest, otherwise it is in the left sub-tree.

```js
// Returns Right-Most, Largest Node
findLargest(rootNode);

function findSecondLargest(rootNode) {
  // check if subtree exists
  if (!rootNode && !current.left && !current.right) {
    throw new Error('no sub tree');
  }

  let current = rootNode;
  // traverse the tree
  while (current) {
    // If the current node has a left node, but not a right node, traverse the left-node.
    if (current.left && !current.right) {
      // the 2nd largest will either be this current.left node, or it's right-most child.
      return findLargest(current.left);
    }

    // If the current root node has a right child-node, BUT that CHILD node has NO SIBLINGS. The current, root node must be the 2nd largest, and it's right-most node is the largest.
    if (current.right && !current.right.left && !current.right.right) {
      return current.value;
    }

    // If there is a left child-node, and a right child-node *with* siblings, make the right child-node, the *current* node and continue down the right side of the tree.
    current = current.right;
  }
}
```

We do one walk down the tree, which equals _O(1)_ of space and _O(h)_ time, where _h_ is height of the tree. (that becomes _O(log n)_ if the tree is balanced, otherwise _O(n)_)

Sometimes it's easier to break the problem down into simpler elements, like finding the largest node, which helped us figure out the second largest.

We also broke down the problem into different case strategies, breaking the problem into even smaller pieces. This will help keep you organized.

- If the tree is unbalanced (worst case) then `space`, `insert`, `lookup`, `delete` are _O(n)_.

Balanced BSTs perform better than Sorted Arrays, when inserting or deleting.

> "But, on average objects perform better than BSTs (meaning O(1)O(1) time complexity).
>
> No _O(1)_ operations. BSTs aren't the fastest for anything. On average, an array or an object will be faster."

# Bonus Problem!!!

## How do you check if it's a Binary Search Tree?

If a BST is a tree of nodes where the nodes to the left are lower than the root node and the nodes to the right are higher than the root node, than we must check the nodes for this logic.

I found this on StackOverflow [here](https://stackoverflow.com/questions/34044902/checking-if-a-binary-search-tree-is-valid-javascript 'checking if a binary search tree is valid javascript')

```js
//Give the recursive function starting values:

function checkBST(node) {
  // console.log(node.right);
  return isValidBST(node, null, null);
}

function isValidBST(node, min, max) {
  console.log(min, max);

  if (node === null) {
    return true;
  }

  if ((max !== null && node.val > max) || (min !== null && node.val < min)) {
    return false;
  }

  if (
    !isValidBST(node.left, min, node.val) ||
    !isValidBST(node.right, node.val, max)
  ) {
    return false;
  }
  return true;
}

var bst = new BinarySearchTree(8);
bst.insert(3);
bst.insert(1);
bst.insert(6);
bst.insert(10);
bst.insert(4);
```

            8
         /     \
        3      10
      /   \
     1     6
          /
         4

result

```js
null null
null 8
null 3
null 1
1 3
3 8
3 6
3 4
4 6
6 8
8 null
8 10
10 null
```

Again, we take a recursive approach, where we check each node in the tree against the minimum and maximum values we find in the tree. If the left sub-node is larger than the root node, _OR_, if the right sub-node is smaller than the root node. Than we know it is _NOT_ a BST. If we pass those two conditionals, than the sub-trees of those nodes pass that same test.
