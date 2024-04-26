---
source: https://observablehq.com/@observablehq/plot-tips-additional-channels
index: true
---

# Interactive tips with additional channels

If no **title** channel is supplied, the [tip mark](https://observablehq.com/plot/marks/tip) displays all channel values. You can supply additional name-value pairs by registering extra channels using the **channels** mark option.

```js echo
const chart = Plot.dot(olympians, {
  x: "weight",
  y: "height",
  stroke: "sex",
  channels: {name: "name", sport: "sport"},
  tip: true
}).plot();

display(chart);
```

<blockquote style="font-family: sans-serif; font-size: smaller;">The tallest athlete in this dataset, swimmer <strong>Kevin Cordes</strong>, is likely an error: his official height is 1.96m (6′ 5″) not 2.21m (7′ 3″). Basketball player <strong>Li Muhao</strong> is likely the true tallest. — <em>Can you spot them?</em>

```js echo
const olympians = FileAttachment("../data/olympians.csv").csv({typed: true});
```
