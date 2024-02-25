---
title: Pangea Proxima
index: false
---

# Where everything converges again

## D3, Observable Framework, Plot and more…

<p class=warning><em>Site’s fate whispers near,
<br>Self-destruct looms, search with hope,
<br>Luck in pixels found.

```js
const {documentIds, storedFields} = await fetch("/_observablehq/minisearch.json").then((d) => d.json());
```

<h4 style="margin-top: 3em">What do I know?</h4>

```js
const ask = view(Inputs.button("Ask me"));
```

```js
if (ask) {
  const that = d3
    .shuffle(Object.keys(documentIds))
    .slice(0, 5)
    .map((id) => html`<li><a href="${documentIds[id]}">${storedFields[id].title}</a></li>`);

  display(html`I know about: ${that} `);
}
```
