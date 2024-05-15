# Multi-site search

```js
const terms = view(Inputs.text({type:"search", placeholder: "search"}))
```

```js
const results = []
for (const {corpus, source, index} of indexes) {
  for (const res of index.search(terms, {boost: {title: 4, keywords: 4}, fuzzy: 0.15, prefix: true})) results.push({
    title: res.title,
    score: res.score,
    corpus,
    url: `${source}${res.id}`
  });
}

display(html`${d3.sort(results, d => -d.score).slice(0, 50).map(({
  title, url, corpus
}) => html`<li><span style="background:${color(corpus)}; color: white; font-weight: bold;">[${corpus}]</span> <a href=${url}>${title}`)}` ?? html`…`)
```

```js
const indexes = Object.entries(rawIndexes).map(([corpus, {source, index:json}]) => ({
  corpus,
  source, index: MiniSearch.loadJS(json, {
      ...json.options,
      processTerm: (term) =>
        term
          .slice(0, 15)
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase() // see src/minisearch.json.ts
    })}))

const color = d3.scaleOrdinal((indexes.map(({corpus}) => corpus)), d3.schemeObservable10);
```

```js
import MiniSearch from "minisearch"
```

```js
const rawIndexes = FileAttachment("search.pangea.json").json()
```
