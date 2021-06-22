{
  /* 
Always console.log the event object. There are so many properties to explore and utilize:

***             Event Properties:             ***
      srcElement          target.childNodes
      target              target.className
      type                target.innerHTML/Text
      x, y...             target.hidden
      firstChild          target./lastChild
      timeStamp           baseURI

Events "bubble" through their parent elements all the way UP to the main html document. That is the "Bubble Phase".

The next phase is the "Capture Phase" It runs opposite of the bubble phase and starts from the document DOWN to the element that triggered the event.   

  change an event listener to "capture event" by passing in an object {capture: true} as the 2nd argument to the eventListener, after the function.

  addEventListener('click', e => {
    ............
    console.log("Grandparent")
  }, { capture: true });

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
  *element*.removeEventListener 

  note:
  this will not remove the anonymous function on the event listener on the parent element, because it is not selecting that console.log function. the removeEventListener() actually created a new one and deleted that without removing the original eventListener. You need to declare that function to remove it!

  parent.addEventListener('click' () => {
    console.log('hi');
  })

  function(() => {
  parent.removeEventListener('click', () => {
    console.log('hi')
  });
});

***
      .matches() returns true when the event.target matches with the corresponding element or css selector we passed in as an argument.

      This will print 'true' whenever we click on 
      document.addEventListener('click', e => {
        if (e.target.matches('div')) {
          console.log('true')
        }
      })
    e.target.matches('div')

***    

That works great when your links look like this.

<a class="click-me" href="#">Click Me!</a>
But what about when your links look like this?

<a class="click-me" href="#">
	<span class="click-me-text">Click Me!</span>
	<span class="click-me-icon">+</span>
</a>

With a markup structure like that, event.target.matches('.click-me') will fail pretty much every time.

Because the markup structure is nested, the element your clicking is actually either the .click-me-text element or the .click-me-icon element. The matches() method only checks the class of the actual element itself.

Fortunately, there’s an easy way to keep the markup structure and the same simple event delegation technique: the closest() method.

document.addEventListener('click', function (event) {

	// If the clicked element doesn't have the class, bail
	if (!event.target.closest('.click-me')) return;

	// Otherwise, do whatever...

}, false);
The closest() method checks to see if the element or any parent of the element have the selector you’re trying to match. This makes it really flexible.



*/
}
