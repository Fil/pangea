---
source: https://observablehq.com/@d3/hertzsprung-russell-diagram
author: Mike Bostock
index: true
title: "Plot: Hertzsprung–Russell diagram"
---

# Hertzsprung–Russell diagram

<p class=author>by <a href="https://observablehq.com/@mbostock">Mike Bostock</a></p>

An [HR diagram](https://en.wikipedia.org/wiki/Hertzsprung–Russell_diagram) plots the relationship between stars’ absolute magnitudes (brighter going up) and temperatures (warmer going left). For the large set of stars below, it effectively shows how [stars age over time](https://en.wikipedia.org/wiki/Stellar_evolution). Data: [Hipparcos](http://cdsarc.u-strasbg.fr/viz-bin/cat/I/311), [Gliese](http://cdsarc.u-strasbg.fr/viz-bin/cat/V/70A)

<div style="background: black; color: white; --theme-background: black;">

```js
chart()
```

</div>

The catalog data is loaded from a CSV file:

```js
data
```

```js echo
const data = FileAttachment("/data/catalog.csv").csv({typed: true});
```

See [this helper notebook](https://observablehq.com/d/e697f4807166cbd9) for the source data.

The function below returns the chart: 

```js echo
function chart() {
  return Plot.plot({
    width,
    height: Math.round(width * 1.2),
    margin: 40,
    marginLeft: 60,
    marginRight: 60,
    x: {domain:[-0.39, 2.19]},
    y: {domain:[-7, 19], reverse: true},
    color: {type: "identity", transform: bv2rgb},
    marks: [
      Plot.axisX({
        label: "← blue                         red →",
        labelAnchor: "center",
        labelOffset: -7,
        tickFormat: "+.1s"
      }),
      Plot.axisX([], {
        anchor: "bottom",
        fontWeight: "bold",
        fontSize: 11,
        label: "Color B-V",
        labelAnchor: "center",
        labelArrow: null,
        labelOffset: -7
      }),
      Plot.axisX([3500, 4000, 5000, 6000, 7500, 10000], {
        x: color,
        anchor: "top",
        label: "← hotter                                     colder →",
        labelAnchor: "center",
        labelArrow: null,
        labelOffset: -8,
        tickFormat: ",d"
      }),
      Plot.axisX([], {
        anchor: "top",
        fontWeight: "bold",
        fontSize: 11,
        label: "temperature (K)",
        labelAnchor: "center",
        labelArrow: null,
        labelOffset: -7
      }),
      Plot.axisY({
        anchor: "right",
        label: "← darker                                                       brighter →",
        labelAnchor: "center",
        ticks: 10,
        labelOffset: -11,
        tickFormat: "+d"
      }),
      Plot.axisY([], {
        anchor: "right",
        fontWeight: "bold",
        fontSize: 11,
        labelArrow: null,
        label: "Absolute magnitude M",
        labelAnchor: "center",
        ticks: 10,
        labelOffset: -12,
        tickFormat: "+d"
      }),
      Plot.axisY(d3.range(-7, 19, 2).map(d => 10 ** (3 - d)), {
        y: magnitude,
        tickFormat: d3.format(".0~s"), // 🌶 why not ".0~s"?
        label: "← darker                                      brighter →",
        labelAnchor: "center",
        labelOffset: -12,
        anchor: "left"
      }),
      Plot.axisY([], {
        y: magnitude,
        fontWeight: "bold",
        fontSize: 11,
        labelArrow: null,
        label: "Luminosity L☉",
        labelAnchor: "center",
        labelOffset: -12,
        anchor: "left"
      }),
      Plot.dot(data, {
        x: "color",
        y: "absolute_magnitude",
        fill: "color",
        symbol: "square",
        r: 0.35
      }),
      hair({
        tickFormatX: "+.2f",
        tickFormatX2: (color) => Math.round(temperature(color)).toLocaleString("en"),
        tickFormatY: (magnitude) => d3.format(".2~s")(luminosity(magnitude)),
        tickFormatY2: "+.2f",
        strokeOpacity: 0.5,
        interval: 0.01
      })
    ]
  });
}
```

```js echo
function bv2rgb(bv) {
  bv = Math.max(-0.4, Math.min(2, bv));
  let t;
  return `#${[
    bv < 0 ? ((t = (bv + 0.4) / 0.4), 0.61 + 0.11 * t + 0.1 * t * t)
      : bv < 0.4
      ? ((t = bv / 0.4), 0.83 + 0.17 * t)
      : 1,
    bv < 0 ? ((t = (bv + 0.4) / 0.4), 0.7 + 0.07 * t + 0.1 * t * t)
      : bv < 0.4
      ? ((t = bv / 0.4), 0.87 + 0.11 * t)
      : bv < 1.6
      ? ((t = (bv - 0.4) / 1.2), 0.98 - 0.16 * t)
      : ((t = (bv - 1.6) / 0.4), 0.82 - 0.5 * t * t),
    bv < 0.4
      ? 1
      : bv < 1.5
      ? ((t = (bv - 0.4) / 1.1), 1 - 0.47 * t + 0.1 * t * t)
      : bv < 1.94
      ? ((t = (bv - 1.5) / 0.44), 0.63 - 0.6 * t * t)
      : 0
  ]
    .map((t) =>
      Math.round(t * 255)
        .toString(16)
        .padStart(2, "0")
    )
    .join("")}`;
}
```

```js echo
function temperature(color) {
  return 4600 * (1 / (0.92 * color + 1.7) + 1 / (0.92 * color + 0.62));
}

function color(temperature) {
  const u = 8464 / temperature;
  return (u - 2.1344 + Math.hypot(0.9936, u)) / 1.6928;
}

function magnitude(luminosity) {
  return 4.83 - Math.log10(luminosity);
}

function luminosity(magnitude) {
  return 10 ** (4.83 - magnitude);
}
```

```js echo
import {hair} from "/components/plot-continuous-crosshair.js";
```