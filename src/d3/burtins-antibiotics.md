---
author: Mike Bostock
source: https://observablehq.com/@d3/burtins-antibiotics
index: true
---

# Burtin’s Antibiotics

<p class=author>by <a href="https://observablehq.com/@mbostock">Mike Bostock</a></p>

Ref. https://mbostock.github.io/protovis/ex/antibiotics-burtin.html

```js echo
// Declare the chart dimensions and margins.
const width = 928;
const height = width;

// Declare the color scales.
const drugColor = d3.scaleOrdinal()
    .domain(antibiotics.map((d) => d.drug))
    .range(["rgb(10, 50, 100)", "rgb(200, 70, 50)", "black"]);
const gramColor = d3.scaleOrdinal()
    .domain(antibiotics.map((d) => d.gram))
    .range(["rgba(230, 130, 110, .8)", "rgba(174, 174, 184, .8)"]);

// Burtin’s radius encoding is, as far as I can tell, sqrt(log(mic)).
const innerRadius = 90;
const outerRadius = 340;
const min = Math.sqrt(Math.log(.001 * 1e4));
const max = Math.sqrt(Math.log(1000 * 1e4));
const a = (outerRadius - innerRadius) / (min - max);
const b = innerRadius - a * max;
const radius = (mic) => a * Math.sqrt(Math.log(mic * 1e4)) + b;

// The pie is split into equal sections for each bacteria, with a blank
// section at the top for the grid labels. Each wedge is further
// subdivided to make room for the three antibiotics, equispaced.
const nameAngle = d3.scaleBand()
    .domain(antibiotics.map((d) => d.bacteria))
    .range([0, 2 * Math.PI])
    .paddingOuter(0.5);
const drugAngle = d3.scaleBand()
    .domain(antibiotics.map((d) => d.drug))
    .range([0, nameAngle.bandwidth()])
    .padding(0.5);

// Create the SVG container.
const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, 60 - height / 2, width, height])
    .attr("font-family", "sans-serif")
    .attr("font-size", "10")
    .attr("style", "max-width: 100%; height: auto; background: rgb(240, 225, 210);");

// Background wedges to indicate gram staining color.
svg.append("g")
  .selectAll()
  .data(nameAngle.domain())
  .join("path")
    .attr("d", d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle((d) => nameAngle(d))
        .endAngle((d) => nameAngle(d) + nameAngle.bandwidth()))
    .attr("fill", (d) => gramColor(antibiotics.find((b) => b.bacteria === d).gram));

// Antibiotics wedges.
svg.append("g")
  .selectAll()
  .data(antibiotics)
  .join("path")
    .attr("d", d3.arc()
        .innerRadius(innerRadius)
        .outerRadius((d) => radius(d.mic))
        .startAngle((d) => nameAngle(d.bacteria) + drugAngle(d.drug))
        .endAngle((d) => nameAngle(d.bacteria) + drugAngle(d.drug) + drugAngle.bandwidth()))
    .attr("fill", (d) => drugColor(d.drug));

// Radial grid lines.
svg.append("g")
    .attr("fill", "none")
    .attr("stroke", "#eee")
  .selectAll()
  .data(d3.range(-3, 4))
  .join("circle")
    .attr("r", (i) => radius(Math.pow(10, i)));

// Radial grid line labels.
svg.append("g")
  .selectAll()
  .data(d3.range(-3, 3))
  .join("text")
    .attr("y", (i) => -radius(Math.pow(10, i)))
    .attr("dy", "0.32em")
    .attr("text-anchor", "middle")
    .text((i) => Math.pow(10, i).toFixed((i > 0) ? 0 : -i));

// Angular grid lines (with an extra line for the first section).
svg.append("g")
    .attr("fill", "none")
    .attr("stroke", "black")
  .selectAll()
  .data([nameAngle.domain()[0]].concat(nameAngle.domain()))
  .join("path")
    .attr("d", d3.arc()
        .innerRadius(innerRadius - 10)
        .outerRadius(outerRadius + 10)
        .startAngle((d, i) => nameAngle(d) + (i ? nameAngle.bandwidth() : 0))
        .endAngle((d, i) => nameAngle(d) + (i ? nameAngle.bandwidth() : 0)));

// Bacteria labels.
svg.append("g")
  .selectAll()
  .data(nameAngle.domain())
  .join("text")
    .attr("text-anchor", "middle")
    .attr("dy", "0.32em")
    .attr("transform", (d) => {
      const r = outerRadius + 10;
      const a = nameAngle(d) + nameAngle.bandwidth() / 2;
      return `
        translate(${d3.pointRadial(a, r)})
        rotate(${a * 180 / Math.PI + (a > Math.PI ? 90 : -90)})
      `;
    })
    .text((d) => d);

// Antibiotic legend.
svg.append("g")
    .style("text-transform", "capitalize")
  .selectAll()
  .data(drugColor.domain())
  .join("g")
    .attr("transform", (d, i) => `translate(0,${i * 18 - 22})`)
    .call((g) => g.append("rect")
        .attr("x", -39)
        .attr("y", -6)
        .attr("width", 36)
        .attr("height", 12)
        .attr("fill", drugColor))
    .call((g) => g.append("text")
        .attr("x", 6)
        .attr("dy", "0.32em")
        .text((d) => d));

// Gram legend.
svg.append("g")
    .attr("transform", `translate(0,${outerRadius + 120})`)
  .selectAll()
  .data(gramColor.domain())
  .join("g")
    .attr("transform", (d, i) => `translate(0,${i * 18})`)
    .call((g) => g.append("circle")
        .attr("cx", -12)
        .attr("r", 6)
        .attr("fill", gramColor))
    .call((g) => g.append("text")
        .attr("x", 6)
        .attr("dy", "0.32em")
        .text((d) => `Gram-${d}`));

// Return the SVG element.
display(svg.node());
```

