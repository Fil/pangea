---
index: true
source: https://observablehq.com/@fil/perturbed-geodesic-rainbow
---

# Geodesic voronoi

Compute the [Geodesic Rainbow](./geodesic-rainbow) as the [Spherical Voronoi diagram](https://github.com/Fil/d3-geo-voronoi) of its faces’ centroids. Then perturbate those centers with Brownian motion.


```js echo
const context = context2d(width, height);
const faces = geodesic(subdivision);
const path = d3.geoPath().projection(projection).context(context).pointRadius(1.5);

function update(t) {
  projection.rotate([t / 200, -40]);

  context.clearRect(0, 0, width, height);

  for (const point of points) perturbate(point);

  geoVoronoi(points).polygons().features.forEach((p, i) => {
    context.beginPath();
    path(p);
    context.strokeStyle = context.fillStyle = points[i][2];
    context.fill(), context.stroke();
  });

  context.beginPath();
  path({type: "MultiPoint", coordinates: points});
  context.fillStyle = "black";
  context.fill();
}

display(context.canvas);
```

```js
const subdivision = view(Inputs.range([1, 16], {
  value: 8,
  step: 1,
  label: "subdivision"
}));
```

```js
update(now);
```

```js echo
const points = geodesic(subdivision)
  .map((d) => d3.geoCentroid({ type: "MultiPoint", coordinates: d }))
  .map((d) => [d[0], d[1], d3.interpolateRainbow(d[0] / 360)]);
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
const random = d3.randomNormal.source(d3.randomLcg(42))(0, 0.005);
function perturbate(point) {
  // TODO: there must be a simpler formula
  const d = cartesian(point.map(d => d * radians));
  cartesianAddInPlace(d, [random(), random(), random()]);
  cartesianNormalizeInPlace(d);
  const s = spherical(d);
  point[0] = s[0] * degrees;
  point[1] = s[1] * degrees;
}
```

```js echo
import {context2d} from "/components/DOM.js";
```

```js echo
import {cos, degrees, radians} from "/components/math.js";
import {cartesian, cartesianAddInPlace, cartesianNormalizeInPlace, spherical} from "/components/cartesian.js";
```

```js echo
import {geoVoronoi} from "npm:d3-geo-voronoi@2";
```
