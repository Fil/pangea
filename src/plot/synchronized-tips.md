---
index: true
---

# Synchronized tips

This adds tips to a mark; we render then immediately hide all the tips, revealing them later when hovering, based on their index. Useful when joining several charts, _assuming they use the same index._

(See also https://observablehq.com/d/5a386abaa1549df2)

<div class="grid grid-cols-2">
  <div class="card">${resize(width => Plot.plot({
    width,
    height: 250,
    marks: [
      sharedtips(Plot.dot, penguins, {
        x: "body_mass_g",
        y: "flipper_length_mm",
        stroke: "species"
      })
    ]
  })
)}</div>
  <div class="card">${resize(width => Plot.plot({
    width,
    height: 250,
    marks: [
      sharedtips(Plot.dot, penguins, {
        x: "culmen_depth_mm",
        y: "culmen_length_mm",
        fill: "species"
      })
    ]
  })
)}</div>
</div>

```js run=false
Plot.plot({
  width,
  height: 250,
  marks: [
    sharedtips(Plot.dot, penguins, {
      x: "body_mass_g",
      y: "flipper_length_mm",
      stroke: "species"
    })
  ]
})

Plot.plot({
  width,
  height: 250,
  marks: [
    sharedtips(Plot.dot, penguins, {
      x: "culmen_depth_mm",
      y: "culmen_length_mm",
      fill: "species"
    })
  ]
})
</div>
```

```js echo
function sharedtips(mark, data, options, className = "shared-tips") {
  return [
    mark(data, {
      ...options,
      tip: {
        render(index, scales, values, dimensions, context, next) {
          index = new Set(index);
          if (context.ownerSVGElement.isConnected) {
            d3.selectAll(`.${className}>g`)
              .attr("display", "none")
              .each(function (i) {
                if (index.has(i)) this.setAttribute("display", null);
              });
          }
        }
      }
    }),
    Plot.tip(data, {
      ...options,
      ...options.tip,
      render(index, scales, values, dimensions, context, next) {
        const g = next(index, scales, values, dimensions, context);
        g.classList.add(className);
        for (const d of g.childNodes) d.setAttribute("display", "none");
        return g;
      }
    })
  ];
}
```

_A known issue is that when you click on a tip… it doesn't prevent tips from another panel to respond to events. Probably fixable._
