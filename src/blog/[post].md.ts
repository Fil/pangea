import {parseArgs} from "node:util";

const {
  values: {post}
} = parseArgs({
  options: {post: {type: "string"}}
});

const url = `https://observablehq.com/blog/${post}`;

const contents = await fetch(url, {headers: {cookie: "ab.storage.sessionId=1;"}}).then((d) => d.text());

const title = contents.match(/<meta property="og:title" content="(.*?)"\s*\/?>/m)?.[1];
const description = contents.match(/<meta property="og:description" content="([^>]*)"\s*\/?>/m)?.[1] ?? "";
const thumbnail = contents.match(/<meta property="og:image" content="([^>]*)"\s*\/?>/m)?.[1] ?? "";
const link = `https://observablehq.com/blog/${post}`;

process.stdout.write(`---
index: true
title: ${JSON.stringify(`Blog: ${title}`)}
ignore_head: '<meta http-equiv="refresh" content="0; url=${link}">'
---

# ${title}
## From the Observable blog

${link}

<img class=thumbnail src=${JSON.stringify(thumbnail)} style="width: 640px; max-width: 100%;">

${description}


`);
