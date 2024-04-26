---
source: https://observablehq.com/@observablehq/plot-mareys-trains
index: true
---

# Marey’s trains

A recreation of [E.J. Marey](https://en.wikipedia.org/wiki/Étienne-Jules_Marey)’s graphical train schedule. Stations are positioned to scale so that slope encodes speed. This display also reveals when and where ${underline("limited", "limited service trains")} are passed by ${underline("bullet", "baby bullets")}. This type of plot is sometimes called a stringline chart.

```js
const schedule = view(Inputs.radio(["weekday", "weekend"], {label: "Schedule", value: "weekday"}));
```

```js
function underline(cat, title) {
  return html`<span style="border-bottom: 2px solid ${chart.scale("color").apply(cat)}">${title}</span>`;
}
```

```js echo
const chart = Plot.plot({
  inset: 10,
  margin: 10,
  marginLeft: 40,
  marginTop: 100,
  grid: true,
  width: 1152,
  height: 1800,
  x: {
    axis: null // hide arbitrary distance units
  },
  y: {
    label: null,
    ticks: d3.range(3, 24).map((h) => h * 60),
    tickFormat: asTime,
    transform: asMinutes,
    reverse: true
  },
  color: {
    legend: true,
    domain: ["normal", "limited", "bullet"],
    range: [dark ? "#bbb" : "#222", "rgb(183, 116, 9)", "rgb(192, 62, 29)"]
  },
  marks: [
    Plot.ruleX(trains, Plot.groupX({}, {x: "distance", strokeOpacity: 0.1, strokeDasharray: 2})),
    Plot.text(
      trains,
      Plot.groupX(
        {text: "first", y: () => "4:30am"},
        {
          x: "distance",
          text: "station",
          rotate: -90,
          frameAnchor: "left",
          dy: -12
        }
      )
    ),
    Plot.line(trains, {
      filter: (d) => d.schedule === schedule,
      x: "distance",
      y: "time",
      z: "train",
      stroke: "speed",
      marker: "circle",
      title: (d) => `${d.train}${d.direction}\n${d.station}\n${d.time}`,
      tip: true
    })
  ]
});

display(chart);
```

```js echo
function asTime(minutes) {
  return formatTime(d3.utcMinute.offset(d3.utcDay(), minutes - minutesOffset));
}

function asMinutes(time) {
  if (!(time = parseTime(time))) return;
  const minutes = time.getUTCHours() * 60 + time.getUTCMinutes();
  return (minutes + minutesOffset + 60 * 24) % (24 * 60);
}

const minutesOffset = -60 * 2; // no trains run at 2 AM
const parseTime = d3.utcParse("%I:%M%p");
const formatTime = d3.utcFormat("%-I %p");
```

```js echo
const trains = FileAttachment("../data/caltrain.csv").csv({typed: true});
```

