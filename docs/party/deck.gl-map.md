---
index: true
---

# deck.gl map

This page combines a [HexagonLayer](https://deck.gl/examples/hexagon-layer) and a [GeoJsonLayer](https://github.com/visgl/deck.gl/blob/9.0-release/examples/get-started/pure-js/basic/app.js). See [deck.gl point cloud](./deck.gl) for a different example.

**TODO:** title, interaction, tooltips, color legend as in https://deck.gl/examples/hexagon-layer. See https://github.com/visgl/deck.gl/blob/master/website/src/examples/hexagon-layer.js

<div id="container" style="background: black; height: 700px"></div>

```js
const radius = view(Inputs.range([500, 20000], {value: 1000, label: "radius", step: 100}));
```

```js echo
hexagonLayer.props.radius = radius;
```

```html echo run=false
<div id="container" style="background: black; height: 700px"></div>
```

```js echo
const hexagonLayer = new HexagonLayer({
  id: "heatmap",
  colorRange,
  coverage,
  data,
  elevationRange: [0, 3000],
  elevationScale: data && data.length ? 50 : 0,
  extruded: true,
  getPosition: (d) => d,
  pickable: true,
  radius: 1000,
  upperPercentile,
  material,

  // TODO this doesn't seem to work
  transitions: {
    elevationScale: 3000
  }
});

display(hexagonLayer);
```

```js echo
const d = new DeckGL({
  container,
  initialViewState: INITIAL_VIEW_STATE,
  controller: true,
  effects,
  layers: [
    new GeoJsonLayer({
      id: "base-map",
      data: countries,
      stroked: true,
      filled: false,
      lineWidthMinPixels: 2,
      opacity: 0.4,
      getLineColor: [60, 60, 60]
    }),
    hexagonLayer
  ]
});

// TODO proper invalidation/update when interactive values change
invalidation.then(() => (container.innerHTML = ""));
```

```js echo
// TODO why does this not work?
// import {DeckGL, AmbientLight, GeoJsonLayer, HexagonLayer, LightingEffect, PointLight} from "npm:deck.gl";
import deck from "npm:deck.gl";
const {DeckGL, AmbientLight, GeoJsonLayer, HexagonLayer, LightingEffect, PointLight} = deck;

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
// TODO data loader
const data = d3.csv(
  "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv",
  (d) => [Number(d.lng), Number(d.lat)]
);
```

```js echo
const topo = import.meta.resolve("npm:visionscarto-world-atlas@0.1.0/world/50m.json");
const world = await fetch(topo).then((response) => response.json());
const countries = topojson.feature(world, world.objects.countries);
```
