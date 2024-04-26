---
source: https://observablehq.com/@observablehq/plot-random-walk
index: true
---

# Random walk

This [map transform](https://observablehq.com/plot/transforms/map) computes a cumulative sum (_cumsum_) of the values. Applied to a [random number generator](https://observablehq.com/@d3/d3-random#normal), this generates a random walk. Brownian movement in a single line of code!

```js
const replay = view(Inputs.button("randomize"));
```

```js
replay;
const chart = Plot.plot({
  marks: [Plot.ruleY([0]), Plot.lineY({length: 10000}, Plot.mapY("cumsum", {y: d3.randomNormal()}))]
});

display(chart);
```

```js echo run=false
Plot.plot({marks: [Plot.ruleY([0]), Plot.lineY({length: 10000}, Plot.mapY("cumsum", {y: d3.randomNormal()}))]});
```
