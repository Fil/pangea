---
index: true
---

# DuckDB spatial

<p class=warning>This page only works because it imports a custom version of DuckDBClient that uses an alpha release of duckdb-wasm (version @1.28.1). See issues <a href=https://github.com/duckdb/duckdb-wasm/issues/1561>duckdb-wasm#1561</a>; <a href=https://github.com/observablehq/framework/issues/750>framework#750</a> and <a href=https://github.com/observablehq/framework/issues/733>framework#733</a>.</p>

```js echo
import {DuckDBClient} from "/components/duckdb.js"
```

After loading the [spatial extension](https://duckdb.org/docs/extensions/spatial.html), we populate our DuckDB database with two files:

- **annarbor**, a [GeoParquet](https://geoparquet.org/) file (that I made by converting an old GeoJSON file from a Waldo Tobler project); we can load it directly from the file attachment.
- **us/10m**, TopoJSON’s [US Atlas](https://github.com/topojson/us-atlas) file, that we import with `ST_Read()`.

```js echo
const db = await DuckDBClient.of();

await db.sql`INSTALL spatial; LOAD spatial;`

await db.sql([`CREATE OR REPLACE TABLE annarbor
  AS FROM '${FileAttachment("/data/annarbor.parquet").href}';`]);

await db.sql([`CREATE OR REPLACE TABLE us AS (
  FROM ST_Read('${import.meta.resolve("npm:us-atlas@3/counties-10m.json")}')
)`]);
```

---

The map below shows the shape of Ann Arbor. Note that to extract the geometry information from GeoParquet, we have to convert the `geometry` field from a `BLOB` (or “[well-known binary](https://libgeos.org/specifications/wkb/)”) with `ST_GeomFromWKB` to `ST_GEOMETRY`, then to GeoJSON (with `ST_AsGeoJSON`), then parse the GeoJSON text to an actual JavaScript Object. This is most certainly not the most efficient technique!

```js echo
Plot.plot({
  projection: {
    type: "mercator",
    domain: {
      type: "GeometryCollection",
      geometries: Array.from(annarbor, (d) => d.geometry)
    }
  },
  color: {scheme: "blues", range: [0.2, 1]},
  marks: [
    Plot.geo(annarbor, {
      geometry: "geometry",
      stroke: "var(--theme-background-alt)",
      strokeWidth: 0.25,
      fill: (d, i) => i
    })
  ]
})
```

```js
display(annarbor);
```

```js echo
const annarbor = Array.from(
  await db.sql`SELECT * EXCLUDE(geometry), ST_AsGeoJSON(ST_GeomFromWKB(geometry)) AS geometry FROM annarbor;`,
  (d) => ({...d, geometry: JSON.parse(d.geometry)})
);
```

---

The **geom** field in the US file is simpler to handle, as it is directly encoded as a `ST_GEOMETRY`, the internal format used by DuckDB spatial. However, we still have a double decoding to do, with `ST_AsGeoJSON` to get a GeoJSON text, then to JavaScript.

DuckDB spatial allows us to do geometric computations, let’s measure the area of each county:

```js
display(counties);
```

```js echo
const counties = Array.from(
  await db.sql`
SELECT *
     , ST_AsGeoJSON(geom) AS county
     , ST_Area(ST_Transform(geom, 'NULL', 'ESRI:54034')) as area
  FROM us
`,
  ({county, area, geom, ...rest}) => Object.assign(JSON.parse(county), {properties: {area, d3area: d3.geoArea(JSON.parse(county)), ...rest}})
);
```

Wow! What is that formula? 🤯 We want the counties’ areas in m² or km², so we have to project the shapes to an adequate [CRS](https://en.wikipedia.org/wiki/Spatial_reference_system). As an equal area projection with units in meters, [ESRI:54034](https://epsg.io/54034) fits the bill. Our original data comes with [*longitude*, *latitude*] coordinates, which is almost like [WGS84](https://fr.wikipedia.org/wiki/WGS_84), except the coordinates are flipped (in WGS84 _lat_ comes first, then _lon_). Using 'NULL' as the source CRS defaults to the default GeoJSON order [*lon*, *lat*].

```js echo
Plot.plot({
  projection: "albers-usa",
  color: {type: "log", scheme: "sinebow", legend: true, ticks: 5, label: "County area (km²)"},
  marks: [
    Plot.geo(counties, {
      stroke: "var(--theme-background-alt)",
      strokeWidth: 0.25,
      fill: (d) => Math.max(3.5, Math.round(d.properties.area / 1_000_000)),
      tip: {
        channels: {
          id: (d) => d.properties.id,
          name: (d) => d.properties.name,
        }
      }
    })
  ]
})
```

For more on the SPATIAL extension, read [Introducing The DuckDB Spatial Extension](https://duckdb.org/2023/04/28/spatial.html), by Max Gabrielsson. And this [interesting notebook](https://observablehq.com/@chrispahm/prototyping-geoparquet-geos-in-webassembly) by Christoph Pahmeyer exploring a faster pipeline.

---

<div class=note>

The same DuckDBClient can be used to load other extensions, such as JSON:

```js echo
display(Array.from(await db.sql`INSTALL json; LOAD json; SELECT {duck: 42}::JSON as kwak;`, (d) => ({...d})));
```

</div>
