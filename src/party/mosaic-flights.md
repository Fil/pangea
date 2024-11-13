---
index: true
---

# Mosaic Cross-Filter Flights 10M

An example using [Mosaic vgplot](https://uwdata.github.io/mosaic/vgplot/) to interactively cross-filter 10 million flight records. You may need to wait a few seconds for the dataset to load.

For more, see [Mosaic + Framework Examples](https://uwdata.github.io/mosaic-framework-example/).

<div style="display: flex; flex-wrap: wrap">
${makePlot("delay")}
${makePlot("time")}
${makePlot("distance")}
</div>

_Try selecting delayed flights. How much more likely are they to leave later in the day?_

```js echo
// load flights data from external parquet file
await vg.coordinator().exec(`CREATE TABLE IF NOT EXISTS flights10m AS
    SELECT
      GREATEST(-60, LEAST(ARR_DELAY, 180))::DOUBLE AS delay,
      DISTANCE AS distance,
      DEP_TIME AS time
    FROM '${FileAttachment("../data/flights-10m.parquet").href}'`);

// create a selection with crossfilter resolution
const brush = vg.Selection.crossfilter();

// helper method to generate a binned plot filtered by brush
// a plot contains a rectY mark for a histogram, as well as
// an intervalX interactor to populate the brush selection
const makePlot = (column) =>
  vg.plot(
    vg.rectY(
      vg.from("flights10m", {filterBy: brush}), // data set and filter selection
      {x: vg.bin(column), y: vg.count(), fill: "steelblue", inset: 0.5}
    ),
    vg.intervalX({as: brush}), // create an interval selection brush
    vg.xDomain(vg.Fixed), // don't change the x-axis domain across updates
    vg.marginLeft(75),
    vg.width(350),
    vg.height(220)
  );

// generate dashboard with three linked histograms
// display(vg.vconcat(makePlot("delay"), makePlot("time"), makePlot("distance")));
```

```js echo
// import vgplot and configure Mosaic to use DuckDB-WASM
const vg = await import("npm:@uwdata/vgplot");
{
  const wasm = await vg.wasmConnector();
  await vg.coordinator().databaseConnector(wasm);
}
```
