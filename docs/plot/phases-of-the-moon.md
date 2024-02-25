---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Phases of the Moon</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Phases of the Moon

For the year ${year}, in the style of [Irwin Glusker](https://www.moma.org/explore/inside_out/2012/10/16/a-paean-to-the-phases-of-the-moon/).

```js
viewof year = Inputs.number({
  label: "Year",
  value: +new URLSearchParams(new URL(document.baseURI).search).get("year") || new Date().getUTCFullYear(),
  min: 1900,
  max: 2100,
  step: 1
})
```

```js
viewof locale = Inputs.text({
  label: "Locale",
  value: "en-US",
  validate(input) {
    try { (new Date).toLocaleString(input.value); }
    catch { return false; }
    return true;
  }
})
```

```js echo
Plot.plot({
  aspectRatio: 0.6,
  marginLeft: 90,
  width: 1152,
  style: `
    margin: 0 -14px;
    background: #111;
    color: #fff;
    max-width: none;
    text-transform: uppercase;
    width: calc(100% + 28px);
  `,
  x: {domain: d3.range(1, 40), axis: null}, // day of month, aligned by day of week
  y: {domain: d3.range(12)}, // month of year
  length: {type: "identity"}, // overloading meaning as lunar phase angle!
  marks: (({data, x, y, r, hemisphere, projection}) => [
    Plot.axisY({
      textAnchor: "start",
      tickFormat: Plot.formatMonth(locale, "long"),
      tickSize: 0,
      dx: -50
    }),
    Plot.dot(data, {x, y, r, fill: "#333"}),
    Plot.text(data, {
      x,
      y,
      r,
      text: (d) => d.getUTCDate(),
      dy: -r - 5,
      fontSize: 7
    }),
    Plot.vector(data, {
      x,
      y,
      length(d) {
        const noon = d3.utcHour.offset(d, 12);
        const illum = suncalc.getMoonIllumination(noon);
        return 180 - illum.phase * 360;
      },
      shape: {
        draw(context, length) {
          projection.rotate([length, 0]).scale(r);
          const path = d3.geoPath(projection, context);
          path(hemisphere);
        }
      },
      anchor: "start", // disable default translate along length
      fill: "currentColor"
    })
  ])({
    data: (() => {
      const start = d3.utcYear(Date.UTC(year, 0, 1));
      return d3.utcDays(start, d3.utcYear.offset(start));
    })(),
    x(d) {
      const start = d3.utcMonth(d);
      const offset = start.getUTCDay() || 7;
      return d.getUTCDate() + offset;
    },
    y(d) {
      return d.getUTCMonth();
    },
    r: 12,
    hemisphere: d3.geoCircle()(),
    projection: d3.geoOrthographic().translate([0, 0])
  })
});
```

Above, to specify a custom [vector shape](https://observablehq.com/plot/marks/vector#vector-options), I’m using an [immediately-invoked function expression (IIFE)](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) so that I can share a few local variables (`data`, `x`, `y`, `r`, _etc._). A more conventional style would declare them as local variables before calling Plot.plot, say using `const`, but I wanted to declare them within.

```js echo
const suncalc = (await import("https://cdn.jsdelivr.net/npm/suncalc@1/+esm")).default;
```
