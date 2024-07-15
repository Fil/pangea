import {existsSync, writeFileSync} from "node:fs";

const HTTP_ROOT = "http://127.0.0.1:3033";

async function main() {
  const index = await fetch(`${HTTP_ROOT}/_observablehq/minisearch.json`).then((resp) => resp.json());
  const documents: {id: string; title: string; thumbnail?: string}[] = [];
  for (const [i, id] of Object.entries(index.documentIds)) {
    const path = `thumbnail${id}.png`;
    let save = true;
    try {
      save &&= !existsSync(`src/${path}`);
    } catch (e) {}
    documents.push({id: id as string, title: index.storedFields[i].title, ...(!save && {thumbnail: path})});
  }

  writeFileSync(
    "src/thumbnail/index.md",
    `
# Index

<style>
#list p {display: flex; flex-wrap: wrap; max-width: 100%; gap: 10px;}
#list a {display: block; width: 320px;}
#list img {display: block; width: 320px;}
</style>

<div id=list>

${documents
  .map(({id, title, thumbnail}) =>
    thumbnail ? `<a href="..${id}"><img src="../${thumbnail}" />${title}</a>` : `<a href="${id}">${title}</a>`
  )
  .join("\n")}


</div>

  `
  );
}

main();
