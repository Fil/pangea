---
source: https://observablehq.com/@observablehq/plot-wealth-health-nations
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: The Wealth & Health of Nations</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# The Wealth & Health of Nations

This is a [recreation](/@mbostock/the-wealth-health-of-nations) of a [Gapminder visualization](http://gapminder.org/world/) made famous by [Hans Rosling](https://www.ted.com/talks/hans_rosling_the_best_stats_you_ve_ever_seen). It shows per-capita income (_x_), life expectancy (_y_) and population (_area_) of 180 nations over the last 209 years, colored by region. Data prior to 1950 is sparse, so this chart shows the latest value in the data.

```js
const year = view(
  Scrubber(d3.sort(d3.union(nations.map((d) => d.year))), {
    loop: false,
    delay: 1000 / 24
  })
);
```

```js echo
Plot.plot({
  width: 1152,
  height: 600,
  grid: true,
  x: {type: "log", domain: [200, 100e3]},
  y: {domain: [15, 85], ticks: 8},
  color: {legend: true},
  marks: [
    Plot.dot(
      nations,
      Plot.groupZ(
        {
          x: lastDefined,
          y: lastDefined,
          r: lastDefined,
          stroke: "last"
        },
        {
          filter: (d) => d.year <= year,
          x: "income",
          y: "lifeExpectancy",
          r: "population",
          stroke: "region",
          z: "name"
        }
      )
    )
  ]
});
```

```js echo
const lastDefined = {
  reduceIndex(I, X) {
    for (let i = I.length - 1; i >= 0; --i) {
      const x = X[I[i]];
      if (x != null) {
        return x;
      }
    }
  }
};
```

```js echo
const nations = FileAttachment("nations.csv").csv({typed: true});
```

```js echo
import {Scrubber} from "../components/scrubber.js";
```
