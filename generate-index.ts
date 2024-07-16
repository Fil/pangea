import {existsSync, writeFileSync} from "node:fs";

const HTTP_ROOT = "http://127.0.0.1:3033";

async function main() {
  const index = await fetch(`${HTTP_ROOT}/_observablehq/minisearch.json`).then((resp) => resp.json());
  const documents: {id: string; title: string; light?: string; dark?: string}[] = [];
  for (const [i, id] of Object.entries(index.documentIds)) {
    const pathLight = `thumbnail${id}-light.png`;
    const pathDark = `thumbnail${id}-dark.png`;
    let hasLight = false;
    let hasDark = false;
    try {
      if (existsSync(`src/${pathLight}`)) hasLight = true;
      if (existsSync(`src/${pathDark}`)) hasDark = true;
    } catch (e) {}
    documents.push({
      id: id as string,
      title: index.storedFields[i].title,
      light: hasLight ? pathLight : undefined,
      dark: hasDark ? pathDark : undefined
    });
  }

  writeFileSync(
    "src/thumbnail/index.md",
    `---
theme: dashboard
title: Gallery
index: false
sidebar: false
---

<style>
#list {
  margin-top: 2em;
}
#list p {
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  gap: 10px;
}
#list a {
  display: block;
  max-width: 320px;
  width: 260px;
  flex-grow: 1;
  height: 195px;
  background-size: cover;
  border: 2px solid var(--theme-foreground-focus);
  font-family: var(--sans-serif);
}
#list a:hover {
  box-shadow: 0 4px 12px var(--theme-foreground-focus);
  transform: translateY(-1px);
}
#list a q {
  quotes: none;
  padding: 4px 15px;
  background: var(--theme-foreground-focus);
  color: var(--theme-background-alt);
  max-width: 60%;
  border-radius: 0 0 14px;
  display: inline-block;
  line-height: 1.25em;
  max-height: 2.5em;
  text-overflow: ellipsis;
  overflow: hidden;  
}
</style>

<div id=list>

${documents.map(({id, title}) => `<a href="..${id}"><q>${title}</q></a>`).join("\n")}

</div>

~~~js
const bg = [
${documents.map(({light, dark}) => `${fa(dark)}, ${fa(light)}`).join(",\n")}
];
~~~

~~~js
{
  function intersect(entries) {
    for (const {isIntersecting, target} of entries) {
      if (isIntersecting) {
        const {v} = target;
        if (v) target.style.backgroundImage = \`url("\${v.href}")\`;
        observer.unobserve(target);
      }
    }
  }
  const observer = new IntersectionObserver(intersect);
  let i = 0;
  for (const node of document.querySelectorAll("#list a")) {
    const d = bg[i++];
    const l = bg[i++];
    const v = dark ? (d ?? l) : (l ?? d);
    if (v) observer.observe(Object.assign(node, {v}));
  }
}
~~~
`
  );
}

function fa(x: string | undefined): string {
  return x ? `FileAttachment(${JSON.stringify(`../${x}`)})` : "null";
}

main();
