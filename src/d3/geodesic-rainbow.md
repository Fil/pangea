---
index: true
source: https://observablehq.com/@mbostock/geodesic-rainbow
author: Mike Bostock
---

# Geodesic rainbow

```js
const subdivision = view(Inputs.range([1, 16], {
  value: 8,
  step: 1,
  label: "subdivision"
}));
```

```js echo
const context = context2d(width, height);
const faces = geodesic(subdivision);

function drawTriangle([p0, p1, p2]) {
  context.moveTo(...p0);
  context.lineTo(...p1);
  context.lineTo(...p2);
  context.closePath();
}

function update(t) {
  projection.rotate([t / 200, -40]);
  const triangles = faces
      .map((d, i) => (d = d.map(projection), d.index = i, d))
      .filter(d => d3.polygonArea(d) < 0);

  context.clearRect(0, 0, width, height);
  for (const t of triangles) {
    context.beginPath();
    drawTriangle(t);
    context.fillStyle = d3.interpolateRainbow(faces[t.index][0][0] / 360);
    context.fill();
  }

  context.beginPath();
  for (const t of triangles) drawTriangle(t);
  context.stroke();
}

display(context.canvas);
```

```js
update(now);
```

```js echo
const height = Math.min(width, 640);
const projection = d3.geoOrthographic()
    .rotate([0, -40])
    .translate([width / 2, height / 2])
    .fitExtent([[2, 2], [width - 2, height - 2]], {type: "Sphere"})
```

```js echo
const φ = 1.618033988749895;
const ρ = 180 / Math.PI;

const vertices = [
  [1,φ,0], [-1,φ,0], [1,-φ,0], [-1,-φ,0],
  [0,1,φ], [0,-1,φ], [0,1,-φ], [0,-1,-φ],
  [φ,0,1], [-φ,0,1], [φ,0,-1], [-φ,0,-1]
];

const faces = [
  [0,1,4],  [1,9,4],  [4,9,5],  [5,9,3],  [2,3,7],
  [3,2,5],  [7,10,2], [0,8,10], [0,4,8],  [8,2,10],
  [8,4,5],  [8,5,2],  [1,0,6],  [11,1,6], [3,9,11],
  [6,10,7], [3,11,7], [11,6,7], [6,0,10], [9,1,11]
].map(face => face.map(i => vertices[i]));

function interpolate([x0, y0, z0], [x1, y1, z1], t) {
  return [
    x0 + t * (x1 - x0),
    y0 + t * (y1 - y0),
    z0 + t * (z1 - z0)
  ];
}

function project([x, y, z]) {
  return [
    Math.atan2(y, x) * ρ,
    Math.acos(z / Math.sqrt(x * x + y * y + z * z)) * ρ - 90
  ];
}

function geodesic(n) {
  n = n | 0;
  const subfaces = [];
  for (const [f0, f1, f2] of faces) {
    let f10, f20 = interpolate(f0, f1, 1 / n);
    let f11, f21 = interpolate(f0, f2, 1 / n);
    subfaces.push([f0, f20, f21]);
    for (let i = 1; i < n; ++i) {
      f10 = f20, f20 = interpolate(f0, f1, (i + 1) / n);
      f11 = f21, f21 = interpolate(f0, f2, (i + 1) / n);
      for (let j = 0; j <= i; ++j) {
        subfaces.push([
          interpolate(f10, f11, j / i),
          interpolate(f20, f21, j / (i + 1)),
          interpolate(f20, f21, (j + 1) / (i + 1))
        ]);
      }
      for (let j = 0; j < i; ++j) {
        subfaces.push([
          interpolate(f10, f11, j / i),
          interpolate(f20, f21, (j + 1) / (i + 1)),
          interpolate(f10, f11, (j + 1) / i)
        ]);
      }
    }
  }
  return subfaces.map(f => f.map(project));
};
```

```js echo
import {context2d} from "/components/DOM.js";
```