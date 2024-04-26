import * as Plot from "@observablehq/plot";
import * as d3 from "d3";

const barley = await d3.csv(
  "https://raw.githubusercontent.com/observablehq/plot/main/test/data/barley.csv",
  d3.autoType
);

export function beckerBarleyChart({document, dark}) {
  const chart = Plot.plot({
    document,
    marginLeft: 110,
    height: 800,
    grid: true,
    x: {nice: true},
    y: {inset: 5},
    color: {type: "categorical"},
    facet: {marginRight: 90},
    marks: [
      Plot.frame(),
      Plot.dot(barley, {
        x: "yield",
        y: "variety",
        fy: "site",
        stroke: "year",
        sort: {fy: "x", y: "x", reduce: "median", reverse: true}
      })
    ]
  });

  if (dark) chart.setAttribute("style", "color: white;");

  return chart;
}
