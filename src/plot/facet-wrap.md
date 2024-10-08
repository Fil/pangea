---
source: https://observablehq.com/@observablehq/plot-facet-wrap
index: true
---

# Facet wrap

Wrapping facets in two dimensions is possible by explicitly specifying the grid. Set **fy** to the (integer) division of the index by the number of columns, and **fx** to the rest of that division. If you are interested in making this easier, please upvote issue [#277](https://github.com/observablehq/plot/issues/277).

```js echo
const chart = Plot.plot(
  (() => {
    const n = 3; // number of facet columns
    const keys = Array.from(d3.union(industries.map((d) => d.industry)));
    const index = new Map(keys.map((key, i) => [key, i]));
    const fx = (key) => index.get(key) % n;
    const fy = (key) => Math.floor(index.get(key) / n);
    return {
      height: 300,
      axis: null,
      y: {insetTop: 10},
      fx: {padding: 0.03},
      marks: [
        Plot.areaY(
          industries,
          Plot.normalizeY("extent", {
            x: "date",
            y: "unemployed",
            fx: (d) => fx(d.industry),
            fy: (d) => fy(d.industry)
          })
        ),
        Plot.text(keys, {fx, fy, frameAnchor: "top-left", dx: 6, dy: 6}),
        Plot.frame()
      ]
    };
  })()
);

display(chart);
```

```js echo
const industries = FileAttachment("../data/industries.csv").csv({typed: true});
```
