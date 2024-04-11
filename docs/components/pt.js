import tex from "npm:@observablehq/tex";

export async function pt(matrix, opts = {}) {
  const maxrows = opts.maxrows || 13;
  const maxcols = opts.maxcols || maxrows;

  const format =
    opts.format ||
    function (x) {
      return +x >= +x ? +(Math.round(x * 1000) / 1000) : x;
    };

  let values = matrix;
  let desc = opts.title || "";

  // matrix.js
  if (typeof values.toArray === "function") {
    values = values.toArray();
  }

  // tfjs
  if (typeof values.shape === "object" && typeof values.data === "function") {
    values.__data = values.data;
  }

  // ndjs
  if (typeof values.shape === "object" && typeof values.data === "object") {
    values = Object.assign({__data: () => values.data}, values);
  }

  // ml-matrix@^6.6
  if (values.rows && values.columns && typeof values.data === "object") {
    values = values.data;
  }

  // tfjs && ndjs
  if (typeof values.shape === "object" && typeof values.__data === "function") {
    let data = await values.__data(),
      shape = values.shape;
    if (shape.length === 0) shape = [1]; // scalar
    if (shape.length > 2 || shape[0] > maxrows || shape[1] > maxcols) {
      desc = `t(${values.shape})`;
    }
    values = [];
    let lastrow = shape[1] || 1;
    let lastcol = shape[0] || 1;
    for (let i = 0; i < lastrow; i++) {
      if (i < maxrows || i === lastrow - 1) {
        let line = [];
        for (let j = 0; j < lastcol; j++) {
          if (j < maxcols || j === lastcol - 1) {
            line.push(data[shape[0] * i + j]);
          }
        }
        values.push(line);
      }
    }
  }

  // simple value
  if (typeof values !== "object") return md`${desc}${values}`;

  // single row
  if (typeof values[0] !== "object") values = [values];

  const nrows = values.length,
    ncols = values[0].length;

  if (ncols > maxcols) {
    values = values.map((line, j) => {
      return [...line.slice(0, maxcols - 2), j === 0 ? "\\cdots" : "\\space", line[line.length - 1]];
    });
  }

  if (nrows > maxrows) {
    values = [
      ...values.slice(0, maxrows - 2),
      values[0].map((d, i) => (i === 0 ? "\\vdots" : ncols > maxcols && i === maxcols - 2 ? "\\ddots" : "\\space")),
      values[values.length - 1]
    ];
  }

  const data = values.map((row) => Array.from(row).map(format).join(" & ")).join(" \\\\ ");
  const el = tex`\small{
${desc}\\
\left(\begin{matrix}
${data}
\end{matrix}\right)}
`;
  el.value = matrix;
  return el;
}
