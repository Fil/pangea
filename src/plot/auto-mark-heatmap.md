---
source: https://observablehq.com/@observablehq/plot-auto-mark-heatmap
index: true
---

# Auto mark, heatmap

Given two quantitative dimensions for _x_ and _y_, the [auto](https://observablehq.com/plot/marks/auto) mark will create a heatmap from the [binned](https://observablehq.com/plot/transforms/bin) values.

```js echo
display(Plot.auto(olympians, {x: "weight", y: "height", color: "count"}).plot());
```

This auto mark is equivalent to a rect & bin combination:

```js echo
display(Plot.rect(olympians, Plot.bin({fill: "count"}, {x: "weight", y: "height"})).plot());
```

## Quantitative &times; ordinal

Given a quantitative dimension for _x_ and an ordinal dimension for _y_, the [auto](https://observablehq.com/plot/marks/auto) mark will create a heatmap from the [binned](https://observablehq.com/plot/transforms/bin) _x_ values, grouped by _y_.

```js echo
display(Plot.auto(olympians, {x: "weight", y: "sex", color: "count"}).plot());
```

```js echo
const olympians = FileAttachment("../data/olympians.csv").csv({typed: true});
```
