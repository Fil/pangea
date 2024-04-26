---
index: true
---

# deck.gl point cloud

[deck.gl](https://deck.gl/) is a GPU-powered framework for visual exploratory data analysis of large datasets. The example below uses a [PointCloudLayer](https://deck.gl/gallery/point-cloud-layer). See [deck.gl map](./deck.gl-map) for a GeoJSON+hexagon example.

```js echo
const container = display(html`<div id="container" style="background: black; height: 700px"></div>`);
```

```js echo
import deck from "npm:deck.gl";
```

```js echo
const {DeckGL, OrbitView, PointCloudLayer, COORDINATE_SYSTEM} = deck;

// 100k points
const SAMPLE_SIZE = 1e5;
const SURFACE_EQUATION = (x, y) => (Math.sin(x * x + y * y) * x) / Math.PI;
const EPSILON = 1e-4;

const points = [];
const dim = Math.sqrt(SAMPLE_SIZE);

function getPosition(u, v) {
  const x = (u - 1 / 2) * Math.PI * 2;
  const y = (v - 1 / 2) * Math.PI * 2;
  const z = SURFACE_EQUATION(x, y);

  return [x, y, z];
}

function getNormal(u, v) {
  const p0 = getPosition(u - EPSILON, v - EPSILON);
  const p1 = getPosition(u + EPSILON, v + EPSILON);

  const nx = (p1[1] - p0[1]) * (p1[2] - p0[2]);
  const ny = (p1[2] - p0[2]) * (p1[0] - p0[0]);
  const nz = (p1[0] - p0[0]) * (p1[1] - p0[1]);

  return [nx, ny, nz];
}

for (let i = 0; i < dim; i++) {
  for (let j = 0; j < dim; j++) {
    const u = i / (dim - 1);
    const v = j / (dim - 1);

    const p = getPosition(u, v);
    const n = getNormal(u, v);
    points.push({position: p, color: [u * 128, v * 128, p[2] * 255]});
  }
}

new DeckGL({
  container,
  views: [new OrbitView()],
  initialViewState: {rotationX: 45, rotationOrbit: -45, zoom: 5},
  controller: true,
  layers: [
    new PointCloudLayer({
      id: "pointCloud",
      data: points,
      getPosition: (d) => d.position,
      getNormal: (d) => d.normal,
      getColor: (d) => d.color,
      pointSize: 1
    })
  ]
});
```
