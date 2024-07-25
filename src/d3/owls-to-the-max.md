---
source: https://observablehq.com/@mbostock/owls-to-the-max
index: true
author: Mike Bostock
---

# Owls to the Max

<p class=author>by <a href="https://observablehq.com/@mbostock">Mike Bostock</a></p>

Ref. [koalastothemax.com](https://koalastothemax.com/)

```js
const replay = view(html`<button>Replay</button>`);
```

```js echo
replay;
const quads = new TinyQueue([new Quad(0, 0, width, width)], (a, b) => b.score - a.score);
const context = context2d(width, width);
context.canvas.style.width = "100%";
for (let i = 0; true; ++i) {
  const q = quads.pop();
  if (q === undefined || q.score < 50) break;
  const qs = q.split();
  const qsi = d3.interpolate([q, q, q, q], qs);
  qs.forEach(quads.push, quads);
  for (let j = 1, m = Math.max(1, Math.floor(q.w / 10)); j <= m; ++j) {
    const t = d3.easeCubicInOut(j / m);
    context.clearRect(q.x, q.y, q.w, q.h);
    for (const s of qsi(t)) {
      context.fillStyle = s.color;
      context.beginPath()
      context.moveTo(s.x + s.w, s.y + s.h / 2);
      context.arc(s.x + s.w / 2, s.y + s.h / 2, s.w / 2, 0, 2 * Math.PI);
      context.fill();
    }
    display(context.canvas);
    await delay(1);
  }
}
```

```js echo
const width = 1024;
```

```js echo
const area_power = 0.25;
```

```js echo
class Quad {
  constructor(x, y, w, h) {
    const [r, g, b, error] = colorFromHistogram(computeHistogram(x, y, w, h));
    (this.x = x), (this.y = y), (this.w = w), (this.h = h);
    this.color = `#${(0x1000000 + (r << 16) + (g << 8) + b).toString(16).substring(1)}`;
    this.score = error * Math.pow(w * h, area_power);
  }
  split() {
    const dx = this.w / 2,
      x1 = this.x,
      x2 = this.x + dx;
    const dy = this.h / 2,
      y1 = this.y,
      y2 = this.y + dy;
    return [new Quad(x1, y1, dx, dy), new Quad(x2, y1, dx, dy), new Quad(x1, y2, dx, dy), new Quad(x2, y2, dx, dy)];
  }
}
```

```js echo
function computeHistogram(x, y, w, h) {
  const {data} = imageContext.getImageData(x, y, w, h);
  const histogram = new Uint32Array(1024);
  for (let i = 0, n = data.length; i < n; i += 4) {
    ++histogram[0 * 256 + data[i + 0]];
    ++histogram[1 * 256 + data[i + 1]];
    ++histogram[2 * 256 + data[i + 2]];
    ++histogram[3 * 256 + data[i + 3]];
  }
  return histogram;
}
```

```js echo
function weightedAverage(histogram) {
  let total = 0;
  let value = 0;
  for (let i = 0; i < 256; ++i) (total += histogram[i]), (value += histogram[i] * i);
  value /= total;
  let error = 0;
  for (let i = 0; i < 256; ++i) error += (value - i) ** 2 * histogram[i];
  return [value, Math.sqrt(error / total)];
}
```

```js echo
function colorFromHistogram(histogram) {
  const [r, re] = weightedAverage(histogram.subarray(0, 256));
  const [g, ge] = weightedAverage(histogram.subarray(256, 512));
  const [b, be] = weightedAverage(histogram.subarray(512, 768));
  return [Math.round(r), Math.round(g), Math.round(b), re * 0.2989 + ge * 0.587 + be * 0.114];
}
```

```js echo
const imageContext = FileAttachment("/data/owl.jpg")
  .image()
  .then((image) => {
    const context = context2d(width, width, 1);
    context.drawImage(image, 0, 0, width, width);
    return context;
  });
```

```js echo
import TinyQueue from "npm:tinyqueue@2";
```

```js echo
import {context2d} from "/components/DOM.js";
import {delay} from "/components/Promises.js";
```
