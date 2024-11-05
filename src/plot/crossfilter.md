---
index: true
---

# Crossfilter


${resize(width => Histogram("date", {width}))}
${Histogram("delay", {label: "Arrival delay (min.)"})} 
${Histogram("hour", {label: "Time of day"})}
${Histogram("distance", {label: "Distance (mi.)"})}
${Counter()}


---

_TODO:_
- layout
- add a table
- stronger init
- add "reset" buttons
- documentation



```js echo
import crossfilter from "npm:crossfilter2";
```

```js echo
function renderHistogram(dimension, group) {
  return (index, scales, values, dimensions, context, next) => {
    const {
      marginLeft,
      marginTop,
      marginRight,
      marginBottom,
      width,
      height
    } = dimensions;

   function updateAll({selection}) {
      if (selection) dimension.filterRange(selection.map(scales.scales.x.invert));
      else dimension.filterAll();
      update();
   }

    const g = svg`<g class="update">`;
    const r = next(index, scales, values, dimensions, context);
    const rects = [...r.querySelectorAll("rect")];
    g.append(r);

    const y0 = scales.y(0);
    g.update = () => {
      const values = group.all();
      for (const rect of rects) {
        const v = values[rect.__data__].value;
        const h = scales.y(v);
        rect.setAttribute("y", h)
        rect.setAttribute("height", y0 - h)
      }
    }

    d3.select(g).call(d3.brushX()
      .extent([[marginLeft, marginTop], [width - marginRight, height - marginBottom]])
      .on("brush", updateAll)
      .on("end", updateAll)
    );

    return g;
  }
}

function Histogram(name, {
  thresholds,
  label = name === "date" ? null : name,
  width = 350
} = {}) {
  const {allGroups, dimension, groups} = axes[name];
  if (thresholds === undefined) thresholds = allGroups.length;
  return Plot.plot({
    width,
    height: 150,
    marginLeft: 50,
    x: {label},
    y: {insetTop: 5, grid: true, label: null},
    marks: [
      Plot.rectY(allGroups, Plot.binX({y: "sum", thresholds}, {x: "key", y: "value", fillOpacity: 0.2})),
      Plot.rectY(allGroups, Plot.binX({y: "sum", thresholds}, {x: "key", y: "value", fill: "steelblue", render: renderHistogram(dimension, groups)})),
      Plot.ruleY([0]),
    ]
  });
}

function Counter({format = d3.format(",")} = {}) {
  const total = axes.all.value();
  const c = Object.assign(html`<p class="update">`, {
    update() {
      const selected = axes.all.value();
      c.innerHTML = selected === total
        ? `<strong>${format(total)}</strong> flights`
        : `${format(selected)} of <strong>${format(total)}</strong> flights selected`
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
