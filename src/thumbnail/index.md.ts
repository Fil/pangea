import {createIndex} from "../ssr/category.ts";
import INDEX from "../index.json" with {type: "json"};
const {sections} = INDEX;

const intro = `# Pangea Proxima

## Examples, techniques, algorithms: a collection

_What?_ These pages demonstrate some modern data visualization techniques that you
can use on the Web. They are built with [Observable Framework](https://observablehq.com/framework/),
an open-source static site generator for data apps, dashboards, reports, and more.
We mostly use [Observable Plot](https://observablehq.com/plot/) and [D3](https://d3js.org/),
but also venture outside this ecosystem.

_How?_ To access the code of any page, just click on the view source icon <span>⚉</span> in the top-right corner. If
you’d like to contribute examples, please open a pull-request on the project’s GitHub [repo](https://github.com/fil/pangea). If you want something that you
don’t find here, please open a [feature request](https://github.com/Fil/pangea/issues/new).

_Who?_ This collection is maintained by Fil Rivière. I work at [Observable](https://observablehq.com/) with the aim of building a strong foundation
for data visualization on the Web. This is a place where I collect, experiment, showcase, and share some
of the goodies. Most of these pages were initially authored by other people: Mike Bostock, Volodymyr Agafonkin,
Tom McWright, Jason Davies, Allison Horst, Franck Lebeau, Ian Johnson, Shirley Wu, Nadieh Bremer, Jeffrey Heer,
Rene Cutura, Jeff Pettiross, Zan Armstrong, Fabian Iwand, Nicolas Lambert, Cobus Theunissen, Enrico Spinielli,
Harry Stevens, Jareb Wilber, Jean-Daniel Fekete, Dominik Moritz, Kerry Rodden, Matteo Abrate, Noah Veltman,
Danilo Di Cuia, John Alexis Guerra Gómez, Justin Kunimune,
and others… thank you to everyone who publishes open source!

<a class="view-source" href="https://github.com/Fil/pangea/blob/main/src/thumbnail/index.md?plain=1">⚉</a>
`;

process.stdout.write(await createIndex(sections as any, intro, "More…"));
