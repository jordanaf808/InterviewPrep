<br>

---

# [_Dave Ceddia - Redux Tutorial Blog_](https://daveceddia.com/redux-tutorial/)

---

<br>

Redux is a standalone State Management system. You can manageme state in React without Redux with Hooks or Context API. We start this example without Redux, and instead use React's default state. The Counter component holds the state and the App is a simple wrapper.

<br>

> "In the React sense, **“state”** is an object that represents the parts of the app that can change. Each `component` can maintain its own _state_, which lives in an object called **`this.state`**."

<br>

`counter.js`

```js
import React from 'react';

class Counter extends React.Component {
  state = { count: 0 };

  increment = () => {
    this.setState({
      count: this.state.count + 1
    });
  };

  decrement = () => {
    this.setState({
      count: this.state.count - 1
    });
  };

  render() {
    return (
      <div>
        <h2>Counter</h2>
        <div>
          <button onClick={this.decrement}>-</button>
          <span>{this.state.count}</span>
          <button onClick={this.increment}>+</button>
        </div>
      </div>
    );
  }
}

export default Counter;
```

<br>

React will re-render when **`state`** changes, by calling `this.setState`.

---

<br>

## Connect Redux to the App

---

<br>

### `redux` vs `react-redux`

---

```js
    npm install --save redux react-redux
```

<br>

- > 'the npm package _redux_ gives you a store, and lets you keep state in it, and get state out, and respond when the state changes. But that’s all it does.'
- > 'It’s actually _react-redux_ that lets you connect pieces of the state to React components...'

---

<br>

## One Global Store

---

<br>

> "You’ll often see the words **“state”** and **“store”** used interchangeably. Technically, the **state** is the _data_, and the **store** is _where it’s kept._"

<br>

`index.js`

```js
import { createStore } from 'redux';

const store = createStore();

const App = () => (
  <div>
    <Counter />
  </div>
);
```

<br>

This will return an `Error` because Redux expects a reducer.

```js
Error
Expected the reducer to be a function.
```

<br>

---

## Reducers

---

<br>

Redux reducers take 2 arguments; the initial value OR previous state, and an action/function to run on that state. It then returns the new state, or accumulated value.

```js
// (prevState, action) => newState;
```

It functions similar to a regular Reducer array method:

```js
// Array Reducer
let arr = ['r', 'e', 'd', 'u', 'c', 'e', 'r'];
let initialValue = '';

let word = arr.reduce((accumulatedValue, arrItem) => {
  return accumulatedValue + arrItem;
}, initialValue);

console.log(word); // "reducer"
```

<br>

To use the reducer on our State we need to define and return the initial/previous State.

`index.js`

```js
const initialState = {
  count: 0
};

const reducer = (state = initialState, action) => {
  console.log('reducer', state, action);
  return state;
};
```

<br>

> 1.) _Never return an_ `undefined` _State_
>
> 2.) Reducers must always be **_pure_** functions, no **_side-effects_** (it must
> return the same result for the same inputs, and must not change anything outside it's own scope.)
>
> 3.) Any updates to the state must be **_immutable_**

<br>

| Array Methods That Mutate |                          |
| ------------------------- | ------------------------ |
| PUSH                      | _add item to end_        |
| POP                       | _remove item from end_   |
| SHIFT                     | _remove item from start_ |
| UNSHIFT                   | _add item to start_      |
| SORT                      |                          |
| REVERSE                   |                          |
| SPLICE                    |                          |

<br>

### Copy an array

---

In order to preserve the original array, make a copy of it and perform updates/mutations on the copy.

```js
let newArr = [...arr];
let newArr = arr.slice();
let newArr = arr.concat();
```

<br>

---

## Actions

---

<br>

In order to trigger our Redux reducer, we need to `dispatch` Actions.
Actions define what our reducer will reduce, and sometimes carry a `payload` the reducer may use to update the state.

**_Action Creators_** - A function that creates and returns an Action object. If you need to create multiple different actions that perform the same logic, you can use this method.

```js
const todoAdded = text => {
  return {
    type: 'todos/todoAdded',
    payload: text
  };
};
```

<br>

## Dispatch

---

<br>

To perform the `action` you must `dispatch` it to the `reducer`.

