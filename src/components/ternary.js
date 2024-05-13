import * as Plot from "npm:@observablehq/plot";
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
    x: (_, i) => [1.075, -0.025, -0.025][i],
    y: (_, i) => [-0.05, 1.05, -0.05][i],
    text: Plot.identity,
    ...options
  });

export const sphere = Plot.sphere;
