---
source: https://observablehq.com/@harrystevens/directly-labelling-lines
index: false
draft: true
---

```js
md`
# Directly labelling lines
`;
```

```js
md`
A common goal of data visualization is to show how some values have changed over time. More often than not, you will use a line chart for this purpose. But when you want to show several different values in the same chart, you will need to come up with a way to explain to your reader which line represents which value.
`;
```

```js
{
  const svg = d3.select(DOM.svg(width, height));

  const g = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

  g.append("g").call(xAxisGenerator).attr("transform", `translate(0, ${chartHeight})`);

  g.append("g").call(yAxisGenerator);

  g.selectAll(".line")
    .data(lineData)
    .enter()
    .append("path")
    .attr("d", (d) => lineGenerator(d.data))
    .style("fill", "none")
    .style("stroke", (d) => d.light)
    .style("stroke-width", 2)
    .style("stroke-linejoin", "round");

  const valueLabel = g
    .selectAll(".label")
    .data(lineData)
    .enter()
    .append("g")
    .attr("transform", (d) => `translate(${xScale(last(d.data).date)}, ${yScale(last(d.data).value)})`);

  valueLabel
    .append("circle")
    .attr("r", 4)
    .style("stroke", "white")
    .style("fill", (d) => d.light);

  valueLabel
    .append("text")
    .text((d) => last(d.data).value)
    .attr("dy", 5)
    .attr("dx", 10)
    .style("font-family", "monospace")
    .style("fill", (d) => d.dark);

  return svg.node();
}
```

```js
md`
All too often, chart designers will resort to adding an external legend. When confronted with such designs, readers must glance back and forth between the chart and the legend, wasting cognitive energy on a task that does not contribute to understanding the data. The solution? Label the lines directly.
`;
```

```js
{
  const svg = d3.select(DOM.svg(width, height));

  const g = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  g.append("g")
      .call(xAxisGenerator)
      .attr("transform", `translate(0, ${chartHeight})`);

  g.append("g")
      .call(yAxisGenerator);

  g.selectAll(".line")
      .data(lineData)
    .enter().append("path")
      .attr("d", d => lineGenerator(d.data))
      .style("fill", "none")
      .style("stroke", d => d.light)
      .style("stroke-width", 2)
      .style("stroke-linejoin", "round");

  const valueLabel = g.selectAll(".label")
      .data(lineData)
    .enter().append("g")
      .attr("class", "label")
      .attr("transform", d => `translate(${xScale(last(d.data).date)}, ${yScale(last(d.data).value)})`);

  valueLabel.append("circle")
    .attr("r", 4)
    .style("stroke", "white")
    .style("fill", d => d.light);

  valueLabel.append("text")
    .text(d => last(d.data).value)
    .attr("dy", 5)
    .attr("dx", 10)
    .style("font-family", "monospace")
    .style("fill", d => d.dark);

  yield svg.node();

  g.selectAll(".line-label")
      .data(largestVoronoiData)
    .enter().append("text")
      .text(d => d.key)
      .attr("transform", d => `translate(${d.point})`)
      .style("font-family", "sans-serif")
      .style("text-anchor", "middle")
      .style("font-weight", "600")
      .style("fill", d => d.colors.dark)
      .each((d, i, e) => {
        let newD = Object.assign({}, d);

        function somePointsInLine(){
          let {width: labelWidth, height: labelHeight} = e[i].getBoundingClientRect(),
              labelPadding = 5,
              labelLeft = -labelPadding + newD.point[0] - labelWidth / 2,
              labelRight = labelPadding + newD.point[0] + labelWidth / 2,
              labelTop = -6 - labelPadding + newD.point[1] - labelHeight / 2,
              labelBottom = -6 + labelPadding + newD.point[1] + labelHeight / 2,
              labelRect = [
                [labelLeft, labelTop],
                [labelRight, labelTop],
                [labelRight, labelBottom],
                [labelLeft, labelBottom]
              ];

          return flatData.some(d0 => geometric.pointInPolygon([xScale(d0.date), yScale(d0.value)], labelRect))
        }

        let i0 = 1, iMax = 50;

        while(somePointsInLine() && i0 < iMax){
          newD.point = geometric.pointTranslate(d.point, d.angle, i0);
          d3.select(e[i]).attr("transform", `translate(${newD.point})`);
          i0++;
        }

      });
}
```

