---
source: https://observablehq.com/@observablehq/plot-simpsons-ratings
index: true
---

# Simpsons ratings

A [text](https://observablehq.com/plot/features/marks/text) mark shows the rating of each of the Simpsons episode, organized by season. It is overlaid on a [cell](https://observablehq.com/plot/features/marks/cell) that redundantly [encodes](https://observablehq.com/plot/features/scales#color-scales) the same value as a color. Data: [Internet Movie Data Base](https://www.imdb.com/).

```js echo
const chart = Plot.plot({
  padding: 0,
  grid: true,
  x: {axis: "top", label: "Season"},
  y: {label: "Episode"},
  color: {type: "linear", scheme: "PiYG"},
  marks: [
    Plot.cell(simpsons, {
      x: "season",
      y: "number_in_season",
      fill: "imdb_rating",
      inset: 0.5
    }),
    Plot.text(simpsons, {
      x: "season",
      y: "number_in_season",
      text: (d) => d.imdb_rating?.toFixed(1),
      fill: "black",
      title: "title"
    })
  ]
});

display(chart);
```

```js echo
const simpsons = FileAttachment("../data/simpsons.csv").csv({typed: true});
```
