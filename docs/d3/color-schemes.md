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
sequential = md`## Sequential (Single-Hue)`
```

```js
Blues = ramp("Blues")
```

```js
Greens = ramp("Greens")
```

```js
Greys = ramp("Greys")
```

```js
Oranges = ramp("Oranges")
```

```js
Purples = ramp("Purples")
```

```js
Reds = ramp("Reds")
```

```js
md`## Sequential (Multi-Hue)`
```

```js
BuGn = ramp("BuGn")
```

```js
BuPu = ramp("BuPu")
```

```js
GnBu = ramp("GnBu")
```

```js
OrRd = ramp("OrRd")
```

```js
PuBuGn = ramp("PuBuGn")
```

```js
PuBu = ramp("PuBu")
```

```js
PuRd = ramp("PuRd")
```

```js
RdPu = ramp("RdPu")
```

```js
YlGnBu = ramp("YlGnBu")
```

```js
YlGn = ramp("YlGn")
```

```js
YlOrBr = ramp("YlOrBr")
```

```js
YlOrRd = ramp("YlOrRd")
```

```js
Cividis = ramp("Cividis")
```

```js
Viridis = ramp("Viridis")
```

```js
Inferno = ramp("Inferno")
```

```js
Magma = ramp("Magma")
```

```js
Plasma = ramp("Plasma")
```

```js
Warm = ramp("Warm")
```

```js
Cool = ramp("Cool")
```

```js
CubehelixDefault = ramp("CubehelixDefault")
```

```js
Turbo = ramp("Turbo")
```

```js
diverging = md`## Diverging`
```

```js
BrBG = ramp("BrBG")
```

```js
PRGn = ramp("PRGn")
```

```js
PiYG = ramp("PiYG")
```

```js
PuOr = ramp("PuOr")
```

```js
RdBu = ramp("RdBu")
```

```js
RdGy = ramp("RdGy")
```

```js
RdYlBu = ramp("RdYlBu")
```

```js
RdYlGn = ramp("RdYlGn")
```

```js
Spectral = ramp("Spectral")
```

```js
cyclical = md`## Cyclical`
```

```js
Rainbow = ramp("Rainbow")
```

```js
Sinebow = ramp("Sinebow")
```

```js
md`## Categorical`
```

```js
Category10 = swatches("Category10")
```

```js
Accent = swatches("Accent")
```

```js
Dark2 = swatches("Dark2")
```

```js
Paired = swatches("Paired")
```

```js
Pastel1 = swatches("Pastel1")
```

```js
Pastel2 = swatches("Pastel2")
```

```js
Set1 = swatches("Set1")
```

```js
Set2 = swatches("Set2")
```

```js
Set3 = swatches("Set3")
```

```js
Tableau10 = swatches("Tableau10")
```

```js
md`---

## Appendix`
```

```js echo
function swatches(name) {
  const colors = d3[`scheme${name}`];
  const n = colors.length;
  const dark = d3.lab(colors[0]).l < 50;;
  const canvas = svg`<svg viewBox="0 0 ${n} 1" style="display:block;width:${n * 33}px;height:33px;margin:0 -14px;cursor:pointer;">${colors.map((c, i) => svg`<rect x=${i} width=1 height=1 fill=${c}>`)}`;
  const label = document.createElement("DIV");
  label.textContent = name;
  label.style.position = "absolute";
  label.style.top = "4px";
  label.style.color = dark ? `#fff` : `#000`;
  canvas.onclick = () => {
    label.textContent = "Copied!";
    navigator.clipboard.writeText(JSON.stringify(colors));
    setTimeout(() => label.textContent = name, 2000);
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
    canvas = htl.svg`<svg viewBox="0 0 ${n} 1" style="display:block;shape-rendering:crispEdges;width:calc(100% + 28px);height:33px;margin:0 -14px;cursor:pointer;" preserveAspectRatio="none">${colors.map((c, i) => htl.svg`<rect x=${i} width=1 height=1 fill=${c}>`)}`;
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
    setTimeout(() => label.textContent = name, 2000);
  };
  return html`${canvas}${label}`;
}
```