```js
md`
Below, I present a method for directly labelling lines that works with many data sets.
`;
```

```js
md`
<b>Step 1:</b> Compute the voronoi diagram for each point on the chart.
`;
```

```js
{
  const svg = d3.select(DOM.svg(width, height));

  const g = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

  g.append("g").call(xAxisGenerator).attr("transform", `translate(0, ${chartHeight})`);

  g.append("g").call(yAxisGenerator);

  g.selectAll(".voronoi-cell")
    .data(voronoiData)
    .enter()
    .append("path")
    .attr("d", (d) => "M" + d.join("L") + "Z")
    .style("fill", (d) => d.data.colors.light)
    .style("fill-opacity", 0.3)
    .style("stroke", "#fff");

  g.selectAll(".line")
    .data(lineData)
    .enter()
    .append("path")
    .attr("d", (d) => lineGenerator(d.data))
    .style("fill", "none")
    .style("stroke", (d) => d.light)
    .style("stroke-width", 2)
    .style("stroke-linejoin", "round");

  const valueLabel = g
    .selectAll(".label")
    .data(lineData)
    .enter()
    .append("g")
    .attr("transform", (d) => `translate(${xScale(last(d.data).date)}, ${yScale(last(d.data).value)})`);

  valueLabel
    .append("circle")
    .attr("r", 4)
    .style("stroke", "white")
    .style("fill", (d) => d.light);

  valueLabel
    .append("text")
    .text((d) => last(d.data).value)
    .attr("dy", 5)
    .attr("dx", 10)
    .style("font-family", "monospace")
    .style("fill", (d) => d.dark);

  g.selectAll(".line-point")
    .data(flatData)
    .enter()
    .append("circle")
    .attr("r", 2)
    .attr("transform", (d) => `translate(${xScale(d.date)}, ${yScale(d.value)})`)
    .style("fill", (d) => d.colors.dark);

  return svg.node();
}
```

```js
md`
<b>Step 2:</b> For each line's points, calculate the largest voronoi cell.
`;
```

```js
{
  const svg = d3.select(DOM.svg(width, height));

  const g = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

  g.append("g").call(xAxisGenerator).attr("transform", `translate(0, ${chartHeight})`);

  g.append("g").call(yAxisGenerator);

  g.selectAll(".voronoi-cell")
    .data(largestVoronoiData)
    .enter()
    .append("path")
    .attr("d", (d) => "M" + d.polygon.join("L") + "Z")
    .style("fill", (d) => d.colors.light)
    .style("fill-opacity", 0.3);

  g.selectAll(".line")
    .data(lineData)
    .enter()
    .append("path")
    .attr("d", (d) => lineGenerator(d.data))
    .style("fill", "none")
    .style("stroke", (d) => d.light)
    .style("stroke-width", 2)
    .style("stroke-linejoin", "round");

  const valueLabel = g
    .selectAll(".label")
    .data(lineData)
    .enter()
    .append("g")
    .attr("transform", (d) => `translate(${xScale(last(d.data).date)}, ${yScale(last(d.data).value)})`);

  valueLabel
    .append("circle")
    .attr("r", 4)
    .style("stroke", "white")
    .style("fill", (d) => d.dark);

  valueLabel
    .append("text")
    .text((d) => last(d.data).value)
    .attr("dy", 5)
    .attr("dx", 10)
    .style("font-family", "monospace")
    .style("fill", (d) => d.dark);

  g.selectAll(".line-point")
    .data(largestVoronoiData)
    .enter()
    .append("circle")
    .attr("r", 2)
    .attr("transform", (d) => `translate(${d.point})`)
    .style("fill", (d) => d.colors.dark);

  return svg.node();
}
```

```js
md`
<b>Step 3:</b> Place the label at the point of the largest cell.
`;
```

