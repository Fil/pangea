import * as Plot from "npm:@observablehq/plot";
import * as Inputs from "npm:@observablehq/inputs";
import * as d3 from "npm:d3";

export const projection = ({width, height, angle = 0}) => {
  const sqrt3_2 = Math.sqrt(3) / 2;
  let scale = 1;
  let tx = 0;
  let ty = 0;
  const ca = Math.cos((angle * Math.PI) / 180);
  const sa = Math.sin((angle * Math.PI) / 180);
  const q = (x, y) => [x + y * 0.5, -y * sqrt3_2];
  const p = (x, y) => {
    [x, y] = q(x, y);
    return [scale * (x * ca + y * sa) + tx, scale * (y * ca - x * sa) + ty];
  };
  const projection = d3.geoTransform({
    point: function (x, y) {
      this.stream.point(...p(x, y));
    },
    sphere: function () {
      this.stream.polygonStart();
      this.stream.lineStart();
      this.stream.point(...p(0, 0));
      this.stream.point(...p(0, 1));
      this.stream.point(...p(1, 0));
      this.stream.point(...p(0, 0));
      this.stream.lineEnd();
      this.stream.polygonEnd();
    }
  });

  // Fit bounds (with angle!)
  const [[x1, y1], [x2, y2]] = d3.geoPath(projection).bounds({type: "Sphere"});
  const w = width / (x2 - x1);
  const h = height / (y2 - y1);
  scale = Math.min(w, h);
  tx = w > scale ? width / 2 - (scale * (x2 + x1)) / 2 : -x1 * scale;
  ty = w < scale ? height / 2 - (scale * (y2 + y1)) / 2 : -y1 * scale;
  return projection;
};

export const normalize = ({a, b, c, ...options} = {}) => {
  if (a == null) throw new Error("missing channel a");
  if (b == null) throw new Error("missing channel b");
  if (c == null) throw new Error("missing channel c");
  const [X, setX] = Plot.column(a); // Using a hides x from the tip!
  const [Y, setY] = Plot.column(b);
  return Plot.transform({x: X, y: Y, ...options}, (data, facets) => {
    const A = Plot.valueof(data, a);
    const B = Plot.valueof(data, b);
    const C = Plot.valueof(data, c);
    setX(A.map((d, i) => d / (A[i] + B[i] + C[i])));
    setY(B.map((d, i) => d / (A[i] + B[i] + C[i])));
    return {data, facets};
  });
};

export const graticule = (options) =>
  Plot.link(
    d3.range(0.1, 1, 0.1).flatMap((d) => [
      [d, 0, 0, d],
      [d, 0, d, 1 - d],
      [0, d, 1 - d, d]
    ]),
    {
      x1: "0",
      y1: "1",
      x2: "2",
      y2: "3",
      stroke: "#aaa",
      strokeWidth: 0.5,
      ...options
    }
  );

export const tickLabels = (data = d3.range(0.1, 1, 0.1), {tickFormat = ".0%", ...options} = {}) => {
  const text = d3.format(tickFormat);
  return Plot.marks(
    Plot.text(data, {
      x: (d) => 1 - d,
      y: 0,
      text,
      rotate: 60,
      textAnchor: "start",
      dx: 2,
      dy: 5,
      ...options
    }),
    Plot.text(data, {
      x: 0,
      y: (d) => d,
      text,
      rotate: 0,
      textAnchor: "end",
      dx: -5,
      dy: 0,
      ...options
    }),
    Plot.text(data, {
      x: (d) => d,
      y: (d) => 1 - d,
      text,
      textAnchor: "start",
      rotate: -60,
      dx: 2,
      dy: -5,
      ...options
    })
  );
};

export const labels = (data, options) =>
  Plot.text(data, {
    x: [1.075, -0.025, -0.025],
    y: [-0.05, 1.05, -0.05],
    text: Plot.identity,
    ...options
  });