```js echo
const antibiotics = [
  {bacteria: "Mycobacterium tuberculosis", penicillin: 800, streptomycin: 5, neomycin: 2, gram: "negative"},
  {bacteria: "Salmonella schottmuelleri", penicillin: 10, streptomycin: 0.8, neomycin: 0.09, gram: "negative"},
  {bacteria: "Proteus vulgaris", penicillin: 3, streptomycin: 0.1, neomycin: 0.1, gram: "negative"},
  {bacteria: "Klebsiella pneumoniae", penicillin: 850, streptomycin: 1.2, neomycin: 1, gram: "negative"},
  {bacteria: "Brucella abortus", penicillin: 1, streptomycin: 2, neomycin: 0.02, gram: "negative"},
  {bacteria: "Pseudomonas aeruginosa", penicillin: 850, streptomycin: 2, neomycin: 0.4, gram: "negative"},
  {bacteria: "Escherichia coli", penicillin: 100, streptomycin: 0.4, neomycin: 0.1, gram: "negative"},
  {bacteria: "Salmonella (Eberthella) typhosa", penicillin: 1, streptomycin: 0.4, neomycin: 0.008, gram: "negative"},
  {bacteria: "Aerobacter aerogenes", penicillin: 870, streptomycin: 1, neomycin: 1.6, gram: "negative"},
  {bacteria: "Brucella antracis", penicillin: 0.001, streptomycin: 0.01, neomycin: 0.007, gram: "positive"},
  {bacteria: "Streptococcus fecalis", penicillin: 1, streptomycin: 1, neomycin: 0.1, gram: "positive"},
  {bacteria: "Staphylococcus aureus", penicillin: 0.03, streptomycin: 0.03, neomycin: 0.001, gram: "positive"},
  {bacteria: "Staphylococcus albus", penicillin: 0.007, streptomycin: 0.1, neomycin: 0.001, gram: "positive"},
  {bacteria: "Streptococcus hemolyticus", penicillin: 0.001, streptomycin: 14, neomycin: 10, gram: "positive"},
  {bacteria: "Streptococcus viridans", penicillin: 0.005, streptomycin: 10, neomycin: 40, gram: "positive"},
  {bacteria: "Diplococcus pneumoniae", penicillin: 0.005, streptomycin: 11, neomycin: 10, gram: "positive"}
].flatMap((d) => [
  "penicillin",
  "streptomycin",
  "neomycin"
].map((drug) => ({
  drug,
  mic: d[drug],
  bacteria: d.bacteria,
  gram: d.gram
})));
```
