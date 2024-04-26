---
source: https://observablehq.com/@d3/color-schemes
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Color Schemes</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Color Schemes

## Including Every ColorBrewer Scale

Click any [d3-scale-chromatic](https://github.com/d3/d3-scale-chromatic) scheme below to copy it to the clipboard.

```js
viewof n = Inputs.select(new Map([
  ["continuous", 256],
  ...d3.range(11, 2, -1).map(n => [`discrete (${n})`, n])
]), {label: "Scheme size"})
```

```js
const sequential = md`
## Sequential (Single-Hue)
`;
```

```js
const Blues = ramp("Blues");
```

```js
const Greens = ramp("Greens");
```

```js
const Greys = ramp("Greys");
```

```js
const Oranges = ramp("Oranges");
```

```js
const Purples = ramp("Purples");
```

```js
const Reds = ramp("Reds");
```

```js
md`
## Sequential (Multi-Hue)
`;
```

```js
const BuGn = ramp("BuGn");
```

```js
const BuPu = ramp("BuPu");
```

```js
const GnBu = ramp("GnBu");
```

```js
const OrRd = ramp("OrRd");
```

```js
const PuBuGn = ramp("PuBuGn");
```

```js
const PuBu = ramp("PuBu");
```

```js
const PuRd = ramp("PuRd");
```

```js
const RdPu = ramp("RdPu");
```

```js
const YlGnBu = ramp("YlGnBu");
```

```js
const YlGn = ramp("YlGn");
```

```js
const YlOrBr = ramp("YlOrBr");
```

```js
const YlOrRd = ramp("YlOrRd");
```

```js
const Cividis = ramp("Cividis");
```

```js
const Viridis = ramp("Viridis");
```

```js
const Inferno = ramp("Inferno");
```

```js
const Magma = ramp("Magma");
```

```js
const Plasma = ramp("Plasma");
```

```js
const Warm = ramp("Warm");
```

```js
const Cool = ramp("Cool");
```

```js
const CubehelixDefault = ramp("CubehelixDefault");
```

```js
const Turbo = ramp("Turbo");
```

```js
const diverging = md`
## Diverging
`;
```

```js
const BrBG = ramp("BrBG");
```

```js
const PRGn = ramp("PRGn");
```

```js
const PiYG = ramp("PiYG");
```

```js
const PuOr = ramp("PuOr");
```

```js
const RdBu = ramp("RdBu");
```

```js
const RdGy = ramp("RdGy");
```

```js
const RdYlBu = ramp("RdYlBu");
```

```js
const RdYlGn = ramp("RdYlGn");
```

```js
const Spectral = ramp("Spectral");
```

```js
const cyclical = md`
## Cyclical
`;
```

```js
const Rainbow = ramp("Rainbow");
```

```js
const Sinebow = ramp("Sinebow");
```

```js
md`
## Categorical
`;
```

```js
const Category10 = swatches("Category10");
```

```js
const Accent = swatches("Accent");
```

```js
const Dark2 = swatches("Dark2");
```

```js
const Paired = swatches("Paired");
```

```js
const Pastel1 = swatches("Pastel1");
```

```js
const Pastel2 = swatches("Pastel2");
```

```js
const Set1 = swatches("Set1");
```

```js
const Set2 = swatches("Set2");
```

```js
const Set3 = swatches("Set3");
```

```js
const Tableau10 = swatches("Tableau10");
```

```js
md`
---

## Appendix
`;
```

```js echo
function swatches(name) {
  const colors = d3[`scheme${name}`];
  const n = colors.length;
  const dark = d3.lab(colors[0]).l < 50;
  const canvas = svg`<svg viewBox="0 0 ${n} 1" style="display:block;width:${
    n * 33
  }px;height:33px;margin:0 -14px;cursor:pointer;">${colors.map(
    (c, i) => svg`<rect x=${i} width=1 height=1 fill=${c}>`
  )}`;
  const label = document.createElement("DIV");
  label.textContent = name;
  label.style.position = "absolute";
  label.style.top = "4px";
  label.style.color = dark ? `#fff` : `#000`;
  canvas.onclick = () => {
    label.textContent = "Copied!";
    navigator.clipboard.writeText(JSON.stringify(colors));
    setTimeout(() => (label.textContent = name), 2000);
  };
  return html`${canvas}${label}`;
}
```

```js echo
function ramp(name) {
  let canvas;
  let colors;
  let dark;
  if (d3[`scheme${name}`] && d3[`scheme${name}`][n]) {
    colors = d3[`scheme${name}`][n];
    dark = d3.lab(colors[0]).l < 50;
  } else {
    const interpolate = d3[`interpolate${name}`];
    colors = [];
    dark = d3.lab(interpolate(0)).l < 50;
    for (let i = 0; i < n; ++i) {
      colors.push(d3.rgb(interpolate(i / (n - 1))).hex());
    }
  }
  if (n < 128) {
    canvas = htl.svg`<svg viewBox="0 0 ${n} 1" style="display:block;shape-rendering:crispEdges;width:calc(100% + 28px);height:33px;margin:0 -14px;cursor:pointer;" preserveAspectRatio="none">${colors.map(
      (c, i) => htl.svg`<rect x=${i} width=1 height=1 fill=${c}>`
    )}`;
  } else {
    canvas = document.createElement("canvas");
    canvas.width = n;
    canvas.height = 1;
    const context = canvas.getContext("2d");
    canvas.style.margin = "0 -14px";
    canvas.style.width = "calc(100% + 28px)";
    canvas.style.height = "33px";
    canvas.style.cursor = "pointer";
    for (let i = 0; i < n; ++i) {
      context.fillStyle = colors[i];
      context.fillRect(i, 0, 1, 1);
    }
  }
  const label = document.createElement("DIV");
  label.textContent = name;
  label.style.position = "absolute";
  label.style.top = "4px";
  label.style.color = dark ? `#fff` : `#000`;
  canvas.onclick = () => {
    label.textContent = "Copied!";
    navigator.clipboard.writeText(JSON.stringify(colors));
    setTimeout(() => (label.textContent = name), 2000);
  };
  return html`${canvas}${label}`;
}
```
