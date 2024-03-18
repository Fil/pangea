---
index: true
keywords: R, wasm
---

# WebR

```js
const webR = new (await import("https://webr.r-wasm.org/latest/webr.mjs")).WebR();
await webR.init();
```

```js
const n = view(Inputs.range([1, 1e3], {step: 5, label: "Number of samples"}));
```

```js
const Rcode = view(Inputs.textarea({value: "hist(rnorm(n))", label: "R code"}));
```

```js
const res = await webR.globalShelter.captureR(Rcode, {env: {n}});
const image = res.images[0];
const canvas = d3.create("canvas").attr("width", image.width).attr("height", image.height).node();
const context = canvas.getContext("2d");
context.drawImage(image, 0, 0, image.width, image.height);
context.canvas.style.width = "50%";
display(canvas);
```
