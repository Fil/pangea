import "dotenv/config";
import {parseArgs} from "node:util";
import {format, utcFormat} from "d3";

const {
  values: {youtubeid}
} = parseArgs({
  options: {youtubeid: {type: "string"}}
});

const {YOUTUBE_API_KEY} = process.env;

const link = `https://www.youtube.com/watch?v=${youtubeid}`;

const dateFormat = utcFormat("%Y-%m-%d");

const list = await fetch(
  `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${youtubeid}&key=${YOUTUBE_API_KEY}`
).then((d) => d.json());

const entry = list.items[0];

if (!entry) throw new Error(`Unavailable ${youtubeid}`);

const title = entry.snippet.title;
const date = new Date(entry.snippet.publishedAt);
const description = entry.snippet.description;
const thumbnail = entry.snippet.thumbnails.high?.url;
const views = entry.statistics.viewCount;

process.stdout.write(`---
index: true
title: ${JSON.stringify(`Video: ${title}`)}
ignore_head: '<meta http-equiv="refresh" content="0; url=${link}">'
---

# ${title}
## Published ${dateFormat(date)}

<!-- <pre>${JSON.stringify(entry, null, 2)}</pre> -->

<!-- <img class=thumbnail src=${JSON.stringify(thumbnail)} style="width: 640px; max-width: 100%;"> -->
<iframe class=thumbnail style="max-width: 100%" width="640" height="360" src="https://www.youtube.com/embed/${youtubeid}" title="YouTube video player" frameborder="0" allow="autoplay; encrypted-media; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<small>

${description}

</small>

${format(",")(+views)} views.

`);

/*
~~~
${JSON.stringify(entry, null, 2)}
~~~
*/
