---
source: https://observablehq.com/@fil/plot-voronoi-labels
index: true
---

# Voronoi labels

Using the [Voronoi diagram](https://github.com/d3/d3-delaunay) to limit label occlusion. See also [D3: Voronoi labels](../d3/voronoi-labels), [occlusion](https://observablehq.com/@fil/occlusion), and [Plot issue #27](https://github.com/observablehq/plot/issues/27).

```js
const showVoronoi = view(Inputs.toggle({label: "show voronoi", value: true}));
const activate = view(Inputs.toggle({label: "move to centroids", value: true}));
```

```js echo
const chart = Plot.plot({
  width,
  height: width * 0.7,
  inset: 20,
  marks: [
    Plot.frame(),
    showVoronoi ? Plot.voronoiMesh(airports, {x: "longitude", y: "latitude"}) : null,
    Plot.arrow(
      airports,
      maybeVoronoiCentroids({
        x1: "longitude",
        y1: "latitude",
        x2: "longitude",
        y2: "latitude",
        stroke: "currentColor",
        strokeWidth: 0.7,
        bend: true,
        headLength: 0
      })
    ),
    Plot.dot(airports, {
      x: "longitude",
      y: "latitude",
      r: 1.5,
      fill: "currentColor"
    }),
    Plot.text(
      airports,
      maybeVoronoiCentroids({
        x: "longitude",
        y: "latitude",
        text: (d) => d.name.split(/ /)[0],
        stroke: "var(--plot-background)",
        strokeWidth: 7,
        fill: "currentColor"
      })
    )
  ]
});

display(chart);
```

The custom **voronoiCentroids** options transform (code below) modifies the ﹤ x, y ﹥ position channels (for the text mark)—and ﹤ x2, y2 ﹥, for the link mark— to reflect the cendroid of the associated polygon in the Voronoi diagram created by the data. This allows to position text labels where there is more space, thus limiting occlusion. If you pass a link or arrow mark, that has ﹤ x1, y1, x2, y2 ﹥ positions, the ﹤ x1, y1 ﹥ channels are left intact as the starting point, with ﹤ x2, y2 ﹥ being the end point.

```js echo
const voronoiCentroids = (options) =>
  Plot.initializer(
    options,
    function (
      data,
      facets,
      {x: X0, y: Y0, x2: X2, y2: Y2},
      {x, y},
      {width, height, marginLeft, marginRight, marginTop, marginBottom},
      context
    ) {
      const X = X2 ?? X0;
      const Y = Y2 ?? Y0;
      if (X.scale !== "x") x = (x) => x;
      if (Y.scale !== "y") y = (y) => y;

      for (const I of facets) {
        const v = d3.Delaunay.from(
          I,
          (i) => x(X.value[i]),
          (i) => y(Y.value[i])
        ).voronoi([marginLeft, marginTop, width - marginRight, height - marginBottom]);
        let cell;
        for (const [i, k] of I.entries()) {
          if ((cell = v.cellPolygon(k))) {
            const [x, y] = d3.polygonCentroid(cell);
            X.value[i] = x;
            Y.value[i] = y;
          }
        }
      }
      delete X.scale;
      delete Y.scale;
      return {data, facets};
    }
  );
```

```js echo
const maybeVoronoiCentroids = activate ? voronoiCentroids : (options) => options;
```

---

_data_

```js echo
const airports = FileAttachment("../data/airports.csv")
  .csv({typed: true})
  .then((data) => data.filter((d, i) => i % 20 === 0));
```
