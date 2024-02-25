---
index: false
status: draft
---

```js
md`# Predator and Prey

Imagine an island of cats 🐈 and mice 🐁. If mice are plentiful, the cats eat well and reproduce rapidly. But as the cats multiply, they eat more mice. Soon the mouse population is decimated and the cats begin to starve. With fewer cats, the mice recover, and the cycle repeats.

The [Lotka–Volterra equations](https://en.wikipedia.org/wiki/Lotka–Volterra_equations) model such a dynamic predator–prey interaction. The model is a pair of (ordinary differential) equations where 🐁 is the number of prey and 🐈 is the number of predators:

${tex.block`\begin{aligned}
\frac{\mathrm{d}🐁}{\mathrm{d}t} &= \alpha 🐁-\beta 🐁🐈 \\[2ex]
\frac{\mathrm{d}🐈}{\mathrm{d}t} &= \delta 🐁🐈-\gamma 🐈
\end{aligned}`}

In this model, the prey have unlimited food and grow exponentially (${tex`\alpha`}); however, they are sometimes eaten (${tex`\beta`}) by predators. The predators have unlimited appetite, but eat only prey, limiting their growth (${tex`\delta`}); their decay is exponential (${tex`\gamma`}). The parameters ${tex`\alpha`}, ${tex`\beta`}, ${tex`\gamma`}, and ${tex`\delta`} thus describe how the two populations behave, while ${tex`\tfrac{\mathrm{d}🐁}{\mathrm{d}t}`} and ${tex`\tfrac{\mathrm{d}🐈}{\mathrm{d}t}`} are the rates at which each population is increasing or decreasing.

By iteratively evaluating these equations—by starting with some initial populations, calculating the rates, adjusting the populations accordingly, then repeating this process many times—we can compute the populations over time as shown in the plot below. Drag the cat 🐈 or the mouse 🐁 to change the initial populations. (You can’t have fractional mice, so interpret the numbers as thousands or similar.)`;
```

```js
const timeLineChart = {
  let T, X, Y;

  const height = 420;
  const margin = {top: 20, right: 30, bottom: 30, left: 40};
  const x = d3.scaleLinear().domain([0, 24]).range([margin.left, width - margin.right]);
  const y = d3.scaleLinear().domain([0, 3]).range([height - margin.bottom, margin.top]);

  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);

  svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .call(g => g.select(".tick:first-of-type text").text("t = 0"));

  svg.append("g")
      .attr("transform", `translate(${margin.left - 12},0)`)
      .call(d3.axisLeft(y).ticks(8))
      .call(g => g.select(".domain").remove());

  const pathX = svg.append("path")
      .attr("fill", "none")
      .attr("stroke", xColor)
      .attr("stroke-width", 1.55);

  const pathY = pathX.clone()
      .attr("stroke", yColor);

  const dotX = svg.append("circle")
      .style("cursor", "move")
      .style("pointer-events", "all")
      .attr("fill", "transparent")
      .attr("stroke", "transparent")
      .attr("stroke-width", 15)
      .attr("r", 9)
      .attr("cx", margin.left)
      .call(d3.drag().on("drag", event => {
        viewof xy.value = [Math.max(0, Math.min(3, +y.invert(event.y).toFixed(3))), viewof xy.value[1]];
      }));

  const dotY = dotX.clone()
      .call(d3.drag().on("drag", event => {
        viewof xy.value = [viewof xy.value[0], Math.max(0, Math.min(3, +y.invert(event.y).toFixed(3)))];
      }));

  const labelX = svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x", margin.left)
      .attr("dy", "0.31em")
      .attr("fill", xColor)
      .style("font-size", "24px")
      .style("pointer-events", "none")
      .text("🐁");

  const labelY = labelX.clone()
      .attr("fill", yColor)
      .text("🐈");

  function update() {
    const [x0, y0] = viewof xy.value;
    [T, X, Y] = simulate({alpha, beta, gamma, delta, x0, y0});
    pathX.attr("d", d3.line().x(x).y((_, i) => y(X[i]))(T));
    pathY.attr("d", d3.line().x(x).y((_, i) => y(Y[i]))(T));
    dotX.attr("cy", y(X[0]));
    dotY.attr("cy", y(Y[0]));
    labelX.attr("y", y(X[0]));
    labelY.attr("y", y(Y[0]));
  }

  update();
  viewof xy.addEventListener("input", update);
  invalidation.then(() => viewof xy.removeEventListener("input", update));
  return svg.node();
}
```

```js
md`As expected, both predator <svg width=16 height=16><path d="M1,10C4,14 12,6 15,10" fill=none stroke=${yColor} stroke-width=1.5></path></svg> and prey <svg width=16 height=16><path d="M1,10C4,14 12,6 15,10" fill=none stroke=${xColor} stroke-width=1.5></path></svg> populations repeatedly rise and fall.

We can see this cycle literally in [phase space](https://en.wikipedia.org/wiki/Phase_space): rather than encode time ${tex`t`} along the ${tex`x`}-axis, encode the number of prey 🐁 along ${tex`x`}, and the number of predators 🐈 along ${tex`y`}. (We’ll use animation to show how the population changes over time.) Drag the point <svg width=8 height=16><circle r=3.5 cx=4 cy=10></circle></svg> to change the initial populations.`;
```

```js
const timeCycleChart = {
  let frame, i = 0, k = 24, T, X, Y;

  const size = Math.min(640, width);
  const margin = {top: 20, right: 30, bottom: 30, left: 40};
  const x = d3.scaleLinear().domain([0, 3]).range([margin.left, size - margin.right]);
  const y = d3.scaleLinear().domain([0, 3]).range([size - margin.bottom, margin.top]);

  const lineStatic = d3.line()
      .curve(d3.curveLinearClosed)
      .x((_, i) => x(X[i]))
      .y((_, i) => y(Y[i]));

  const lineDynamic = d3.line()
      .x(j => x(X[(i + j) % X.length]))
      .y(j => y(Y[(i + j) % Y.length]));

  const svg = d3.select(DOM.svg(size, size))
      .style("overflow", "visible");

  svg.append("g")
      .attr("transform", `translate(0,${size - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(5))
      .call(g => g.select(".tick:last-of-type text").clone()
          .style("font-size", "24px")
          .attr("y", -6)
          .attr("dy", null)
          .text("🐁"));

  svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select(".tick:last-of-type text").clone()
          .style("font-size", "24px")
          .attr("text-anchor", "start")
          .attr("x", 6)
          .text("🐈"));

  const pathStatic = svg.append("path")
      .attr("fill", "none")
      .attr("stroke", "#000")
      .attr("stroke-opacity", 0.25)
      .attr("stroke-width", 1.5);

  const pathDynamic = svg.append("path")
      .datum(d3.range(20))
      .attr("fill", "none")
      .attr("stroke", "#000")
      .attr("stroke-width", 1.5);

  const dot = svg.append("circle")
      .style("cursor", "move")
      .style("pointer-events", "all")
      .attr("stroke", "transparent")
      .attr("stroke-width", 15)
      .attr("fill", "black")
      .attr("r", 4)
      .call(d3.drag().on("start drag", event => {
        viewof xy.value = [
          Math.max(0, Math.min(3, +x.invert(event.x).toFixed(3))),
          Math.max(0, Math.min(3, +y.invert(event.y).toFixed(3)))
        ];
      }));

  function reset() {
    const [x0, y0] = viewof xy.value;
    dot.attr("cx", x(x0)).attr("cy", y(y0));
    [T, X, Y] = cycle(...simulate({alpha, beta, gamma, delta, x0, y0}));
    pathStatic.datum(T).attr("d", lineStatic);
  }

  async function tick() {
    await visibility();
    frame = requestAnimationFrame(tick);
    ++i, pathDynamic.attr("d", lineDynamic);
  }

  reset(), tick();
  viewof xy.addEventListener("input", reset);
  invalidation.then(() => viewof xy.removeEventListener("input", reset));
  invalidation.then(() => cancelAnimationFrame(frame));
  return svg.node();
}
```

```js
md`
This cycle suggests a counterintuitive but plausible result: if you instantaneously reduce the number of prey, predators will decline, allowing prey to recover, and a (temporarily) _larger_ prey population than you started with. More generally, feedback loops in dynamical systems can make it hard to predict what will happen when you artificially introduce change!

Interacting with the phase plot reveals something else: see if you can adjust the initial populations <svg width=8 height=16><circle r=3.5 cx=4 cy=10></circle></svg> to contract the cycle <svg width=16 height=16><circle r=7 cx=8 cy=8 fill=none stroke=#000 stroke-opacity=0.25 stroke-width=1.5></circle></svg> down to a single point. What does this singularity mean in terms of predator–prey behavior? It is _equilibrium_: both populations are unchanging; both predator and prey are dying at the same rate they are reproducing.

We can see the stationary point directly—no interaction required—by plotting the entire vector field (the rates of change for _all possible_ conditions). It’s like a wind map: if you set the initial populations to a given point, the populations will follow the lines of the field and eventually loop back to the same point. The stationary point is the eye of the storm.
`;
```

```js
const vectorFieldChart = {
  const div = html`<div style="position:relative;">`;

  const size = Math.min(640, width);
  const margin = {top: 20, right: 30, bottom: 30, left: 40};
  const x = d3.scaleLinear().domain([0, 3]).range([margin.left, size - margin.right]);
  const y = d3.scaleLinear().domain([0, 3]).range([size - margin.bottom, margin.top]);
  const z = d3.scaleSequential(d3.interpolateReds).domain([0, 20]);

  const context = DOM.context2d(size, size);
  const canvas = div.appendChild(context.canvas);
  const svg = d3.select(div.appendChild(DOM.svg(size, size)));

  svg.style("position", "relative");
  canvas.style.position = "absolute";
  context.lineWidth = 0.5;
  context.globalAlpha = 0.5;

  svg.append("g")
      .attr("transform", `translate(0,${size - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(5))
      .call(g => g.select(".tick:last-of-type text").clone()
          .style("font-size", "24px")
          .attr("y", -6)
          .attr("dy", null)
          .text("🐁"));

  svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select(".tick:last-of-type text").clone()
          .style("font-size", "24px")
          .attr("text-anchor", "start")
          .attr("x", 6)
          .text("🐈"));

  yield visibility(div);

  for (let k = 0; k < 2e5; ++k) {
    let x0 = Math.random() * 5, x1, dx;
    let y0 = Math.random() * 5, y1, dy;
    context.beginPath();
    context.moveTo(x(x0), y(y0));
    for (let t = 0; t < 8; t += Math.max(0.01, Math.min(2, Math.sqrt(dx ** 2 + dy ** 2)))) {
      dx = alpha * x0 - beta * x0 * y0;
      dy = gamma * x0 * y0 - delta * y0;
      x1 = x0 + dx / 40, y1 = y0 + dy / 40;
      context.lineTo(x(x1), y(y1));
      x0 = x1, y0 = y1;
    }
    context.strokeStyle = d3.rgb(z((dx / x0) ** 2 + (dy / y0) ** 2)).darker(Math.random() * 2);
    context.stroke();
    if (k % 1024 === 0) yield div;
  }
}
```

```js
md`This plot also represents speed with color—the angry red at the top indicates conditions where the populations are changing rapidly. The farther you move from the stationary point, the wilder (and less realistic) the oscillations. (We should be skeptical drawing conclusions from extreme scenarios in simple models.)

We can also derive the stable point algebraically by noting that the rates of change ${tex`\tfrac{\mathrm{d}🐁}{\mathrm{d}t}`} and ${tex`\tfrac{\mathrm{d}🐈}{\mathrm{d}t}`} are zero at equilibrium:

${tex.block`\begin{aligned}
0 &= \alpha 🐁 - \beta 🐁🐈 \\
0 &= \delta 🐁🐈 - \gamma 🐈
\end{aligned}`}

Equivalently,

${tex.block`\begin{aligned}
\alpha 🐁 &= \beta 🐁🐈 \\
\gamma 🐈 &= \delta 🐁🐈
\end{aligned}`}

And thus,

${tex.block`\begin{aligned}
🐈 &= \frac{\alpha}{\beta} \\[2ex]
🐁 &= \frac{\gamma}{\delta}
\end{aligned}`}
`;
```

```js
md`
But why is the cycle in the phase plot always counterclockwise? Meaning: why does the predator population “echo” the prey, such that the predators’ peaks and valleys always appear _after_ those of the prey?

We can visualize this delayed interaction more directly by plotting the rates of change rather than the absolute populations. (If you adjusted the initial populations above to find the stationary point, consider resetting them back to the default values to see these plots.)
`;
```

```js
{
  const button = html`<button>Reset`;
  button.onclick = () => viewof xy.value = [1.4, 1.6];
  return button;
}
```

```js
const phaseChart = {
  await visibility();
  const [T, X, Y] = simulate({alpha, beta, gamma, delta, x0: xy[0], y0: xy[1]});

  const height = 240;
  const margin = {top: 20, right: 30, bottom: 20, left: 40};
  const x = d3.scaleLinear().domain([0, 24]).range([margin.left, width - margin.right]);
  const y = d3.scaleLinear().domain([-4, 4]).range([height - margin.bottom, margin.top]);

  const svg = d3.select(DOM.svg(width, height));

  svg.append("g")
      .attr("transform", `translate(0,${y(0)})`)
      .call(d3.axisBottom(x))
      .call(g => g.select(".tick:first-of-type text").text("t = 0"));

  svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(5, "+f"));

  svg.append("path")
      .attr("fill", "none")
      .attr("stroke", xColor)
      .attr("stroke-width", 1.5)
      .attr("d", d3.line().x(x).y((t, i) => y(alpha * X[i] - beta * X[i] * Y[i]))(T));

  svg.append("path")
      .attr("fill", "none")
      .attr("stroke", yColor)
      .attr("stroke-width", 1.5)
      .attr("d", d3.line().x(x).y((t, i) => y(delta * X[i] * Y[i] - gamma * Y[i]))(T));

  return svg.node();
}
```

```js
md`For most of the cycle, the prey 🐁 rate of change <svg width=16 height=16><path d="M1,10C4,14 12,6 15,10" fill=none stroke=${xColor} stroke-width=1.5></path></svg> is positive and slowly increasing. At a certain point (around ${tex`t = 8`} if you reset), however, the predator 🐈 rate of change <svg width=16 height=16><path d="M1,10C4,14 12,6 15,10" fill=none stroke=${yColor} stroke-width=1.5></path></svg> spikes and the prey rate drops precipitously.

To investigate further, let’s plot each term separately. The prey’s birth rate <svg width=16 height=16><path d="M1,10C4,14 12,6 15,10" fill=none stroke=${color1} stroke-width=1.5></path></svg> is ${tex`\alpha`}🐁 and death rate <svg width=16 height=16><path d="M1,10C4,14 12,6 15,10" fill=none stroke=${color2} stroke-width=1.5></path></svg> is ${tex`\beta`}🐁🐈; subtracting the two produces a positive rate <svg width=16 height=16><path d="M1,16V10C4,14 12,6 15,10V16" fill=${xColor}></path></svg> if the prey are increasing and a negative rate <svg width=16 height=16><path d="M1,16V10C4,14 12,6 15,10V16" fill=${negativeColor}></path></svg> if they are decreasing.`;
```

```js
const preyRateChart = await visibility(), changeChart(
  xColor,
  {alpha, beta, gamma, delta, x0: xy[0], y0: xy[1]},
  (x, y) => alpha * x,
  (x, y) => beta * x * y
)
```

```js
md`Likewise, the predator’s birth rate <svg width=16 height=16><path d="M1,10C4,14 12,6 15,10" fill=none stroke=${color1} stroke-width=1.5></path></svg> is ${tex`\delta`}🐁🐈 and death rate <svg width=16 height=16><path d="M1,10C4,14 12,6 15,10" fill=none stroke=${color2} stroke-width=1.5></path></svg> is ${tex`\gamma`}🐈; subtracting the two produces a positive rate <svg width=16 height=16><path d="M1,16V10C4,14 12,6 15,10V16" fill=${yColor}></path></svg> if the predators are increasing, and a negative rate <svg width=16 height=16><path d="M1,16V10C4,14 12,6 15,10V16" fill=${negativeColor}></path></svg> if they are decreasing.`;
```

```js
const predatorRateChart = await visibility(), changeChart(
  yColor,
  {alpha, beta, gamma, delta, x0: xy[0], y0: xy[1]},
  (x, y) => delta * x * y,
  (x, y) => gamma * y
)
```

```js
md`Notice that the double-population terms—the prey death rate <svg width=16 height=16><path d="M1,10C4,14 12,6 15,10" fill=none stroke=${color2} stroke-width=1.5></path></svg> ${tex`\beta`}🐁🐈 (top chart) and the predator birth rate <svg width=16 height=16><path d="M1,10C4,14 12,6 15,10" fill=none stroke=${color1} stroke-width=1.5></path></svg> ${tex`\delta`}🐁🐈 (bottom chart)—are much spikier than the single-population terms—the prey birth rate <svg width=16 height=16><path d="M1,10C4,14 12,6 15,10" fill=none stroke=${color1} stroke-width=1.5></path></svg> ${tex`\alpha`}🐁 (top) and the predator death rate <svg width=16 height=16><path d="M1,10C4,14 12,6 15,10" fill=none stroke=${color2} stroke-width=1.5></path></svg> ${tex`\gamma`}🐈 (bottom). These double terms are asymptotically larger than the single terms: assuming the parameters ${tex`\alpha, \beta, \ldots`} are positive, the double terms will always dwarf the single terms when the populations are big enough. The double terms are “fast” while the single terms are “slow”.

Prey birth changes *slowly*.
<br> Predator birth changes *quickly*.
<br> Prey death changes *quickly*.
<br> Predator death changes *slowly*.

And this is why the predator population echoes the prey population.`;
```

```js
md`
---

## Further Reading

Bret Victor, [Interactive Exploration of a Dynamical System](https://vimeo.com/23839605)
<br>Colin Smith, [odex-js (ordinary differential equation solver)](https://github.com/littleredcomputer/odex-js)
<br>Wikipedia, [Lotka–Volterra equations](https://en.wikipedia.org/wiki/Lotka–Volterra_equations)
<br>Wikipedia, [Line integral convolution](https://en.wikipedia.org/wiki/Line_integral_convolution)
<br>Wikipedia, [Phase space](https://en.wikipedia.org/wiki/Phase_space)
`;
```

```js
md`
---

## Appendix
`;
```

```js echo
viewof alpha = html`<input type=range min=0 max=2 value=0.6667 step=any>`
```

```js echo
viewof beta = html`<input type=range min=0 max=2 value=1.3333 step=any>`
```

```js echo
viewof gamma = html`<input type=range min=0 max=2 value=1 step=any>`
```

```js echo
viewof delta = html`<input type=range min=0 max=2 value=1 step=any>`
```

```js echo
function changeChart(positiveColor, options, f1, f2) {
  const [T, X, Y] = simulate(options);

  const height = 240;
  const margin = {top: 20, right: 30, bottom: 30, left: 40};
  const x = d3
    .scaleLinear()
    .domain([0, 24])
    .range([margin.left, width - margin.right]);
  const y = d3
    .scaleLinear()
    .domain([0, 4])
    .range([height - margin.bottom, margin.top]);

  const svg = d3.select(DOM.svg(width, height));
  const positive = DOM.uid("positive");
  const negative = DOM.uid("negative");
  const defs = svg.append("defs");

  defs
    .append("clipPath")
    .attr("id", positive.id)
    .append("path")
    .attr(
      "d",
      d3
        .area()
        .x(x)
        .y0(0)
        .y1((t, i) => y(f2(X[i], Y[i])))(T)
    );

  defs
    .append("clipPath")
    .attr("id", negative.id)
    .append("path")
    .attr(
      "d",
      d3
        .area()
        .x(x)
        .y0(0)
        .y1((t, i) => y(f1(X[i], Y[i])))(T)
    );

  svg
    .append("g")
    .attr("transform", `translate(0,${y(0)})`)
    .call(d3.axisBottom(x))
    .call((g) => g.select(".tick:first-of-type text").text("t = 0"));

  svg.append("g").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y).ticks(5, "+f"));

  svg
    .append("path")
    .attr("clip-path", positive)
    .attr("fill", positiveColor)
    .attr("fill-opacity", 0.7)
    .attr(
      "d",
      d3
        .area()
        .x(x)
        .y0(y(0))
        .y1((t, i) => y(f1(X[i], Y[i])))(T)
    );

  svg
    .append("path")
    .attr("clip-path", negative)
    .attr("fill", negativeColor)
    .attr("fill-opacity", 0.7)
    .attr(
      "d",
      d3
        .area()
        .x(x)
        .y0(y(0))
        .y1((t, i) => y(f2(X[i], Y[i])))(T)
    );

  svg
    .append("path")
    .attr("fill", "none")
    .attr("stroke", color1)
    .attr("stroke-width", 1.5)
    .attr(
      "d",
      d3
        .line()
        .x(x)
        .y((t, i) => y(f1(X[i], Y[i])))(T)
    );

  svg
    .append("path")
    .attr("fill", "none")
    .attr("stroke", color2)
    .attr("stroke-width", 1.5)
    .attr(
      "d",
      d3
        .line()
        .x(x)
        .y((t, i) => y(f2(X[i], Y[i])))(T)
    );

  return svg.node();
}
```

```js echo
viewof xy = new View([1.4, 1.6])
```

```js echo
const simulate = {
  const l = 24, k = 20, n = l * k;
  const solver = new odex.Solver(2);
  solver.denseOutput = true;
  return ({alpha, beta, gamma, delta, x0, y0}) => {
    let i = 0;
    const T = new Float64Array(n);
    const X = new Float64Array(n);
    const Y = new Float64Array(n);
    const input = (_, [x, y]) => [alpha * x - beta * x * y, delta * x * y - gamma * y];
    const output = solver.grid(1 / k, (t, [x, y]) => (T[i] = t, X[i] = x, Y[i] = y, ++i));
    solver.solve(input, 0, [x0, y0], l, output);
    return [T, X, Y];
  };
}
```

```js echo
function cycle(T, X, Y) {
  let j,
    x0 = X[0],
    x1 = X[1],
    x2;
  for (let i = 2, n = T.length; i < n; ++i) {
    (x0 = x1), (x1 = x2), (x2 = X[i]);
    if (x0 > x1 && x1 < x2) {
      if (j > 0) return [T.slice(j, i), X.slice(j, i), Y.slice(j, i)];
      j = i;
    }
  }
  return [T, X, Y]; // Unable to find cycle!
}
```

```js echo
const xColor = d3.schemeCategory10[6];
```

```js echo
const yColor = d3.schemeCategory10[5];
```

```js echo
const color1 = d3.schemeCategory10[2];
```

```js echo
const color2 = d3.schemeCategory10[3];
```

```js echo
const negativeColor = "#aaa";
```

```js echo
class View {
  constructor(value) {
    this._list = [];
    this._value = value;
  }
  get value() {
    return this._value;
  }
  set value(value) {
    this._value = value;
    this.dispatchEvent({type: "input", value});
  }
  addEventListener(type, listener) {
    if (type != "input" || this._list.includes(listener)) return;
    this._list = [listener].concat(this._list);
  }
  removeEventListener(type, listener) {
    if (type != "input") return;
    this._list = this._list.filter((l) => l !== listener);
  }
  dispatchEvent(event) {
    const p = Promise.resolve(event);
    this._list.forEach((l) => p.then(l));
  }
}
```

```js echo
const exports = (window.exports = {});
```

```js echo
const odex = require("odex@2").catch(() => exports);
```

```js echo
const d3 = require("d3@6");
```
