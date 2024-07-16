---
index: true
keywords: webworker, worker
---

# Greenlet & workerize

Jason Miller’s [greenlet](https://github.com/developit/greenlet) and [workerize](https://github.com/developit/workerize) are bits of glue code that make it easier to use web workers. greenlet is for lightweight functions, and workerize covers more ground, allowing to export several functions at once.

```js echo
import greenlet from "npm:greenlet";
```

You can use importScripts:

```js
display(coords);
```

```js echo
const coords = await greenlet(() => {
  globalThis.importScripts("https://cdn.jsdelivr.net/npm/d3-random@3");
  return Float32Array.from({length: 2e6}, d3.randomNormal());
})();
```

or (even better!) locally-hosted ESM [imports](https://observablehq.com/framework/imports):

```js
display(delaunay);
```

```js echo
const h = greenlet(async (coords, D) => {
  const {default: Delaunator} = await import(D);
  return new Delaunator(coords);
});
const delaunay = h(coords, import.meta.resolve("npm:delaunator"));
```

```js echo
const chart = Plot.plot({
  aspectRatio: 1,
  color: {scheme: "Greens"},
  marks: [
    Plot.raster(
      Array.from({length: coords.length / 2}, (_, i) => i),
      {x: (i) => coords[2 * i], y: (i) => coords[2 * i + 1]}
    ),
    Plot.line(delaunay.hull, {x: (i) => coords[2 * i], y: (i) => coords[2 * i + 1], curve: "linear-closed"})
  ]
});
display(chart);
```

---

```js echo
import workerize from "npm:workerize";
```

```js echo
const worker = workerize(`
  // block for half a second
  function block_sychronous() {
    const start = Date.now();
    while (Date.now() - start < 500);
  }

  export function add(a, b) {
    block_sychronous();
    return a + b;
  }

  export function sub(a, b) {
    block_sychronous();
    return a - b;
  }
`);
```

```js echo
display(html`3 + 9 = ${await worker.add(3, 9)}`);
```

```js echo
display(html`3 - 9 = ${await worker.sub(3, 9)}`);
```

<div class="warning">

It is tempting to push a lot of data to the worker, but be aware that there is no invalidation mechanism and that if you do long computations with a lot of data that depend on (say) an interactive slider, you might end up crashing the browser. See [LAP-JV](../varia/lap-jv) for an example.

</div>
