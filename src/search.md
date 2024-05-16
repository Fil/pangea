---
index: true
---

# Multi-site search

```js
const terms = view(Inputs.text({type:"search", placeholder: "search"}))
```

```js
const sources = view(Inputs.checkbox(corpora.keys(), {format: (corpus) => html`<span style="background:${color(corpus)}; color: white; font-weight: bold;">[${corpus}]</span>`}))
```

```js
const results = []
for (const {corpus, root, index} of indexes) {
  if (!sources.length || sources.includes(corpus)) {
    for (const res of index.search(terms, {
      boost: {title: 4, keywords: 4},
      fuzzy: 0.15,
      prefix: true
    })) results.push({
        title: res.title,
        score: res.score,
        corpus,
        url: `${root}${res.id}`
      });
  }
}

display(html`${d3.sort(results, d => -d.score).slice(0, 50).map(({
  title, url, corpus, score
}) => html`<li><span style="background:${color(corpus)}; color: white; font-weight: bold;">[${corpus}]</span> <a href=${url}>${title}</a> <small>${Math.ceil(10 * score)/10}</small>`)}` ?? html`…`)
```

```js
import MiniSearch from "minisearch"
```

```js
const corpora = new Map([
  ["D3", FileAttachment("search/d3.json")],
  ["D3 docs", FileAttachment("search/d3docs.json")],
  ["Framework", FileAttachment("search/framework.json")],
  ["Observable", FileAttachment("search/observable.json")],
  ["Pangea", FileAttachment("search/pangea.json")],
  ["Plot docs", FileAttachment("search/plotdocs.json")],
  ["Framework examples", FileAttachment("search/framework-examples.json")],
])

const color = d3.scaleOrdinal(corpora.keys(), d3.schemeObservable10);

const indexes = Mutable([]);

for (const [corpus, file] of corpora) {
  file.json().catch(() => ({})).then(({root, index: json}) => {
    if (json) {
      indexes.value.push({
        corpus,
        root,
        index: MiniSearch.loadJS(json, {
          fields: ["title"],
          processTerm: (term) =>
            term
              .slice(0, 15)
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase() // see src/minisearch.json.ts
        })
      });
      indexes.value = indexes.value;
    }
  });
}
```
