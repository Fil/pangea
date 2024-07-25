---
source: https://observablehq.com/@d3/color-legend
index: true
---

# Color legend

A simple legend for a D3 [color scale](./color-schemes). Supports [continuous](https://observablehq.com/@d3/continuous-scales), [sequential](https://observablehq.com/@d3/sequential-scales), [diverging](https://observablehq.com/@d3/diverging-scales), [quantize, quantile, threshold](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales) and [ordinal](https://observablehq.com/@d3/d3-scaleordinal) scales. To use:

```js echo
import {Legend, Swatches} from "/components/color-legend.js";
```

Then call the `Legend` function as shown below. (For ordinal scales, also consider the `Swatches` function.) Alternatively, use Observable Plot’s built-in [legends](https://observablehq.com/plot/features/legends).

```js echo
Legend(d3.scaleSequential([0, 100], d3.interpolateViridis), {
  title: "Temperature (°F)"
})
```

```js echo
Legend(d3.scaleSequentialSqrt([0, 1], d3.interpolateTurbo), {
  title: "Speed (kts)"
})
```

```js echo
Legend(d3.scaleDiverging([-0.1, 0, 0.1], d3.interpolatePiYG), {
  title: "Daily change",
  tickFormat: "+%"
})
```

```js echo
Legend(d3.scaleDivergingSqrt([-0.1, 0, 0.1], d3.interpolateRdBu), {
  title: "Daily change",
  tickFormat: "+%"
})
```

```js echo
Legend(d3.scaleSequentialLog([1, 100], d3.interpolateBlues), {
  title: "Energy (joules)",
  ticks: 10
})
```

```js echo
Legend(
  d3.scaleSequentialQuantile(
    d3.range(100).map(() => Math.random() ** 2),
    d3.interpolateBlues
  ),
  {
    title: "Quantile",
    tickFormat: ".2f"
  }
)
```

```js echo
Legend(d3.scaleSqrt([-100, 0, 100], ["blue", "white", "red"]), {
  title: "Temperature (°C)"
})
```

```js echo
Legend(d3.scaleQuantize([1, 10], d3.schemePurples[9]), {
  title: "Unemployment rate (%)"
})
```

```js echo
Legend(d3.scaleQuantile(d3.range(1000).map(d3.randomNormal(100, 20)), d3.schemeSpectral[9]), {
  title: "Height (cm)",
  tickFormat: ".0f"
})
```

```js echo
Legend(d3.scaleThreshold([2.5, 3.1, 3.5, 3.9, 6, 7, 8, 9.5], d3.schemeRdBu[9]), {
  title: "Unemployment rate (%)",
  tickSize: 0
})
```

```js echo
Legend(
  d3.scaleOrdinal(["<10", "10-19", "20-29", "30-39", "40-49", "50-59", "60-69", "70-79", "≥80"], d3.schemeSpectral[10]),
  {
    title: "Age (years)",
    tickSize: 0
  }
)
```

But wait, there’s more!

How about swatches for ordinal color scales? Both variable-width swatches and [column layout](https://developer.mozilla.org/en-US/docs/Web/CSS/columns) are supported.

```js echo
Swatches(d3.scaleOrdinal(["blueberries", "oranges", "apples"], d3.schemeCategory10))
```

```js echo
Swatches(
  d3.scaleOrdinal(
    [
      "Wholesale and Retail Trade",
      "Manufacturing",
      "Leisure and hospitality",
      "Business services",
      "Construction",
      "Education and Health",
      "Government",
      "Finance",
      "Self-employed",
      "Other"
    ],
    d3.schemeTableau10
  ),
  {
    columns: "180px"
  }
)
```
