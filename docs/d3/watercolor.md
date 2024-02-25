---
index: false
status: draft
---

```js
md`
# Watercolor

Some pseudo-watercolor effects with blurs, thresholds, and fractal noise.
`;
```

```js
{
  const svg = DOM.svg(960, 600);

  const defs = d3.select(svg).attr("class", "watercolor").append("defs");

  const splotch = DOM.uid("splotch");

  const path = d3.geoPath();

  defs
    .append("filter")
    .attr("id", splotch.id)
    .html(
      `${
        noise
          ? `<feTurbulence
        type="fractalNoise"
        baseFrequency="${noise}"
        numOctaves="4"
    ></feTurbulence>
    <feColorMatrix
        values="0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 -0.9 1.2"
        result="texture"
    ></feColorMatrix>
    <feComposite
        in="SourceGraphic"
        in2="texture"
        operator="in"
    ></feComposite>`
          : ``
      }<feGaussianBlur stdDeviation="${blur}"></feGaussianBlur>`
    );

  // Generate Observable-friendly IDs
  states.forEach((d, i) => {
    d.filterUid = DOM.uid("filter" + i);
  });

  const groups = d3
    .select(svg)
    .selectAll(".state")
    .data(states)
    .enter()
    .append("g")
    .attr("class", "state")
    .attr("filter", splotch);

  const paths = groups
    .append("path")
    .attr("d", path)
    .attr("fill", (d) => d.properties.color)
    .attr("stroke", (d) => d.properties.color)
    .attr("stroke-width", strokeWidth)
    .attr("filter", (d) => d.filterUid);

  if (drawMesh) {
    const pencil = DOM.uid("pencil");
    defs.append("filter").attr("id", pencil.id)
      .html(`<feTurbulence baseFrequency="0.03" numOctaves="6" type="fractalNoise" />
      <feDisplacementMap scale="4" in="SourceGraphic" xChannelSelector="R" yChannelSelector="G" />
      <feGaussianBlur stdDeviation="0.5" />`);

    d3.select(svg)
      .append("g")
      .attr("class", "mesh")
      .attr("filter", pencil)
      .append("path")
      .attr("d", mesh.map(spline).join(""));
  }

  defs
    .selectAll(".state")
    .data(states)
    .enter()
    .append("filter")
    .attr("id", (d) => d.filterUid.id)
    .html(
      (d) =>
        `<feGaussianBlur
         in="SourceGraphic"
         stdDeviation="${blurScale(path.area(d))}"
         result="blur"
     ></feGaussianBlur>
     <feColorMatrix
         in="blur"
         type="matrix"
         values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
         result="threshold"
     ></feColorMatrix>
     <feComposite
         in="SourceGraphic"
         in2="threshold"
         operator="atop"
     ></feComposite>`
    );

  return svg;
}
```

```js
const randomize = view(button("Randomize colors"));
```

```js
viewof palette = select({
  title: "Color palette",
  options: [
    "Wes Anderson",
    "Blues",
    "verena",
    "iiso_daily",
    "iiso_zeitung",
    "present-correct",
    "rag-taj",
    "rag-mysore"
  ]
})
```

```js
viewof drawMesh = checkbox([
  { value: "drawMesh", label: "Draw pencil outlines" }
])
```

```js
viewof deviation = slider({
  min: 0,
  max: 5,
  step: 0.5,
  value: 2,
  title: "Shape deviation"
})
```

```js
viewof strokeWidth = slider({
  min: 0,
  max: 8,
  step: 0.1,
  value: 3.5,
  title: "Stroke width"
})
```

```js
viewof blur = slider({
  min: 0,
  max: 5,
  step: 0.1,
  value: 0.8,
  title: "Outer blur amount"
})
```

```js
viewof noise = slider({
  min: 0,
  max: 0.03,
  value: 0.01,
  precision: 3,
  title: "Fractal noise"
})
```

```js
md`
## See also

[Oil paint](https://observablehq.com/@veltman/scribble-paint)  
[Pencil/watercolor map style](https://bl.ocks.org/veltman/2f2aa947772afa095a620dfe5e5486cb)  
[Tyler Hobbs' generative watercolor](https://tylerxhobbs.com/essays/2017/a-generative-approach-to-simulating-watercolor-paints)
`;
```

```js
md`
## Appendix
`;
```

```js
const simplification = 1.8;
```

```js
const tension = 0.6;
```

```js
const blurScale = d3
  .scaleLinear()
  .domain([0, 2000])
  .range([deviation, deviation * 3.5])
  .clamp(true);
```

```js
const spline = d3.line().curve(d3.curveCardinal.tension(tension));
```

```js
const palettes = {
  "Wes Anderson": ["#ff4848", "#00cdb1", "#ffc638", "#ffa641", "#a0d8e7"],
  Blues: ["#0c96da", "#be98ad", "#77d7e3", "#f4cdcd", "#01ccd9", "#f4e2c6"],
  "rag-taj": ["#73d5c1", "#e29ba0", "#ba1e6b", "#ffbe45"],
  "rag-mysore": ["#e8ac52", "#639aa0", "#ec6c26", "#613a53"],
  iiso_zeitung: ["#f3df76", "#00a9c0", "#f7ab76", "#ee8067"],
  "present-correct": ["#fe7646", "#ffbb51", "#7356ac", "#fe737a", "#a0ccbb"],
  verena: ["#936ead", "#3e78e1", "#f37265", "#f6bc25", "#16b069"],
  iiso_daily: ["#7f8cb6", "#f0d967", "#ef9640", "#1daeb1", "#e76c4a"]
};
```

```js
const states = {
  randomize;
  const states = topojson.feature(us, us.objects.states).features;
  const neighbors = topojson.neighbors(us.objects.states.geometries);
  const colors = d3.shuffle(palettes[palette].slice(0));

  states.forEach((d, i) => {
    const color =
      colors.find(
        c => !neighbors[i].some(n => states[n].properties.color === c)
      ) || colors[0];

    colors.push(colors.shift());

    d.properties.color = color;
  });

  return states;
}
```

```js
const mesh = {
  return topojson
    .mesh(us, us.objects.states)
    .coordinates.map(line =>
      simplify(line.map(d => ({ x: d[0], y: d[1] })), simplification, true).map(
        d => [d.x, d.y]
      )
    );
}
```

```js
const us = await d3.json("https://unpkg.com/us-atlas@1/us/10m.json");
```

```js
const simplify = require("simplify-js@1");
```

```js
const d3 = require("d3@5");
```

```js
const topojson = require("topojson-client@3");
```

```js
import {checkbox, button, select, slider} from "@jashkenas/inputs";
```

```js
html`<style>
  .watercolor * {
    mix-blend-mode: multiply;
  }
  .mesh {
    stroke: #777;
    fill: none;
    opacity: 0.8;
    stroke-width: 2px;
    stroke-linejoin: round;
  }
  .watercolor {
    width: 100%;
    height: auto;
  }
</style>`;
```
