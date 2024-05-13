---
title: Pangea Proxima
index: false
---

# D3, Observable Framework, Plot and more…

## A collection edited by Fil

<p class=warning label="⚉ ⚉ ⚉ ⚉ ⚉ ⚉ ⚉ ⚉ ⚉ ⚉"><em>
In the web’s vast expanse, links may sever,<br>
Continents of data, lost forever.<br>
Yet in the search, new bonds endeavor,<br>
Pangea proxima, rejoined forever.</em></p>

<h4 style="margin-top: 3em;">What do I know?</h4>

```js
const askInput = Inputs.button("Ask me");
const ask = view(askInput);
```

```js
let V;
if (ask) {
  V ||= await fetch(import.meta.resolve("observablehq:minisearch.json")).then((d) => d.json());
  setTimeout(() => (askInput.querySelector("button").textContent = "Ask me again"), 4000);
  const {documentIds, storedFields} = V;

  const that = d3
    .shuffle(Object.keys(documentIds))
    .slice(0, 5)
    .map((id) => html`<li><a href="${documentIds[id]}">${storedFields[id].title}</a></li>`);

  display(html`I know about ${Object.keys(documentIds).length} things: ${that} `);
}
```

```js
fetch(import.meta.resolve("observablehq:search.js")).then(
  (d) => (
    (d = new Date(d.headers.get("Last-Modified")).toISOString()),
    (document.querySelector("#observablehq-footer div span").innerHTML = ` on <span title="${d.slice(0, 16)}">${d.slice(
      0,
      10
    )}</span>`)
  )
);
```
