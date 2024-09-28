---
source: https://observablehq.com/@observablehq/plot-multiple-line-chart
index: true
---

# Multiple line chart with hover

The [multiple line chart](./multiple-line-chart.md) with an interactive tip and line selection. We use a render transform on the tip option that updates the lines’ appearance based on whether they correspond to the same series as the point under the mouse. 

The render function takes advantage of the current implementation of Plot: since the line mark [binds](https://d3js.org/d3-selection/joining#selection_data) the data indices with the SVG elements, we can [filter](https://d3js.org/d3-selection/selecting#selection_filter) the paths we want to highlight.

```js echo
Plot.plot({
  y: {
    grid: true,
    label: "↑ Unemployment (%)"
  },
  marks: [
    Plot.ruleY([0]),
    Plot.lineY(bls, {
      x: "date",
      y: "unemployment",
      z: "division",
      stroke: "var(--theme-foreground-focus)",
      mixBlendMode: dark ? "screen" : "multiply",
      tip: {
        render(index, scales, values, dimensions, context, next) {
          // Filter and highlight the paths with the same *z* as the hovered point.
          const path = d3.select(context.ownerSVGElement).selectAll("[aria-label=line] path");
          if (index.length) {
            const z = values.z[index[0]];
            path.style("stroke", "var(--theme-foreground-faintest)")
              .filter(([i]) => values.z[i] === z)
                .style("stroke", null)
                .raise();
          }
          else path.style("stroke", null);
          // Render the tip.
          return next(index, scales, values, dimensions, context);
        }
      }
    })
  ]
})
```

```js echo
const bls = FileAttachment("../data/bls-metro-unemployment.csv").csv({typed: true});
```