```js
{
  const svg = d3.select(DOM.svg(width, height));

  const g = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

  g.append("g").call(xAxisGenerator).attr("transform", `translate(0, ${chartHeight})`);

  g.append("g").call(yAxisGenerator);

  g.selectAll(".voronoi-cell")
    .data(largestVoronoiData)
    .enter()
    .append("path")
    .attr("d", (d) => "M" + d.polygon.join("L") + "Z")
    .style("fill", (d) => d.colors.light)
    .style("fill-opacity", 0.3);

  g.selectAll(".line")
    .data(lineData)
    .enter()
    .append("path")
    .attr("d", (d) => lineGenerator(d.data))
    .style("fill", "none")
    .style("stroke", (d) => d.light)
    .style("stroke-width", 2)
    .style("stroke-linejoin", "round");

  const valueLabel = g
    .selectAll(".label")
    .data(lineData)
    .enter()
    .append("g")
    .attr("transform", (d) => `translate(${xScale(last(d.data).date)}, ${yScale(last(d.data).value)})`);

  valueLabel
    .append("circle")
    .attr("r", 4)
    .style("stroke", "white")
    .style("fill", (d) => d.light);

  valueLabel
    .append("text")
    .text((d) => last(d.data).value)
    .attr("dy", 5)
    .attr("dx", 10)
    .style("font-family", "monospace")
    .style("fill", (d) => d.dark);

  g.selectAll(".line-label")
    .data(largestVoronoiData)
    .enter()
    .append("text")
    .text((d) => d.key)
    .attr("transform", (d) => `translate(${d.point})`)
    .style("font-family", "sans-serif")
    .style("text-anchor", "middle")
    .style("font-weight", "600")
    .style("fill", (d) => d.colors.dark);

  return svg.node();
}
```

```js
md`
<b>Step 4:</b> Compute the bounding box of each label.
`;
```

```js
{
  const svg = d3.select(DOM.svg(width, height));

  const g = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  g.append("g")
      .call(xAxisGenerator)
      .attr("transform", `translate(0, ${chartHeight})`);

  g.append("g")
      .call(yAxisGenerator);

  g.selectAll(".voronoi-cell")
      .data(largestVoronoiData)
    .enter().append("path")
      .attr("d", d => "M" + d.polygon.join("L") + "Z")
      .style("fill", d => d.colors.light)
      .style("fill-opacity", .3);

  g.selectAll(".line")
      .data(lineData)
    .enter().append("path")
      .attr("d", d => lineGenerator(d.data))
      .style("fill", "none")
      .style("stroke", d => d.light)
      .style("stroke-width", 2)
      .style("stroke-linejoin", "round");

  const valueLabel = g.selectAll(".label")
      .data(lineData)
    .enter().append("g")
      .attr("class", "label")
      .attr("transform", d => `translate(${xScale(last(d.data).date)}, ${yScale(last(d.data).value)})`);

  valueLabel.append("circle")
    .attr("r", 4)
    .style("stroke", "white")
    .style("fill", d => d.light);

  valueLabel.append("text")
    .text(d => last(d.data).value)
    .attr("dy", 5)
    .attr("dx", 10)
    .style("font-family", "monospace")
    .style("fill", d => d.dark);

  yield svg.node();

   g.selectAll(".line-label")
      .data(largestVoronoiData)
    .enter().append("text")
      .text(d => d.key)
      .attr("transform", d => `translate(${d.point})`)
      .style("font-family", "sans-serif")
      .style("text-anchor", "middle")
      .style("font-weight", "600")
      .style("fill", d => d.colors.dark)
      .each((d, i, e) => {
        let {width: labelWidth, height: labelHeight} = e[i].getBoundingClientRect(),
            labelPadding = 5,
            labelLeft = -labelPadding + d.point[0] - labelWidth / 2,
            labelRight = labelPadding + d.point[0] + labelWidth / 2,
            labelTop = -6 + -labelPadding + d.point[1] - labelHeight / 2,
            labelBottom = -6 + labelPadding + d.point[1] + labelHeight / 2,
            labelRect = [
              [labelLeft, labelTop],
              [labelRight, labelTop],
              [labelRight, labelBottom],
              [labelLeft, labelBottom]
            ];

        g.append("polygon")
          .attr("points", labelRect.join(" "))
          .style("fill", "none")
          .style("stroke", "black");
      });
}
```

