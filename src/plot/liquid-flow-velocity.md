---
index: true
source: https://github.com/carlosfpj/equipment-designer
source2: https://observablehq.com/@fil/liquid-flow-velocity
keywords: abacus, log-log paper
---

# Liquid flow velocity in pipes

This abacus specifies the pipe diameter that should be purchased to construct oil & gas facilities. Source: _Recommended practice for design and installation of offshore production platform piping systems,_ API RP&thinsp;14E, 5th edition, October 1991.

```js echo
Plot.plot({
  width: 800,
  height: 600,
  x: {
    type: "log",
    domain: [100, 100_000],
    label: "liquid flow (barrels/day)"
  },
  y: { type: "log", domain: [0.5, 50], label: "velocity (ft/s)" },
  marks: [
    Plot.gridX(
      d3
        .range(100, 1_000, 20)
        .concat(d3.range(1_000, 10_000, 200))
        .concat(d3.range(10_000, 100_000, 2_000))
        .concat(100_000),
      {
        strokeOpacity: (d) =>
          Math.log10(d) % 1
            ? Math.log10(d * 5) % 1 && Math.log10(d * 2) % 1
              ? 0.2
              : 0.5
            : 1,
        strokeWidth: 0.5
      }
    ),
    Plot.gridY(
      d3
        .range(0.5, 1, 0.05)
        .concat(d3.range(1, 10, 0.2))
        .concat(d3.range(10, 50, 1))
        .concat(50),
      {
        strokeOpacity: (d) =>
          Math.log10(d) % 1 && Math.log10(d * 2) % 1
            ? Math.log10(d * 5) % 1
              ? 0.2
              : 0.5
            : 1,
        strokeWidth: 0.5
      }
    ),
    Plot.ruleY([3, 14], { stroke: "red" }),

    Plot.link(references, {
      x1: ({ value }) => (Y(100, value) > 0.5 ? 100 : Yr(0.5, value)),
      y1: ({ value }) => Math.max(Y(100, value), 0.5),
      x2: ({ value }) => (Y(100_000, value) < 50 ? 100_000 : Yr(50, value)),
      y2: ({ value }) => Math.min(Y(100_000, value), 50)
    }),

    Plot.text([3, 14], {
      y: (d) => d,
      text: ["Minimum", "Maximum"],
      stroke: "var(--plot-background)",
      fill: "red",
      lineAnchor: "bottom",
      frameAnchor: "left",
      dx: 50,
      dy: -3
    }),

    Plot.text(references, {
      text: "ref",
      x: ({ value }) => x(value),
      y: ({ value }) => Y(x(value), value),
      rotate: -48.1, // adjust to the slope
      textAnchor: "start",
      fontWeight: "bold",
      dx: -5,
      dy: -5,
      fill: "currentColor",
      stroke: "var(--plot-background)"
    })
  ]
})
```

```js echo
const references = d3.csvParse(
  `value,ref
0.614, 3/4 SCH 160 (I.D = 0.614”)
0.957, 1” SCH 80 (I.D = 0.957”)
1.278, 1-1/4” SCH 80 (I.D = 1.278”)
1.5, 1-1/2” SCH 80 (I.D = 1.500”)
1.939, 2” SCH 80 (I.D = 1.939”)
2.125, 2-1/2” SCH 160 (I.D = 2.125”)
2.323, 2-1/2” SCH 80 (I.D = 2.323”)
2.9, 3” SCH 80 (I.D = 1.939”)
3.826, 4” SCH 80 (I.D = 3.826”)
6.065, 6” SCH 80 (I.D = 6.065”)
7.981, 8” SCH 40 (I.D = 7.981”)
10.02, 10” SCH 40 (I.D = 10.02”)
11.938, 12” SCH 40 (I.D = 11.938”)
13.25, 14” SCH 30 (I.D = 13.25”)
15.25, 16” SCH 30 (I.D = 15.250”)
17.25, 18” STD W.T (I.D = 17.250”)`
);

// Forward and inverse functions for each parameter d
const Y = (x, d) => (0.012 * x) / d ** 2;
const Yr = (y, d) => (d ** 2 * y) / 0.012;

// Position of the labels (a bit of art)
const x = (d) => Math.exp(Math.log(800) + 1.2 * Math.log(d));
```