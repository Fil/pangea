---
index: true
---

# UK Bivariate Map

Inspired by Muhammad Mohsin Raza’s [Creating Professional Bivariate Maps in R](https://www.datawim.com/post/creating-professional-bivariate-maps-in-r/) article, let’s see how to reproduce it with Observable Plot.

```js
display(map);
```

First, we need some data. We follow the [guide](https://climate.northwestknowledge.net/TERRACLIMATE/TERRACLIMATE_GRIDMET_guidance.php) to find the proper way to download [NetCDF](https://en.wikipedia.org/wiki/NetCDF) files from the University of Idaho’s TerraClimate repository. This happens in a [parameterized data loader](https://observablehq.com/framework/params), which retrieves one file for each dimension (ppt — precipitation; tmin, tmax — minimum and maximum temperatures).

```sh
var=${1#--variable=}
LAT_MIN=49.674
LON_MIN=-14.015517
LAT_MAX=61.061
LON_MAX=2.0919117

curl -f "http://thredds.northwestknowledge.net:8080/thredds/ncss/agg_terraclimate_${var}_1958_CurrentYear_GLOBE.nc?var=${var}&south=${LAT_MIN}&north=${LAT_MAX}&west=${LON_MIN}&east=${LON_MAX}&disableProjSubset=on&addLatLon=true&horizStride=1&accept=netcdf"
```

Loading these files, we parse them as NetCDF and extract their values into two arrays (`temp`, the mean of `tmin` and `tmax`; and `ppt`). The longitude and latitude of each data point is also derived from these files.

```js echo
import {NetCDFReader} from "npm:netcdfjs";

function cdf(buffer) {
  return new NetCDFReader(buffer);
}

const _tmax = FileAttachment("/climate/tmax.nc").arrayBuffer().then(cdf);
const _tmin = FileAttachment("/climate/tmin.nc").arrayBuffer().then(cdf);
const _ppt = FileAttachment("/climate/ppt.nc").arrayBuffer().then(cdf);
```

```js echo
const tmax = Float32Array.from(_tmax.getDataVariable("tmax"), d => d !== -32768 ? d * 0.01 - 99 : NaN);
const tmin = Float32Array.from(_tmin.getDataVariable("tmin"), d => d !== -32768 ? d * 0.01 - 99 : NaN);
const ppt = Float32Array.from(_ppt.getDataVariable("ppt"), d => d !== -2147483648 ? d * 0.1 : NaN).map(d => d < 10 ? NaN : d);

const lx = _tmax.getDataVariable("lon");
const ly = _tmax.getDataVariable("lat");
const l = lx.length;

const temp = tmax.map((max, i) => (max + tmin[i]) / 2);
const lon = (d, i) => lx[i % l];
const lat = (d, i) => ly[i/ l | 0];
```

We also need an outline of the land, and a (not yet released) version of Plot that can to clip marks based on that outline:

```js echo
const land = fetch(
  import.meta.resolve("npm:world-atlas@2/countries-10m.json")
)
  .then((response) => response.json())
  .then((world) => topojson.feature(world, {
    type: "GeometryCollection",
    // Maldives has a wrong winding order.
    geometries: world.objects.countries.geometries
      .filter(({properties: {name}}) => name !== "Maldives")
  }));

import * as Plot from "./plot.js"
```

The bivariate color scale takes _n_ quantiles of temperature and _n_ quantiles of precipitation; it maps _n_ &times; _n_ numbers to the same number of blended colors, organized in a matrix:

```js echo
const n = 5;
```

```js echo
// like mix-blend-mode: multiply, but tweaked a bit
function mixblend(a, b) {
  a = d3.rgb(a);
  b = d3.rgb(b);
  const l = Math.min(250, b.r + b.g + b.b);
  a.r *= b.r / l;
  a.g *= b.g / l;
  a.b *= b.b / l;
  return a.hex();
}

const color = {
  domain: d3.range(n * n),
  range: d3.range(n * n)
    .map((i) => mixblend(
      d3.schemeOranges[n + 1][i % n],
      d3.schemeBlues[n + 1][i / n | 0],
    )
  )
};
```

For example, if a data point belongs to the third quantile (2) of variable A and the second quantile (1) of variable B, its color index is 2 &times; n + 1.

The color matrix is shown below—in a mini-chart that will be used as a legend.

```js echo
const legend = () =>
  Plot.plot({
    color,
    axis: null,
    margin: 0,
    inset: 18,
    width: 136,
    height: 136,
    y: {reverse: true},
    marks: [
      Plot.cell(d3.cross(d3.range(n), d3.range(n)), {
        x: ([a, b]) => a,
        y: ([a, b]) => b,
        fill: ([a, b]) => n * a + b,
        inset: -1,
      }),
      Plot.text(["Precipitation →"], {
        frameAnchor: "bottom-right",
        fontWeight: "bold",
        dx: -18,
        dy: -6,
      }),
      Plot.text(["← Temperature"], {
        frameAnchor: "top-left",
        fontWeight: "bold",
        rotate: 90,
        dx: 12,
        dy: 18
      })
    ]
  });

display(legend());
```

The most crucial step is the bivariate spatial interpolator — a function that computes an interpolated raster for each of the variables separately, then returns a raster of combined color index.

```js echo
function interpolateBivariate(n, v1, v2) {
  const r = d3.range(n);
  const s1 = d3.scaleQuantile(v1, r);
  const s2 = d3.scaleQuantile(v2, r);
  const interpolate = Plot.interpolatorBarycentric();
  return function(I, w, h, X, Y) {
    I = I.filter((i) => !isNaN(v1[i]) && !isNaN(v2[i]));
    const V1 = interpolate(I, w, h, X, Y, v1);
    const V2 = interpolate(I, w, h, X, Y, v2);
    return Uint8Array.from(V1, (_, i) => n * s1(V1[i]) + s2(V2[i]));
  }
}
```

We’ll set up the map projection:

```js echo
const projection = {
  type: "transverse-mercator",
  domain: {
    type:"MultiPoint",
    coordinates: [
      [-10.5, 49.5],
      [2, 49.5],
      [-10.5, 61],
      [2, 61]
    ]
  },
  rotate: [4, 0]
};
```

And finally we can create the map:

```js echo
const map = Plot.plot({
  projection,
  color,
  marks: [
    Plot.raster({length: ppt.length}, {
      x: lon,
      y: lat,
      fill: 0,
      interpolate: interpolateBivariate(n, ppt, temp),
      clip: land
    }),
    () => svg`<g style="transform: translate(0,100px)rotate(-45deg);">${legend()}`,
    Plot.geo(land, {strokeWidth: 0.25}),
  ]
})
```