---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Styled axes</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Styled axes

You can customize the appearance of axes using _post-selection_: after rendering the axis, re-select and modify its elements.

```js echo
const chart = {
  const width = 928;
  const height = 500;
  const marginTop = 20;
  const marginRight = 0;
  const marginBottom = 30;
  const marginLeft = 0;

  const x = d3.scaleUtc()
      .domain([new Date("2010-08-01"), new Date("2012-08-01")])
      .range([marginLeft, width - marginRight]);

  const y = d3.scaleLinear()
      .domain([0, 2e6])
      .range([height - marginBottom, marginTop]);

  // The format function for y-axis tick labels first converts the given
  // value to millions (dividing by 1e6 = 1,000,000), then converts to
  // fixed-point notation with a single decimal digit. By testing
  // this.parentNode.nextSibling, the function can special-case the topmost
  // tick label to give the units; the remaining ticks have a preceding non-
  // breaking space (\xa0) so that the numbers align with the dollar sign.
  function formatTick(d) {
    const s = (d / 1e6).toFixed(1);
    return this.parentNode.nextSibling ? `\xa0${s}` : `$${s} million`;
  }

  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

  // The x-axis domain path is removed, since it will overlap with the y
  // = 0 tick line. The x axis is translated vertically to place it at the
  // bottom of the chart area. We’re also using a fancy time format that
  // shows ticks for every three months, but only labels the years.
  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x)
          .ticks(d3.utcMonth.every(3))
          .tickFormat(d => d <= d3.utcYear(d) ? d.getUTCFullYear() : null))
      .call(g => g.select(".domain")
          .remove());

  // The y axis is right-oriented (d3.axisRight), but the tick size is
  // the inner width of the chart area (width - marginLeft - marginRight)
  // thus placing the tick labels on the left margin. As with the x axis,
  // the domain path is removed. All of the tick lines except the first
  // (for y = 0) are given a partially-transparent dashed stroke. Lastly,
  // the tick labels are repositioned so they sit on top of the tick lines
  // rather than hanging (invisibly) outside of the chart.`
  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisRight(y)
          .tickSize(width - marginLeft - marginRight)
          .tickFormat(formatTick))
      .call(g => g.select(".domain")
          .remove())
      .call(g => g.selectAll(".tick:not(:first-of-type) line")
          .attr("stroke-opacity", 0.5)
          .attr("stroke-dasharray", "2,2"))
      .call(g => g.selectAll(".tick text")
          .attr("x", 4)
          .attr("dy", -4));

  return svg.node();
}
```
