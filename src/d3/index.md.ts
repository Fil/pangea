import {createIndex} from "../ssr/category.ts";
import {sections} from "../d3-gallery.json" assert {type: "json"};

const count = new Set(sections.flatMap((d) => (d[1] as any).pages)).size;
const intro = `# D3 gallery

Looking for a good D3 example? Here’s a few (okay, ${count.toLocaleString("en")}…) to peruse.
`;

process.stdout.write(await createIndex(sections as any, intro, ""));