```js
md`
<b>Step 5:</b> Move the label towards the voronoi cell's centroid until none of the lines' points fall within the label's bounding box.
`;
```

```js
{
  const svg = d3.select(DOM.svg(width, height));

  const g = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  g.append("g")
      .call(xAxisGenerator)
      .attr("transform", `translate(0, ${chartHeight})`);

  g.append("g")
      .call(yAxisGenerator);

  g.selectAll(".voronoi-cell")
      .data(largestVoronoiData)
    .enter().append("path")
      .attr("d", d => "M" + d.polygon.join("L") + "Z")
      .style("fill", d => d.colors.light)
      .style("fill-opacity", .3);

  g.selectAll(".line")
      .data(lineData)
    .enter().append("path")
      .attr("d", d => lineGenerator(d.data))
      .style("fill", "none")
      .style("stroke", d => d.light)
      .style("stroke-width", 2)
      .style("stroke-linejoin", "round");

  const valueLabel = g.selectAll(".label")
      .data(lineData)
    .enter().append("g")
      .attr("class", "label")
      .attr("transform", d => `translate(${xScale(last(d.data).date)}, ${yScale(last(d.data).value)})`);

  valueLabel.append("circle")
    .attr("r", 4)
    .style("stroke", "white")
    .style("fill", d => d.light);

  valueLabel.append("text")
    .text(d => last(d.data).value)
    .attr("dy", 5)
    .attr("dx", 10)
    .style("font-family", "monospace")
    .style("fill", d => d.dark);

  g.selectAll(".centroid-point")
      .data(largestVoronoiData)
    .enter().append("circle")
      .attr("r", 2)
      .attr("transform", d => `translate(${d.centroid})`);

  g.selectAll(".centroid-line")
      .data(largestVoronoiData)
    .enter().append("line")
      .attr("x1", d => d.point[0])
      .attr("x2", d => d.centroid[0])
      .attr("y1", d => d.point[1])
      .attr("y2", d => d.centroid[1])
      .style("stroke", "black");

  yield svg.node();

  g.selectAll(".line-label")
      .data(largestVoronoiData)
    .enter().append("text")
      .text(d => d.key)
      .attr("transform", d => `translate(${d.point})`)
      .style("font-family", "sans-serif")
      .style("text-anchor", "middle")
      .style("font-weight", "600")
      .style("fill", d => d.colors.dark)
      .each((d, i, e) => {
        let newD = Object.assign({}, d);

        let bBox = g.append("polygon")
            .style("fill", "none")
            .style("stroke", "black");

        function somePointsInLine(){
          let {width: labelWidth, height: labelHeight} = e[i].getBoundingClientRect(),
              labelPadding = 5,
              labelLeft = -labelPadding + newD.point[0] - labelWidth / 2,
              labelRight = labelPadding + newD.point[0] + labelWidth / 2,
              labelTop = -6 + -labelPadding + newD.point[1] - labelHeight / 2,
              labelBottom = -6 + labelPadding + newD.point[1] + labelHeight / 2,
              labelRect = [
                [labelLeft, labelTop],
                [labelRight, labelTop],
                [labelRight, labelBottom],
                [labelLeft, labelBottom]
              ];

          bBox.attr("points", labelRect.join(" "));

          return flatData.some(d0 => geometric.pointInPolygon([xScale(d0.date), yScale(d0.value)], labelRect))
        }

        let i0 = 1, iMax = 50;

        while(somePointsInLine() && i0 < iMax){
          newD.point = geometric.pointTranslate(d.point, d.angle, i0);
          d3.select(e[i]).attr("transform", `translate(${newD.point})`);
          i0++;
        }

      });
}
```

```js
md`
Nice chart.
`;
```

