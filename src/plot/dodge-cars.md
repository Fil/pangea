---
source: https://observablehq.com/@observablehq/plot-dodge-cars
index: true
---

# Dodge cars (beeswarm)

The [dodge](https://observablehq.com/plot/transforms/dodge) transform helps to create a beeswarm chart.

```js
const anchor = view(Inputs.select([null, "top", "middle", "bottom"], {label: "anchor"}));
```

```js echo
const chart = Plot.plot({
  height: 160,
  marks: [
    Plot.dotX(
      cars,
      Plot.dodgeY({
        x: "weight (lb)",
        title: "name",
        fill: "currentColor",
        anchor: anchor ?? undefined
      })
    )
  ]
});

display(chart);
```

For comparison, here are a few other ways to display the same data:

```js echo
const chart2 = Plot.plot({
  height: 180,
  marks: [Plot.rectY(cars, Plot.binX({y: "count"}, {x: "weight (lb)"})), Plot.ruleY([0])]
});

display(chart2);
```

```js echo
display(Plot.dotX(cars, {x: "weight (lb)"}).plot());
```

```js echo
display(Plot.ruleX(cars, {x: "weight (lb)"}).plot());
```

```js echo
const cars = FileAttachment("../data/cars.csv").csv({typed: true});
```
