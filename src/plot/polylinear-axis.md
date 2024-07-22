---
index: true
source: https://observablehq.com/@observablehq/polylinear-axis
---

# Polylinear axis

[Continuous scales](https://observablehq.com/plot/features/scales#continuous-scales) support a piecewise **domain**, specified as an array of _n_ domain values (with _n_ greater than two), with a corresponding **range** having the same number of values; in that case, each segment of the domain is mapped to the matching segment of the range, using the scale’s interpolator.

When the domain has _n_&nbsp;&gt;&nbsp;2 elements and the range has two elements (for example, when using the default range on a _x_ or _y_ scale), the latter is automatically split into _n_&nbsp;&minus;&nbsp;1 segments of equal size.

Note that in addition to the domain, you must specify the scale’s continuous **type** (a scale specified with a domain having more than two elements defaults to the point type, if positional, and ordinal type otherwise).

```js echo
Plot.plot({
  marginLeft: 180,
  x: {
    type: "linear",
    domain: segments,
    ticks: segments,
    tickFormat: (d) => (d === Math.floor(d) ? `${d}:00` : `${Math.floor(d)}:30`)
  },
  color: {
    scheme: dark ? "Magma" : "YlGnBu",
    legend: true,
    label: "Count (median)"
  },
  marks: [
    Plot.ruleX([12.5], { strokeDasharray: "2,6" }),
    Plot.rectX(
      bikes,
      Plot.binX(
        { fill: "median", interval: 0.25 },
        {
          x: "time",
          y: "location",
          fill: "count",
          sort: { y: "fill", reverse: true },
          tip: true
        }
      )
    )
  ]
})
```

The data used was provided by [Jack Ketcham](/@jketcham), from Tempe Bicycle Action Group’s 2024 “[Bike Count](https://www.biketempe.org/bike-count-data/).” Volunteers were assigned intersections around Tempe, AZ to count bicycles at in two different shifts: one in the morning (7am-9am) and one in the evening (4pm-6pm). Counts were conducted during the last week of March on Tuesday, Wednesday and Thursday. Each cyclist observed was tallied by the volunteers into 15 minute bins, with additional attributes to indicate wrong way cycling, sidewalk riding, helmet usage, etc also tallied in the 15 minute bins. Another notebook with the complete dataset is here: https://observablehq.com/@jketcham/tempe-bike-count-2024

```js echo
const bikes = FileAttachment("/data/bikes.csv").csv({ typed: true });
```

In the chart above, the _x_ scale covers hourly slots that range from 7 to 9 and 16 to 18. We specify only the **domain**, using 9 segments. The pixels’ range will be distributed equally between the segments, with the gap between the two blocks, representing the central segment [9 — 16], covering 1/9th of the range. The **ticks** match the domain, ensuring their regular spacing. The gap is reinforced with a dashed rule. (We could have used 3 segments, but the gap would have consumed 1/3rd of the range, wasting too much space.)

```js echo
const segments = [7, 7.5, 8, 8.5, 9, 16, 16.5, 17, 17.5, 18];
```
