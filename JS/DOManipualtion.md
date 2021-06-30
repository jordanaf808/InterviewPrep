<br>

# DOM Manipulation

---

<br>

## Adding Elements

```js
// add to this:
const body = document.body;

// add strings or elements to the DOM
body.append('Hello World'); // "Hello World"

// Can only accept an html Element.
body.appendChild('Hello World'); // Error: Not a node.

// Accepts multiple arguments.
body.append('Hello', 'Goodbye');

// Create an Element
const div = document.createElement('div'); // ... nothing happens... We "Created it, BUT we never ADDED it...
// here:
body.append(div);

// add text to div
div.innerText = 'Hello World'; // <div>Hello World</div>
// OR
div.textContent = 'Hi Bob!';

// if you query el.innerText vs .textContent, innerText will return the text how we see it in the browser. textContent will return the text how it looks in the html source code, minus the code.

// Add HTML. Can cause Security risks
div.innerHTML = '<strong>Hello World</strong>';
//OR: more Secure way.
const strong = document.createElement('strong');
strong.innerText = 'Hello World';
div.append(strong);
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>DOM Manipulation</title>
  <script src="script.js" defer></script>
</head>
<body>
  <div>
    <span id="hi">Hello</span>
    <span id="bye">Bye</span>
</body>
</html>
```

script.js

```js
const q = el => document.querySelector(el);
const body = document.body;
const div = q('div');
const spanHi = q('#hi');
const spanBye = q('#bye');

// remove element from DOM
spanBye.remove();
// bring it back
div.append(spanBye);
// remove it through the parent
div.removeChild(spanHi);

// get attributes
spanHi.getAttribute('id'); // "hi"
spanHi.id; // "hi"
spanHi.title; // "Hello"

spanHi.setAttribute('id', 'hiii'); // <span id="hiii">
spanHi.setAttribute('title', 'hiii'); // <span id="hiii">hiii</span>
spanHi.title = 'Hey'; // <span id="hiii">Hey</span>

spanHi.removeAttribute('id'); // <span>Hey</span>
```

Data Attributes - custom information you can add to elements with certain methods. start with `data-...` [Learn More Here](https://blog.webdevsimplified.com/2020-10/javascript-data-attributes/)

```html
<span id="hiii" data-test="this is a test">Hey</span>
```

get data

add another one

```html
<span
  id="hiii"
  data-test="this is a test"
  data-another-test="this is another test"
  >Hey</span
>
```

notice that "data-another-test" was converted to camal-case in the DOMStringMap object.

```js
console.log(spanHi.dataset); // DOMStringMap {test: "this is a test" anotherTest: "this is another test"}
console.log(spanHi.dataset.test); // "this is a test"

spanHI.dataset.newName = 'Jordan'; // <span data-new-name="Jordan"
```

class

```js
spanHi.classList.add('new-class'); //<span class="new-class">
spanHi.classList.remove('new-class');

// automatically add or remove a class,
spanHi.classList.toggle('newer-class');
// pass in a boolean to control this
spanHi.classList.toggle('newer-class', false);
// false = automatically remove
// true = automatically add

spanHi.style.color = 'red';
// convert to camalCase
spanHi.style.backgroundColor = 'blue';
```
