---
index: true
---

# deck.gl map

This page combines a [HexagonLayer](https://deck.gl/examples/hexagon-layer) and a [GeoJsonLayer](https://github.com/visgl/deck.gl/blob/9.0-release/examples/get-started/pure-js/basic/app.js). See [deck.gl point cloud](./deck.gl) for a different example.

<div class=card>

# United Kingdom Road Safety

## Personal injury road accidents in GB from 1979

The layer aggregates data within the boundary of each hexagon cell

${
  Plot.plot({
    margin: 0,
    marginTop: 20,
    width: 360,
    height: 35,
    x: {padding: 0, round: false, axis: null},
    marks: [
      Plot.cellX(colorRange, {fill: ([r, g, b]) => `rgb(${r},${g},${b})`}),
Plot.text(["Fewer accidents"], {frameAnchor: "top-left", dy: -12}),
Plot.text(["More accidents"], {frameAnchor: "top-right", dy: -12}),
]
})
}

Data source: [DATA.GOV.UK](https://www.data.gov.uk/).

ACCIDENTS

# ${d3.format(".4s")(data.length)}

```js
const radius = view(Inputs.range([500, 20000], {value: 1000, label: "radius", step: 100}));
const coverage = view(Inputs.range([0, 1], {value: 1, label: "coverage", step: 0.01}));
const upperPercentile = view(Inputs.range([0, 100], {value: 100, label: "upper percentile", step: 1}));
```

</div>

<div id="container" style="background: black; height: 700px"></div>

```js
const replay = view(Inputs.button("replay"));
```

```js echo
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

```html echo run=false
<div id="container" style="background: black; height: 700px"></div>
```

```js echo
const deckInstance = new DeckGL({
  container,
  initialViewState: INITIAL_VIEW_STATE,
  controller: true,
  effects,
  getTooltip: ({object}) => {
    if (!object) return null;
    const [lng, lat] = object.position;
    const count = object.points.length;
    return `\
    latitude: ${Number.isFinite(lat) ? lat.toFixed(2) : ""}
    longitude: ${Number.isFinite(lng) ? lng.toFixed(2) : ""}
    ${count} accidents
  `;
  }
});

// TODO proper invalidation/update when interactive values change
invalidation.then(() => (container.innerHTML = ""));
```

```js echo
deckInstance.setProps({
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
    new HexagonLayer({
      id: "heatmap",
      colorRange,
      coverage,
      data,
      elevationRange: [0, 3000 * transition],
      elevationScale: data && data.length ? 50 : 0,
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

```js echo
// TODO why does this not work?
// import {DeckGL, AmbientLight, GeoJsonLayer, HexagonLayer, LightingEffect, PointLight} from "npm:deck.gl";
import deck from "npm:deck.gl";
const {DeckGL, AmbientLight, GeoJsonLayer, HexagonLayer, LightingEffect, PointLight} = deck;

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
const data = FileAttachment("/data/uk-accidents.csv").csv({array: true, typed: true});
```

```js echo
const topo = import.meta.resolve("npm:visionscarto-world-atlas/world/50m.json");
const world = await fetch(topo).then((response) => response.json());
const countries = topojson.feature(world, world.objects.countries);
```
