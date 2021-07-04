<br>

# Before Unload Event

#### _Twist At The End..._

### [MDN Docs - Before Unload Event](https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event 'MDN Docs - Before Unload Event')

<br>

In this example a page listens for changes to a text input. If the element contains a value, it adds a listener for beforeunload. If the element is empty, it removes the listener:

> "It is recommended that developers listen for beforeunload only in this scenario, and only when they actually have unsaved changes, so as to minimize the effect on performance. See the Examples section below for an example of this."
>
> "See the [Page Lifecycle API guide](https://developers.google.com/web/updates/2018/07/page-lifecycle-api#the-beforeunload-event 'Page Lifecycle API guide') for more information about the problems associated with the beforeunload event."

<br>

Some browser's **require** you to _return_ a "string", or `returnValue="aString"`, and/or `preventDefault()`. We solve address that here, check compatibility on source above.

```js
const beforeUnloadListener = event => {
  event.preventDefault();
  return (event.returnValue = 'Are you sure you want to exit?');
};

const nameInput = document.querySelector('#name');

nameInput.addEventListener('input', event => {
  if (event.target.value !== '') {
    addEventListener('beforeunload', beforeUnloadListener, { capture: true });
  } else {
    removeEventListener('beforeunload', beforeUnloadListener, {
      capture: true
    });
  }
});
```

<br>

# BUT WAIT!!!

[IGVITA.com](https://www.igvita.com/2015/11/20/dont-lose-user-and-app-state-use-page-visibility/ "Don't use 'beforeUnload' event")

<br>

> "If you're counting on unload to save state, record and report analytics data, and execute other relevant logic, then you're missing a large fraction of mobile sessions where unload will never fire. Similarly, if you're counting on beforeunload event to prompt the user about unsaved data, then you're ignoring that "clean shutdowns" are an exception, not the rule."

> "To provide a reliable and consistent user experience, both on desktop and mobile, the application must use Page Visibility API and execute its session save and restore logic whenever visibilityChange state changes. This is the only event your application can count on."

<br>

```js
// query current page visibility state: prerender, visible, hidden
var pageVisibility = document.visibilityState;

// subscribe to visibility change events
document.addEventListener('visibilitychange', function() {
  // fires when user switches tabs, apps, goes to homescreen, etc.
    if (document.visibilityState == 'hidden') { ... }

    // fires when app transitions from prerender, user returns to the app / tab.
    if (document.visibilityState == 'visible') { ... }
});
```

<br>

> "Treat every transition to visible as a new session: restore previous state, reset your analytics counters, and so on. Then, when the application transitions to hidden end the session: save user and app state, beacon your analytics, and perform all other necessary work."

<br>

## Page Visibility Lifecycle

![Page Visibility Lifecycle](./BeforeCloseEvent-Lifecycle.png 'Page Visibility Lifecycle')

<br>

## Page Visibility Compatibility

![Page Visibility Compatibility](./PageVisibility-Compatibility.png 'Page Visibility Compatibility')
