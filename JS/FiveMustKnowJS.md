<br>

# 5 Must Know Javascript Features

---

<br>

## 1. Nullish Coalescing

---

<br>

In javascript, when you are trying to verify whether a variable is **`falsey`** and the value of the variable is the integer: **`0`**, then javascript will incorrectly process that value as **`false`**. for example:

<br>

```js
function calculatePrice(price, taxes, description) {
  taxes = taxes || 0.05;
  description = description || 'Default Value';
  const totale = price * (1 + taxes);
  console.log(`${description}, with tax $${total}`);
}
calculatePrice(100, 0, 'Supposed to be $100, with zero tax'); // result: $105.
```

<br>

use new "**`??`**" **_Nullish Coalescing_** syntax to check if `null` or `undefined` .

```js
function calculatePrice(price, taxes, description) {
  taxes = taxes ?? 0.05;
  description = description ?? 'Default Value';
  const totale = price * (1 + taxes);
  console.log(`${description}, with tax $${total}`);
}
calculatePrice(100, 0, 'Supposed to be $100, with zero tax'); // result: $100.
```

---

<br>

## 2. Style Console.logs

---

<br>

- begin styling by starting the output with a `%c and capping it off with another
  accent.
- Then add a comma and a string representing the css-like styles.

```js
console.log(
  `%c${variable} in a string. %c Here is the second style"`,
  'font-weight: bold; color: red',
  'font-size: .75rem; color: green'
);
```

---

<br>

## 3. Optional Chaining

---

<br>

In this example, we will return an error because we do not have an `state` defined in the address object.

```js
class Person {
  constructor(name, address, hobbies) {
    this.name = name;
    this.address = address;
    this.hobbies = hobbies;
  }

  print() {
    console.log(this);
  }
}

let printPersonState = person => {
  console.log(person.address.state);
};

const kyle = new Person('kyle', { street: '1234 Main St.', city: 'Kailua' }, [
  'bowling',
  'rocking'
]);
kyle.print();

printPersonStreet(kyle);
```

One way to prevent errors are using Boolean operators: &&.

In this way we are saying if `person` is defined AND `person.address` is defined, AND `...state` is defined, return `...state`, otherwise return `undefined`.

```js
let printPersonState = person => {
  console.log(person && person.address && person.address.state);
};
```

Now, we have optional chaining `something?.somethingElse` which checks if something exists.

```js
let printPersonState = person => {
  console.log(person?.address?.state);
};
```

Use it to check if a function both exists AND is a function by putting `?.` right before the `()`. If not, it won't execute the undefined function.

```js
printPersonState?.();
```

Use the same method for arrays `array?.[]`

```js
console.log(person.hobbies?.[0].toUpperCase());
```

---

<br>

## 4. Object Shorthand

---

<br>

```js
const thing = {
  one: one,
  two: two
};
```

can now be written like:

```js
const thing = {
  one,
  two
};
```

---

<br>

## 5. Defer/Async Loading

---

<br>

`defer` - allows script to be loaded **after** the rest of the body loads. Helps page load better and organize scripts in the head.

```html
<script src="script.js" defer></script>
```
