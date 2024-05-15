// this file needs to be copied over from
// "../plot/docs/.vitepress/dist/assets/chunks/@localSearchIndexroot.k5mZR14Z.js"
import plotindex from "../src/.observablehq/cache/plotsearch.js";

async function getMinisearchIndex(source: string) {
  const r1 = await fetch(`${source}_observablehq/search.js`);
  if (r1.ok) {
    const script = (await r1.text()).match(/minisearch.\w+.json/)![0];
    const r2 = await fetch(`${source}_observablehq/${script}`);
    if (r2.ok) return {source, index: JSON.parse(await r2.text())};
  }
}

async function main() {
  const d3 = await getMinisearchIndex("https://d3.observablehq.cloud/examples/");
  const pangea = await getMinisearchIndex("https://observablehq.observablehq.cloud/pangea/");
  const framework = await getMinisearchIndex("https://observablehq.com/framework/");
  const plot = {
    source: "https://observablehq.com/",
    index: {...JSON.parse(plotindex), options: {fields: ["title", "titles", "text"], storeFields: ["title"]}}
  };
  process.stdout.write(JSON.stringify({d3, plot, pangea, framework}));
}

main();
