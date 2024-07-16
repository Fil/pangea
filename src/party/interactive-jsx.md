---
index: true
source: https://github.com/observablehq/framework/issues/1503#issuecomment-2218673447
---

# Interactive JSX

Just writing down the solution: when you want a jsx component to be part of the data flow (for example to create an input).

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