```js
store.dispatch({ type: 'ACTIONTYPE' });
```

<br>

### Handle Multiple Action Types

---

<br>

The Reducer uses a _switch_ statement to _listen_ for an `action` type and perform that specific action and return the new state

`index.js`

```js
function reducer(state = initialState, action) {
  console.log('reducer', state, action);

  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1
      };
    case 'DECREMENT':
      return {
        count: state.count - 1
      };
    case 'RESET':
      return {
        count: 0
      };
    default:
      return state;
  }
}
```

---

<br>

## Connect Component to Redux

---

<br>

To connect redux to your app, we use `Provider` and `connect`.

`Provider` wraps around the entire App allowing any component access to the state _through `connect`_.

<br>

> "`Connect` passes the state into your component through `mapStateToProps`. It uses React's Context API under the hood to work."

<br>

`index.js`

```js
import { Provider } from 'react-redux';

const App = () => (
  <Provider store={store}>
    <Counter />
  </Provider>
);
```

<br>

To get the count out of Redux, we first need to import the connect function at the top of Counter.js:

`Counter.js`

```js
import { connect } from 'react-redux'

class Counter extends React.Component {
.........
}

function mapStateToProps(state) {
  return {
    count: state.count
  };
}
// REPLACE this:
//export default Counter;
// WITH this:
export default connect(mapStateToProps)(Counter);
```

<br>

> "`mapStateToProps` returns a slice of the state that you request and passes it into your component as **`Props`**"

> "`mapStateToProps` needs to be a custom function because only you know the “shape” of the state you’ve stored in Redux.
> [The example above will destructure the value of `state.count` to the `count` prop]. So you see, this function literally defines a mapping from state into props."

---

<br>

### HOC's

---

<br>

> "You might notice the call looks a little… weird. Why `connect(mapStateToProps)(Counter)` and not `connect(mapStateToProps, Counter)` or `connect(Counter, mapStateToProps)`? What’s that doing?
>
> It’s written this way because connect is a higher-order function, which is a fancy way of saying it returns a function when you call it. And then calling that function with a component returns a new (wrapped) component."

---

<br>

## Remove Local State, pass in Redux props

---

<br>

> 'Remove the local state initialization and the `setState` calls, then replace `this.state.count` with `this.props.count`.'

<br>

`Counter.js`

```js
class Counter extends React.Component {
  // state = { count: 0 }; // remove this
  increment = () => {
    /*
    // Remove this
    this.setState({
      count: this.state.count + 1
    });
    */
  };
  decrement = () => {
    /*
    // Also remove this
    this.setState({
      count: this.state.count - 1
    });
    */
  };

  render() {
    return (
      <div className='counter'>
        <h2>Counter</h2>
        <div>
          <button onClick={this.decrement}>-</button>
          <span className='count'>
            {
              // Replace state:
              //// this.state.count
              // With props:
              this.props.count
            }
          </span>
          <button onClick={this.increment}>+</button>
        </div>
      </div>
    );
  }
}
```

---

<br>

---

## Dispatch Redux Actions From A Component

---

<br>

> "Well, `connect` has your back: in addition to passing in the (mapped) state, it also passes in the dispatch function from the store! To `dispatch` an action from inside the Counter, we can call **`this.props.dispatch`** with an action. Our reducer is already set up to handle the INCREMENT and DECREMENT actions, so let’s dispatch those from increment/decrement:"

<br>

`Counter.js`

```js
increment = () => {
  this.props.dispatch({ type: 'INCREMENT' });
};

decrement = () => {
  this.props.dispatch({ type: 'DECREMENT' });
};
```

---

<br>

### Action Constants

---

<br>

> "In most Redux apps, you’ll see action constants used in place of plain strings. It’s an extra level of abstraction that can save you some time in the long run."

> "Action constants help avoid typos, and typos in action names can be a huge pain: no errors, no visible sign that anything is broken, and your actions don’t appear to be doing anything? Could be a typo."

> "A good place to put these is in an actions.js file (when your app is small, anyway). Then you can import the action names, and use those instead of writing the strings:"

<br>

`actions.js`

```js
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
```

<br>

**OR** you can use Action Creators
An Action Creator is a function that returns an action object.

