<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Bar chart transitions</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Bar chart transitions

This [bar chart](/@d3/bar-chart/2) supports animated transitions. For [object constancy](https://bost.ocks.org/mike/constancy/), bars are keyed by name, making it possible to follow changes in value and order across transitions. Use the dropdown menu to change the sort order.

```js
viewof order = {
  const select = Inputs.select(
    new Map([
      ["Alphabetical", (a, b) => a.letter.localeCompare(b.letter)],
      ["Frequency, ascending", (a, b) => a.frequency - b.frequency],
      ["Frequency, descending", (a, b) => b.frequency - a.frequency]
    ]),
    { label: "Order" }
  );
  
  return select;
}
```

```js echo
chart = {

  // Specify the chart’s dimensions.
  const width = 640;
  const height = 400;
  const marginTop = 20;
  const marginRight = 0;
  const marginBottom = 30;
  const marginLeft = 40;
  
  // Declare the x (horizontal position) scale and the corresponding axis generator.
  const x = d3.scaleBand()
    .domain(data.map(d => d.letter))
    .range([marginLeft, width - marginRight])
    .padding(0.1);

  const xAxis = d3.axisBottom(x).tickSizeOuter(0);

  // Declare the y (vertical position) scale.
  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.frequency)]).nice()
    .range([height - marginBottom, marginTop]);

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("style", `max-width: ${width}px; height: auto; font: 10px sans-serif; overflow: visible;`);

  // Create a bar for each letter.
  const bar = svg.append("g")
      .attr("fill", "steelblue")
    .selectAll("rect")
    .data(data)
    .join("rect")
      .style("mix-blend-mode", "multiply") // Darker color when bars overlap during the transition.
      .attr("x", d => x(d.letter))
      .attr("y", d => y(d.frequency))
      .attr("height", d => y(0) - y(d.frequency))
      .attr("width", x.bandwidth());

  // Create the axes.
  const gx = svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(xAxis);
  
  const gy = svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).tickFormat((y) => (y * 100).toFixed()))
      .call(g => g.select(".domain").remove());

  // Return the chart, with an update function that takes as input a domain
  // comparator and transitions the x axis and bar positions accordingly. 
  return Object.assign(svg.node(), {
    update(order) {
      x.domain(data.sort(order).map(d => d.letter));

      const t = svg.transition()
          .duration(750);

      bar.data(data, d => d.letter)
          .order()
        .transition(t)
          .delay((d, i) => i * 20)
          .attr("x", d => x(d.letter));

      gx.transition(t)
          .call(xAxis)
        .selectAll(".tick")
          .delay((d, i) => i * 20);
    }
  });
}
```

```js echo
update = chart.update(order)
```

```js echo
data = FileAttachment("alphabet.csv").csv({typed: true})
```

---
The *trigger* cell below uses a timeout to change the selected value in the *order* input above, triggering an animation on page load for demonstrative purposes. If the user interacts with the menu prior to the timeout, the timeout is cleared. You don’t need this cell to use the chart above.

```js echo
trigger = {
  const input = viewof order.input;
  const interval = d3.interval(() => {
    input.selectedIndex = (input.selectedIndex + 1) % input.length;
    input.dispatchEvent(new Event("input", {bubbles: true}));
  }, 4000);
  const clear = () => interval.stop();
  input.addEventListener("change", clear, {once: true});
  invalidation.then(() => (clear(), input.removeEventListener("change", clear)));
}
```

For an equivalent with Observable Plot, see [this notebook](https://observablehq.com/@observablehq/plot-bar-chart-transitions).
