---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: LeBron James’ shots</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# LeBron James’ shots

A recreation of [Matt Stiles’](/d/d280cb30053f69a9) and [Mitchell Thorson’s](/d/db0a303ce8c90c89) basketball shot charts in [Observable Plot](/@observablehq/plot), demonstrating a custom mark to render the court markings. Based on work by [Nicholas Ortenzio](/@nor/nba-2018-19-shooting-effeciency). The [bin transform](https://observablehq.com/plot/transforms/bin) is used to produce a heatmap.

```js echo
Plot.plot({
  height: 640,
  axis: null,
  x: {domain: [-250, 250]},
  y: {domain: [-50, 450]},
  color: {type: "log", scheme: "ylgnbu", legend: true, label: "Made shots"},
  marks: [
    Plot.rect(
      shots,
      Plot.bin(
        {fill: "count"},
        {
          x: "loc_x",
          y: "loc_y",
          filter: (d) => +d.shot_made_flag,
          inset: 0,
          interval: 5
        }
      )
    ),
    Plot.gridX({interval: 5, strokeOpacity: 0.05}),
    Plot.gridY({interval: 5, strokeOpacity: 0.05}),
    markings()
  ]
});
```

```js echo
function markings({stroke = "currentColor", strokeWidth = 1, strokeOpacity = 1} = {}) {
  // Ref. https://observablehq.com/@nor/nba-2018-19-shooting-effeciency
  const angle = Math.atan(90 / 220);
  const arc = d3.arc();
  const lines = [
    [-250, 420, 250, 420], // half
    [-250, 450, -250, -50], // left
    [250, 450, 250, -50], // right
    [250, -50, -250, -50], // bottom
    [-220, -50, -220, 90], // corner 3
    [220, -50, 220, 90], // corner 3
    [-80, -50, -80, 140], // paint
    [80, -50, 80, 140], // paint
    [-60, -50, -60, 140], // paint
    [60, -50, 60, 140], // paint
    [-80, 140, 80, 140], // free throw line
    [-30, -10, 30, -10], // backboard
    [0, -10, 0, -7.5], // rim
    [-40, -10, -40, 0], // ra
    [40, -10, 40, 0] // ra
  ];
  const circles = [
    [0, 0, 7.5], // rim
    [0, 140, 60], // key
    [0, 420, 20], // center court inner
    [0, 420, 60] // center court outer
  ];
  const arcs = [
    [0, 0, 40, -Math.PI * 0.5, Math.PI * 0.5], // ra
    [0, 0, 237.5, -Math.PI * 0.5 - angle, Math.PI * 0.5 + angle] // 3pt
  ];
  return (index, {x, y}) => {
    return htl.svg`<g fill=none stroke=${stroke} stroke-width=${strokeWidth} stroke-opacity=${strokeOpacity}>
      ${lines.map(([x1, y1, x2, y2]) => htl.svg`<line x1=${x(x1)} x2=${x(x2)} y1=${y(y1)} y2=${y(y2)}>`)}
      ${circles.map(
        ([cx, cy, r]) =>
          htl.svg`<ellipse cx=${x(cx)} cy=${y(cy)} rx=${Math.abs(x(r) - x(0))} ry=${Math.abs(y(r) - y(0))}>`
      )}
      ${arcs.map(
        ([cx, cy, r, a1, a2]) =>
          htl.svg`<path d="M${x(cx + r * Math.cos(a1 - Math.PI / 2))},${y(
            cy + r * Math.sin(a1 - Math.PI / 2)
          )}A${Math.abs(x(r) - x(0))} ${Math.abs(y(r) - y(0))} 0 0 ${
            Math.sign(x(r) - x(0)) * Math.sign(y(r) - y(0)) > 0 ? 0 : 1
          } ${x(cx + r * Math.cos(a2 - Math.PI / 2))},${y(cy + r * Math.sin(a2 - Math.PI / 2))}">`
      )}
    </g>`;
  };
}
```

```js echo
const shots = FileAttachment("lebron_shots.csv").csv();
```
