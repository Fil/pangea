---
index: true
source: https://observablehq.com/@d3/connected-scatterplot/2
---

# Connected scatterplot (D3)

This is a recreation of Hannah Fairfield’s [_Driving Shifts Into Reverse_](https://www.nytimes.com/imagepages/2010/05/02/business/02metrics.html), sans annotations. See also Fairfield’s [_Driving Safety, in Fits and Starts_](https://www.nytimes.com/interactive/2012/09/17/science/driving-safety-in-fits-and-starts.html), [Noah Veltman’s variation](https://blocks.roadtolarissa.com/veltman/87596f5a256079b95eb9) of this graphic, and [a paper on connected scatterplots](http://steveharoz.com/research/connected_scatterplot/) by Haroz _et al._

```js
const replay = view(Inputs.button("Replay"));
```

```js
replay;
display(ConnectedScatterplot(driving));
```

```js run=false
ConnectedScatterplot(driving)
```

## Data

We load the `driving` data from a CSV file. The “side” column indicates where we want the label to be displayed next to the data point — these values have been hand-picked to limit occlusion.

<p>${Inputs.table(driving, {select: false, format: {year: (d) => d}})}</p>

```js echo
const driving = await d3.csv("/data/driving.csv", d3.autoType);
```

## Code

The function below creates the chart as a SVG node to be displayed on the page.

```js echo
function ConnectedScatterplot(driving) {
  // Declare the chart dimensions and margins.
  const width = 928;
  const height = 720;
  const marginTop = 20;
  const marginRight = 30;
  const marginBottom = 30;
  const marginLeft = 40;

  // Declare the positional encodings.
  const x = d3.scaleLinear()
      .domain(d3.extent(driving, (d) => d.miles))
      .nice()
      .range([marginLeft, width - marginRight]);

  const y = d3.scaleLinear()
      .domain(d3.extent(driving, (d) => d.gas))
      .nice()
      .range([height - marginBottom, marginTop]);

  const line = d3.line()
      .curve(d3.curveCatmullRom)
      .x((d) => x(d.miles))
      .y((d) => y(d.gas));

  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

  const l = length(line(driving));

  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).ticks(width / 80))
      .call((g) => g.select(".domain").remove())
      .call((g) => g.selectAll(".tick line").clone()
          .attr("y2", -height)
          .attr("stroke-opacity", 0.1))
      .call((g) => g.append("text")
          .attr("x", width - 4)
          .attr("y", -4)
          .attr("font-weight", "bold")
          .attr("text-anchor", "end")
          .attr("fill", "currentColor")
          .text("Miles per person per year"));

  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(null, "$.2f"))
      .call((g) => g.select(".domain").remove())
      .call((g) => g.selectAll(".tick line").clone()
          .attr("x2", width).attr("stroke-opacity", 0.1))
      .call((g) => g.select(".tick:last-of-type text").clone()
          .attr("x", 4)
          .attr("text-anchor", "start")
          .attr("font-weight", "bold")
          .text("Cost per gallon"));

  svg.append("path")
      .datum(driving)
      .attr("fill", "none")
      .attr("stroke", "currentColor")
      .attr("stroke-width", 2.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-dasharray", `0,${l}`)
      .attr("d", line)
      .transition()
          .duration(5000)
          .ease(d3.easeLinear)
          .attr("stroke-dasharray", `${l},${l}`);

  svg.append("g")
      .attr("fill", "var(--theme-background)")
      .attr("stroke", "currentColor")
      .attr("stroke-width", 2)
    .selectAll("circle")
    .data(driving)
    .join("circle")
      .attr("cx", (d) => x(d.miles))
      .attr("cy", (d) => y(d.gas))
      .attr("r", 3);

  const label = svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
    .selectAll()
    .data(driving)
    .join("text")
      .attr("transform", (d) => `translate(${x(d.miles)},${y(d.gas)})`)
      .attr("fill-opacity", 0)
      .text((d) => d.year)
      .attr("stroke", "var(--theme-background)")
      .attr("paint-order", "stroke")
      .attr("fill", "currentColor")
      .each(function (d) {
        const t = d3.select(this);
        switch (d.side) {
          case "top": t.attr("text-anchor", "middle").attr("dy", "-0.7em"); break;
          case "right": t.attr("dx", "0.5em").attr("dy", "0.32em").attr("text-anchor", "start"); break;
          case "bottom": t.attr("text-anchor", "middle").attr("dy", "1.4em"); break;
          case "left": t.attr("dx", "-0.5em").attr("dy", "0.32em").attr("text-anchor", "end"); break;
        }
      });

  label.transition()
      .delay((d, i) => (length(line(driving.slice(0, i + 1))) / l) * (5000 - 125))
      .attr("fill-opacity", 1);

  return svg.node();
}
```

The _length_ helper computes the total length of the given SVG _path_ string; this is needed to apply the transition of `stroke-dasharray` across the length of the stroke.

```js echo
function length(path) {
  return d3.create("svg:path").attr("d", path).node().getTotalLength();
}
```

<div class=tip>

For a simpler approach using Observable Plot’s concise API, see [Plot: Connected scatterplot](/plot/connected-scatterplot).

</div>

```js
/*
 * Pre-register files for d3.csv and other methods.
 * This allows us to write d3.csv("driving.js") in this documentation,
 * where the usual method with Framework would be to call:
 *   d3.csv(FileAttachment("/data/driving.csv").href)
 */
import {registerD3} from "/components/d3.js";
const d3 = registerD3([FileAttachment("/data/driving.csv")]);
```
