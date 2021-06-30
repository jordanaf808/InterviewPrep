<br>

# FORMSSSSSSSSS

---

<br>

`<form>` - The Form element.

`action` - the location where the form should be sent

`method` - define the HTTP method (usually GET sometimes POST)

```html
<form action="/someServer/getsForm" method="GET"></form>
```

<br>

## Inputssssss

---

- `<input>` - pick a type of input.

- `<input type="password">` - **type** changes the _type_ of input, e.g. email/text/password.

<br>

> _note_ - `type="password"` - "Keep in mind this is just a user interface feature; unless you submit your form securely, it will get sent in plain text, which is bad for security"

<br>

- `<input id="email">` - id for the input, referred to by `for=` ¡important!

- `<label>` - label corresponding to an `<input>` field.

- `<label for="email">` - refers to input with the id="email" **Important** for screen-readers, when used with the corresponding input id. Also makes it clickable to highlight the input.

<br>

> "Note the use of the for attribute on all <label> elements, which takes as its value the id of the form control with which it is associated — this is how you associate a form control with its label."
>
> "There is great benefit to doing this — it associates the label with the form control, enabling mouse, trackpad, and touch device users to click on the label to activate the corresponding control, and it also provides an accessible name for screen readers to read out to their users." [source](https://developer.mozilla.org/en-US/docs/Learn/Forms/Your_first_form 'MDN Docs - Your First Form')

<br>

> `name` - "The names are important on both the client- and server-side; they tell the browser which name to give each piece of data and, on the server side, they let the server handle each piece of data by name. The form data is sent to the server as name/value pairs."

<br>

> "This HTML submits the entered date under the key "_dates_" to `https://example.com` — resulting in a URL like `https://example.com/?dates=1955-06-08`.

```html
<form action="https://example.com">
  <label for="dates"
    >Choose your preferred date:
    <input type="date" name="dates" />
  </label>
</form>
```

### **`<input type="date">`**

---

> "The resulting value includes the year, month, and day, but not the time. The `time` and `datetime-local` input _types_ support time and date+time input."

> "You can get and set the date value in JavaScript with the HTMLInputElement value and valueAsNumber properties. For example:"

<br>

```js
var dateControl = document.querySelector('input[type="date"]');
dateControl.value = '2017-06-01';
console.log(dateControl.value); // prints "2017-06-01"
console.log(dateControl.valueAsNumber); // prints 1496275200000, a JavaScript timestamp (ms)
```

<br>

> "Note: Remember that some years have 53 weeks in them (see Weeks per year)! You'll need to take this into consideration when developing production apps."

<br>

#### Compatibility

> - " In unsupported browsers, the control degrades gracefully to **`<input type="text">`**."

> "One way around this is the `pattern` attribute on your date input. Even though the date picker doesn't use it, the text input fallback will. For example, try viewing the following in a unsupporting browser:

This will just fallback to an text input that requires a pattern with numbers: ####-##-##

```html
<form>
  <label for="bday"
    >Enter your birthday:
    <input type="date" name="bday" required pattern="\d{4}-\d{2}-\d{2}" />
    <span class="validity"></span>
  </label>
  <p>
    <button>Submit</button>
  </p>
</form>
```

### Default Values:

To add a default value to a text input:
`<input type="text" value="by default this element is filled with this text">`

For multiline `textarea`
`<textarea> by default this element is filled with this text </textarea>`

<br>

```html
<form action="/someServer/getsForm" method="GET">
  <ul>
    <li>
      <label for="name">Name</label>
      <input type="text" name="name" id="name" value="Your Name" />
    </li>
  </ul>
  <ul>
    <li>
      <label for="password"
        >Password
        <input type="password" name="password" id="password" />
        <!-- You can wrap the input in the label to associate them -->
      </label>
    </li>
  </ul>
  <ul>
    <li>
      <label for="msg"
        >Message
        <textarea name="message" id="msg"></textarea>
      </label>
    </li>
  </ul>
</form>
```

`<fieldset>` - allows grouping of form elements.
`<legend>` - describes the set of form elements. Used for `accessability` by screen-readers, before reading the sub-form labels.

```html
<form>
  <fieldset>
    <legend>Fruit juice size</legend>
    <p>
      <input type="radio" name="size" id="size_1" value="small" />
      <label for="size_1">Small</label>
    </p>
    <p>
      <input type="radio" name="size" id="size_2" value="medium" />
      <label for="size_2">Medium</label>
    </p>
    <p>
      <input type="radio" name="size" id="size_3" value="large" />
      <label for="size_3">Large</label>
    </p>
  </fieldset>
</form>
```

Add a Slider Form Element

```html
<label for="price">Choose a maximum house price: </label>
<input
  type="range"
  name="price"
  id="price"
  min="50000"
  max="500000"
  step="100"
  value="250000"
/>
<output class="price-output" for="price"></output>
```

To display the value of the slider:

```html
const price = document.querySelector('#price'); const output =
document.querySelector('.price-output'); output.textContent = price.value;
price.addEventListener('input', function() { output.textContent = price.value;
});
```

### Multi-Line Text Fields

```html
<textarea cols="30" rows="8"></textarea>
```

control responsiveness of text area to text:

- `both` - Default. resizes both horizontally and vertically.
- `horizontal` - only X
- `vertical` - only Y
- `none` - no resizing.
- `block` and `inline` - Experimental values?

<br>

### Progress Bars

<br>

> _note_ - "Support for `<progress>` and `<meter>` is fairly good — **BUT** there is no support in Internet Explorer, but other browsers support it well."

<br>

```html
<progress max="100" value="75">75/100</progress>
```

<br>

### Meter - (similar to progress)

<br>

```html
<meter min="0" max="100" low="33" high="66" optimum="50" value="75">75</meter>
```

<br>

`low` - bar is between `min` and `low` values.
`high` - bar is between `high` and `max` values.

- medium is between `low` and `high` values.

`optimum` - determines which part of the meter should denote:

- `preferred` values - bar is `green`
- `average` values - bar is `yellow`
- `worst` values - bar is `red`

- If the `optimum` value is in the `low` range, the lower range is `preferred`, the medium range is `average`, and the high range is `worst`.

- If the `optimum` value is in the `medium` range, the lower range is `average`, the medium range is `preferred`, and the high range is `average` as well.

- If the `optimum` value is in the `high` range, the lower range is `worst`, the medium range is `average`, and the high range is `preferred`.

<br>

## Styling Forms

<br>

> " By default, some widgets do not inherit font-family and font-size from their parents."

add this:

```css
button,
input,
select,
textarea {
  font-family: inherit;
  font-size: 100%;
}
```
