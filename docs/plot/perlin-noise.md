---
source: https://observablehq.com/@observablehq/plot-perlin-noise
index: false
draft: true
---

# Perlin noise

An example showing a Perlin noise [vector](https://observablehq.com/plot/marks/vector) field, just because it’s pretty:

```js echo
const chart = Plot.plot({
  inset: 6,
  width: 1024,
  aspectRatio: 1,
  axis: null,
  marks: [
    Plot.vector(poisson([0, 0, 2, 2], {n: 4000}), {
      length: ([x, y]) => (noise(x + 2, y) + 0.5) * 24,
      rotate: ([x, y]) => noise(x, y) * 360
    })
  ]
});

display(chart);
```

```js echo
import {octave, perlin2} from "@mbostock/perlin-noise";
import {poisson} from "@mbostock/poisson-disk-sampling";

const noise = octave(perlin2, 2);
```
