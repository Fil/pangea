---
source: https://observablehq.com/@observablehq/qq-plot
index: true
---

# Quantile-quantile plot

A [quantile-quantile plot](https://en.wikipedia.org/wiki/Q–Q_plot) compares two distributions. If the two are similar, the points will fall approximately along the diagonal; if not, the points will deviate from the diagonal, revealing differences. This example compares the strengths of two batches of ceramics: the first appears to be significantly stronger. Data: [NIST](https://www.itl.nist.gov/div898/handbook/eda/section4/eda42a1.htm)

```js echo
const chart = qq({
  x: jahanmi2.filter((d) => d.Bat === 2).map((d) => d.Y), // batch 2
  y: jahanmi2.filter((d) => d.Bat === 1).map((d) => d.Y), // batch 1
  stroke: "steelblue"
}).plot({
  aspectRatio: 1,
  grid: true,
  nice: true,
  x: {label: "Batch 2 →"},
  y: {label: "↑ Batch 1"}
});

display(chart);
```

```js echo
let jahanmi2;
{
  const text = await FileAttachment("../data/JAHANMI2.DAT").text();
  const lines = text.split("\r\n").slice(48, -1);
  const [header, , ...rows] = lines.map((l) => l.trim().split(/\s+/g));
  jahanmi2 = rows.map((r) => Object.fromEntries(header.map((h, i) => [h, +r[i]])));
}
```

---

## Implementation

Per NIST: “If the data sets are not of equal size, the quantiles are usually picked to correspond to the sorted values from the smaller data set and then the quantiles for the larger data set are interpolated.”

```js echo
function qq({x: X, y: Y, ...options} = {}) {
  const n = Math.min(X.length, Y.length);

  function q(qi, i, Q) {
    if (Q.length === n) return qi; // no interpolation required
    const j = (i / (n - 1)) * (Q.length - 1);
    const j0 = Math.floor(j);
    const t = j - j0;
    return t ? Q[j0] * (1 - t) + Q[j0 + 1] * t : Q[j0];
  }

  // Sort X and Y; interpolate as needed if the sets are different size.
  X = d3.sort(X).map(q);
  Y = d3.sort(Y).map(q);

  // Compute the extent in X and Y.
  const min = Math.min(X[0], Y[0]);
  const max = Math.max(X[n - 1], Y[n - 1]);

  return Plot.marks(
    Plot.link({length: 1}, {x1: min, y1: min, x2: max, y2: max}),
    Plot.dot({length: n}, {...options, x: X, y: Y})
  );
}
```
