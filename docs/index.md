---
title: Pangea Proxima
index: false
---

# D3, Observable Framework, Plot and more…

## A collection edited by Fil

<p class=warning label="⚉ ⚉ ⚉ ⚉ ⚉ ⚉ ⚉ ⚉ ⚉ ⚉"><em>Upon the web, a labyrinth of links so fair,
<br>A virtual realm where knowledge we share,
<br>Yet shadows cast upon this cyber lair,
<br>For links may rot, vanish into thin air.
<br>
<br>Oh, fleeting threads of wisdom, do not fade,
<br>For in thy absence, knowledge seems betrayed.
<br>A web of treasures, ephemeral cascade,
<br>But despair not, for hope shall not evade.
<br>
<br>In cyberspace, where URLs may wane,
<br>A beacon gleams through the vast, searching plain.
<br>With engines keen, their algorithms reign,
<br>New treasures found, a digital refrain.
<br>
<br>Though links may vanish, leaving trails unclear,
<br>The search unveils new knowledge, crystal-clear.</em></p>

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
