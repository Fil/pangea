/**
 * This script generates markdown for the home page, see src/thumbnail/index.md
 */
import {existsSync} from "node:fs";
import type {AsPlainObject as MinisearchIndex} from "minisearch";
export type Section = {title: string; pages?: string[]; description?: string};
export type Document = {id: string; title: string; light?: string; dark?: string};

const HTTP_ROOT = "https://observablehq.observablehq.cloud/pangea/";

export async function createIndex(sections: [string, Section][], intro: string, more: string) {
  const categories = new Map<string, Section>(sections);
  const searchjs = (await fetch(HTTP_ROOT).then((d) => d.text())).match(/[/]search\.\w{8}\.js/)?.[0];
  const minisearchjson = (await fetch(`${HTTP_ROOT}_observablehq${searchjs}`).then((d) => d.text())).match(
    /[/]minisearch\.\w{8}\.json/
  )?.[0];
  if (!minisearchjson) return "—"; // not available yet
  const ms: MinisearchIndex = await fetch(`${HTTP_ROOT}_observablehq${minisearchjson}`).then((resp) => resp.json());
  const documents: Document[] = Object.entries(ms.documentIds).map(([i, id]) => {
    const pathLight = `thumbnail${id}-light.png`;
    const pathDark = `thumbnail${id}-dark.png`;
    let hasLight = false;
    let hasDark = false;
    try {
      if (existsSync(`src/${pathLight}`)) hasLight = true;
      if (existsSync(`src/${pathDark}`)) hasDark = true;
    } catch (e) {}
    return {
      id,
      title: ms.storedFields[i].title,
      light: hasLight ? `../${pathLight}` : undefined,
      dark: hasDark ? `../${pathDark}` : undefined
    };
  });

  const cat = new Map<string, Set<string>>();

  for (const [word, {pages}] of categories) {
    if (pages) {
      cat.set(
        word,
        new Set(
          pages
            .map((id) => {
              const i = documents.findIndex((d) => d.id === id);
              if (i > -1) return String(i);
              console.warn(`Couldn't find ${id}`);
              return "";
            })
            .filter((d) => d)
        )
      );
    } else {
      for (const [w, fields] of Object.values(ms.index)) {
        // word is in title[0] or keywords[2]
        if (w === word)
          cat.set(word, new Set([...(Object.keys(fields[0] ?? {}) ?? []), ...(Object.keys(fields[2] ?? {}) ?? [])]));
      }
    }
  }

  if (more) cat.set("more", new Set(Array.from(documents, (_, i) => `${i}`)));

  const seen = new Set();

  const groups = Array.from(
    cat,
    ([word, ids]) =>
      `## ${categories.get(word)?.title}\n\n${
        categories.get(word)?.description ? `\n\n${categories.get(word)?.description}\n\n` : ""
      }<div class="list">\n${Array.from(ids, (id) =>
        seen.has(id)
          ? (word !== "more" && console.warn("duplicate", documents[id].id), null)
          : (seen.add(id), documents[id])
      )
        .filter((d) => d != null)
        .map(({id, title, light, dark}) =>
          light && dark
            ? `<a href="${id}"><picture><source srcset="${dark}" media="(prefers-color-scheme: dark)"><img src="${light}" loading="lazy"></picture><q>${title}</q></a>`
            : light || dark
            ? `<a href="${id}"><img src="${light ?? dark}" loading="lazy"><q>${title}</q></a>`
            : `<a href="${id}"><q>${title}</q></a>`
        )
        .join("\n")}\n</div>`
  );

  const HEAD = `---
theme: wide
index: false
toc: true
---

${intro ?? ""}

<style>
#observablehq-header a.view-source {display: none;}
.gallery h2 {
  margin: 2em 0 0.5em 0;
}
.list {
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  gap: 12px;
}
.list a {
  display: block;
  position: relative;
  max-width: 320px;
  width: 260px;
  flex-grow: 1;
  height: 195px;
  border: 1px solid color-mix(in srgb, var(--theme-foreground-focus), transparent 80%);
  font-family: var(--sans-serif);
}
.list a:hover {
  border: 1px solid var(--theme-foreground-focus);
  box-shadow: 0 4px 12px var(--theme-foreground-focus);
  transform: translateY(-1px);
}
.list a q {
  position: absolute;
  top: 0;
  left: 0;
  quotes: none;
  padding: 4px 15px;
  background: var(--theme-foreground-focus);
  color: var(--theme-background-alt);
  max-width: 60%;
  border-radius: 0 0 14px;
  line-height: 1.25em;
  max-height: 2.5em;
  overflow: hidden;
  text-overflow: ellipsis;
}
.list a img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>`;

  return `${HEAD}

<div class=gallery>

${groups.join(`\n\n\n`)}

</div>

`;
}
