---
index: true
---

# Inputs.bind

### x = ${x}

```js echo
const xview = Inputs.range([0, 100], {label: "x"});
const x = view(xview);
```

```js echo
display(Inputs.bind(Inputs.range([0, 100]), xview));
```

```js echo
display(Inputs.bind(htl.html`<input type=range style="width: 80px;">`, xview));
```

${Inputs.bind(htl.html`<input type=number style="width: 100%;">`, xview)}
