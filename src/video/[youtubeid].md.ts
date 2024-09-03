import {parseArgs} from "node:util";
import {utcFormat} from "d3";
import Parser from "rss-parser";

const {
  values: {youtubeid}
} = parseArgs({
  options: {youtubeid: {type: "string"}}
});

const link = `https://www.youtube.com/watch?v=${youtubeid}`;

const dateFormat = utcFormat("%Y-%m-%d");
const parser = new Parser({customFields: {item: ["title", "media:group", "isoDate"]}});

const url = "https://www.youtube.com/feeds/videos.xml?channel_id=UCCD2tAKN32ya7V639gkbWhg";
const entry = await parser.parseURL(url).then((feed) => feed.items.find((entry) => entry.link === link));

if (!entry) throw new Error(`Unavailable ${youtubeid}`);

const title = entry.title;
const description = entry["media:group"]?.["media:description"]?.[0];
const thumbnail = entry["media:group"]?.["media:thumbnail"]?.[0]?.["$"]?.["url"];

process.stdout.write(`---
index: true
title: ${JSON.stringify(`Video: ${title}`)}
ignore_head: '<meta http-equiv="refresh" content="0; url=${link}">'
---

# ${title}
## Published ${dateFormat(new Date(entry.isoDate))}

<img class=thumbnail src=${JSON.stringify(thumbnail)} style="width: 640px; max-width: 100%;">

<small>

${description}

</small>

`);

/*
~~~
${JSON.stringify(entry, null, 2)}
~~~
*/
