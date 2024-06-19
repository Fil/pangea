import * as Plot from "npm:@observablehq/plot";
import {feature} from "npm:topojson-client";

export async function worldmap(projection) {
  const land = await fetch(import.meta.resolve("npm:world-atlas@2/land-110m.json")).then((d) => d.json());
  return Plot.plot({
    projection: ({width, height}) => projection.fitSize([width, height], {type: "Sphere"}),
    marks: [Plot.graticule(), Plot.geo(feature(land, land.objects.land), {fill: "currentColor"}), Plot.sphere()]
  });
}
