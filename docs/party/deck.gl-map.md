---
index: true
theme: dashboard
---

# deck.gl map

This page combines a [HexagonLayer](https://deck.gl/examples/hexagon-layer) and a [GeoJsonLayer](https://github.com/visgl/deck.gl/blob/9.0-release/examples/get-started/pure-js/basic/app.js). See [deck.gl point cloud](./deck.gl) for a different example.

<div style="width: 100%; position: relative;">

<div class=card style="max-width: 270px; position: absolute; top:0; margin-left: 14px; right:14px; z-index:1;">

# UK Road Safety

## Personal injury road accidents from 1979

# ${d3.format(".4s")(data.length)} ACCIDENTS

${colorLegend}

<div style="font-size: small; text-align: right; font-style: italic;"><a href="https://www.data.gov.uk/">data.gov.uk</a></div>

```js
const radius = view(Inputs.range([500, 20000], {value: 1000, label: "radius", step: 100}));
const coverage = view(Inputs.range([0, 1], {value: 1, label: "coverage", step: 0.01}));
const upperPercentile = view(Inputs.range([0, 100], {value: 100, label: "upper percentile", step: 1}));
const replay = view(Object.assign(Inputs.button("↻"), {style: "position: absolute; right: 14px; width: 2em;"}));
```

</div>

<div id="container" style="background: #000; height: 800px; width: 100%;"></div>

</div>

```js
const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78]
];

const colorLegend = Plot.plot({
  margin: 0,
  marginTop: 20,
  width: 270,
  height: 35,
  x: {padding: 0, round: false, axis: null},
  marks: [
    Plot.cellX(colorRange, {fill: ([r, g, b]) => `rgb(${r},${g},${b})`}),
    Plot.text(["Fewer"], {frameAnchor: "top-left", dy: -12}),
    Plot.text(["More"], {frameAnchor: "top-right", dy: -12})
  ]
});
```

```js
const transition =
  (replay,
  Generators.queue((notify) => {
    const duration = 900;
    const delay = 500;
    const t = d3.timer((elapsed) => {
      if (elapsed > duration) t.stop();
      notify(d3.easeCubicInOut(elapsed / duration));
    }, delay);
  }));
```

```js
container.innerHTML = "";
const deckInstance = new DeckGL({
  container,
  initialViewState,
  controller: true,
  effects,
  getTooltip: ({object}) => {
    if (!object) return null;
    const [lng, lat] = object.position;
    const count = object.points.length;
    return `\
    latitude: ${lat.toFixed(2)}
    longitude: ${lng.toFixed(2)}
    ${count} accidents
  `;
  }
});

invalidation.then(() => deckInstance.finalize());
```

```js
deckInstance.setProps({
  layers: [
    new GeoJsonLayer({
      id: "base-map",
      data: countries,
      lineWidthMinPixels: 1,
      getLineColor: [60, 60, 60]
    }),
    new HexagonLayer({
      id: "heatmap",
      colorRange,
      coverage,
      data,
      elevationScale: 50,
      elevationRange: [0, 3000 * transition],
      extruded: true,
      getPosition: (d) => d,
      pickable: true,
      radius,
      upperPercentile,
      material
    })
  ]
});
```

```js
// import {DeckGL, AmbientLight, GeoJsonLayer, HexagonLayer, LightingEffect, PointLight} from "npm:deck.gl"; doesn't work
import deck from "npm:deck.gl";
const {DeckGL, AmbientLight, GeoJsonLayer, HexagonLayer, LightingEffect, PointLight} = deck;
```

```js
const material = {ambient: 0.64, diffuse: 0.6, shininess: 32, specularColor: [51, 51, 51]};

const ambientLight = new AmbientLight({color: [255, 255, 255], intensity: 1.0});

const pointLight1 = new PointLight({color: [255, 255, 255], intensity: 0.8, position: [-0.144528, 49.739968, 80000]});

const pointLight2 = new PointLight({color: [255, 255, 255], intensity: 0.8, position: [-3.807751, 54.104682, 8000]});

const effects = [new LightingEffect({ambientLight, pointLight1, pointLight2})];

const initialViewState = {
  longitude: -2,
  latitude: 53.5,
  zoom: 5.7,
  minZoom: 5,
  maxZoom: 15,
  pitch: 40.5,
  bearing: -5
};
```

```js
const data = FileAttachment("/data/uk-accidents.csv").csv({array: true, typed: true});
```

```js
const topo = import.meta.resolve("npm:visionscarto-world-atlas/world/50m.json");
const world = await fetch(topo).then((response) => response.json());
const countries = topojson.feature(world, world.objects.countries);
```
