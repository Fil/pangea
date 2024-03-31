---
index: true
---

# deck.gl map

This page combines a [HexagonLayer](https://deck.gl/examples/hexagon-layer) and a [GeoJsonLayer](https://github.com/visgl/deck.gl/blob/9.0-release/examples/get-started/pure-js/basic/app.js). See [deck.gl point cloud](./deck.gl) for a different example.

```js echo
const container = display(html`<div id="container" style="background: black; height: 700px"></div>`);

new DeckGL({
  container,
  initialViewState: INITIAL_VIEW_STATE,
  controller: true,
  effects,
  layers
});
```

```js echo
import deck from "npm:deck.gl";

const {DeckGL, AmbientLight, GeoJsonLayer, HexagonLayer, PointLight, LightingEffect} = deck;

const COUNTRIES = "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_scale_rank.geojson";

const radius = 1000;
const upperPercentile = 100;
const coverage = 1;

const material = {
  ambient: 0.64,
  diffuse: 0.6,
  shininess: 32,
  specularColor: [51, 51, 51]
};

const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78]
];

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0
});

const pointLight1 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-0.144528, 49.739968, 80000]
});

const pointLight2 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-3.807751, 54.104682, 8000]
});

const effects = [new LightingEffect({ambientLight, pointLight1, pointLight2})];

const layers = [
  new GeoJsonLayer({
    id: "base-map",
    data: COUNTRIES,
    // Styles
    stroked: true,
    filled: false,
    lineWidthMinPixels: 2,
    opacity: 0.4,
    getLineColor: [60, 60, 60]
  }),
  new HexagonLayer({
    id: "heatmap",
    colorRange,
    coverage,
    data,
    elevationRange: [0, 3000],
    elevationScale: data && data.length ? 50 : 0,
    extruded: true,
    getPosition: (d) => d,
    pickable: true,
    radius,
    upperPercentile,
    material,
    transitions: {
      elevationScale: 3000
    }
  })
];

const INITIAL_VIEW_STATE = {
  longitude: -1.415727,
  latitude: 52.232395,
  zoom: 6.6,
  minZoom: 5,
  maxZoom: 15,
  pitch: 40.5,
  bearing: -5
};
```

```js echo
const data = d3.csv(
  "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv",
  (d) => [Number(d.lng), Number(d.lat)]
);
```
