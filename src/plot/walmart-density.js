import {Scrubber} from "../components/scrubber.js";
import * as Plot from "npm:@observablehq/plot";
import {range} from "npm:d3-array";
import {html} from "npm:htl";
import {feature, mesh} from "npm:topojson-client"
import {FileAttachment, resize} from "observablehq:stdlib";

function chart(walmarts, nation, statemesh, width, dark) {
  return Plot.plot({
    width,
    projection: "albers",
    color: {scheme: dark ? "turbo" : "YlGnBu"},
    style: "overflow: visible;",
    marks: [
      Plot.density(walmarts, {x: "longitude", y: "latitude", bandwidth: 10, fill: "density"}),
      Plot.geo(statemesh, {strokeOpacity: 0.3}),
      Plot.geo(nation),
      Plot.dot(walmarts, {x: "longitude", y: "latitude", r: 1, fill: "currentColor"})
    ]
  })
}

export async function WalmartDensity({dark = false, slider = true} = {}) {
  const [us, walmarts] = await Promise.all([FileAttachment("../data/us-counties-10m.json").json(), FileAttachment("../data/walmarts.tsv").tsv({typed: true})]);
  const nation = feature(us, us.objects.nation);
  const statemesh = mesh(us, us.objects.states);
  const input = slider
    ? Scrubber(range(1963, 2001), {initial: 0, delay: 100, autoplay: true, loop: false})
    : html`<span>`;
  let width;
  let plot = html`<svg>`;
  function update() {
    plot.replaceWith(plot = chart(walmarts.filter((d) => !input.value || d.date.getUTCFullYear() <= input.value), nation, statemesh, width, dark));
  }
  input.addEventListener("input", update);
  const wrapper = html`<div>${input}${plot}`;
  return resize((w) => (width = w, update(), wrapper));
}

// Web Component <div is="{component-name}">
export function component(name) {
  customElements.define(name, class extends HTMLDivElement {
    connectedCallback() {
      WalmartDensity({
        dark: getComputedStyle(this)["color-scheme"] === "dark"
      })
        .then((e) => this.attachShadow({mode: "open"}).appendChild(e));
    }
  }, {extends: "div"});
};
