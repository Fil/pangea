---
index: true
source: https://observablehq.com/@fil/4-color-clingo
---

# Four-color world map

## using Clingo

```js
{
  const features = topojson.feature(world, {
    type: "GeometryCollection",
    geometries
  });
  const height = width * 0.7;
  const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);
  const projection = world.objects.countries
    ? geoBertin1953()
    : world.objects.a_com2022
    ? d3.geoIdentity().reflectY(true)
    : d3.geoAlbersUsa();
  const path = d3.geoPath(
    projection.fitExtent(
      [
        [10, 10],
        [width - 10, height - 10]
      ],
      features
    )
  );
  svg.append(patterns);
  svg
    .append("g")
    .style("stroke", "#333")
    .style("stroke-width", 0.5)
    .selectAll()
    .data(features.features)
    .join("path")
    .attr("d", path)
    .style("fill", color);
  display(svg.node());
}
```

```js
const topo = view(Inputs.select(
  new Map([
    [
      "110m",
      "https://cdn.jsdelivr.net/npm/visionscarto-world-atlas@0.1.0/world/110m.json"
    ],
    [
      "50m",
      "https://cdn.jsdelivr.net/npm/visionscarto-world-atlas@0.1.0/world/50m.json"
    ],
    ["US States", "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"],
    ["US Counties", "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json"],
    ["France / Bretagne", "https://static.data.gouv.fr/resources/contours-des-communes-de-france-simplifie-avec-regions-et-departement-doutre-mer-rapproches/20220423-134434/a-com2022-topo-2154.json"]
  ]),
  { label: "topology source" }
));
```

```js
const n = view(Inputs.select([3, 4, 5, 6, 9], {
  label: "number of colors",
  value: 4
}));
```

```js
const colorType = view(Inputs.radio(["textures", "fills"], {
  label: "colors",
  value: "textures"
}));
```

```js
const program = view(Inputs.textarea({
  label: "Clingo program:",
  width: "100%",
  rows: 40,
  value: `% Number of colors to use
#const n = ${n}.

% Enumerate possible colors for each node
{ color(X,1..n) } = 1 :- node(X).

% Constraint: two connected countries can't have the same color
:- edge(X,Y), color(X,C), color(Y,C).

% Nodes
node(${edges
    .map((d, i) => (d.length ? `${i}` : ""))
    .filter((d) => d)
    .join(";")}).

% (Directed) Edges
${edges
  .flatMap(
    (d, i) => (
      (d = d.filter((j) => j !== i)),
      d.length ? `edge(${i},(${d.join(";")})).` : ""
    )
  )
  .filter((d) => d)
  .join("\n")}

% Return
#show color/2.`
}));
```

---

Huge thanks to Dominik Moritz for the “[Hello, Clingo](https://observablehq.com/@cmudig/clingo)” notebook. See also this map colored by [a simpler algorithm](https://observablehq.com/@mbostock/map-coloring) (9 colors), and Éric Mauvière’s [implementation](https://observablehq.com/@ericmauviere/map-coloring-france-6-colors-for-35-000-municipalities) of the Welsh-Powell algorithm (which colors French communes with 6 colors).

```js echo
const result = clingo.run(program, 1);
```

```js echo
display(result)
```

---

<!-- For some reason this script tag unblocks the import below. (but why?) -->
<script type="module" src="npm:clingo-wasm@0.1.1"></script>

```js echo
import clingo from 'npm:clingo-wasm@0.1.1';
await clingo.init(import.meta.resolve('npm:clingo-wasm@0.1.1/dist/clingo.wasm'));
```

---

_geo_

```js echo
import {geoBertin1953} from "npm:d3-geo-projection@4"
```

```js echo
const world = d3.json(topo);
```

```js echo
const geometries = (
  world.objects.countries?.geometries?.filter((d) => d.id !== "010") // removes Antarctica
  ?? world.objects.counties?.geometries
  ?? world.objects.states?.geometries
  ?? world.objects.a_com2022?.geometries?.filter((d) => ["22", "29", "35", "44", "56"].includes(d.properties.dep))
);

const edges = topojson.neighbors(geometries);
```

---

_color_

```js echo
const color = (() => {
  const fills = d3.schemePastel1;
  const colors = new Map();

  if (!result?.Call?.[0]?.Witnesses) return "#888";

  result.Call[0].Witnesses[0].Value.forEach((r) => {
    const [, i, c] = r.match(/(\d+),(\d+)/);
    colors.set(+i, +c);
  });
  return Object.assign(
    (_, i) => (colors.has(i) ? color(colors.get(i)) : "#eee"),
    { map: colors }
  );

  function color(c) {
    return colorType === "textures"
      ? `url(#diverging-12541021-${c})`
      : fills[c % fills.length]
  }
})();
```

```js echo
// https://observablehq.com/@mbostock/cheysson-color-palettes
const patterns = () => svg`<defs>
  <!-- Copyright 2021 Tom Shanley (ISC) https://observablehq.com/@tomshanley/cheysson-color-palettes -->
  <pattern id="diverging-12541021-1" x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">  <rect class="pattern" x="0" y="0" width="100%" height="100%" fill="#e16767" /></pattern>
  <pattern id="diverging-12541021-2" x="0" y="0" width="3" height="3" patternUnits="userSpaceOnUse">  <rect class="pattern" width="100%" height="100%" fill="#edddce" />  <line class="pattern" stroke="#e16767" stroke-width="2px" y1="1" x2="100%" y2="1" /></pattern>
  <pattern id="diverging-12541021-3" x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">  <rect class="pattern" width="100%" height="100%" fill="#edddce" />  <line class="pattern" y1="1.5" x2="100%" y2="1.5" stroke="#e16767" stroke-width="1.5px" /></pattern>
  <pattern id="diverging-12541021-4" x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">  <rect class="pattern" x="0" y="0" width="100%" height="100%" fill="#edddce" /></pattern>
  <pattern id="diverging-12541021-5" x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">  <rect class="pattern" width="100%" height="100%" fill="#edddce" />  <line class="pattern" y1="1.5" x2="100%" y2="1.5" stroke="#e8d463" stroke-width="1.5px" /></pattern>
  <pattern id="diverging-12541021-6" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">  <rect class="pattern" width="100%" height="100%" fill="#edddce" />  <line class="pattern" stroke="#e8d463" stroke-width="3px" y1="2" x2="100%"  y2="2" /></pattern>
  <pattern id="diverging-12541021-7" x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">  <rect class="pattern" x="0" y="0" width="100%" height="100%" fill="#e8d463" /></pattern>
</defs>
`;
```
