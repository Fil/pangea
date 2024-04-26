// https://www.npmjs.com/package/fast-xml-parser
import {XMLParser} from "fast-xml-parser";
import * as d3 from "d3";

const catalogue = new XMLParser().parse(
  await fetch("https://ec.europa.eu/eurostat/api/dissemination/catalogue/toc/xml").then((d) => d.text())
);

const hierarchy = d3.hierarchy(catalogue["nt:tree"]["nt:branch"][0], (d) => d["nt:children"]?.["nt:branch"]);
const fmt = d3.utcParse("%d.%m.%Y");
const t = [...hierarchy]
  .flatMap((d) => {
    let p = d.parent;
    const path = [];
    while ((p = p?.parent)) path.push(p.data["nt:title"][0]);
    return Array.from(d.data["nt:children"]["nt:leaf"] ?? []).map((d) => ({...d, path}));
  })
  .map((d) => {
    const labels = d["nt:title"],
      label = labels[0];
    return {
      //type: d["@type"],
      code: d["nt:code"],
      path: d.path.join(" > "),
      label_en: labels[0],
      label_fr: labels[1],
      label_de: labels[2],
      lastUpdate: fmt(d["nt:lastUpdate"]), //: "27.05.2021"
      lastModified: fmt(d["nt:lastModified"]), //: "03.01.2024"
      dataStart: d["nt:dataStart"], // 2009
      dataEnd: d["nt:dataEnd"], // 2018
      count: +d["nt:values"]
      // link: d["nt:downloadLink"]["#text"] // can be inferred from the code
      // https://ec.europa.eu/eurostat/api/dissemination/sdmx/2.1/data/{code}/?format=SDMX-CSV&compressed=true
    };
  });

console.log(d3.csvFormat(t));
