---
source: https://observablehq.com/@observablehq/plot-stacked-waffles
index: true
---

# Stacked waffles

Like the bar and rect marks, the [waffle mark](https://observablehq.com/plot/marks/waffle) supports implicit stacking.

```js echo
Plot.waffleY(olympians, Plot.groupZ(
  {y: "count"},
  {fill: "sex", sort: "sex", fx: "weight", unit: 10}
)).plot({fx: {interval: 10}, color: {legend: true}})
```
