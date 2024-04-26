---
source: https://observablehq.com/@observablehq/plot-horizontal-stacked-bars
index: true
---

# Horizontal stacked bars

The [bar](https://observablehq.com/plot/marks/bar) mark implicitly [stacks](https://observablehq.com/plot/transforms/stack) values, allowing to immediately see a total as well as do part-to-whole comparisons.

Let’s look at the gender distribution of members of the U.S. Congress in 2023. First, the number of women (F) and men (M):

```js echo
const chart = Plot.plot({
  color: {legend: true, marginLeft: 20},
  marks: [Plot.barX(congress, Plot.groupZ({x: "count"}, {fill: "gender"}))]
});

display(chart);
```

We can split these by party affiliation (sorting the parties by their number of seats):

```js echo
const chart1 = Plot.plot({
  marginLeft: 90,
  marks: [Plot.barX(congress, Plot.groupY({x: "count"}, {fill: "gender", y: "party", sort: {y: "x", reverse: true}}))]
});

display(chart1);
```

Or reverse the grouping and color encoding, and compare the party affiliation of women representatives vs men representatives, using the _normalize_ [stack offset](https://observablehq.com/plot/transforms/stack#stack-options) to compare proportions rather than absolute counts:

```js echo
const chart2 = Plot.plot({
  color: {scheme: "Dark2", legend: true, marginLeft: 20},
  x: {percent: true},
  marks: [
    Plot.barX(
      congress,
      Plot.groupY(
        {x: "count"},
        {
          fill: "party",
          y: "gender",
          sort: {y: "x", reverse: true, color: "width"},
          offset: "normalize"
        }
      )
    )
  ]
});

display(chart2);
```

```js echo
const congress = FileAttachment("../data/us-congress-2023.csv").csv({typed: true});
```
