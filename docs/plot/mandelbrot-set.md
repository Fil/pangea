---
source: https://observablehq.com/@observablehq/plot-mandelbrot-set
index: true
---

# Mandelbrot set

A [raster](https://observablehq.com/plot/marks/raster) can color each pixel with the result of a function. Here the function counts the number of iterations needed until the point “escapes”. Reference: [Wikipedia](https://en.wikipedia.org/wiki/Mandelbrot_set).

```js echo
const chart = Plot.raster({fill: mandelbrot, x1: -2, x2: 1, y1: -1.164, y2: 1.164}).plot({
  aspectRatio: 1
});

display(chart);
```

```js echo
function mandelbrot(x, y) {
  for (let n = 0, zr = 0, zi = 0; n < 80; ++n) {
    [zr, zi] = [zr * zr - zi * zi + x, 2 * zr * zi + y];
    if (zr * zr + zi * zi > 4) return n;
  }
}
```
