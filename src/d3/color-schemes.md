---
source: https://observablehq.com/@d3/color-schemes
index: true
---

# Color Schemes

## Including Every ColorBrewer Scale

Click any [d3-scale-chromatic](https://github.com/d3/d3-scale-chromatic) scheme below to copy it to the clipboard.

```js
const n = view(Inputs.select(new Map([
  ["continuous", 256],
  ...d3.range(11, 2, -1).map(n => [`discrete (${n})`, n])
]), {label: "Scheme size"}));
```

## Sequential (Single-Hue)

```js
const Blues = display(ramp("Blues"));
```

```js
const Greens = display(ramp("Greens"));
```

```js
const Greys = display(ramp("Greys"));
```

```js
const Oranges = display(ramp("Oranges"));
```

```js
const Purples = display(ramp("Purples"));
```

```js
const Reds = display(ramp("Reds"));
```

## Sequential (Multi-Hue)

```js
const BuGn = display(ramp("BuGn"));
```

```js
const BuPu = display(ramp("BuPu"));
```

```js
const GnBu = display(ramp("GnBu"));
```

```js
const OrRd = display(ramp("OrRd"));
```

```js
const PuBuGn = display(ramp("PuBuGn"));
```

```js
const PuBu = display(ramp("PuBu"));
```

```js
const PuRd = display(ramp("PuRd"));
```

```js
const RdPu = display(ramp("RdPu"));
```

```js
const YlGnBu = display(ramp("YlGnBu"));
```

```js
const YlGn = display(ramp("YlGn"));
```

```js
const YlOrBr = display(ramp("YlOrBr"));
```

```js
const YlOrRd = display(ramp("YlOrRd"));
```

```js
const Cividis = display(ramp("Cividis"));
```

```js
const Viridis = display(ramp("Viridis"));
```

```js
const Inferno = display(ramp("Inferno"));
```

```js
const Magma = display(ramp("Magma"));
```

```js
const Plasma = display(ramp("Plasma"));
```

```js
const Warm = display(ramp("Warm"));
```

```js
const Cool = display(ramp("Cool"));
```

```js
const CubehelixDefault = display(ramp("CubehelixDefault"));
```

```js
const Turbo = display(ramp("Turbo"));
```

## Diverging

```js
const BrBG = display(ramp("BrBG"));
```

```js
const PRGn = display(ramp("PRGn"));
```

```js
const PiYG = display(ramp("PiYG"));
```

```js
const PuOr = display(ramp("PuOr"));
```

```js
const RdBu = display(ramp("RdBu"));
```

```js
const RdGy = display(ramp("RdGy"));
```

```js
const RdYlBu = display(ramp("RdYlBu"));
```

```js
const RdYlGn = display(ramp("RdYlGn"));
```

```js
const Spectral = display(ramp("Spectral"));
```

## Cyclical

```js
const Rainbow = display(ramp("Rainbow"));
```

```js
const Sinebow = display(ramp("Sinebow"));
```

## Categorical

```js
const Observable10 = display(swatches("Observable10"));
```

```js
const Category10 = display(swatches("Category10"));
```

```js
const Accent = display(swatches("Accent"));
```

```js
const Dark2 = display(swatches("Dark2"));
```

```js
const Paired = display(swatches("Paired"));
```

```js
const Pastel1 = display(swatches("Pastel1"));
```

```js
const Pastel2 = display(swatches("Pastel2"));
```

```js
const Set1 = display(swatches("Set1"));
```

```js
const Set2 = display(swatches("Set2"));
```

```js
const Set3 = display(swatches("Set3"));
```

```js
const Tableau10 = display(swatches("Tableau10"));
```

---

## Appendix

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
  return html`<div style="position:relative;">${canvas}${label}</div>`;
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
  return html`<div style="position:relative;">${canvas}${label}</a>`;
}
```