`action.js`

```js
export function increment() {
  return { type: INCREMENT };
}
```

`Counter.js`

```js
import { increment, decrement } from './actions';

class Counter extends React.Component {
  increment = () => {
    this.props.dispatch(increment());
  };
  decrement = () => {
    this.props.dispatch(decrement());
  };

  render() {
    // ...
  }
}
```

<br>

It gets old typing out `this.props.dispatch(.....)`. instead you can create an object called...

```js
mapDispatchToProps;
```

<br>

to pass in the actions as 'callable' `props` in your component. Include the actions you want to dispatch as `props` in the `mapDispatchToProps` object and pass it into `connnect`.

<br>

`Counter.js`

```js
class Counter extends React.Component {
  increment = () => {
    // We can call the `increment` prop,
    // and it will dispatch the action:
    this.props.increment();
  };

  decrement = () => {
    this.props.decrement();
  };

  render() {
    // ...
  }
}

function mapStateToProps(state) {
  return {
    count: state.count
  };
}

const mapDispatchToProps = {
  increment,
  decrement
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

<br>

---

## Side-Effects with Redux

---

<br>

Since Reducers and Actions are supposed to be 'pure' functions we can't perform any side-effects, like API calls. But, what if an Action Creator could return a function that _would_ perform the side-effect?

Redux doesn't support this out of the box, but that's where **Redux Thunk** comes into play. It is a _middleware_ to perform side-effects, and you can dispatch "Thunk Actions" like any other action creator.

<br>

## What Is A _Thunk_?

<br>

> "A “thunk” is a (uncommon) name for a function that’s returned by another function. In Redux terms, it’s an action creator that returns a function instead of a plain action object, like this:"

```js
function doStuff() {
  return function (dispatch, getState) {
    // dispatch actions here
    // or fetch data
    // or whatever
  };
}
```

<br>

> "Most of the time you’ll only need dispatch, but sometimes you want to do something conditionally, based on some value in the Redux state. In that case, call getState() and you’ll have the entire state to read as needed."

<br>

In your cli: `npm install --save redux-thunk`

`index.js`

```js
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

function reducer(state, action) {
  // ...
}

const store = createStore(reducer, applyMiddleware(thunk));
```

---

<br>

### When to dispatch a Thunk Action to Fetch Data

<br>

> "If a particular component needs the data, the best place to kick off the fetch is usually right after that component mounts, in its componentDidMount lifecycle method."
>
> "Or, if you’re using Hooks, inside the useEffect hook is a good spot."
>
> "Sometimes you’re fetching truly global data that the whole app needs – think “user profile” or “i18n translations”. In those cases, dispatch the action right after you create the store, with store.dispatch, rather than waiting for a component to mount."

### How To Organize A Thunk Action

`productActions.js`

```js
export const FETCH_PRODUCTS_BEGIN = 'FETCH_PRODUCTS_BEGIN';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const fetchProductsBegin = () => ({
  type: FETCH_PRODUCTS_BEGIN
});

export const fetchProductsSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: { products }
});

export const fetchProductsFailure = error => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: { error }
});
```

### Create A separate Reducer file to perform the actions

`productReducer.js`

```js
import {
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE
} from './productActions';

const initialState = {
  items: [],
  loading: false,
  error: null
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_PRODUCTS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        items: action.payload.products
      };

    case FETCH_PRODUCTS_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, so set `items` empty.
      //
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
```

---

We dispatch our Thunk on _mount_ and conditionally render html based on whether we are loading, loaded, or threw an error.

`ProductList.js`

```js
class ProductList extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchProducts());
  }

  render() {
    const { error, loading, products } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products.items,
  loading: state.products.loading,
  error: state.products.error
});

export default connect(mapStateToProps)(ProductList);
```

<br>

---

<br>

## Root Reducer

---

<br>

Redux requires one reducer to perform changes to the store. So, when using multiple reducers, you need to create one **root** reducer to consolidate them all into one place.

`rootReducer.js`

```js
import { combineReducers } from 'redux';
import products from './productReducer';

export default combineReducers({
  products
});
```

`index.js`

```js
import rootReducer from './rootReducer';

// ...

const store = createStore(rootReducer);
```
