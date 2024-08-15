---
source: https://talk.observablehq.com/t/how-to-manage-fg-bg-color-of-input-widget/9649
---

# Style a disabled input

```js
Inputs.number()
```

```js
Inputs.number({disabled: true})
```

<style>
form:has([disabled]) {
  background: red;
}
form [disabled] {
  background: green;
}
</style>
