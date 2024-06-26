---
index: true
source: https://observablehq.com/@fil/eld-viewer
---

# ELD Viewer

An Electronic Logging Device (ELD) measures a truck driver’s working time. (Example chart made with Observable Plot in reply to [this question](https://talk.observablehq.com/t/how-can-i-make-hours-of-service-box-graph-using-d3-js-in-javascript/5359).)

```js echo
Plot.plot({
  marginLeft: 60,
  x: {
    type: "time",
    axis: "top",
    ticks: 25,
    tickFormat: "%H",
    grid: true,
    nice: true
  },
  y: { domain, tickSize: 0, label: null },
  marks: [
    Plot.frame(),

    // time ticks every 15 and 30 minutes
    Plot.tickX(
      thirty.flatMap((time) => domain.map((status) => ({ time, status }))),
      { x: "time", y: "status", strokeWidth: 0.25 }
    ),
    Plot.tickX(
      fifteen.flatMap((time) => domain.map((status) => ({ time, status }))),
      { x: "time", y: "status", strokeDasharray: [0, 5, 4], strokeWidth: 0.25 }
    ),

    // data line
    Plot.line(data, {
      x: "time",
      y: "status",
      curve: "step-after",
      stroke: "blue",
      strokeWidth: 2
    }),

    // compute the totals
    Plot.text(
      d3.pairs(data),
      Plot.groupY(
        {
          text: (d) => new Date(d3.sum(d) + 30000).toISOString().slice(11, 16)
        },
        {
          y: ([a]) => a.status,
          text: ([a, b]) => b.time - a.time,
          x: dayExtent[1],
          textAnchor: "start",
          dx: 10
        }
      )
    )
  ],
  marginRight: 40,
  width,
  height: 150
})
```

The following makes a few assumptions:
1. the data covers a whole day from midnight to midnight
2. the times are encoded in the local time-zone
3. The ELD file is a csv specifying the starting time and status of each period
4. Durations are computed by difference.

```js echo
// Add an event at 0:00 and another at 23:59:59 if you need to compute the days’ totals.
const data = d3.csvParse(
    `time,status
// 2021-07-20T00:00:00,Off Duty
2021-07-20T06:00:00,Off Duty
2021-07-20T07:12:00,On Duty
2021-07-20T07:53:00,Driving
2021-07-20T08:00:10,On Duty
2021-07-20T09:08:00,Driving
2021-07-20T10:00:00,On Duty
2021-07-20T10:30:00,Driving
2021-07-20T10:45:00,On Duty
2021-07-20T11:15:00,Driving
2021-07-20T11:30:00,On Duty
2021-07-20T15:14:00,Driving
2021-07-20T16:00:00,Off Duty
2021-07-20T18:00:00,Off Duty
// 2021-07-20T23:59:59,Off Duty
`,
    d3.autoType
  )
  .filter((d) => d.time instanceof Date);

const domain = ["Off Duty", "Sleeper", "Driving", "On Duty"];

const extent = d3.extent(data, (d) => d.time);

const dayExtent = [d3.timeDay.floor(extent[0]), d3.timeDay.ceil(extent[1])];

const fifteen = d3.timeMinute
  .every(15)
  .range(...dayExtent)
  .filter((d, i) => i % 2);

const thirty = d3.timeMinute
  .every(30)
  .range(...dayExtent)
  .filter((d, i) => i % 2);

```