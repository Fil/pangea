---
source: https://observablehq.com/@observablehq/plot-normal-histogram
index: true
---

# Normal histogram

For a histogram, use the [binX](https://observablehq.com/plot/transforms/bin) transform with the [rectY](https://observablehq.com/plot/marks/rect) mark. Here we bin 10,000 random samples, generated on-the-fly into the _x_ channel from a [normal distribution](https://d3js.org/d3-random#randomNormal).

```js echo
const chart = Plot.rectY({length: 10000}, Plot.binX({y: "count"}, {x: d3.randomNormal()})).plot();

display(chart);
```
