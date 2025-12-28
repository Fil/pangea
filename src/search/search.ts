export async function printIndex(type: string, ref: string, root = ref) {
  const f = type === "VitePress" ? VitePress : type === "Framework" ? Framework : null;
  if (f === null) throw new Error(`Unsupported index type ${type}`);
  f(ref).then((index) => process.stdout.write(JSON.stringify({root, index})));
}

// Gets the minisearch index from a framework project >= 1.10. The file
// minisearch.xxx.json is referenced in search.js
async function Framework(ref: string) {
  const search = await find("search", "js", ref);
  const minisearch = await find("minisearch", "json", `${ref}_observablehq/${search}`);
  return JSON.parse(await fetch(`${ref}_observablehq/${minisearch}`).then((resp) => resp.text()));
}

// Gets the minisearch index from a vitepress project. The
// @localSearchIndexroot.zzz.js file is referenced through theme.xxx.js and
// VPLocalSearchBox.yyy.js
async function VitePress(ref: string) {
  const theme = await find("theme", "js", ref);
  const searchbox = await find("VPLocalSearchBox", "js", `${ref}assets/chunks/${theme}`);
  const searchroot = await find("localSearchIndexroot", "js", `${ref}assets/chunks/${searchbox}`);
  const searchindex = await fetch(`${ref}assets/chunks/@${searchroot}`).then((d) => d.text());
  return JSON.parse(eval(searchindex.replace(/^\s*const \w+=/, "").replace(/;export{\w+ as default};\s*$/, "")));
}

async function find(needle: string, ext: string, ref: string): Promise<string> {
  const re = new RegExp(`\\b${needle}\\.[a-z0-9_-]+\\.${ext}\\b`, "i");
  const haystack = await fetch(ref).then((resp) => resp.text());
  const m = re.exec(haystack);
  if (!m) throw new Error(`can't find ${needle} in ${ref}\n\n${haystack}`);
  return m[0];
}