```js
{
  const svg = d3.select(DOM.svg(width, height));

  const g = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  g.append("g")
      .call(xAxisGenerator)
      .attr("transform", `translate(0, ${chartHeight})`);

  g.append("g")
      .call(yAxisGenerator);

  g.selectAll(".line")
      .data(lineData)
    .enter().append("path")
      .attr("d", d => lineGenerator(d.data))
      .style("fill", "none")
      .style("stroke", d => d.light)
      .style("stroke-width", 2)
      .style("stroke-linejoin", "round");

  const valueLabel = g.selectAll(".label")
      .data(lineData)
    .enter().append("g")
      .attr("class", "label")
      .attr("transform", d => `translate(${xScale(last(d.data).date)}, ${yScale(last(d.data).value)})`);

  valueLabel.append("circle")
    .attr("r", 4)
    .style("stroke", "white")
    .style("fill", d => d.light);

  valueLabel.append("text")
    .text(d => last(d.data).value)
    .attr("dy", 5)
    .attr("dx", 10)
    .style("font-family", "monospace")
    .style("fill", d => d.dark);

  yield svg.node();

  g.selectAll(".line-label")
      .data(largestVoronoiData)
    .enter().append("text")
      .text(d => d.key)
      .attr("transform", d => `translate(${d.point})`)
      .style("font-family", "sans-serif")
      .style("text-anchor", "middle")
      .style("font-weight", "600")
      .style("fill", d => d.colors.dark)
      .each((d, i, e) => {
        let newD = Object.assign({}, d);

        function somePointsInLine(){
          let {width: labelWidth, height: labelHeight} = e[i].getBoundingClientRect(),
              labelPadding = 5,
              labelLeft = -labelPadding + newD.point[0] - labelWidth / 2,
              labelRight = labelPadding + newD.point[0] + labelWidth / 2,
              labelTop = -6 + -labelPadding + newD.point[1] - labelHeight / 2,
              labelBottom = -6 + labelPadding + newD.point[1] + labelHeight / 2,
              labelRect = [
                [labelLeft, labelTop],
                [labelRight, labelTop],
                [labelRight, labelBottom],
                [labelLeft, labelBottom]
              ];

          return flatData.some(d0 => geometric.pointInPolygon([xScale(d0.date), yScale(d0.value)], labelRect));
        }

        let i0 = 1, iMax = 50;

        while(somePointsInLine() && i0 < iMax){
          newD.point = geometric.pointTranslate(d.point, d.angle, i0);
          d3.select(e[i]).attr("transform", `translate(${newD.point})`);
          i0++;
        }

      });
}
```

```js
md`
I have tested this method on several charts, and it works very well for charts with three or fewer lines, and sometimes even more. It also works on small screens, though not as frequently.

