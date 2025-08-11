import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {join} from "node:path/posix";
import Parser from "rss-parser";

const SITE_NAME = "Pangea Proxima";
const HTTP_ROOT = "https://observablehq.observablehq.cloud/pangea/";
const SRC_ROOT = "src";

const parser = new Parser({customFields: {item: ["link"]}});
const feeds = {
  // blog: parser.parseURL("https://observablehq.com/blog/feed.rss"),
  // videos: parser.parseURL("https://www.youtube.com/feeds/videos.xml?channel_id=UCCD2tAKN32ya7V639gkbWhg")
};

async function* dynamicPaths() {
  for (const item of (await feeds.blog).items) {
    const a = item.link.match(/blog\/(.*)$/)?.[1];
    if (a && a !== "announcing-embedded-analytics") yield `/blog/${a}`;
    if (a === "observable-2-0") break; // ignore older posts
  }
  for (const item of (await feeds.videos).items) {
    const a = item.link.match(/watch\?v=(.*)$/)?.[1];
    if (a) yield `/video/${a}`;
  }
  yield "/video/blYQhiOMhwA"; // A duck for your dashboard, by Robert Kosara
  yield "/plot/walmart-density.js"; // Demonstrating an exported module
}

const EMOJI_FAVICON = "🌍";
const FOOTER_OBSERVABLE = `<p>Built with <a href="https://observablehq.com/" target="_blank">Observable</a><span></span>.</p>`;
const SOURCE_REPO = "https://github.com/Fil/pangea/blob/main/src";

const VIEW_SOURCE = !SOURCE_REPO
  ? ""
  : `
<a class="view-source" target="_blank" aria-label="view source" title="view source" href="${SOURCE_REPO}">⚉</a>
<script type="module">
const a = document.querySelector(".view-source");
a.setAttribute("href", a.getAttribute("href") + (
  document.location.pathname
    .replace(/[/]$/, "/index")
    .replace(/^[/]pangea(-proxima)?/, "")
  ) + ".md?plain=1"
);
</script>
`;

export default {
  title: SITE_NAME,
  root: SRC_ROOT,
  style: "/assets/pangea.css",
  pages: [
    /*
    {
      name: "D3",
      pages: [
        {name: "Graphs", path: "d3/graphs"},
        {name: "Maps", path: "d3/maps"}
      ]
    },
    {
      name: "Plot",
      pages: [
        {name: "Delaunay, Voronoi", path: "plot/delaunay-voronoi"},
        {name: "Image", path: "plot/image"}
      ]
    }
    // {
    // name: "Others",
    // pages: [
    // { name: "Mosaic", path: "others/mosaic" },
    // { name: "Three.js", path: "others/three.js" },
    // { name: "Three.js", path: "others/a-frame" },
    // ],
    // },
    */
  ],
  dynamicPaths,
  toc: false, // whether to show the table of contents
  pager: false, // whether to show previous & next links in the footer
  sidebar: true,
  search: true,
  head,
  header: `${VIEW_SOURCE}`,
  footer: FOOTER_OBSERVABLE,
  duckdb: {extensions: ["spatial", "h3", "pivot_table"]}
};

function head({path, title}) {
  return `<meta property="og:title" content=${JSON.stringify(title ?? SITE_NAME)}>
${og_image(
  path
)}<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${EMOJI_FAVICON}</text></svg>">
  `;
}

function og_image(path) {
  try {
    // computes the same hash as framework 🌶
    const contents = readFileSync(join(SRC_ROOT, `thumbnail${path}.png`));
    const key = createHash("sha256").update(contents).digest("hex").slice(0, 8);
    const esc_img = JSON.stringify(`${HTTP_ROOT}_file/thumbnail${path}.${key}.png`);
    return `<link href="/thumbnail${path}.png">
<meta property="og:image" content=${esc_img} />
<meta property="twitter:image" content=${esc_img} />
`;
  } catch (error) {
    return "";
  }
}
