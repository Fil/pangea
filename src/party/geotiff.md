---
index: true
keywords: geo
source: https://observablehq.com/@d3/geotiff-contours-ii
---

# GeoTIFF contours

```js echo
const chart = Plot.plot({
  width,
  projection: "equal-earth",
  color: { scheme: "Magma" },
  marks: [
    Plot.contour(values, {
      x: (_, i) => i % n / 2,
      y: (_, i) => 90 - Math.floor(i / n) / 2,
      fill: values,
      thresholds: 30,
      stroke: "#000",
      strokeWidth: 0.25,
      clip: "sphere"
    }),
    Plot.sphere()
  ]
});

display(chart);
```

```js echo
import {fromArrayBuffer} from "npm:geotiff@2";
const tiff = await FileAttachment("/data/sfctmp.tiff").arrayBuffer().then(fromArrayBuffer);
const image = await tiff.getImage();
const n = image.getWidth();
const values = (await image.readRasters())[0];
```

