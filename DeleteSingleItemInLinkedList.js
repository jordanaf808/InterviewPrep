class LinkedListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// MY WORK HERE:
// Delete the input node from the linked list
function deleteNode(nodeToDelete) {
  // Check if a next node exists...
  if (nodeToDelete.next !== null) {
    let newNextNode = nodeToDelete.next; // if so, set it to a variable.
    nodeToDelete.value = newNextNode.value; // if so, set it to the next node's value
    // nodeToDelete.next = null; // if newNextNode.next does not exist, set nodeToDelete.next to null.
    if (newNextNode.next !== null) {
      // then, check if newNextNode.next exists.
      nodeToDelete.next = newNextNode.next; // if so, set it as nodeToDelete's .next
    }
    nodeToDelete.next = null; // isnt this supposed to be down here?
    console.log(
      `node transformed to nextNode. value: ${nodeToDelete.value}, next: ${nodeToDelete.next}`
    );
    return nodeToDelete;
  } // If nodeToDelete.next === null, then set nodeToDelete = null.
  console.log(`nodeToDelete is last node, so setting it's value to null.`);
  return (nodeToDelete = null);
}
/*** NOTE!! ***/
/*** 
First, it doesn't work for deleting the last node in the list. We could change the node we're deleting to have a value of null, but the second-to-last node's next pointer would still point to a node, even though it should be null. This could work—we could treat this last, "deleted" node with value null as a "dead node" or a "sentinel node," and adjust any node traversing code to stop traversing when it hits such a node. The trade-off there is we couldn't have non-dead nodes with values set to null. Instead we chose to throw an exception in this case.
***/

// Tests

let desc = 'node at beginning';
let head = new LinkedListNode(1);
let nodeToDelete = head;
appendToList(head, 2);
appendToList(head, 3);
appendToList(head, 4);

deleteNode(head);

let node = head;
assertEquals(2, node.value, desc);
node = node.next;
assertEquals(3, node.value, desc);
node = node.next;
assertEquals(4, node.value, desc);
assertEquals(node.next, null, desc);

desc = 'node in middle';
head = new LinkedListNode(1);
nodeToDelete = appendToList(head, 2);
appendToList(head, 3);
appendToList(head, 4);

deleteNode(nodeToDelete);

node = head;
assertEquals(1, node.value, desc);
node = node.next;
assertEquals(3, node.value, desc);
node = node.next;
assertEquals(4, node.value, desc);
assertEquals(node.next, null, desc);

desc = 'node at end';
head = new LinkedListNode(1);
appendToList(head, 2);
appendToList(head, 3);
nodeToDelete = appendToList(head, 4);

assertThrows(() => deleteNode(nodeToDelete), desc);

desc = 'node at end';
head = new LinkedListNode(1);
nodeToDelete = head;

assertThrows(() => deleteNode(nodeToDelete), desc);

function appendToList(head, value) {
  let tail = head;
  while (tail.next) {
    tail = tail.next;
  }
  tail.next = new LinkedListNode(value);
  return tail.next;
}

function assertEquals(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`);
  }
}

function assertThrows(func, desc) {
  try {
    func();
    console.log(`${desc} ... FAIL`);
  } catch (e) {
    console.log(`${desc} ... PASS`);
  }
}