Note that in the while loop, I set the <em>iMax</em> variable to 50. That represents the maximum number of pixels from the point of origin that you are willing to move the label. If the loop reaches <em>iMax</em> without having found a suitable position for the label (or if any of the labels' polygons overlap each other, another potential problem), then it is time to abandon this folly and make a legend. Hey, at least you tried.
`;
```

```js
md`
## Dimensions
`;
```

```js
const margin = {
  left: 20,
  bottom: 20,
  right: 60,
  top: 10
};
```

```js
const height = width * 0.5;
```

```js
const chartWidth = width - margin.left - margin.right;
```

```js
const chartHeight = height - margin.top - margin.bottom;
```

```js
md`
## Scales
`;
```

```js
const xScale = d3
  .scaleTime()
  .domain([new Date(2010, 0, 1), new Date(2010, 3, 1)])
  .range([0, chartWidth]);
```

```js
const yScale = d3.scaleLinear().domain([0, 20]).range([chartHeight, 0]);
```

```js
md`
## Generators
`;
```

```js
const xAxisGenerator = d3.axisBottom(xScale).tickValues(d3.range(0, 4).map((d) => new Date(2010, d, 1)));
```

```js
const yAxisGenerator = d3.axisLeft(yScale).tickValues(d3.range(0, 30, 5));
```

```js
const lineGenerator = d3
  .line()
  .x((d) => xScale(d.date))
  .y((d) => yScale(d.value));
```

```js
md`
## Data
`;
```

```js
md`
### Data arrays
`;
```

```js
const fruits = d3.csv(
  "https://gist.githubusercontent.com/HarryStevens/2ca674b53b0ea1ab806a3e704386c4c9/raw/3828df9890fbe0ff8b5259e2e3f9ebd1d38984bc/fruits.csv"
);
```

```js
const data = parseData(fruits);
```

```js
const lineData = parseLineData(data);
```

```js
const flatData = parseFlatData(data);
```

```js
const voronoiData = {
  const v = [...new d3.Delaunay(arr.flatten(flatData.map(d => [xScale(d.date), yScale(d.value)]))).voronoi([0, 0, chartWidth, chartHeight]).cellPolygons()];
  for (let i = 0, l = v.length; i < l; i++){
    v[i].data = flatData[i];
  }
  return v;
}
```

```js
const largestVoronoiData = parseLargestVoronoi(flatData, voronoiData);
```

```js
const colors = {
  Apples: {
    light: "#fb9a99",
    dark: "#e31a1c"
  },
  Blueberries: {
    light: "#a6cee3",
    dark: "#1f78b4"
  },
  Carrots: {
    light: "#fdbf6f",
    dark: "#ff7f00"
  }
};
```

```js
md`
### Data parsers
`;
```

```js
const parseData = (data) => {
  const output = [];
  for (let i = 0, l = data.length; i < l; i++) {
    let d = data[i],
      o = {},
      s = d.Date.split("/"),
      yyyy = +("20" + s[2]),
      mm = s[0] - 1,
      dd = +s[1];

    o.date = new Date(yyyy, mm, dd);

    for (let col in d) {
      if (col !== "Date") {
        o[col] = +d[col];
      }
    }

    output.push(o);
  }

  return output;
};
```

```js
const parseLineData = (data) => {
  const output = [];

  let i = 0;
  for (let col in data[0]) {
    if (i > 0) {
      let o = {
        key: col,
        light: colors[col].light,
        dark: colors[col].dark,
        data: []
      };

      for (let i0 = 0, l0 = data.length; i0 < l0; i0++) {
        let d0 = data[i0];

        o.data.push({
          date: d0.date,
          value: d0[col]
        });
      }

      output.push(o);
    }
    i++;
  }

  return output;
};
```

```js
const parseFlatData = (data) => {
  const output = [],
    columns = [];

  let i = 0;
  for (let col in data[0]) {
    columns.push(col);
    if (i > 0) {
      for (let i0 = 0, l0 = data.length; i0 < l0; i0++) {
        let d0 = data[i0];

        output.push({
          date: d0.date,
          value: d0[col],
          key: col,
          colors: colors[col]
        });
      }
    }
    i++;
  }

  output.columns = columns;
  return output;
};
```

```js
const parseLargestVoronoi = (flatData, voronoiData) => {
  let output = {};
  for (let i = 1, l = flatData.columns.length; i < l; i++) {
    output[flatData.columns[i]] = {area: 0};
  }

  for (let i = 0, l = voronoiData.length; i < l; i++) {
    let o = {},
      cell = voronoiData[i],
      area = geometric.polygonArea(cell),
      key = cell.data.key;

    if (area > output[key].area) {
      output[key].centroid = geometric.polygonCentroid(cell);
      output[key].point = [xScale(cell.data.date), yScale(cell.data.value)];
      output[key].angle = geometric.lineAngle([output[key].point, output[key].centroid]);
      output[key].area = area;
      output[key].polygon = cell;
      output[key].colors = colors[key];
    }
  }

  let output2 = [];
  for (let key in output) {
    output[key].key = key;
    output2.push(output[key]);
  }

  return output2;
};
```

```js
const last = (array) => array[array.length - 1];
```

```js
md`
## Libraries
`;
```

```js
const arr = require("arraygeous@0");
```

```js
const d3 = require("d3@7");
```

```js
const geometric = require("geometric@2");
```