export const sphere = Plot.sphere;

export function slider({r = 5, fill = "red", constrain = true, value = [1 / 3, 1 / 3, 1 / 3], ...options} = {}) {
  const n = d3.sum(value);
  for (let i = 0; i < 3; i++) value[i] = (value[i] ?? 0) / n;
  return Plot.dot([value, [1, 0], [0, 1], [0, 0]], {
    r,
    fill,
    pointerEvents: "all",
    ...options, // options to be passed
    filter: [true],
    x: "0",
    y: "1",
    render(index, scales, values, dimensions, context, next) {
      const plot = context.ownerSVGElement;
      const g = next(index, scales, values, dimensions, context);
      d3.select(g).style("cursor", "grab");
      const dot = g.querySelector("circle");
      const path = g.querySelector("path");
      const X = values.x;
      const Y = values.y;
      // barycentric coordinates & denominator
      const D = (X[2] - X[1]) * (Y[3] - Y[1]) - (Y[2] - Y[1]) * (X[3] - X[1]);
      let a = values.channels.x.value[0],
        b = values.channels.y.value[0],
        c = 1 - a - b;
      const z = {a, b, c};

      // value accessors
      function set({a, b, c}) {
        if (constrain) {
          while (a < 0 || b < 0 || c < 0) {
            if (a < 0) ((b += a / 2), (c += a / 2), (a = 0));
            if (b < 0) ((a += b / 2), (c += b / 2), (b = 0));
            if (c < 0) ((b += c / 2), (a += c / 2), (c = 0));
          }
        }
        const x = a * X[1] + b * X[2] + c * X[3];
        const y = a * Y[1] + b * Y[2] + c * Y[3];
        if (dot) {
          dot.setAttribute("cx", x);
          dot.setAttribute("cy", y);
        } else path.setAttribute("transform", `translate(${x},${y})`);
        Object.assign(z, {a, b, c});
      }
      function get() {
        return z;
      }
      Object.defineProperty(plot, "value", {set, get});
      plot.dispatchEvent(new Event("input"));

      const drag = d3
        .drag()
        .on("start", () => d3.select(g).style("cursor", "grabbing"))
        .on("end", () => d3.select(g).style("cursor", "grab"))
        .on("drag", ({x, y}) => {
          // project
          c = ((X[2] - X[1]) * (y - Y[1]) - (Y[2] - Y[1]) * (x - X[1])) / D;
          b = ((x - X[1]) * (Y[3] - Y[1]) - (y - Y[1]) * (X[3] - X[1])) / D;
          a = 1 - b - c;
          set({a, b, c});
          plot.dispatchEvent(new Event("input"));
        });
      d3.select(g).call(drag);
      return g;
    }
  });
}

export function combo({labels = ["a", "b", "c"], value = [1 / 3, 1 / 3], step = 0.001} = {}) {
  const n = d3.sum(value);
  for (let i = 0; i < 3; i++) value[i] = (value[i] ?? 0) / n;
  const a = Inputs.range([0, 1], {label: labels[0], value: value[0], step});
  const b = Inputs.range([0, 1], {label: labels[1], value: value[1], step});
  const c = Inputs.range([0, 1], {label: labels[2], value: value[2], step});
  ternarySync(a, b, c);
  ternarySync(b, a, c);
  ternarySync(c, a, b);
  return Inputs.form({a, b, c});
}

function ternarySync(a, b, c) {
  a.addEventListener("input", (event) => {
    if (!event.isTrusted) return;
    const bc1 = 1 - a.value;
    const bc2 = b.value + c.value;
    if (bc2) {
      b.value = (b.value / bc2) * bc1;
      c.value = (c.value / bc2) * bc1;
    } else {
      b.value = c.value = bc1 / 2;
    }
    b.dispatchEvent(new InputEvent("input"));
    c.dispatchEvent(new InputEvent("input"));
  });
}
