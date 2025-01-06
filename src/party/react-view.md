---
index: true
source: https://github.com/observablehq/framework/issues/1503
---

# react / view

We can’t use `view` with React, but we can still create interactive inputs, with a `Mutable`:

```js echo
const count = Mutable(0);
const setCount = (value) => count.value = value;
```

${count}

```jsx echo
function Counter({count, setCount}) {
  return (
    <button onClick={() => setCount(count + 1)}>
      You clicked {count} times
    </button>
  );
}
```

```jsx echo
display(<Counter count={count} setCount={setCount} />);
```

