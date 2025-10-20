---
source: https://observablehq.com/@jwolondon/making-plot-sketchy
draft: true
index: false
author: Jo Wood
---

# Making Plot Sketchy

<p class="author">by <a href="https://observablehq.com/@jwolondon">Jo Wood</a></p>

_Note (Fil, 2025-10-20): the code presented here is not easy to reuse yet in Framework. Needs more work. Previous versions include [Rough Plot](../plot/rough-plot) and [RoughViz](../party/roughviz) which should be revisited (or retired) when this page is ready._

Way back in 2010, I created a plugin for [Processing](https://processing.org) called [handy](https://github.com/gicentre/handy) that allowed it to render in a sketchy hand-drawn style. This formed part of some research into the effects of sketchy styling on people's understanding of data visualization (Wood et al., 2012). Handy was subsequently ported to JavaScript and extended by Preet Shihn as [Rough.js](https://roughjs.com).

This page describes a plugin for [Observable Plot](https://observablehq.com/plot/) that allows high level Plot specifications to render in a sketchy style with minimal additional specification details. It builds on Gordon Tu's [plugin approach](https://observablehq.com/@tututwo/rough-js-plugin-for-observable-plot) but with greater Plot coverage and some bug-fixes.

To use in your Observable pages, add the following line, which will replace Plot with one that accepts rough style specifications:

```javascript
import {Plot} from "@jwolondon/making-plot-sketchy"
```

This version of `Plot` should behave as normal for non-sketchy rendering. For example, here's a simple bar chart:

```js echo
Plot.plot({
  width: 300,
  height: 200,
  x: { axis: null },
  y: { axis: null },
  marks: [Plot.rectY(barData, { x: "cat", y: "val", fill: "cat" })]
})
```

To render this in a sketchy style, simply add `rough: {}` to a mark's specification. This example uses the default sketchy style, but see below for configuring options.

```js echo
Plot.plot({
  width: 300,
  height: 200,
  x: { axis: null },
  y: { axis: null },
  marks: [Plot.rectY(barData, { x: "cat", y: "val", fill: "cat", rough: {} })]
})
```

Here's another example that also sets a hand-drawn style font to generate stylistically sympathetic text (this isn't specific to this custom version of Plot).

```html echo
<link href="https://fonts.googleapis.com/css2?family=Waiting+for+the+Sunrise&display=swap" rel="stylesheet">
```

I find [Google fonts](https://fonts.google.com) a useful source for web fonts that can be directly displayed in Observable. Filtering [handwritten fonts](https://fonts.google.com/?categoryFilters=Calligraphy:%2FScript%2FHandwritten) provides some sketchy-compatible font candidates. Here I use the font 'Waiting for the sunrise', but there are plenty of alternatives depending on the style you wish to project.

```js
Plot.plot({
  // --- Channel customisation
  style: `font-family: Waiting for the Sunrise; font-size:18`,
  x: { axis: null },
  y: { tickSize: 0, ticks: 6, label: null },

  // -- Mark and channel specification
  marks: [
    Plot.barY(voteData, {
      x: "letter",
      y: "votes",
      fill: "steelblue",
      stroke: "black",
      rough: {
        fillStyle: "zigzag",
        roughness: 2,
        hachureGap: 1,
        fillWeight: 0.1
      }
    }),

    Plot.text(voteData, {
      x: "letter",
      y: -9,
      text: "letter",
      fill: "black",
      fontWeight: "bold"
    }),

    Plot.text(
      [
        {
          x: "A",
          txt: `Numbers of extra votes received as bonus or deprived from
a candidate depending on the first letter of their surname.`
        }
      ],
      {
        x: "x",
        y: -150,
        text: "txt",
        textAnchor: "start",
        fill: "grey",
        fontSize: 20,
        fontWeight: "bold"
      }
    )
  ]
})
```

## Customising rough rendering

Being based on [Rough.js](https://roughjs.com), we have the same options to control the type of sketchy infilling, roughness, hachure angle etc in this plugin. Options should be provided to the `rough:{}` object. For example, the bars above use these options:

```javascript
rough: {
  fillStyle: "zigzag",
  roughness: 2,
  hachureGap: 1,
  fillWeight: 0.1
}
```

You can explore some of the more common options below to see their effect:

```js
const rOptions = view(Inputs.form({
  seed: Inputs.toggle({ label: "seed", value: true }),
  fillStyle: Inputs.select(
    [
      "solid",
      "hachure",
      "zigzag",
      "cross-hatch",
      "dots",
      "dashed",
      "zigzag-line"
    ],
    { label: "fillStyle" }
  ),
  roughness: Inputs.range([0, 10], { label: "roughness", step: 0.1, value: 2 }),
  bowing: Inputs.range([0, 25], { label: "bowing", step: 1, value: 3 }),
  hachureGap: Inputs.range([0.5, 25], {
    label: "hachureGap",
    step: 0.1,
    value: 5
  }),
  hachureAngle: Inputs.range([-180, 180], {
    label: "hachureAngle",
    step: 1,
    value: -41
  }),
  fillWeight: Inputs.range([0, 4], {
    label: "fillWeight",
    step: 0.05,
    value: 1
  }),
  strokeWidth: Inputs.range([0, 4], {
    label: "strokeWidth",
    step: 0.05,
    value: 1
  })
}));
```

```js
(() => {
  // ---- Data specification
  const data = [{ cat: "a" }, { cat: "b" }, { cat: "c" }, { cat: "d" }];

  // ---- Visualization specification
  return Plot.plot({
    // -- Channel customisation
    height: 360,
    x: { axis: null },

    // -- Mark and channel specification
    marks: [
      Plot.dot(data, {
        x: "cat",
        r: 40,
        symbol: "cat",
        fill: "cat",
        stroke: "black",
        rough: {
          seed: rOptions.seed ? 1 : null,
          roughness: rOptions.roughness,
          fillStyle: rOptions.fillStyle,
          bowing: rOptions.bowing,
          hachureGap: rOptions.hachureGap,
          hachureAngle: rOptions.hachureAngle,
          fillWeight: rOptions.fillWeight,
          strokeWidth: rOptions.strokeWidth
        }
      })
    ]
  });
})()
```

For a full list of options, see the [Rough.js API](https://github.com/rough-stuff/rough/wiki#options).

While most visible features in Plot are created by naming _marks_, axis ticks and gridlines can be implicitly set by modifying the `x` and `y` channels. To make these implicit marks sketchy, you just add a `rough` object to the channel modification spec. For example:

```js echo
Plot.plot({
  style: `font-family: Waiting for the Sunrise; font-size:24;font-weight:900`,
  rough: {
    grid: { bowing: 2 },
    ticks: { roughness: 3, strokeWidth: 1 }
  },
  x: { grid: true, domain: [0, 10], ticks: 10 },
  y: { grid: true, domain: [0, 7], ticks: 7 },

  marks: []
})
```

## Examples

Here are examples using most of the marks available in Plot rendered in a sketchy style. The only ones currently not avialable for sketchy rendering are those that use Canvas (principally the [raster](https://observablehq.com/plot/marks/raster) and [image](https://observablehq.com/plot/marks/image) marks).

```html
<div style="display: inline-grid; grid-template-columns: auto auto;  grid-template-columns: repeat(3, auto); grid-gap: 0px 20px;">
${areaTest("area")}                    ${arrowTest("arrow")}          ${axisGridTest("axis grid and ticks")}
${barTest("bar")}                      ${bollingerTest("bollinger")}  ${boxTest("box")}
${contourTest("contour")}              ${densityTest("density")}      ${dodgeTest("dodge")}
${dotTest("dot")}                      ${frameTest("frame")}          ${geoTest("geo")}
${gridTest("grid mark")}               ${hexTest("hexgrid / hexbin")} ${lineTest("line")}
${regressionTest("linear regression")} ${linkTest("link")}            ${rectTest("rect")}
${ruleTest("rule")}                    ${tickTest("tick mark")}       ${treeTest("tree")}
${vectorTest("vector")}                ${voronoiTest("voronoi")}      ${waffleTest("waffle")}
</div>
```

The examples above where produced with the following specs:

```js
function areaTest(title) {
  return Plot.plot({
    style: testStyle,
    width: 240,
    height: 180,
    title: title,
    marks: [
      Plot.areaY(aapl, {
        x: "Date",
        y: "Close",
        stroke: "black",
        fill: "firebrick",
        rough: rSettings()
      })
    ]
  });
}
```

```js
function arrowTest(title) {
  return Plot.plot({
    style: testStyle,
    width: 240,
    height: 180,
    title: title,

    marks: [
      Plot.arrow([{ x1: 0, y1: 0, x2: 10, y2: 10 }], {
        x1: "x1",
        y1: "y1",
        x2: "x2",
        y2: "y2",
        stroke: "firebrick",
        headLength: 30,
        bend: true,
        rough: rSettings()
      })
    ]
  });
}
```

```js
function axisGridTest(title) {
  return Plot.plot({
    style: testStyle,
    width: 240,
    height: 180,
    title: title,
    rough: {
      grid: rSettings({ roughness: 1, bowing: 1 }),
      ticks: rSettings({ roughness: 3, strokeWidth: 1 })
    },
    x: { grid: true, domain: [0, 10], ticks: 10 },
    y: { grid: true, domain: [0, 7], ticks: 7 },

    marks: []
  });
}
```

```js
function barTest(title) {
  return Plot.plot({
    style: testStyle,
    width: 240,
    height: 180,
    title: title,
    marks: [
      Plot.barY(
        [
          { x: "a", y: 10 },
          { x: "b", y: 6 },
          { x: "c", y: 12 },
          { x: "d", y: 4 }
        ],
        {
          x: "x",
          y: "y",
          stroke: "black",
          fill: "firebrick",
          rough: rSettings()
        }
      )
    ]
  });
}
```

```js
function bollingerTest(title) {
  return Plot.plot({
    style: testStyle,
    width: 240,
    height: 180,
    title: title,
    marks: [
      Plot.bollingerY(aapl, {
        x: "Date",
        y: "Close",
        n: 100,
        k: 10,
        stroke: "firebrick",
        fill: "steelblue",
        rough: rSettings()
      })
    ]
  });
}
```

```js
function boxTest(title) {
  return Plot.plot({
    style: testStyle,
    width: 240,
    height: 180,
    title: title,
    y: { axis: null },
    marks: [
      Plot.boxY(penguins, {
        x: "island",
        y: "flipper_length_mm",
        fill: "steelblue",

        rough: rSettings({ roughness: 1, strokeWidth: 1 })
      })
    ]
  });
}
```

```js
function contourTest(title) {
  const grid = {
    width: 10,
    height: 10,
    values: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 2, 4, 6, 8,
      10, 12, 14, 16, 18, 0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 0, 4, 8, 12, 16,
      20, 24, 28, 32, 36, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 0, 6, 12, 18,
      24, 30, 36, 42, 48, 54, 0, 7, 14, 21, 28, 35, 42, 49, 56, 63, 0, 8, 16,
      24, 32, 40, 48, 56, 64, 72, 0, 9, 18, 27, 36, 45, 54, 63, 72, 81
    ]
  };

  return Plot.plot({
    style: testStyle,
    width: 240,
    height: 180,
    title: title,
    marks: [
      Plot.contour(grid.values, {
        width: grid.width,
        height: grid.height,
        fill: Plot.identity,
        stroke: "firebrick",
        interval: 5,
        rough: rSettings()
      })
    ]
  });
}
```

```js
function densityTest(title) {
  return Plot.plot({
    style: testStyle,
    width: 240,
    height: 180,
    title: title,
    marks: [
      d3
        .groups(penguins, (d) => d.species)
        .map(([s]) =>
          Plot.density(penguins, {
            x: "flipper_length_mm",
            y: "culmen_length_mm",
            weight: (d) => (d.species === s ? 1 : -1),
            fill: () => s,
            fillOpacity: 0.2,
            thresholds: [0.05],
            stroke: "firebrick",
            rough: rSettings()
          })
        )
    ]
  });
}
```

```js
function dodgeTest(title) {
  return Plot.plot({
    style: testStyle,
    width: 240,
    height: 180,
    title: title,
    x: { axis: null },
    marks: [
      Plot.dotX(
        penguins,
        Plot.dodgeY({
          x: "flipper_length_mm",
          fill: "species",
          stroke: "black",
          rough: rSettings({
            roughness: 1,
            fillStyle: "dots",
            strokeWidth: 0.4,
            fillWeight: 2
          })
        })
      )
    ]
  });
}
```

```js
function dotTest(title) {
  return Plot.plot({
    style: testStyle,
    width: 240,
    height: 180,
    title: title,
    r: { range: [0, 20] },
    x: { zero: true },
    y: { zero: true },
    marks: [
      Plot.dot(
        [
          { x: 2, y: 2, r: 13 },
          { x: 5, y: 10, r: 50 },
          { x: 10, y: 3, r: 25 }
        ],
        {
          x: "x",
          y: "y",
          r: "r",
          fill: "firebrick",
          stroke: "black",
          rough: rSettings()
        }
      )
    ]
  });
}
```

```js
function frameTest(title) {
  return Plot.plot({
    style: testStyle,
    width: 240,
    height: 180,
    margin: 8, // Make room for bowed frame
    title: title,
    marks: [
      Plot.frame({
        stroke: "firebrick",
        rough: rSettings({ roughness: 0.8 })
      })
    ]
  });
}
```

```js
function gridTest(title) {
  return Plot.plot({
    style: testStyle,
    width: 240,
    height: 180,
    title: title,
    marks: [
      Plot.gridX(d3.range(11), { rough: rSettings({ bowing: 0 }) }),
      Plot.gridY(d3.range(11), { rough: rSettings({ bowing: 0 }) })
    ]
  });
}
```

```js
function geoTest(title) {
  return Plot.plot({
    style: testStyle,
    width: 240,
    height: 180,
    title: title,
    projection: "equal-earth",
    marks: [
      Plot.sphere({
        fill: "lightblue",
        stroke: "steelblue",
        rough: rSettings()
      }),
      Plot.geo(landGeo, {
        fill: "firebrick",
        stroke: "black",
        rough: rSettings()
      })
    ]
  });
}
```

```js
function hexTest(title) {
  return Plot.plot({
    style: testStyle,
    width: 240,
    height: 180,
    title: title,

    marks: [
      Plot.hexgrid({ stroke: "black", rough: rSettings() }),
      Plot.dot(
        penguins,
        Plot.hexbin(
          { r: "count" },
          {
            x: "culmen_length_mm",
            y: "culmen_depth_mm",
            fill: "steelblue",
            stroke: "firebrick",
            rough: rSettings()
          }
        )
      )
    ]
  });
}
```

```js
function lineTest(title) {
  return Plot.plot({
    style: testStyle,
    width: 240,
    height: 180,
    title: title,
    marks: [
      Plot.lineY(
        [
          { x: 0, y: 0 },
          { x: 5, y: 10 },
          { x: 10, y: 3 },
          { x: 12, y: 7 }
        ],
        {
          x: "x",
          y: "y",
          stroke: "firebrick",
          rough: rSettings()
        }
      )
    ]
  });
}
```

```js
function linkTest(title) {
  const data = [
    { x1: 0, y1: 0, x2: 10, y2: 10, cat: "a" },
    { x1: 10, y1: 0, x2: 0, y2: 10, cat: "b" },
    { x1: 2, y1: 5, x2: 8, y2: 5, cat: "c" },
    { x1: 5, y1: 2, x2: 5, y2: 8, cat: "d" }
  ];
  return Plot.plot({
    style: testStyle,
    width: 240,
    height: 180,
    title: title,
    marks: [
      Plot.dot(data, {
        x: "x1",
        y: "y1",
        stroke: "firebrick",
        r: 8,
        symbol: "square",
        rough: rSettings()
      }),
      Plot.dot(data, {
        x: "x2",
        y: "y2",
        stroke: "firebrick",
        r: 8,
        symbol: "square",
        rough: rSettings()
      }),
      Plot.link(data, {
        x1: "x1",
        y1: "y1",
        x2: "x2",
        y2: "y2",
        stroke: "cat",
        rough: rSettings()
      })
    ]
  });
}
```

```js
function regressionTest(title) {
  return Plot.plot({
    style: testStyle,
    width: 240,
    height: 180,
    title: title,
    x: { label: "weight", ticks: [] },
    y: { label: "power", ticks: [] },
    marks: [
      Plot.dot(cars, {
        x: "weight (lb)",
        y: "power (hp)",
        stroke: "steelblue",
        rough: rSettings({ strokeWidth: 0.4, roughness: 0.5 })
      }),
      Plot.linearRegressionY(cars, {
        x: "weight (lb)",
        y: "power (hp)",
        stroke: "firebrick",
        rough: rSettings({ strokeWidth: 0.4, fillWeight: 0.3, hachureGap: 1 })
      }),
      Plot.ruleX([0], { rough: rSettings({ roughness: 1, bowing: 3 }) }),
      Plot.ruleY([0], { rough: rSettings({ roughness: 1, bowing: 3 }) })
    ]
  });
}
```

```js
function rectTest(title) {
  return Plot.plot({
    style: testStyle,
    width: 240,
    height: 180,
    title: title,
    marks: [
      Plot.ruleY([0], { stroke: "firebrick", rough: rSettings() }),
      Plot.rectY(d3.bin()(d3.range(1000).map(d3.randomNormal())), {
        x1: "x0",
        x2: "x1",
        y: "length",
        fill: "x0",
        stroke: "firebrick",
        rough: rSettings({ roughness: 1.5 })
      })
    ]
  });
}
```

```js
function ruleTest(title) {
  return Plot.plot({
    style: testStyle,
    width: 240,
    height: 180,
    title: title,
    marks: [
      Plot.ruleY([0], { stroke: "steelblue", rough: rSettings() }),
      Plot.ruleX(d3.bin()(d3.range(1000).map(d3.randomNormal())), {
        x: (d) => (d.x0 + d.x1) / 2,
        y: "length",
        stroke: "firebrick",
        rough: rSettings({ roughness: 1.5 })
      })
    ]
  });
}
```

```js
function tickTest(title) {
  return Plot.plot({
    style: testStyle,
    width: 240,
    height: 180,
    title: title,
    marginTop: 50,
    marginBottom: 50,
    x: { domain: [-4, 4], axis: null },
    marks: [
      Plot.tickX(
        { length: 50 },
        {
          x: d3.randomNormal(),
          stroke: "firebrick",
          rough: rSettings({ strokeWidth: 0.5 })
        }
      )
    ]
  });
}
```

```js
function treeTest(title) {
  const gods = [
    "Chaos/Gaia/Mountains",
    "Chaos/Gaia/Pontus",
    "Chaos/Gaia/Uranus",
    "Chaos/Eros",
    "Chaos/Erebus",
    "Chaos/Tartarus"
  ];
  return Plot.plot({
    style: testStyle,
    width: 240,
    height: 180,
    margin: 20,
    marginLeft: 40,
    marginRight: 80,
    title: title,
    axis: null,

    marks: [Plot.tree(gods, { textStroke: "white", rough: rSettings() })]
  });
}
```

```js
function vectorTest(title) {
  return Plot.plot({
    style: testStyle,
    width: 240,
    height: 180,
    title: title,
    marks: [
      Plot.vector([{ x: 5, y: 5, rotate: 30 }], {
        x: "x",
        y: "y",
        length: 100,
        rotate: "rotate",
        stroke: "firebrick",
        rough: rSettings()
      })
    ]
  });
}
```

```js
function voronoiTest(title) {
  return Plot.plot({
    style: testStyle,
    width: 240,
    height: 180,
    title: title,

    marks: [
      Plot.voronoi(penguins, {
        x: "culmen_depth_mm",
        y: "culmen_length_mm",
        fill: "species",
        fillOpacity: 0.2,
        stroke: "black",
        rough: rSettings({ strokeWidth: 0.5, fillWeight: 1 })
      })
    ]
  });
}
```

```js
function waffleTest(title) {
  return Plot.plot({
    style: testStyle,
    width: 240,
    height: 180,
    title: title,
    x: { label: null },
    marks: [
      Plot.waffleY(
        [
          { fruit: "apples", n: 12 },
          { fruit: "bananas", n: 7 },
          { fruit: "oranges", n: 15 }
        ],
        {
          x: "fruit",
          y: "n",
          gap: 4,
          fill: "fruit",
          stroke: "firebrick",
          rough: rSettings({ strokeWidth: 1, fillStyle: "dots" })
        }
      )
    ]
  });
}
```

For additional sketchy vis, see [these](https://observablehq.com/@jwolondon/sketchy-examples-tu) adapted from Gordon Tu's examples.

---

```js
function roughPlugin(Plot) {
  // Check if already wrapped
  if (Plot.__roughWrapped) {
    return Plot;
  }

  // Mark as wrapped
  Plot.__roughWrapped = true;

  // Keep a reference to the unwrapped version of Plot for non-rough activity
  const originalPlot = Plot.plot;

  // Each set of rough styles requires a unique ID
  let roughId = 0;
  const nextId = () => ++roughId;

  // ------------ Helpers
  const attachHookClass = (mark, prefix) => {
    if (!mark) {
      return null;
    }
    if (mark.__roughSelector) {
      return mark.__roughSelector;
    }
    const cls = `rough-${prefix}-${nextId()}`;
    mark.className = mark.className ? `${mark.className} ${cls}` : cls;
    mark.__roughSelector = `.${cls}`;
    return mark.__roughSelector;
  };

  const wrapPlotFunction = (name) => {
    const orig = Plot[name];
    if (typeof orig !== "function") {
      return;
    }

    Plot[name] = (...args) => {
      let roughOpt;
      let cleanArgs = args;
      const last = args.at(-1);
      if (
        last &&
        typeof last === "object" &&
        !Array.isArray(last) &&
        typeof last[Symbol.iterator] !== "function"
      ) {
        const { rough, ...rest } = last;
        roughOpt = rough;
        cleanArgs = [...args.slice(0, -1), rest];
      }

      const out = orig(...cleanArgs);
      if (!roughOpt) {
        return out;
      }

      const { selector, removeOriginal, ...roughOptions } = roughOpt;
      const attach = (mark, idx) => {
        if (!mark || typeof mark !== "object") {
          return;
        }
        if (selector) {
          mark.__roughSelector = selector;
        } else {
          attachHookClass(mark, idx == null ? name : `${name}-${idx}`);
        }
        mark.rough = { ...roughOptions, removeOriginal: !!removeOriginal };
      };

      if (Array.isArray(out)) {
        let i = 0;
        for (const child of out) {
          if (child && typeof child === "object") {
            attach(child, i++);
          }
        }
        return out;
      } else {
        attach(out);
        return out;
      }
    };
  };

  // Wrap all modifiable plotting functions.
  for (const [k, v] of Object.entries(Plot)) {
    if (k === "legend" || k === "plot" || k === "__roughWrapped") {
      continue;
    }
    if (typeof v === "function") {
      wrapPlotFunction(k);
    }
  }

  // Apply the modified Plot actions
  Plot.plot = (options) => {
    const svg = originalPlot(options);
    const marks = options?.marks || [];

    const applyIf = (m) => {
      if (!m || !m.rough || !m.__roughSelector) {
        return;
      }
      const els = svg.querySelectorAll(m.__roughSelector);
      if (els.length > 0) {
        applyRoughStyling(els, m.rough);
      }
    };

    const walk = (ms) => {
      for (const m of ms) {
        if (Array.isArray(m)) {
          walk(m);
        } else if (m && typeof m === "object") {
          applyIf(m);
        }
      }
    };
    walk(marks);

    // Grids and tick lines that are implict in a channel customisation treated separately to explicit marks.
    const globalRough = options?.rough ?? {};
    const xGridRough = options?.x?.roughGrid ?? globalRough.grid ?? null;
    const yGridRough = options?.y?.roughGrid ?? globalRough.grid ?? null;
    const xTicksRough = options?.x?.roughTicks ?? globalRough.ticks ?? null;
    const yTicksRough = options?.y?.roughTicks ?? globalRough.ticks ?? null;

    const roughify = (nodes, opts) => {
      if (!opts || !nodes?.length) {
        return;
      }
      applyRoughStyling(nodes, opts);
    };

    roughify(svg.querySelectorAll('[aria-label="x-grid"]'), xGridRough);
    roughify(svg.querySelectorAll('[aria-label="y-grid"]'), yGridRough);
    roughify(svg.querySelectorAll('[aria-label="x-axis tick"]'), xTicksRough);
    roughify(svg.querySelectorAll('[aria-label="y-axis tick"]'), yTicksRough);

    return svg;
  };

  return Plot;
}
```

```js
import * as topojson from "npm:topojson-client"
```

```js
const roughJS = await import("https://cdn.skypack.dev/roughjs@4.6.6?min").then((d) => d.default);
```

```js
const barData = [
  { cat: "a", val: 4 },
  { cat: "b", val: 10 },
  { cat: "c", val: 8 },
  { cat: "d", val: 6 }
];
```

```js
const voteData = [
  { letter: "A", votes: 57 },
  { letter: "B", votes: 75 },
  { letter: "C", votes: 60 },
  { letter: "D", votes: 49 },
  { letter: "E", votes: 18 },
  { letter: "F", votes: 36 },
  { letter: "G", votes: 34 },
  { letter: "H", votes: 14 },
  { letter: "I", votes: -40 },
  { letter: "J", votes: 17 },
  { letter: "K", votes: -26 },
  { letter: "L", votes: 3 },
  { letter: "M", votes: -15 },
  { letter: "N", votes: -30 },
  { letter: "O", votes: -50 },
  { letter: "P", votes: -31 },
  { letter: "Q", votes: -86 },
  { letter: "R", votes: -42 },
  { letter: "S", votes: -64 },
  { letter: "T", votes: -70 },
  { letter: "U", votes: -67 },
  { letter: "V", votes: -126 },
  { letter: "W", votes: -66 },
  { letter: "X", votes: 0 },
  { letter: "Y", votes: -94 },
  { letter: "Z", votes: -221 }
];
```

```js
const landGeo = topojson.feature(
  await d3.json(await FileAttachment("../data/landSimplified.json").url()),
  "land"
).features;
```

```js
const testStyle = `font-family: Waiting for the Sunrise; font-size:16;font-weight:900; background-color:rgb(251,249,242)`;
```

```js
function rSettings(options = {}) {
  return {
    roughness: 2,
    bowing: 2,
    fillStyle: "hachure",
    strokeWidth: 2,
    fillWeight: 1.4,
    hachureGap: 4,
    hachureAngle: Math.round(Math.random() * 360) - 180,
    ...options
  };
}
```

```js
const rSVGCache = new WeakMap();
```

```js
function applyRoughStyling(nodes, options) {
  const { removeOriginal = false, ...base } = options ?? {};

  // For checking if an element is not present/visible so does not need rough styling
  // Matches "... / 0)" across rgb/rgba/hsl/hsla/color()
  const RE_ALPHA_ZERO = /\/\s*0\)?$/i;
  const DRAWABLE_TAGS = new Set([
    "rect",
    "circle",
    "path",
    "line",
    "polygon",
    "polyline"
  ]);

  const isNone = (v) => {
    if (v == null) {
      return true;
    }
    const s = String(v).trim();
    if (
      s === "" ||
      s.toLowerCase() === "none" ||
      s.toLowerCase() === "transparent"
    ) {
      return true;
    }
    if (
      s === "rgba(0, 0, 0, 0)" ||
      s === "rgba(0 0 0 / 0)" ||
      s === "hsla(0, 0%, 0%, 0)" ||
      s === "hsla(0 0% 0% / 0)" ||
      RE_ALPHA_ZERO.test(s.toLowerCase())
    ) {
      return true;
    }
    return false;
  };

  // ---------- Other helpers
  const nearestAttr = (el, name) => {
    let n = el;
    while (n && n.nodeType === 1) {
      const v = n.getAttribute(name);
      if (!isNone(v)) {
        if (v === "currentColor" || v === "currentcolor") {
          const c = getComputedStyle(n).color;
          return isNone(c) ? undefined : c;
        }
        return v;
      }
      n = n.parentElement;
    }
    return undefined;
  };

  const readPaint = (el, name) => {
    if (el.hasAttribute(name)) {
      return el.getAttribute(name);
    }
    return nearestAttr(el, name);
  };

  // Closed-path detector for geometry-based defaults (bars can render as closed paths if rounded corners)
  const isClosedPath = (el) => {
    if (!el || el.tagName?.toLowerCase() !== "path") {
      return false;
    }
    const d = el.getAttribute("d");
    return !!(d && /[Zz]\s*$/.test(d.trim()));
  };

  const getRough = (owner) => {
    if (!rSVGCache.has(owner)) {
      rSVGCache.set(owner, roughJS.svg(owner));
    }
    return rSVGCache.get(owner);
  };

  const parsePoints = (points) =>
    points
      .trim()
      .split(/\s+/)
      .map((p) => p.split(",").map(Number));

  const makeRoughEl = (roughSvg, tag, el, opts) => {
    if (tag === "rect") {
      const x = +el.getAttribute("x") || 0;
      const y = +el.getAttribute("y") || 0;
      const w = +el.getAttribute("width");
      const h = +el.getAttribute("height");
      if (Number.isFinite(w) && Number.isFinite(h)) {
        return roughSvg.rectangle(x, y, w, h, opts);
      }
    } else if (tag === "circle") {
      const cx = +el.getAttribute("cx");
      const cy = +el.getAttribute("cy");
      const r = +el.getAttribute("r");
      if ([cx, cy, r].every(Number.isFinite)) {
        return roughSvg.circle(cx, cy, 2 * r, opts);
      }
    } else if (tag === "path") {
      const d = el.getAttribute("d");
      if (d) {
        return roughSvg.path(d, opts);
      }
    } else if (tag === "line") {
      const x1 = +el.getAttribute("x1");
      const y1 = +el.getAttribute("y1");
      const x2 = +el.getAttribute("x2");
      const y2 = +el.getAttribute("y2");
      if ([x1, y1, x2, y2].every(Number.isFinite)) {
        return roughSvg.line(x1, y1, x2, y2, opts);
      }
    } else if (tag === "polygon") {
      const pts = el.getAttribute("points");
      if (pts) {
        const coords = parsePoints(pts);
        if (
          coords.every(([x, y]) => Number.isFinite(x) && Number.isFinite(y))
        ) {
          return roughSvg.polygon(coords, opts);
        }
      }
    } else if (tag === "polyline") {
      const pts = el.getAttribute("points");
      if (pts) {
        const coords = parsePoints(pts);
        if (
          coords.every(([x, y]) => Number.isFinite(x) && Number.isFinite(y))
        ) {
          return roughSvg.linearPath(coords, opts);
        }
      }
    }
    return null;
  };

  for (const node of nodes) {
    if (
      !(node instanceof Element) ||
      (node.closest && node.closest("defs, clipPath"))
    ) {
      continue;
    }

    const svgRoot = node.ownerSVGElement ?? node;
    const roughSvg = getRough(svgRoot);
    const tag0 = node.tagName?.toLowerCase();
    const isDrawable0 = DRAWABLE_TAGS.has(tag0);

    const elements = isDrawable0
      ? [node]
      : node.querySelectorAll("rect, circle, path, line, polygon, polyline");

    for (const el of elements) {
      if (!(el instanceof Element) || el.closest("defs, clipPath")) {
        continue;
      }

      const tag = el.tagName.toLowerCase();

      // Read only what is explicitly present on the element or in ancestors
      let effFill = readPaint(el, "fill");
      let effStroke = readPaint(el, "stroke");

      // Respect explicit 0-opacity on element: treat as none.
      const fo = Number.parseFloat(el.getAttribute("fill-opacity"));
      const so = Number.parseFloat(el.getAttribute("stroke-opacity"));
      if (Number.isFinite(fo) && fo <= 0) {
        effFill = "none";
      }
      if (Number.isFinite(so) && so <= 0) {
        effStroke = "none";
      }

      // Geometry-based intent when nothing explicit is provided
      const closed = tag === "path" && isClosedPath(el);
      const isLinearGeom =
        tag === "line" || tag === "polyline" || (tag === "path" && !closed);

      // If both paints are absent/none, infer by geometry to mimic Plot default
      if (isNone(effFill) && isNone(effStroke)) {
        if (tag === "circle" || isLinearGeom) {
          // Plot.dot / lines default: stroke-only, no fill
          effStroke = "black";
          effFill = "none";
        } else {
          // Rects / polygons / closed paths default to fill-only, no stroke
          effFill = "black";
          effStroke = "none";
        }
      }

      // Map effective paint to RoughJS options.
      const fillOpt = isNone(effFill) ? undefined : effFill;
      let strokeOpt = isNone(effStroke) ? "none" : effStroke;
      const sw = Number.parseFloat(el.getAttribute("stroke-width"));
      let strokeWidthOpt =
        strokeOpt !== "none" && Number.isFinite(sw) && sw > 0 ? sw : undefined;
      if (strokeOpt !== "none" && strokeWidthOpt == null) {
        strokeWidthOpt = 1;
      }

      const opts = {
        ...base,
        fill: base.fill !== undefined ? base.fill : fillOpt,
        stroke: base.stroke !== undefined ? base.stroke : strokeOpt,
        strokeWidth:
          base.strokeWidth !== undefined ? base.strokeWidth : strokeWidthOpt
      };

      // Fill-only: ensure visible hachures and no outline.
      if (
        opts.fill !== undefined &&
        (opts.stroke === "none" || isNone(opts.stroke))
      ) {
        if (opts.hachureColor === undefined) {
          opts.hachureColor = opts.fill;
        }
        if (opts.fillWeight === undefined) {
          const w = Number.isFinite(opts.strokeWidth) ? opts.strokeWidth : 1;
          opts.fillWeight = w > 0 ? w : 1;
        }
        if (opts.fillStyle === undefined) {
          opts.fillStyle = "hachure";
        }
        // Keep a real stroke so RoughJS draws, but make it invisible.
        opts.stroke = "rgba(0,0,0,0)";
        if (!(Number.isFinite(opts.strokeWidth) && opts.strokeWidth > 0)) {
          opts.strokeWidth = 1;
        }
      }

      const roughEl = makeRoughEl(roughSvg, tag, el, opts);
      if (!roughEl) {
        continue;
      }

      for (const attr of [
        "transform",
        "clip-path",
        "mask",
        "filter",
        "opacity"
      ]) {
        const v = el.getAttribute(attr);
        if (v != null) {
          roughEl.setAttribute(attr, v);
        }
      }

      roughEl.setAttribute("aria-hidden", "true");
      roughEl.setAttribute("role", "presentation");
      roughEl.setAttribute("pointer-events", "none");
      roughEl.setAttribute("class", "rough-element roughjs");

      el.after(roughEl);
      if (removeOriginal) {
        el.remove();
      } else {
        el.setAttribute("fill-opacity", "0");
        el.setAttribute("stroke-opacity", "0");
      }
    }
  }
}
```

```js
const PlotModule = await import("npm:@observablehq/plot");
// Don't modify the module directly, create a wrapper
const Plot = {...PlotModule};
roughPlugin(Plot);
```
