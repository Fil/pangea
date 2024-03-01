export async function navio(data, {columns = data.columns ?? Object.keys(data[0]), height = 300} = {}) {
  const navio = await import("https://esm.sh/navio@0.0.74").then((d) => d.default);
  const d3 = await import("https://esm.sh/d3-selection@3.0.0");
  const selection = d3.create("div");
  selection.style("fill", "currentColor"); // for dark mode
  const div = selection.node();
  const nv = navio(selection, height);
  nv.data(data);
  nv.addAllAttribs(columns); // ...options?
  div.value = data;
  nv.updateCallback(() => {
    div.value = Object.assign(nv.getVisible(), {columns});
    div.dispatchEvent(new Event("input", {bubbles: true}));
  });
  div.nv = nv;
  return div;
}
