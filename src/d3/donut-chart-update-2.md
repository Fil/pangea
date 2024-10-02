---
index: true
source: https://blocks.roadtolarissa.com/mbostock/5682158
---

# Donut chart update II

This variation of a [donut chart](./donut-chart) demonstrates how to build up a chart with animated transitions when new slices are added or removed. See [Donut chart update](./donut-chart-update) for a simpler case.

```js echo
const height = Math.min(500, width / 2);
const outerRadius = height / 2 - 10;
const innerRadius = outerRadius * 0.75;
const tau = 2 * Math.PI;
const color = d3.scaleOrdinal(d3.schemeObservable10);
const svg = d3.create("svg")
    .attr("viewBox", [-width/2, -height/2, width, height]);
const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);
const pie = d3.pie().sort(null).value((d) => d.value);

const key = ({id}) => id;

function change(data) {
  const path = svg.selectAll("path");
  const data0 = path.data();
  const data1 = pie(data);

  path.data(data1, key)
  .join(
    enter => enter.append("path")
      .each(function(d, i) { this._current = findNeighborArc(i, data0, data1, key) || d; })
      .attr("fill", function(d) { return color(d.id); }),
      update => update,
      exit => exit
        .datum(function(d, i) { return findNeighborArc(i, data1, data0, key) || d; })
        .transition()
          .duration(750)
          .attrTween("d", arcTween)
          .remove()
  );

  path.transition()
      .duration(750)
      .attrTween("d", arcTween);
}


function findNeighborArc(i, data0, data1, key) {
  var d;
  return (d = findPreceding(i, data0, data1, key)) ? {startAngle: d.endAngle, endAngle: d.endAngle}
      : (d = findFollowing(i, data0, data1, key)) ? {startAngle: d.startAngle, endAngle: d.startAngle}
      : null;
}

// Find the element in data0 that joins the highest preceding element in data1.
function findPreceding(i, data0, data1, key) {
  var m = data0.length;
  while (--i >= 0) {
    var k = key(data1[i]);
    for (var j = 0; j < m; ++j) {
      if (key(data0[j]) === k) return data0[j];
    }
  }
}

// Find the element in data0 that joins the lowest following element in data1.
function findFollowing(i, data0, data1, key) {
  var n = data1.length, m = data0.length;
  while (++i < n) {
    var k = key(data1[i]);
    for (var j = 0; j < m; ++j) {
      if (key(data0[j]) === k) return data0[j];
    }
  }
}

// Store the displayed angles in _current.
// Then, interpolate from _current to the new angles.
// During the transition, _current is updated in-place by d3.interpolate.
function arcTween(a) {
  const i = d3.interpolate(this._current, a);
  this._current = i(0);
  return (t) => arc(i(t));
}

// Displays the svg node.
display(svg.node());
```

```js
const data = [{id: 0, value: 1}];

const interval = d3.interval(() => {
  data.push({id: Math.random(), value: Math.random()});
  if (data.length > 5) data.splice(0, data.length * Math.random(), 1)
  change(data);
}, 1000);

invalidation.then(() => interval.stop());
```
