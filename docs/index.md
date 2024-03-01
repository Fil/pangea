---
title: Pangea Proxima
index: false
---

# Where everything converges again

## D3, Observable Framework, Plot and more…

<p class=warning><em>Site’s fate whispers near,
<br>Self-destruct looms, search with hope,
<br>Luck in pixels found.</em></p>

<h4 style="margin-top: 3em;">What do I know?</h4>

```js
const askInput = Inputs.button("Ask me");
const ask = view(askInput);
```

```js
let V;
if (ask) {
  if (!V) {
    const url =
      document.location.hostname === "127.0.0.1"
        ? "_observablehq/minisearch.json"
        : await FileAttachment("index-minisearch.url").text();
    V = await fetch(url.trim()).then((d) => d.json());
  }
  setTimeout(() => (askInput.querySelector("button").textContent = "Ask me again"), 4000);
  const {documentIds, storedFields} = V;

  const that = d3
    .shuffle(Object.keys(documentIds))
    .slice(0, 5)
    .map((id) => html`<li><a href="${documentIds[id]}">${storedFields[id].title}</a></li>`);

  display(html`I know about ${Object.keys(documentIds).length} things: ${that} `);
}
```
