# Create a Counter in React Vite & JavaScript

## Key Learnings

### Different Ways to Create the Counter

- `e.target.value` is for form inputs such as `<input>`, `<textarea>`, and `<select>`, not for buttons. As a result, this approach would not yield the correct answer.

```javascript
<button onClick={(e) => setCount(e.target.value + 1)}>{count}</button>
```

- However, if we explicitly set the button with a `value` attribute AND transform the value into a number, then it would work. If we don't transform it into a number, then it becomes string concatenation where it keeps adding the string "1".

```javascript
<button value={count} onClick={(e) => setCount(Number(e.target.value) + 1)}>
  {count}
</button>
```

- A cleaner way of doing it is to not use the event at all but just set up the function to trigger the change. This calls the function with the most recent state value as the argument `prev`.

```javascript
<button onClick={() => setCount((prev) => prev + 1)}>{count}</button>
```

- A clearer and more readable way, which is the original way I used is

```javascript
const [count, setCount] = useState(0);

const handleChange = () => {
  const newCount = count + 1;
  setCount(newCount);
};

return (
  <>
    <button onClick={handleChange}></button>
  </>
);
```

## Stale Disclosure

Even though all the solutions listed above work for a simple counter, there is an important concept to keep in mind in order to avoid or recognize subtle bugs.

"A **closure** is the combination of a function bundled together (enclosed) with references to its surrounding state (the **lexical environment**). A closure gives a function access to its _outer scope_. In JavaScript, closures are _created every time a function is created_, at function creation time." - MDN

Stale closure is the referencing towards an _outdated variable in between renders_ from React perspective, meaning even though the state is updated and component re-renders, some callbacks will still be referecing old variables.

For example, if I use the below approach, it is prone to stale disclosure

```javascript
const [count, setCount] = useState(0);

const handleChange = () => {
  const newCount = count + 1;
  setCount(newCount);
};

// In the first call, the count is initially 0 and is set to 1
// In the second call, the count might still be 0 (same render) and is set to 1 again
// This could happen when the user clicks the button very rapidly

return (
  <>
    <button onClick={handleChange}></button>
  </>
);
```

Each function call "closes over" (captures) the `count` variable from the current render. Until React re-renders, that count value doesn't change - it's "stale" in the second call.

So the best of both worlds would be

```javascript
const [count, setCount] = useState(0);

const handleChange = () => {
  setCount((prev) => prev + 1);
};

return (
  <>
    <button onClick={handleChange}>{count}</button>
  </>
);
```

## References

[1] https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures
[2] https://medium.com/@anandsimmy7/stale-closures-and-react-hooks-ea60689a3544
