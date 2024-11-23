---
index: true
source: https://github.com/square/crossfilter
---

# Crossfilter

<div style="max-width: 880px;">
<div class="grid grid-cols-3">
  <div>${Histogram("hour", {label: "Time of day"})}</div>
  <div>${Histogram("delay", {label: "Arrival delay (min.)"})}</div>
  <div>${Histogram("distance", {label: "Distance (mi.)", zero: true})}</div>
  <div class="grid-colspan-3">${resize(width => Histogram("date", {width, label: "Date", selection: [new Date("2001-02-01"), new Date("2001-03-01")]}))}</div>
  <div class="grid-colspan-3"><small>${Counter()}</small></div>
</div>
</div>

<style>
  rect.selection {fill: steelblue; fill-opacity: 0.15;}
  figure h2 {font-weight: normal; font-size: 1rem;}
</style>

---

_TODO:_

- add a table
- stronger init
- add "reset" buttons
- documentation
- mention [falcon-vis](https://github.com/vega/falcon) and mosaic as alternatives

https://github.com/square/crossfilter

note: use crossfilter2 if you prefer to use the community version https://crossfilter.github.io/crossfilter/

```js echo
import crossfilter from "npm:crossfilter";
```

```js echo
function renderHistogram(name, dimension, group, selection) {
  return function(index, scales, values, dimensions, context, next) {
    const {
      marginLeft,
      marginTop,
      marginRight,
      marginBottom,
      width,
      height
    } = dimensions;

    function updateAll({selection}) {
      if (selection) {
        dimension.filterRange(selection.map(scales.scales.x.invert));
        clipRect.setAttribute("x", selection[0]);
        clipRect.setAttribute("width", selection[1] - selection[0]);
      }
      else {
        dimension.filterAll();
        clipRect.setAttribute("x", 0);
        clipRect.setAttribute("width", width);
      }
      update();
    }

    const clipRect = svg`<rect height=${dimensions.height} x=0 width=${width}>`;
    const id = `histogram-${name}`;
    const r = next(index, scales, values, dimensions, context);
    r.setAttribute("id", id);
    const fill = r.getAttribute("fill");
    r.setAttribute("fill", null); // we want to <use> this shape and change its fill
    const g = svg`<g class="update">
      ${r}
      <use href="#${id}" fill="currentColor" fill-opacity="0.3"></use>
      <use href="#${id}" fill="${fill}" clip-path="url(#clip-${name})"></use>
      <clipPath id="clip-${name}">${clipRect}</clipPath>
    `;
    const rects = [...r.querySelectorAll("rect")];

    const y0 = scales.y(0);
    g.update = () => {
      const values = Plot.valueof(group.all(), "value");
      const max = d3.max(values);
      for (const rect of rects) {
        const h = scales.y(values[rect.__data__] / max);
        rect.setAttribute("y", h)
        rect.setAttribute("height", y0 - h)
      }
    }

    const brush = d3.brushX()
      .extent([[marginLeft, marginTop], [width - marginRight, height - marginBottom]])
      .on("brush", updateAll)
      .on("end", updateAll);

    d3.select(g)
      .call(brush)
      .call(brush.move, selection?.map(scales.x))

    return g;
  }
}

function Histogram(name, {
  thresholds,
  zero,
  label = name === "date" ? null : name,
  width = 310,
  selection
} = {}) {
  const {allGroups, dimension, groups} = axes[name];
  if (thresholds === undefined) thresholds = allGroups.length;
  return Plot.plot({
    width,
    height: 150,
    marginLeft: 5,
    marginRight: 10,
    x: {label: null, zero, round: true, nice: true},
    title: label,
    y: {insetTop: 5, axis: null},
    marks: [
      Plot.rectY(allGroups, Plot.normalizeY("max",
        Plot.binX({y: "sum", thresholds}, {
          x: "key",
          y: "value",
          fill: "steelblue",
          render: renderHistogram(name, dimension, groups, selection)
        })
      )),
      Plot.ruleY([0]),
    ]
  });
}

function Counter({format = d3.format(",")} = {}) {
  const total = axes.all.value();
  const c = Object.assign(html`<div class="update" style="text-align: end;">`, {
    update() {
      const selected = axes.all.value();
      c.innerHTML = selected === total
        ? `<strong>${format(total)}</strong> flights`
        : `${format(selected)} of <strong>${format(total)}</strong> flights`
    }
  });
  c.update();
  return c;
}

function update() {
  d3.selectAll(".update").each(function() {this.update()});
}
```

```js echo
const flights = FileAttachment("/data/flights-200k.csv").csv({typed: true});
```

```js echo
const axes = createAxes(flights, {
  date: {
    accessor: (d) => d.date,
    group: d3.utcDay
  },
  hour: {
    accessor: (d) => d.date.getHours() + d.date.getMinutes() / 60,
    group: Math.floor
  },
  delay: {
    accessor: (d) => Math.max(-60, Math.min(149, d.delay)),
    group: (d) => Math.floor(d / 10) * 10
  },
  distance: {
    accessor: (d) => Math.min(1999, d.distance),
    group: (d) => Math.floor(d / 50) * 50
  }
});
```

```js echo
function createAxes(data, config) {
  const f = crossfilter(data);
  const axes = Object.fromEntries(
    Object.entries(config)
      .map(([name, {accessor, group}]) => {
        const dimension = f.dimension(accessor);
        const groups = dimension.group(group);
        return [name, {
          dimension,
          groups,
          allGroups: groups.all()
        }];
      }
    )
  );
  axes.all = f.groupAll();
  return axes;
}
```
