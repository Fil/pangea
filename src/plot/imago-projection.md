---
index: true
keywords: projection, polygon
---

# Plot: Imago projection

```js echo
const chart = Plot.plot({
  width,
  height: width * 0.437,
  projection: {
    type: ({width, height}) => geoImago().fitSize([width, height], land),
    inset: 5
  },
  marks: [Plot.frame(), Plot.geo(land, {stroke: "currentColor", fill: "currentColor", fillOpacity: 0.06})]
});

display(chart);
```

```js echo
import {geoImago} from "npm:d3-geo-polygon@1.9";
```

```js echo
const topo = import.meta.resolve("npm:visionscarto-world-atlas/world/110m.json");
const world = await fetch(topo).then((response) => response.json());
const land = topojson.feature(world, world.objects.land);
```
