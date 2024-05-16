async function find(needle: string, ext: string, ref: string): Promise<string> {
  const re = new RegExp(`\\b${needle}\\.\\w+\\.${ext}\\b`);
  const haystack = await fetch(ref).then((resp) => resp.text());
  const m = re.exec(haystack);
  if (!m) throw new Error(`can't find ${needle} in ${ref} (${haystack})`);
  return m[0];
}

// Gets the minisearch index from a framework project. The file
// minisearch.xxx.json is referenced in search.js
async function getMinisearchIndexFW(source: string) {
  const minisearch = await find("minisearch", "json", `${source}_observablehq/search.js`);
  return {source, index: JSON.parse(await fetch(`${source}_observablehq/${minisearch}`).then((resp) => resp.text()))};
}

// Gets the minisearch index from a vitepress project. The
// @localSearchIndexroot.zzz.js file is referenced through theme.xxx.js and
// VPLocalSearchBox.yyy.js
async function getMinisearchIndexVP(ref: string, source = ref) {
  const theme = await find("theme", "js", ref);
  const searchbox = await find("VPLocalSearchBox", "js", `${ref}assets/chunks/${theme}`);
  const searchroot = await find("localSearchIndexroot", "js", `${ref}assets/chunks/${searchbox}`);
  const searchindex = await fetch(`${ref}assets/chunks/@${searchroot}`).then((d) => d.text());
  return {
    source,
    index: JSON.parse(searchindex.match(/'(.*)'/m)![1])
  };
}

async function main() {
  const d3 = await getMinisearchIndexFW("https://d3.observablehq.cloud/examples/");
  const framework = await getMinisearchIndexFW("https://observablehq.com/framework/");
  const pangea = await getMinisearchIndexFW("https://observablehq.observablehq.cloud/pangea/");
  const plot = await getMinisearchIndexVP("https://observablehq.com/plot/", "https://observablehq.com");
  const d3docs = await getMinisearchIndexVP("https://d3js.org/", "https://d3js.org");
  process.stdout.write(JSON.stringify({d3, d3docs, framework, pangea, plot}));
}

main();
