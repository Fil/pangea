---
source: https://observablehq.com/@d3/d3-packenclose
author: Mike Bostock
index: true
---

# d3.packEnclose

<p class=author>by <a href="https://observablehq.com/@mbostock">Mike Bostock</a></p>

[d3.packEnclose](https://d3js.org/d3-hierarchy/pack#packEnclose) computes the smallest circle that encloses the given circles. Given an array of objects [{*x*, *y*, *r*}, …] representing circles centered at ${tex`\langle x,y \rangle`} with radius ${tex`r`}, it returns an object {_x_, _y_, _r_} that represents the smallest enclosing circle.

```js echo
const circles = Array.from({length: 20}, () => ({
  x: ((Math.random() - 0.5) / 2 + 0.5) * width,
  y: ((Math.random() - 0.5) / 2 + 0.5) * height,
  r: (Math.random() + 0.5) * 20
}));
```

```js echo
const enclosingCircle = d3.packEnclose(circles);
```

```js
svg`<svg style="width:${width}px;height:auto;display:block;overflow:visible;" viewBox="0 0 ${width} ${height}">
  <g fill="none" stroke="red">
    <circle cx="${enclosingCircle.x}" cy="${enclosingCircle.y}" r="${enclosingCircle.r}" />
  </g>
  <g fill-opacity="0.1" stroke="currentColor">
    ${circles.map(({x, y, r}) => svg`<circle cx="${x}" cy="${y}" r="${r}" />`)}
  </g>
</svg>`
```

d3.packEnclose is used in conjunction with [d3.packSiblings](https://d3js.org/d3-hierarchy/pack#packSiblings) by [d3.pack](/@d3/circle-packing) to compute the bounding circle for each internal node in a circle-packing diagram.

But how does d3.packEnclose work? Let’s watch!

```js
const replay = view(html`<button>Replay</button>`);
```

```js
const context = context2d(width, 500);
display(context.canvas);

const L = d3.packSiblings(d3.range(200).map(() => ({r: Math.random() * 22})));

replay;

(async () => {
  for (const S of encloseStar(L)) {
    console.warn("yo")
    context.save();
    context.clearRect(0, 0, width, 500);
    context.translate(width / 2, 250);

    if (S.e) {
      context.beginPath();
      context.moveTo(S.e.x + S.e.r, S.e.y);
      context.arc(S.e.x, S.e.y, S.e.r, 0, 2 * Math.PI);
      context.strokeStyle = "red";
      context.stroke();
    }

    context.beginPath();
    L.forEach(p => {
      context.moveTo(p.x + p.r, p.y);
      context.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
    });
    context.strokeStyle = "#ccc";
    context.stroke();

    if (S.i) {
      context.beginPath();
      S.L.forEach(p => {
        context.moveTo(p.x + p.r, p.y);
        context.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
      });
      context.fillStyle = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
      context.fill();
      context.strokeStyle = dark ? "white" : "black";
      context.stroke();
    }

    context.beginPath();
    S.B.forEach(p => {
      context.moveTo(p.x + p.r, p.y);
      context.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
    });
    context.fillStyle = dark ? "white" : "black";
    context.fill();

    context.restore();
    await new Promise((resolve) => setTimeout(() => resolve(true), 10));
    await visibility();
  }
})();
```

To start, let’s think about how to represent an enclosing circle. As you drag circles <nobr>_L_ <svg style="overflow:visible;" width="1.8em" height="1em" fill-opacity="0.1" stroke-width="1.5" stroke="currentColor" viewBox="-10 -10 36 20">
<circle r="8"></circle>
<circle cx="17" cy="6" r="7"></circle>
</svg></nobr> below, notice that the enclosing circle <nobr>_e_ <svg style="overflow:visible;" width="1em" height="1em" viewBox="-10 -10 20 20" stroke-width="1.5">
<circle fill="none" stroke="red" cy="2" r="8"></circle>
</svg></nobr> only moves when you move a circle that is _tangent_ to the enclosing circle, and that the set of tangent circles <svg style="overflow:visible;" width="1.8em" height="1em" viewBox="-10 -10 36 20" stroke="currentColor">
<circle r="8"></circle>
<circle cx="17" cy="6" r="7"></circle>
</svg> depends on how the circles are arranged.

```js
{
  const svg = d3.create("svg").attr("viewBox", [0, 0, width, height])
    .style("overflow", "visible")
    .datum([
      {x: 302, y: 105, r: 47},
      {x: 290, y: 231, r: 23},
      {x: 265, y: 320, r: 22},
      {x: 413, y: 182, r: 20},
      {x: 298, y: 206, r: 17},
      {x: 245, y: 171, r: 13},
      {x: 367, y: 276, r: 12},
      {x: 222, y: 219, r: 10},
      {x: 331, y: 152, r: 9},
      {x: 286, y: 141, r: 4}
    ]);

  const e = svg.append("circle").attr("stroke", "red").attr("fill", "none");

  const p = svg
    .append("g")
    .attr("stroke", "currentColor")
    .attr("fill", "currentColor")
    .attr("fill-opacity", 0.1)
    .attr("cursor", "move")
    .selectAll("circle")
    .data((d) => d)
    .enter()
    .append("circle")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", (d) => d.r)
    .call(d3.drag().on("drag", dragged));

  svg
    .append("path")
    .attr("class", "path-move")
    .attr("transform", `translate(20,${height - 20})scale(0.05)`)
    .attr("d", path)
    .append("title")
    .text("Try dragging a circle!");

  function dragged(event, d) {
    d3.select(this)
      .attr("cx", (d.x = Math.max(0, Math.min(width, event.x))))
      .attr("cy", (d.y = Math.max(0, Math.min(height, event.y))));

    update();
  }

  function update() {
    var d = enclose(svg.datum());
    e.attr("cx", d.x).attr("cy", d.y).attr("r", d.r);
    p.attr("fill-opacity", (p) => (d.basis.indexOf(p) < 0 ? 0.1 : 1));
  }

  update();

  display(svg.node());
}
```

Depending on how you arrange the circles, there can be one, two or three tangent circles. This set of tangent circles is called the _basis_ for the enclosing circle.

But before we can compute this basis, we’ll first need to be able to test whether a circle encloses another circle. A circle _a_ encloses a circle _b_ if and only if _a_’s radius is greater than or equal to _b_’s radius plus the distance between the two circles’ centers. Expressed as an inequality:

```js
tex.block`r_a \geq r_b + \sqrt{(x_a - x_b)^2 + (y_a - y_b)^2}`;
```

In the diagram below, the larger circle <svg style="overflow:visible;" width="1em" height="1em" viewBox="-10 -10 20 20" stroke-width="1.5">
<circle cy="2" fill="none" stroke="currentColor" r="8"></circle>
</svg> represents _a_ and
the smaller circle <svg style="overflow:visible;" width="1em" height="1em" viewBox="-10 -10 20 20" stroke-width="1.5">
<circle cy="2" fill-opacity="0.1" stroke="currentColor" r="8"></circle>
</svg> represents _b_. The inequality value can be seen
as the radius of gray circle <svg style="overflow:visible;" width="1em" height="1em" viewBox="-10 -10 20 20" stroke-width="1.5">
<circle cy="2" fill="none" stroke="gray" r="8"></circle>
</svg>. Drag the circle _b_ to see how its position affects whether or not it is enclosed by _a_.

```js
{
  const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]).style("overflow", "visible");

  const delta = svg.append("line").attr("stroke", "currentColor").attr("stroke-width", 2);

  const a = svg
    .append("g")
    .datum({x: 290, y: 201, r: 144})
    .attr("transform", (d) => `translate(${d.x},${d.y})`);

  a.append("circle")
    .attr("stroke", "currentColor")
    .attr("fill", "none")
    .attr("r", (d) => d.r);

  a.append("circle")
    .attr("fill", "currentColor")
    .attr("r", 3.5);

  a.append("circle").attr("class", "gray").attr("stroke", "gray").attr("fill", "none");

  const b = svg.append("g").datum({x: 302, y: 130, r: 47}).attr("cursor", "move").call(d3.drag().on("drag", dragged));

  b.append("circle")
    .attr("fill", "currentColor")
    .attr("fill-opacity", 0.1)
    .attr("r", (d) => d.r);

  b.append("circle")
    .attr("fill", "currentColor")
    .attr("r", 3.5);

  svg
    .append("path")
    .attr("class", "path-move")
    .attr("transform", `translate(20,${height - 20})scale(0.05)`)
    .attr("d", path)
    .append("title")
    .text("Try dragging a circle!");

  function dragged(event) {
    var bd = b.datum();
    bd.x = Math.max(0, Math.min(width, event.x));
    bd.y = Math.max(0, Math.min(height, event.y));
    update();
  }

  function update() {
    var ad = a.datum(),
      bd = b.datum(),
      e = encloses(ad, bd),
      dx = bd.x - ad.x,
      dy = bd.y - ad.y,
      l = Math.sqrt(dx * dx + dy * dy);

    b.attr("transform", (d) => `translate(${d.x},${d.y})`)
      .select("circle")
      .attr("stroke", e ? "currentColor" : "red")
      .attr("fill", e ? "currentColor" : "red");

    a.select(".gray").attr("r", l + bd.r);

    delta
      .attr("stroke", e ? "currentColor" : "red")
      .attr("x1", ad.x)
      .attr("y1", ad.y)
      .attr("x2", bd.x)
      .attr("y2", bd.y);
  }

  update();

  display(svg.node());
}
```

To avoid the square root, we can instead test two equivalent inequalities:

```js
tex.block`r_a - r_b \geq 0`;
```

```js
tex.block`(r_a - r_b)^2 \geq (x_a - x_b)^2 + (y_a - y_b)^2`;
```

This works because the square root is a monotonic function. In code:

```js echo
// Given two circles a and b, returns true iff b ⊆ a.
function encloses(a, b) {
  const dr = a.r - b.r;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return dr >= 0 && dr * dr > dx * dx + dy * dy;
}
```

To test whether a given circle _a_ encloses all of the circles in array _B_, a loop:

```js echo
// Given a circle a and set B, returns true iff b ⊆ a for every b ∈ B.
function enclosesAll(a, B) {
  for (var i = 0; i < B.length; ++i) {
    if (!encloses(a, B[i])) {
      return false;
    }
  }
  return true;
}
```

The final implementation uses slightly different “weak” variations of these methods that use a small epsilon to address imprecise floating point calculations.

```js echo
function enclosesWeak(a, b) {
  const dr = a.r - b.r + 1e-6;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return dr > 0 && dr * dr > dx * dx + dy * dy;
}
```

```js echo
function enclosesWeakAll(a, B) {
  for (var i = 0; i < B.length; ++i) {
    if (!enclosesWeak(a, B[i])) {
      return false;
    }
  }
  return true;
}
```

### Finding an Initial Basis

Armed with only this test, we have the start of a potential algorithm—we’ll call it dumb luck: we can pick the first of the input circles and test whether it encloses the other circles. In fact, this is a reasonable strategy not only if you are lucky, but if there is only one input circle: the circle encloses itself by definition.

```js echo
// Given the set L = {a}, returns the enclosing circle.
function enclose1(a) {
  return encloseBasis1(a);
}
```

```js echo
// Given the basis B = {a}, returns the enclosing circle.
function encloseBasis1(a) {
  return {x: a.x, y: a.y, r: a.r};
}
```

But what if there is more than one input circle? Or if none of the input circles contains all the other input circles? We’ll need to handle these cases, too. Let’s work our way up slowly.

If we have two input circles, and neither contains the other, we can compute the smallest circle that contains them using only geometry: the enclosing circle is [internally tangent](http://mathworld.wolfram.com/TangentCircles.html) to the two input circles. The diameter of this tangent circle <svg style="overflow:visible;" width="1em" height="1em" viewBox="-10 -10 20 20" stroke-width="1.5">
<circle cy="2" fill="none" stroke="red" r="8"></circle>
</svg> is the distance between the centers of _a_ and _b_ plus the radii of _a_ and _b_. Likewise, the center of the tangent circle lies on the line intersecting the two centers of _a_ and _b_.

```js
{
  const svg = d3.create("svg").attr("viewBox", [0, 0, width, height])
    .style("overflow", "visible")
    .datum([
      {x: 290, y: 201, r: 80},
      {x: 302, y: 130, r: 47}
    ]);

  const delta = svg.append("line").attr("stroke", "red").attr("stroke-width", 2).attr("stroke-linecap", "round");

  const e = svg.append("g");

  e.append("circle").attr("fill", "none").attr("stroke", "red");

  e.append("circle").attr("fill", "red").attr("r", 3.5);

  const circle = svg
    .append("g")
    .attr("cursor", "move")
    .selectAll("g")
    .data((d) => d)
    .enter()
    .append("g")
    .attr("transform", (d) => `translate(${d.x},${d.y})`)
    .call(d3.drag().on("drag", dragged));

  circle
    .append("circle")
    .attr("stroke", "currentColor")
    .attr("fill-opacity", 0.1)
    .attr("r", (d) => d.r);

  circle.append("circle")
    .attr("fill", "currentColor")
    .attr("r", 3.5);

  svg
    .append("path")
    .attr("class", "path-move")
    .attr("transform", `translate(20,${height - 20})scale(0.05)`)
    .attr("d", path)
    .append("title")
    .text("Try dragging a circle!");

  function dragged(event) {
    const d = d3.select(this).datum();
    d.x = Math.max(0, Math.min(width, event.x));
    d.y = Math.max(0, Math.min(height, event.y));
    update();
  }

  function update() {
    const circles = svg.datum(),
      ad = circles[0],
      bd = circles[1],
      dx = bd.x - ad.x,
      dy = bd.y - ad.y,
      l = Math.sqrt(dx * dx + dy * dy);

    circle.attr("transform", (d) => `translate(${d.x},${d.y})`);

    delta
      .attr("x1", ad.x - (dx / l) * ad.r)
      .attr("y1", ad.y - (dy / l) * ad.r)
      .attr("x2", ad.x + (dx / l) * (l + bd.r))
      .attr("y2", ad.y + (dy / l) * (l + bd.r));

    if (encloses(ad, bd) || encloses(bd, ad)) {
      e.style("display", "none");
      return;
    }

    const ed = encloseBasis2(ad, bd);

    e.style("display", null).attr("transform", `translate(${ed.x},${ed.y})`).select("circle").attr("r", ed.r);
  }

  update();

  display(svg.node());
}
```

In code:

```js echo
// Given the basis B = {a, b}, returns the enclosing circle.
function encloseBasis2(a, b) {
  const x1 = a.x,
    y1 = a.y,
    r1 = a.r;
  const x2 = b.x,
    y2 = b.y,
    r2 = b.r;
  const x21 = x2 - x1,
    y21 = y2 - y1,
    r21 = r2 - r1;
  const l = Math.sqrt(x21 * x21 + y21 * y21);
  return {
    x: (x1 + x2 + (x21 / l) * r21) / 2,
    y: (y1 + y2 + (y21 / l) * r21) / 2,
    r: (l + r1 + r2) / 2
  };
}
```

The tangent circle is the smallest enclosing circle for _a_ and _b_ if and only if _a_ does not enclose _b_ and _b_ does not enclose _a_. If _a_ ⊆ _b_, then _b_ is the smallest enclosing circle of _a_ and _b_; likewise if _b_ ⊆ _a_, then _a_ is the smallest enclosing circle. This property, _a_ ⊈ _b_ and _b_ ⊈ _a_, means that the set {_a_, _b_} forms a _basis_. A basis represents the smallest enclosing circle as a set of tangent circles.

We can test whether two circles _a_ and _b_ form a basis as follows:

```js echo
// Returns true iff the set {a, b} forms a basis.
function isBasis2(a, b) {
  return !encloses(a, b) && !encloses(b, a);
}
```

Similarly, we can write a function that computes the smallest enclosing circle of any two circles:

```js echo
// Given the set L = {a, b}, returns the enclosing circle.
function enclose2(a, b) {
  return encloses(a, b) ? a : encloses(b, a) ? b : encloseBasis2(a, b);
}
```

So we’re making progress!

But what if we have three circles? Well, again, if we know that these circles form a basis, we can apply geometry to compute the internally tangent circle. A basis test for three circles looks like this:

```js echo
// Returns true iff the set {a, b, c} forms a basis.
function isBasis3(a, b, c) {
  return (
    isBasis2(a, b) &&
    !encloses(encloseBasis2(a, b), c) &&
    isBasis2(a, c) &&
    !encloses(encloseBasis2(a, c), b) &&
    isBasis2(b, c) &&
    !encloses(encloseBasis2(b, c), a)
  );
}
```

The two-bases are shown below in gray <svg style="overflow:visible;" width="1em" height="1em" viewBox="-10 -10 20 20" stroke-width="1.5">
<circle cy="2" fill="none" stroke="gray" r="8"></circle>
</svg>; the three-basis is shown in red <svg style="overflow:visible;" width="1em" height="1em" viewBox="-10 -10 20 20" stroke-width="1.5">
<circle cy="2" fill="none" stroke="red" r="8"></circle>
</svg>. Notice that a two-basis disappears when one of its circles encloses the other circle, and that the three-basis disappears if _any_ two-basis disappears, _or_ a two-basis contains the remaining third circle.

```js
{
  const circles = [
    {x: 328, y: 125, r: 47},
    {x: 415, y: 222, r: 23},
    {x: 257, y: 258, r: 22}
  ];

  const svg = d3.create("svg").attr("viewBox", [0, 0, width, height])
    .style("overflow", "visible")
    .datum(circles)
    .property("value", (d) => d);

  const e2 = svg
    .append("g")
    .attr("stroke", "gray")
    .attr("fill", "none")
    .selectAll("circle")
    .data([
      [circles[0], circles[1]],
      [circles[0], circles[2]],
      [circles[1], circles[2]]
    ])
    .enter()
    .append("circle");

  const e3 = svg.append("circle").attr("stroke", "red").attr("fill", "none");

  const p = svg
    .append("g")
    .attr("stroke", "currentColor")
    .attr("fill-opacity", 0.1)
    .attr("cursor", "move")
    .selectAll("circle")
    .data((d) => d)
    .enter()
    .append("circle")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", (d) => d.r)
    .call(d3.drag().on("drag", dragged));

  svg
    .append("path")
    .attr("class", "path-move")
    .attr("transform", `translate(20,${height - 20})scale(0.05)`)
    .attr("d", path)
    .append("title")
    .text("Try dragging a circle!");

  function dragged(event, d) {
    d3.select(this)
      .attr("cx", (d.x = Math.max(0, Math.min(width, event.x))))
      .attr("cy", (d.y = Math.max(0, Math.min(height, event.y))));

    svg.dispatch("input");
    update();
  }

  function update() {
    e2.each(function (pair) {
      var a = pair[0],
        b = pair[1];

      if (!isBasis2(a, b)) {
        return d3.select(this).style("display", "none");
      }

      var d = encloseBasis2(a, b);
      d3.select(this).style("display", null).attr("cx", d.x).attr("cy", d.y).attr("r", d.r);
    });

    e3.each(function (triple) {
      var a = triple[0],
        b = triple[1],
        c = triple[2];

      if (!isBasis2(a, b) || !isBasis2(a, c) || !isBasis2(b, c) || !isBasis3(a, b, c)) {
        return d3.select(this).style("display", "none");
      }

      var d = encloseBasis3(a, b, c);
      d3.select(this).style("display", null).attr("cx", d.x).attr("cy", d.y).attr("r", d.r);
    });
  }

  update();

  display(svg.node());
}
```

I’ll omit the geometric solution for the three-circle case as it is a bit complicated.
(See [Apollonius’ Problem](./apollonius-problem).)
It requires solving a system of three quadratic equations:

```js
tex.block`0 = (x - x_a)^2 + (y - y_a)^2 - (r - r_a)^2`;
```

```js
tex.block`0 = (x - x_b)^2 + (y - y_b)^2 - (r - r_b)^2`;
```

```js
tex.block`0 = (x - x_c)^2 + (y - y_c)^2 - (r - r_c)^2`;
```

```js echo
function encloseBasis3(a, b, c) {
  const x1 = a.x,
    y1 = a.y,
    r1 = a.r;
  const x2 = b.x,
    y2 = b.y,
    r2 = b.r;
  const x3 = c.x,
    y3 = c.y,
    r3 = c.r;
  const a2 = x1 - x2;
  const a3 = x1 - x3;
  const b2 = y1 - y2;
  const b3 = y1 - y3;
  const c2 = r2 - r1;
  const c3 = r3 - r1;
  const d1 = x1 * x1 + y1 * y1 - r1 * r1;
  const d2 = d1 - x2 * x2 - y2 * y2 + r2 * r2;
  const d3 = d1 - x3 * x3 - y3 * y3 + r3 * r3;
  const ab = a3 * b2 - a2 * b3;
  const xa = (b2 * d3 - b3 * d2) / (ab * 2) - x1;
  const xb = (b3 * c2 - b2 * c3) / ab;
  const ya = (a3 * d2 - a2 * d3) / (ab * 2) - y1;
  const yb = (a2 * c3 - a3 * c2) / ab;
  const A = xb * xb + yb * yb - 1;
  const B = 2 * (r1 + xa * xb + ya * yb);
  const C = xa * xa + ya * ya - r1 * r1;
  const r = -(A ? (B + Math.sqrt(B * B - 4 * A * C)) / (2 * A) : C / B);
  return {
    x: x1 + xa + xb * r,
    y: y1 + ya + yb * r,
    r: r
  };
}
```

### Extending a Basis

Now let’s generalize from three circles to an arbitrary number of circles. In two dimensions, it’s not possible to have a basis of four or more circles, so we only need to consider bases of three or fewer.

Assume we have a basis _B_ that consists of zero, one, two or three circles, and represents the smallest enclosing circle for circles {_L_[*0*], … _L_[*i* - 1]}. We can compute the tangent circle for the basis _B_ as follows:

```js echo
// Given a basis B, returns the enclosing circle.
function encloseBasis(B) {
  switch (B.length) {
    case 1:
      return encloseBasis1(B[0]);
    case 2:
      return encloseBasis2(B[0], B[1]);
    case 3:
      return encloseBasis3(B[0], B[1], B[2]);
  }
}
```

Next we test whether this tangent circle encloses the next circle, _p_ = _L_[*i*]. If it does, then we can continue to use the basis _B_, and move on to the next circle. If it doesn’t, then we need to compute a new basis.

The most conservative new basis (the smallest increase from our previous basis _B_) considers only circles in _B_ ∪ _p_; we’ll call this operation “extending” _B_ to enclose _p_. Because _p_ was outside the old enclosing circle, we know that the new basis must include _p_. We also know that the resulting basis must contain either one, two or three circles in total; so, there may be one or two circles from the old basis _B_ that remain in the new basis. Thus, computing the new basis is simply a matter of testing each possible basis, starting with the simplest one-basis, {_p_}. In code:

```js echo
// Given a basis B and a circle p ⊈ B, returns the new basis Bʹ.
function extendBasis(B, p) {
  var i, j;

  if (enclosesWeakAll(p, B)) return [p];

  // If we get here then B must have at least one element.
  for (i = 0; i < B.length; ++i) {
    if (!encloses(p, B[i]) && enclosesWeakAll(encloseBasis2(B[i], p), B)) {
      return [B[i], p];
    }
  }

  // If we get here then B must have at least two elements.
  for (i = 0; i < B.length - 1; ++i) {
    for (j = i + 1; j < B.length; ++j) {
      if (
        !encloses(encloseBasis2(B[i], B[j]), p) &&
        !encloses(encloseBasis2(B[i], p), B[j]) &&
        !encloses(encloseBasis2(B[j], p), B[i]) &&
        enclosesWeakAll(encloseBasis3(B[i], B[j], p), B)
      ) {
        return [B[i], B[j], p];
      }
    }
  }

  // If we get here then something is very wrong.
  throw new Error();
}
```

Let’s look at examples of each of these three cases.

#### One-Basis

If _p_ <svg style="overflow:visible;" width="1em" height="1em" viewBox="-10 -10 20 20" stroke-width="1.5">
<circle cy="2" fill="steelblue" fill-opacity="0.1" stroke="steelblue" r="8"></circle>
</svg> encloses every circle in _B_ <svg style="overflow:visible;" width="1.8em" height="1em" fill-opacity="0.1" stroke-width="1.5" stroke="currentColor" viewBox="-10 -10 36 20">
<circle r="8"></circle>
<circle cx="17" cy="6" r="7"></circle>
</svg>, {_p_} is the new basis. The old enclosing circle <svg style="overflow:visible;" width="1em" height="1em" viewBox="-10 -10 20 20" stroke-width="1.5">
<circle cy="2" fill="none" stroke="red" r="8"></circle>
</svg> is replaced with _p_. If _B_ is empty, {_p_} encloses it trivially.

```js
{
  const svg = d3.create("svg").attr("viewBox", [0, 0, width, height - 100])
  .datum([
    {x: 328, y: 85, r: 47},
    {x: 415, y: 182, r: 23},
    {x: 257, y: 218, r: 22},
    {x: 325, y: 138, r: 130, color: "steelblue"}
  ]);

  svg
    .append("g")
    .attr("stroke", "currentColor")
    .attr("fill-opacity", 0.1)
    .selectAll("circle")
    .data((d) => d)
    .enter()
    .append("circle")
    .attr("stroke", (d) => d.color)
    .attr("fill", (d) => d.color)
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", (d) => d.r);

  svg
    .append("circle")
    .datum(enclose(svg.datum().slice(0, 3)))
    .attr("stroke", "red")
    .attr("fill", "none")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", (d) => d.r);

  display(svg.node());
}
```

#### Two-Basis

If _B_ ⊈ _p_, then we must next look for a two-basis {_B_[*i*], _p_} that encloses every circle in _B_ <svg style="overflow:visible;" width="1.8em" height="1em" fill-opacity="0.1" stroke-width="1.5" stroke="currentColor" viewBox="-10 -10 36 20">
<circle r="8"></circle>
<circle cx="17" cy="6" r="7"></circle>
</svg>. Below, the tangent circle <svg style="overflow:visible;" width="1em" height="1em" viewBox="-10 -10 20 20" stroke-width="1.5">
<circle cy="2" fill="none" stroke="currentColor" r="8"></circle>
</svg> of circle _p_ <svg style="overflow:visible;" width="1em" height="1em" viewBox="-10 -10 20 20" stroke-width="1.5">
<circle cy="2" fill="steelblue" fill-opacity="0.1" stroke="steelblue" r="8"></circle>
</svg> and circle _B_[*i*] <svg style="overflow:visible;" width="1em" height="1em" viewBox="-10 -10 20 20" stroke-width="1.5">
<circle cy="2" fill-opacity="0.1" stroke="currentColor" r="8"></circle>
</svg> encloses every circle in _B_ and thus replaces the old tangent circle <svg style="overflow:visible;" width="1em" height="1em" viewBox="-10 -10 20 20" stroke-width="1.5">
<circle cy="2" fill="none" stroke="red" r="8"></circle>
</svg>. If _B_ only has one circle, then {_B_[0], _p_} must be a two-basis that encloses _B_ because _B_[0] ⊈ _p_.

```js
{
  const svg = d3.create("svg").attr("viewBox", [0, 0, width, height - 100])
  .datum([
    {x: 328, y: 85, r: 47},
    {x: 415, y: 182, r: 23},
    {x: 257, y: 218, r: 22},
    {x: 430, y: 105, r: 30, color: "steelblue"}
  ]);

  svg
    .append("circle")
    .datum(enclose(svg.datum().slice(0, 3)))
    .attr("stroke", "red")
    .attr("fill", "none")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", (d) => d.r);

  svg
    .append("circle")
    .datum(enclose(svg.datum()))
    .attr("stroke", "currentColor")
    .attr("fill", "none")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", (d) => d.r);

  svg
    .append("g")
    .attr("stroke", "currentColor")
    .attr("fill-opacity", 0.1)
    .selectAll("circle")
    .data((d) => d)
    .enter()
    .append("circle")
    .attr("stroke", (d) => d.color)
    .attr("fill", (d) => d.color)
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", (d) => d.r);

  display(svg.node());
}
```

#### Three-Basis

If no suitable one- or two-basis is found, there must be a three-basis {_B_[*i*], _B_[*j*], _p_} that encloses every circle in _B_ <svg style="overflow:visible;" width="1.8em" height="1em" fill-opacity="0.1" stroke-width="1.5" stroke="currentColor" viewBox="-10 -10 36 20">
<circle r="8"></circle>
<circle cx="17" cy="6" r="7"></circle>
</svg>. Below, _p_ <svg style="overflow:visible;" width="1em" height="1em" viewBox="-10 -10 20 20" stroke-width="1.5">
<circle cy="2" fill="steelblue" fill-opacity="0.1" stroke="steelblue" r="8"></circle>
</svg> replaces a circle <svg style="overflow:visible;" width="1em" height="1em" viewBox="-10 -10 20 20" stroke-width="1.5">
<circle cy="2" fill-opacity="0.1" stroke="currentColor" r="8"></circle>
</svg> from _B_ to form the new three-basis.

```js
{
  const svg = d3.create("svg").attr("viewBox", [0, 0, width, height - 100])
  .datum([
    {x: 328, y: 85, r: 47},
    {x: 415, y: 182, r: 23},
    {x: 257, y: 218, r: 22},
    {x: 430, y: 210, r: 30, color: "steelblue"}
  ]);

  svg
    .append("circle")
    .datum(enclose(svg.datum().slice(0, 3)))
    .attr("stroke", "red")
    .attr("fill", "none")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", (d) => d.r);

  svg
    .append("circle")
    .datum(enclose(svg.datum()))
    .attr("stroke", "currentColor")
    .attr("fill", "none")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", (d) => d.r);

  svg
    .append("g")
    .attr("stroke", "currentColor")
    .attr("fill-opacity", 0.1)
    .selectAll("circle")
    .data((d) => d)
    .enter()
    .append("circle")
    .attr("stroke", (d) => d.color)
    .attr("fill", (d) => d.color)
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", (d) => d.r);

  display(svg.node());
}
```

### The Algorithm

Whew, almost there!

Unfortunately it’s not sufficient to simply extend the basis _B_ to enclose _p_. The extended basis represents the smallest enclosing circle of _B_ ∪ _p_, but a bigger circle might be needed to enclose the other circles {_L_[*0*], … _L_[*i*]}: there may exist an input circle that is enclosed by the old tangent circle <svg style="overflow:visible;" width="1em" height="1em" viewBox="-10 -10 20 20" stroke-width="1.5">
<circle cy="2" fill="none" stroke="red" r="8"></circle>
</svg> but _not_ enclosed by the new tangent circle <svg style="overflow:visible;" width="1em" height="1em" viewBox="-10 -10 20 20" stroke-width="1.5">
<circle cy="2" fill="none" stroke="currentColor" r="8"></circle>
</svg>. This gap <svg style="overflow:visible;" width="1em" height="1em" viewBox="-10 -10 20 20" stroke-width="1.5">
<circle cy="2" fill="red" stroke="red" r="8"></circle>
</svg> is highlighted below. We must find a new basis *B*ʹ that encloses all the input circles seen so far before we can move on to the next circle _L_[*i* + 1].

```js
{
  const svg = d3.create("svg").attr("viewBox", [0, 0, width, height])
  .datum([
    {x: 328, y: 135, r: 47},
    {x: 415, y: 232, r: 23},
    {x: 257, y: 268, r: 22},
    {x: 430, y: 260, r: 30, color: "steelblue"}
  ]);

  const e0 = enclose(svg.datum().slice(0, 3)),
    e1 = enclose(svg.datum());

  svg
    .append("circle")
    .datum(e0)
    .attr("stroke", "red")
    .attr("fill", "none")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", (d) => d.r);

  svg
    .append("defs")
    .datum(e0)
    .append("clipPath")
    .attr("id", "danger")
    .append("circle")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", (d) => d.r);

  svg
    .append("path")
    .attr("fill", "red")
    .attr("clip-path", `url(${location}#danger)`)
    .attr(
      "d",
      "M" +
        e0.x +
        "," +
        (e0.y - e0.r) +
        "a" +
        e0.r +
        "," +
        e0.r +
        " 0,0,0 0," +
        2 * e0.r +
        "a" +
        e0.r +
        "," +
        e0.r +
        " 0,0,0 0," +
        -2 * e0.r +
        "M" +
        e1.x +
        "," +
        (e1.y - e1.r) +
        "a" +
        e1.r +
        "," +
        e1.r +
        " 0,0,1 0," +
        2 * e1.r +
        "a" +
        e1.r +
        "," +
        e1.r +
        " 0,0,1 0," +
        -2 * e1.r
    );

  svg
    .append("circle")
    .datum(e1)
    .attr("stroke", "currentColor")
    .attr("fill", "none")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", (d) => d.r);

  svg
    .append("g")
    .attr("stroke", "currentColor")
    .attr("fill-opacity", 0.1)
    .selectAll("circle")
    .data((d) => d)
    .join("circle")
    .attr("stroke", (d) => d.color)
    .attr("fill", (d) => d.color)
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", (d) => d.r);

  display(svg.node());
}
```

Fortunately, finding the new basis *B*ʹ is easy! We simply start over from the first circle each time we extend the basis by setting \`i\` back to zero:

```js echo
function enclose(L) {
  var i = 0,
    n = d3.shuffle((L = L.slice())).length,
    B = [],
    p,
    e;

  while (i < n) {
    p = L[i];
    if (e && enclosesWeak(e, p)) ++i;
    else (e = encloseBasis((B = extendBasis(B, p)))), (i = 0);
  }

  return (e.basis = B), e;
}
```

The algorithm must terminate because extending a basis always makes it bigger and there are only a finite number of possible bases in _L_.

And that’s the [Matoušek-Sharir-Welzl algorithm](http://www.inf.ethz.ch/personal/emo/PublFiles/SubexLinProg_ALG16_96.pdf)!

---

## Appendix

Many thanks to [Robin Houston](https://github.com/robinhouston) for contributing an implementation of the MSW algorithm to [d3-hierarchy](https://d3js.org/d3-hierarchy) as [d3.packEnclose](https://d3js.org/d3-hierarchy/pack#packEnclose), and for reviewing this article. This article was previously published under the title “Miniball.”

```js echo
function* encloseStar(L) {
  var i = 0,
    n = d3.shuffle((L = L.slice())).length,
    B = [],
    p,
    e;

  while (i < n) {
    p = L[i];
    yield {p: p, e: e, i: i, B: B, L: L.slice(0, i)};
    if (e && enclosesWeak(e, p)) ++i;
    else (e = encloseBasis((B = extendBasis(B, p)))), (i = 0);
  }

  yield {e: e, i: i, B: B, L: L};
  return e;
}
```

```js echo
const path = "M0,-300l100,100h-50v150h150v-50L300,0l-100,100v-50h-150v150h50L0,300l-100,-100h50v-150h-150v50L-300,0l100,-100v50h150v-150h-50z";
```

```js echo
const width = 640;
```

```js echo
const height = 400;
```

```js echo
import {context2d} from "/components/DOM.js";
```

<style>
  .path-move {fill: currentColor;}
</style>
