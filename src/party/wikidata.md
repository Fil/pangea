---
index: true
source: https://observablehq.com/@mbostock/hello-wikidata
---

# Wikidata

You can access wikidata using SPARQL queries (see [examples](https://www.wikidata.org/wiki/Wikidata:SPARQL_query_service/queries/examples)), like this list of all the hospitals known and geolocated in Wikipedia:

```js echo
const query = `
SELECT * WHERE {
  ?item wdt:P31*/wdt:P279* wd:Q16917;
        wdt:P625 ?geo .
}
`;

const data = fetch(`https://query.wikidata.org/sparql?query=${encodeURIComponent(query)}`, {
  headers: {accept: "application/sparql-results+json"}
}).then(response => response.json());
```

```js
const points = data.results.bindings
  .filter(d => d.geo.datatype === "http://www.opengis.net/ont/geosparql#wktLiteral")
  .map(d => parsePoint(d.geo.value));
```


The function below extracts the geographic coordinates from the `POINT(lon lat)` values:

```js echo
function parsePoint(value) {
  const [, longitude, latitude] = /^Point\((-?\d+(?:\.\d+))\s+(-?\d+(?:\.\d+))\)$/.exec(value);
  return [+longitude, +latitude];
}
```

And here is a quick heatmap, using Observable Plot:

```js echo
Plot.plot({
  width,
  projection: "equal-earth",
  color: {type: "log", legend: true},
  marks: [
    Plot.sphere(),
    Plot.geo(land, {fill: "currentColor", fillOpacity: 0.1}),
    Plot.dot(points, Plot.hexbin({fill: "count"}, {binWidth: 3, tip: true}))
  ]
})
```

<div class="tip">

Note the choice of an equal-area projection: the hexagonal cells all have the same surface area, and can be compared.

</div>


<details>

<summary>To run this as a data loader…</summary>

If you prefer to run this as a data loader, you just copy the code into a `points.json.js` file, making sure you explicitely `await` the asynchronous call to `fetch`:

```js run=false
const query = `
SELECT * WHERE {
  ?item wdt:P31*/wdt:P279* wd:Q16917;
        wdt:P625 ?geo .
}
`;

const data = await fetch(`https://query.wikidata.org/sparql?query=${encodeURIComponent(query)}`, {
  headers: {accept: "application/sparql-results+json"}
}).then(response => response.json());

const points = data.results.bindings
  .filter(d => d.geo.datatype === "http://www.opengis.net/ont/geosparql#wktLiteral")
  .map(d => parsePoint(d.geo.value));

process.stdout.write(JSON.stringify(points));


function parsePoint(value) {
  const [, longitude, latitude] = /^Point\((-?\d+(?:\.\d+))\s+(-?\d+(?:\.\d+))\)$/.exec(value);
  return [+longitude, +latitude];
}
```

and then load the data with `FileAttachment("points.json").json()`.

</details>


```js echo
const land = fetch(import.meta.resolve("npm:visionscarto-world-atlas/world/110m.json"))
  .then((d) => d.json())
  .then((world) => topojson.feature(world, world.objects.land));
```
