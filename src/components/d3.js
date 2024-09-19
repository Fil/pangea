import * as _d3 from "npm:d3";

export function registerD3(files) {
  const m = new Map(files.map(({name, href}) => [name.split("/").pop(), href]));
  const h = (s) => m.get(s.split("/").pop()) ?? s;
  return {
    ..._d3,
    csv: (s, ...rest) => _d3.csv(h(s), ...rest),
    json: (s, ...rest) => _d3.json(h(s), ...rest),
    text: (s, ...rest) => _d3.text(h(s), ...rest),
    tsv: (s, ...rest) => _d3.tsv(h(s), ...rest)
  };
}
