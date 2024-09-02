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

process.stdout.write(`---
index: true
---

# Blog: ${title}

<meta http-equiv="refresh" content="0; url=https://observablehq.com/blog/${post}">

${description}


`);
