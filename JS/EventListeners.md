<br>

# Event Listeners

## Syntax

> ```js
> target.addEventListener(type, listener);
> target.addEventListener(type, listener, options);
> target.addEventListener(type, listener, useCapture);
> target.addEventListener(type, listener, useCapture, wantsUntrusted); // wantsUntrusted is Firefox only
> ```

> __Why use addEventListener()?__
> `addEventListener()` is the way to register an event listener as specified in _W3C DOM_. The benefits are as follows:
> 
> - It allows adding more than a single handler for an event. This is particularly useful for AJAX libraries, JavaScript modules, or any other kind of code that needs to work well with other libraries/extensions.
> - It gives you finer-grained control of the phase when the listener is activated (capturing vs. bubbling).
> - It works on any DOM element, not just HTML elements.

_Always console.log the event object. There are so many properties to explore and utilize:_

### _Event Properties:_

|            |                       |
| ---------- | --------------------- |
| srcElement | target.childNodes     |
| target     | target.classNam       |
| type       | target.innerHTML/Text |
| x, y...    | target.hidden         |
| firstChild | target./lastChild     |
| timeStamp  | baseURI               |

Events "bubble" through their parent elements all the way UP to the main html document. That is the "Bubble Phase".

The next phase is the "Capture Phase" It runs opposite of the bubble phase and starts from the document DOWN to the element that triggered the event.

change an event listener to "capture event" by passing in an object {capture: true} as the 2nd argument to the eventListener, after the function.

```js
addEventListener('click', e => {
............
console.log("Grandparent")
}, { capture: true });
```

console.log returns:

    // Grandparent
    // Child
    // Parent
    // Document

because only the grandparent was set to capture, it printed out first then the Bubble Phase started and printed out the console.logs.

e.stopPropagation stops bubbling and capturing from continuing.

another object you can pass in as the 2nd argument:
{ once: true } only runs one bubble/capture

run this in a function to remove an event listener.
_element_.removeEventListener

note:
this will not remove the anonymous function on the event listener on the parent element, because it is not selecting that console.log function. the removeEventListener() actually created a new one and deleted that without removing the original eventListener. You need to declare that function to remove it!

```js
parent.addEventListener('click' () => {
console.log('hi');
})

function(() => {
parent.removeEventListener('click', () => {
console.log('hi')
});
});
```

---

## The value of "this" within the handler

> "If attaching a handler function to an element using `addEventListener()`, the value of `this` inside the handler is a reference to the _element_. It is the same as the value of the `currentTarget` property of the _event_ argument that is passed to the handler."

```js
my_element.addEventListener('click', function (e) {
  console.log(this.className)           // logs the className of my_element
  console.log(e.currentTarget === this) // logs `true`
})
```

> "As a reminder, arrow functions do not have their own this context."

```js
my_element.addEventListener('click', (e) => {
  console.log(this.className)           // WARNING: `this` is not `my_element`
  console.log(e.currentTarget === this) // logs `false`
})
```

> "If an event handler (for example, onclick) is specified on an element in the HTML source, the JavaScript code in the attribute value is effectively wrapped in a handler function that binds the value of this in a manner consistent with the addEventListener(); an occurrence of this within the code represents a reference to the element."

```js
<table id="my_table" onclick="console.log(this.id);"><!-- `this` refers to the table; logs 'my_table' -->
  ...
</table>
```


      .matches() returns true when the event.target matches with the corresponding element or css selector we passed in as an argument.

      This will print 'true' whenever we click on
      document.addEventListener('click', e => {
        if (e.target.matches('div')) {
          console.log('true')
        }
      })
    e.target.matches('div')

---

That works great when your links look like this.

`<a class="click-me" href="#">Click Me!</a>`
But what about when your links look like this?

```html
<a class="click-me" href="#">
  <span class="click-me-text">Click Me!</span>
  <span class="click-me-icon">+</span>
</a>
```

