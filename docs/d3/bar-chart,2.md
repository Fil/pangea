source: https://observablehq.com/@d3/bar-chart/2
<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Bar chart</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Bar chart

This chart shows the relative frequency of letters in the English language. A vertical bar chart such as this is sometimes called a *column* chart. Data: *Cryptological Mathematics*, Robert Lewand

```js echo
chart = {
  // Declare the chart dimensions and margins.
  const width = 928;
  const height = 500;
  const marginTop = 30;
  const marginRight = 0;
  const marginBottom = 30;
  const marginLeft = 40;

  // Declare the x (horizontal position) scale.
  const x = d3.scaleBand()
      .domain(d3.groupSort(data, ([d]) => -d.frequency, (d) => d.letter)) // descending frequency
      .range([marginLeft, width - marginRight])
      .padding(0.1);
  
  // Declare the y (vertical position) scale.
  const y = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d.frequency)])
      .range([height - marginBottom, marginTop]);

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

  // Add a rect for each bar.
  svg.append("g")
      .attr("fill", "steelblue")
    .selectAll()
    .data(data)
    .join("rect")
      .attr("x", (d) => x(d.letter))
      .attr("y", (d) => y(d.frequency))
      .attr("height", (d) => y(0) - y(d.frequency))
      .attr("width", x.bandwidth());

  // Add the x-axis and label.
  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));

  // Add the y-axis and label, and remove the domain line.
  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).tickFormat((y) => (y * 100).toFixed()))
      .call(g => g.select(".domain").remove())
      .call(g => g.append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("↑ Frequency (%)"));

  // Return the SVG element.
  return svg.node();
}
```

```js echo
data = FileAttachment("alphabet.csv").csv({typed: "auto"})
```

Using [Observable Plot](https://observablehq.com/plot)’s concise API, you can create a bar chart with the [bar mark](https://observablehq.com/plot/marks/bar). Below, the **sort** option orders the *x* domain (letter) by descending *y* value (frequency), and a [rule mark](https://observablehq.com/plot/marks/rule) also denotes *y* = 0.

```js echo
Plot.plot({
  y: {percent: true},
  marks: [
    Plot.barY(data, {x: "letter", y: "frequency", fill: "steelblue", sort: {x: "-y"}}),
    Plot.ruleY([0])
  ]
})
```
