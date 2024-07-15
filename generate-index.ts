import {existsSync, writeFileSync} from "node:fs";

const HTTP_ROOT = "http://127.0.0.1:3033";

async function main() {
  const index = await fetch(`${HTTP_ROOT}/_observablehq/minisearch.json`).then((resp) => resp.json());
  const documents: {id: string; title: string; light?: string; dark?: string}[] = [];
  for (const [i, id] of Object.entries(index.documentIds)) {
    const path = `thumbnail${id}.png`;
    const pathDark = `thumbnail${id}-dark.png`;
    let hasLight = false;
    let hasDark = false;
    try {
      if (existsSync(`src/${path}`)) hasLight = true;
      if (existsSync(`src/${pathDark}`)) hasDark = true;
    } catch (e) {}
    documents.push({
      id: id as string,
      title: index.storedFields[i].title,
      light: hasLight ? path : undefined,
      dark: hasDark ? pathDark : undefined
    });
  }

  writeFileSync(
    "src/thumbnail/index.md",
    `
# Index

<style>
#list p {display: flex; flex-wrap: wrap; max-width: 100%; gap: 10px;}
#list a {display: block; height: 240px; width: 320px; background-size: cover;}
#list a span {padding: 4px 15px; background: var(--theme-background); border-radius: 0 0 14px;}
</style>

<div id=list>

${documents.map(({id, title}, i) => `<a id="_${i}" href="..${id}"><span>${title}</span></a>`).join("\n")}

</div>

~~~js echo
{
function s(i, d, l) {
  document.querySelector(\`#_\${i}\`).style.backgroundImage = "url(" + (dark && d ? d : l ?? d).href + ")";
}
${documents
  .map((d, i) => ({...d, i}))
  .filter(({light, dark}) => light || dark)
  .map(({light, dark, i}) => `s(${i}, ${fa(dark)}, ${fa(light)})`)
  .join("\n")}
}
~~~
`
  );
}

main();

function fa(x: string | undefined): string {
  return x ? `FileAttachment(${JSON.stringify(`../${x}`)})` : "null";
}