With a markup structure like that, event.target.matches('.click-me') will fail pretty much every time.

Because the markup structure is nested, the element your clicking is actually either the .click-me-text element or the .click-me-icon element. The matches() method only checks the class of the actual element itself.

Fortunately, there’s an easy way to keep the markup structure and the same simple event delegation technique: the closest() method.

document.addEventListener('click', function (event) {

    // If the clicked element doesn't have the class, bail
    if (!event.target.closest('.click-me')) return;

    // Otherwise, do whatever...

    }, false);

The closest() method checks to see if the element or any parent of the element have the selector you’re trying to match. This makes it really flexible.

// FromMDN
// For compatibility, a non-function object with a `handleEvent` property is
// treated just the same as a function itself.

```js
buttonElement.addEventListener('click', {
handleEvent: function (event) {
alert('Element clicked through handleEvent property!');
}
```

## Event listener with anonymous function

> "Here, we'll take a look at how to use an anonymous function to pass parameters into the event listener."

This function has an __anonymous__ function, allowing us to pass parameters to the event _handler_ function: `modifyText("four")`
```js
const el = document.getElementById("outside");
el.addEventListener("click", function(){modifyText("four")}, false);
```

And with an arrow function

```js
const el = document.getElementById("outside");
el.addEventListener("click", () => { modifyText("four"); }, false);
```

> "__Please note__ - that while anonymous and arrow functions are similar, they have different this bindings. While anonymous (and all traditional JavaScript functions) create their own this bindings, arrow functions inherit the this binding of the containing function."

> "That means that the variables and constants available to the containing function are also available to the event handler when using an arrow function."

# Example of passing Options to an Event Listener.

```html
<div class="outer">
  outer, once & none-once
  <div class="middle" target="_blank">
    middle, capture & none-capture
    <a class="inner1" href="https://www.mozilla.org" target="_blank">
      inner1, passive & preventDefault(which is not allowed)
    </a>
    <a class="inner2" href="https://developer.mozilla.org/" target="_blank">
      inner2, none-passive & preventDefault(not open new page)
    </a>
  </div>
</div>
```

```css
.outer, .middle, .inner1, .inner2 {
  display: block;
  width:   520px;
  padding: 15px;
  margin:  15px;
  text-decoration: none;
}
.outer {
  border: 1px solid red;
  color:  red;
}
.middle {
  border: 1px solid green;
  color:  green;
  width:  460px;
}
.inner1, .inner2 {
  border: 1px solid purple;
  color:  purple;
  width:  400px;
}
```

```js
const outer  = document.querySelector('.outer');
const middle = document.querySelector('.middle');
const inner1 = document.querySelector('.inner1');
const inner2 = document.querySelector('.inner2');

const capture = {
  capture : true
};
const noneCapture = {
  capture : false
};
const once = {
  once : true
};
const noneOnce = {
  once : false
};
const passive = {
  passive : true
};
const nonePassive = {
  passive : false
};

outer.addEventListener('click', onceHandler, once);
outer.addEventListener('click', noneOnceHandler, noneOnce);
middle.addEventListener('click', captureHandler, capture);
middle.addEventListener('click', noneCaptureHandler, noneCapture);
inner1.addEventListener('click', passiveHandler, passive);
inner2.addEventListener('click', nonePassiveHandler, nonePassive);

function onceHandler(event) {
  alert('outer, once');
}
function noneOnceHandler(event) {
  alert('outer, none-once, default');
}
function captureHandler(event) {
  //event.stopImmediatePropagation();
  alert('middle, capture');
}
function noneCaptureHandler(event) {
  alert('middle, none-capture, default');
}
function passiveHandler(event) {
  // Unable to preventDefault inside passive event listener invocation.
  event.preventDefault();
  alert('inner1, passive, open new page');
}
function nonePassiveHandler(event) {
  event.preventDefault();
  //event.stopPropagation();
  alert('inner2, none-passive, default, not open new page');
}