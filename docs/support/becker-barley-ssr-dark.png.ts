import {Resvg} from "@resvg/resvg-js";
import {parseHTML} from "linkedom";
import {beckerBarleyChart} from "./becker-barley.js";

const {document} = parseHTML("<a>");

const chart = beckerBarleyChart({document, dark: true});

const width = +chart.getAttribute("width")!;
chart.setAttribute("xmlns", "http://www.w3.org/2000/svg");
process.stdout.write(new Resvg(chart.outerHTML, {fitTo: {mode: "width", value: 2 * width}}).render().asPng());
