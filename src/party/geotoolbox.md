---
source: https://talk.observablehq.com/t/observable-framework-resolve-promise-with-resize-in-a-div/8907/7
author: [Mike Bostock, Nicolas Lambert]
index: true
---

# Hello, geotoolbox

<div class="card">
  ${resize((width) =>
    Plot.plot({
      width,
      projection: "equal-earth",
      marks: [
        Plot.sphere({}),
        Plot.geo(world, {stroke: "blue"}),
        Plot.geo(buffered, {stroke: "red"})
      ]
    })
  )}
</div>

```js
const dist = view(Inputs.range([-300, 1000], {label: "Distance", value: -170, step: 10}));
const quadsegs = view(Inputs.range([1, 8], {label: "quadsegs", value: 8, step: 1}));
```

```js echo
import * as geo from "npm:geotoolbox";
```

```js echo
const buffered = geo.buffer(world, {dist, quadsegs});
```

<!-- "npm:world-atlas/countries-110m.json" works, too -->

```js echo
const world = fetch(import.meta.resolve("npm:visionscarto-world-atlas/world/110m.json"))
  .then((d) => d.json())
  .then((topo) => topojson.feature(topo, topo.objects.countries));
```
