const EMOJI_FAVICON = "🌍";
const FOOTER_OBSERVABLE = `<p>Built with <a href="https://observablehq.com/" target="_blank">Observable</a><span></span>.</p>`;

const SOURCE_REPO = "https://github.com/Fil/pangea/blob/main/src";

const VIEW_SOURCE = !SOURCE_REPO
  ? ""
  : `
<style>
a.view-source {
  position: absolute;
  top: 0;
  right: 0;
  font: 700 18px var(--sans-serif);
  text-decoration: none !important;
  padding: 0 4px;
}
a.view-source:not(:hover,:focus) {
  color: inherit;
}
</style>
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
  title: "Pangea Proxima",
  root: "src",
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
  dynamicPaths: ["/d3/", "/thumbnail/"],
  toc: false, // whether to show the table of contents
  pager: false, // whether to show previous & next links in the footer
  sidebar: true,
  search: true,
  head: `<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${EMOJI_FAVICON}</text></svg>">`,
  header: `${VIEW_SOURCE}`,
  footer: FOOTER_OBSERVABLE
};
