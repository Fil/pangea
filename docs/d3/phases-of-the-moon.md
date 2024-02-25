---
index: false
status: draft
---

```js
md`# Phases of the Moon

For the year ${year}, in the style of [Irwin Glusker](https://www.moma.org/explore/inside_out/2012/10/16/a-paean-to-the-phases-of-the-moon/).`;
```

```js
const chart = html`<svg viewBox="0 0 ${width} ${height}" style="margin: 0 -14px; display: block; background: #111;">
  <g style="font: 10px sans-serif; text-transform: uppercase;">
    ${months.map((d) => {
      return svg`<g transform="translate(20,${monthScale(d)})">
        <text fill="#fff" dy="0.32em">${d.toLocaleString(locale, {
          month: "long"
        })}</text>
      </g>`;
    })}
  </g>
  <g text-anchor="middle" style="font: 5px sans-serif;">
    ${days.map((d) => {
      const noon = d3.timeHour.offset(d, 12);
      const illum = suncalc.getMoonIllumination(noon);
      const angle = 180 - illum.phase * 360;
      return svg`<g transform="translate(${dayScale(d)},${monthScale(d)})">
        <circle r="10" fill="#333"></circle>
        <text fill="#fff" y="-10" dy="-0.4em">${d.getDate()}</text>
        <path fill="#fff" d="${(projection.rotate([angle, 0]), path(hemisphere))}">
        <title>${d.toLocaleDateString()}</title>
      </g>`;
    })}
  </g>
</svg>`;
```

```js
const year = view(
  html`<input
    type="number"
    placeholder="year"
    style="width:120px;"
    value=${+new URLSearchParams(new URL(document.baseURI).search).get("year") || new Date().getFullYear()}
    min="1900"
    max="2100"
    step="1"
  />`
);
```

```js
viewof locale = {
  const form = md`<form>
  <input name=input type=text placeholder="Enter a locale (optional)" style="width:120px;">
  <i style="font-size:smaller;">[language](https://en.wikipedia.org/wiki/ISO_639-1)-[country](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code</i>
</form>`;
  form.input.oninput = event => {
    if (form.input.value) {
      try { (new Date).toLocaleString(form.input.value); }
      catch (error) { return event.stopImmediatePropagation(); }
    }
    form.value = form.input.value || undefined;
    form.dispatchEvent(new CustomEvent("input"));
  };
  form.onsubmit = event => event.preventDefault();
  form.value = Promise.resolve();
  return form;
}
```

```js
md`
---

## Appendix
`;
```

```js echo
const projection = d3.geoOrthographic().translate([0, 0]).scale(10);
```

```js echo
const path = d3.geoPath(projection);
```

```js echo
const hemisphere = d3.geoCircle()();
```

```js echo
const dayScale = {
  const scale = d3.scalePoint()
      .domain(d3.range(1, 40))
      .range([margin.left, width - margin.right])
      .padding(1);
  return d => {
    const start = d3.timeMonth(d);
    const offset = start.getDay() || 7;
    return scale(d.getDate() + offset);
  };
}
```

```js echo
const monthScale = {
  const scale = d3.scalePoint()
      .domain(d3.range(12))
      .range([margin.top, height - margin.bottom])
      .padding(1);
  return d => scale(d.getMonth());
}
```

```js echo
const days = {
  const now = new Date(year, 0, 1);
  const start = d3.timeYear(now);
  return d3.timeDays(start, d3.timeYear.offset(start, 1));
}
```

```js echo
const months = {
  const now = new Date(year, 0, 1);
  const start = d3.timeYear(now);
  return d3.timeMonths(start, d3.timeYear.offset(start, 1));
}
```

```js echo
const width = 975;
```

```js echo
const height = 480;
```

```js echo
const margin = {top: 0, right: 0, bottom: 0, left: 60};
```

```js echo
const suncalc = require("suncalc@1");
```

```js echo
const d3 = require("d3@6");
```
