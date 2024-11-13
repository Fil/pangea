---
index: true
---

# Flood spatial interpolator

Reproject a JPEG image as a raster ([#1431](https://github.com/observablehq/plot/issues/1431)). After an initial projection of the sample values, the _flood_ spatial interpolator fills each gap with the mean value of its active neighbors (top, down, left, right), if any. The procedure can be repeated a few times if the image contains large gaps (however, if you need a large _step_ count, consider the barycentric interpolator instead).

```js
const flood = view(Inputs.toggle({value: true, label: "Flood interpolation"}));
```

```js echo
Plot.plot({
  projection: "equal-earth",
  width,
  color: {scheme: "Greys", legend: true, reverse: true},
  marks: [
    Plot.raster(samples, {
      width: samples.width,
      height: samples.height,
      x1: -180,
      y1: 90,
      x2: 180,
      y2: -90,
      interpolate: flood ? interpolateFlood() : null
    })
  ]
})
```

The image below shows the same interpolator, this time with “categorical” color data (hex strings) rather than numbers:

```js echo
Plot.plot({
  projection: {type: "equal-earth", rotate: [-10, 0]},
  width,
  marks: [
    Plot.raster(pixels, {
      width: pixels.width,
      height: pixels.height,
      x1: -180,
      y1: 90,
      x2: 180,
      y2: -90,
      interpolate: flood ? interpolateFlood() : null
    })
  ]
})
```

```js echo
function interpolateFlood({steps = 1, random = d3.randomLcg(42)} = {}) {
  return (index, width, height, X, Y, V) => {
    const sample = V[index[0]];
    const mix = typeof sample === "number" || sample instanceof Date
      ? mean
      : pick(random);
    const W = Plot.interpolateNone(index, width, height, X, Y, V);
    const W2 = W.slice();
    for (let s = 0; s < steps; ++s) {
      for (let y = 0; y < height; ++y) {
        for (let x = 0; x < width; ++x) {
          const i = x + width * y;
          if (W[i] === undefined) {
            W2[i] = mix([
              y < height - 1 ? W[i + width] : undefined,
              x < width - 1 ? W[i + 1] : undefined,
              y > 0 ? W[i - width] : undefined,
              x > 0 ? W[i - 1] : undefined
            ], x, y);
          }
        }
      }
      for (let i = 0; i < W.length; ++i) W[i] = W2[i];
    }
    return W;
  };
}

function pick(random) {
  const A = new Array(4);
  return (values, x, y) => {
    let count = 0;
    for (const v of values) if (v !== undefined) A[count++] = v;
    return count ? A[Math.floor(random(x, y) * count)] : undefined;
  }
}

function mean(values) {
  let count = 0;
  let sum = 0;
  for (const v of values) v == null || (count++, sum += v);
  return count ? sum / count : undefined;
}
```

```js echo
const numbers = (file) => file.image()
  .then((image) => {
    const {naturalWidth: width, naturalHeight: height} = image;
    const canvas = document.createElement("canvas");
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0);
    const {data} = context.getImageData(0, 0, width, height);
    const pixels = Float32Array.from({length: width * height}, (_, i) => data[4 * i] / 255);
    return Object.assign(pixels, {width, height});
  });

const colors = (file) => file.image()
  .then((image) => {
    const {naturalWidth: width, naturalHeight: height} = image;
    const canvas = document.createElement("canvas");
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0);
    const {data} = context.getImageData(0, 0, width, height);
    const pixels = Array.from({length: width * height}, (_, i) => d3.rgb(data[4 * i], data[4 * i + 1], data[4 * i + 2]).formatHex());
    return Object.assign(pixels, {width, height});
  });

const samples = numbers(FileAttachment("../data/cloud_combined_2048.jpg"));
const pixels = colors(FileAttachment("../data/Blue_Marble_2002.png"));
```

Data: NASA [Blue Marble & Clouds](https://visibleearth.nasa.gov/images/57747/blue-marble-clouds/77558l).
