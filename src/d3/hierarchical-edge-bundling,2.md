---
source: https://observablehq.com/@d3/hierarchical-edge-bundling/2
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Hierarchical edge bundling II</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Hierarchical edge bundling II

This chart shows relationships among classes in a software hierarchy. Each directed edge, going from <b style="color: ${color(0.1)};">source</b> to <b style="color: ${color(0.9)};">target</b>, corresponds to an import.

```js echo
const chart = {
  const width = 954;
  const radius = width / 2;
  const k = 6; // 2^k colors segments per curve

  const tree = d3.cluster()
      .size([2 * Math.PI, radius - 100]);
  const root = tree(bilink(d3.hierarchy(data)
      .sort((a, b) => d3.ascending(a.height, b.height) || d3.ascending(a.data.name, b.data.name))));

  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", width)
      .attr("viewBox", [-width / 2, -width / 2, width, width])
      .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

  const node = svg.append("g")
    .selectAll()
    .data(root.leaves())
    .join("g")
      .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`)
    .append("text")
      .attr("dy", "0.31em")
      .attr("x", d => d.x < Math.PI ? 6 : -6)
      .attr("text-anchor", d => d.x < Math.PI ? "start" : "end")
      .attr("transform", d => d.x >= Math.PI ? "rotate(180)" : null)
      .text(d => d.data.name)
      .call(text => text.append("title").text(d => `${id(d)}
${d.outgoing.length} outgoing
${d.incoming.length} incoming`));

  const line = d3.lineRadial()
      .curve(d3.curveBundle)
      .radius(d => d.y)
      .angle(d => d.x);

  const path = ([source, target]) => {
    const p = new Path;
    line.context(p)(source.path(target));
    return p;
  };

  svg.append("g")
      .attr("fill", "none")
    .selectAll()
    .data(d3.transpose(root.leaves()
      .flatMap(leaf => leaf.outgoing.map(path))
      .map(path => Array.from(path.split(k)))))
    .join("path")
      .style("mix-blend-mode", "darken")
      .attr("stroke", (d, i) => color(d3.easeQuad(i / ((1 << k) - 1))))
      .attr("d", d => d.join(""));

  return svg.node();
}
```

```js echo
const data = hierarchy(await FileAttachment("flare.json").json());
```

```js echo
function hierarchy(data, delimiter = ".") {
  let root;
  const map = new Map();
  data.forEach(function find(data) {
    const {name} = data;
    if (map.has(name)) return map.get(name);
    const i = name.lastIndexOf(delimiter);
    map.set(name, data);
    if (i >= 0) {
      find({name: name.substring(0, i), children: []}).children.push(data);
      data.name = name.substring(i + 1);
    } else {
      root = data;
    }
    return data;
  });
  return root;
}
```

```js echo
function bilink(root) {
  const map = new Map(root.leaves().map((d) => [id(d), d]));
  for (const d of root.leaves()) (d.incoming = []), (d.outgoing = d.data.imports.map((i) => [d, map.get(i)]));
  for (const d of root.leaves()) for (const o of d.outgoing) o[1].incoming.push(o);
  return root;
}
```

```js echo
function id(node) {
  return `${node.parent ? id(node.parent) + "." : ""}${node.data.name}`;
}
```

```js echo
class Path {
  constructor(_) {
    this._ = _;
    this._m = undefined;
  }
  moveTo(x, y) {
    this._ = [];
    this._m = [x, y];
  }
  lineTo(x, y) {
    this._.push(new Line(this._m, (this._m = [x, y])));
  }
  bezierCurveTo(ax, ay, bx, by, x, y) {
    this._.push(new BezierCurve(this._m, [ax, ay], [bx, by], (this._m = [x, y])));
  }
  *split(k = 0) {
    const n = this._.length;
    const i = Math.floor(n / 2);
    const j = Math.ceil(n / 2);
    const a = new Path(this._.slice(0, i));
    const b = new Path(this._.slice(j));
    if (i !== j) {
      const [ab, ba] = this._[i].split();
      a._.push(ab);
      b._.unshift(ba);
    }
    if (k > 1) {
      yield* a.split(k - 1);
      yield* b.split(k - 1);
    } else {
      yield a;
      yield b;
    }
  }
  toString() {
    return this._.join("");
  }
}
```

```js echo
class Line {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
  split() {
    const {a, b} = this;
    const m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    return [new Line(a, m), new Line(m, b)];
  }
  toString() {
    return `M${this.a}L${this.b}`;
  }
}
```

```js echo
const BezierCurve = {
  const l1 = [4 / 8, 4 / 8, 0 / 8, 0 / 8];
  const l2 = [2 / 8, 4 / 8, 2 / 8, 0 / 8];
  const l3 = [1 / 8, 3 / 8, 3 / 8, 1 / 8];
  const r1 = [0 / 8, 2 / 8, 4 / 8, 2 / 8];
  const r2 = [0 / 8, 0 / 8, 4 / 8, 4 / 8];

  function dot([ka, kb, kc, kd], {a, b, c, d}) {
    return [
      ka * a[0] + kb * b[0] + kc * c[0] + kd * d[0],
      ka * a[1] + kb * b[1] + kc * c[1] + kd * d[1]
    ];
  }

  return class BezierCurve {
    constructor(a, b, c, d) {
      this.a = a;
      this.b = b;
      this.c = c;
      this.d = d;
    }
    split() {
      const m = dot(l3, this);
      return [
        new BezierCurve(this.a, dot(l1, this), dot(l2, this), m),
        new BezierCurve(m, dot(r1, this), dot(r2, this), this.d)
      ];
    }
    toString() {
      return `M${this.a}C${this.b},${this.c},${this.d}`;
    }
  };
}
```

```js echo
const color = (t) => d3.interpolateRdBu(1 - t);
```
