## World Map Demo

<div class="grid grid-cols-1">
  <div class="card">${await drawWorldMap(width)}</div>
</div>

```js
import Highcharts from "https://esm.sh/highcharts/highmaps";

async function drawWorldMap(width) {
  const container = document.createElement("div");
  const topology = await fetch("https://code.highcharts.com/mapdata/custom/world-continents.topo.json").then(
    (response) => response.json()
  );

  // Prepare demo data. The data is joined to map using value of 'hc-key'
  // property by default. See API docs for 'joinBy' for more info on linking
  // data and map.
  const data = [
    {
      "hc-key": "af", // Africa
      value: 1,
      color: "#FF6347",
      Name: "Akash"
    },
    {
      "hc-key": "as", // Asia
      value: 2,
      color: "#FFD700"
    },
    {
      "hc-key": "eu", // Europe
      value: 3,
      color: "#4169E1"
    },
    {
      "hc-key": "sa", // South America
      value: 4,
      color: "#FFA500"
    },
    {
      "hc-key": "na", // North America
      value: 5,
      color: "#00FF00"
    },
    {
      "hc-key": "oc", // Oceania
      value: 6,
      color: "#B0E0E6"
    }
  ];

  // Create the chart
  Highcharts.mapChart(container, {
    chart: {
      map: topology
    },

    title: {
      text: "Highcharts Maps basic demo"
    },

    subtitle: {
      text: 'Source map: <a href="http://code.highcharts.com/mapdata/custom/world-continents.topo.json">World continents</a>'
    },

    colorAxis: {
      visible: false // Hide the color axis
    },
    tooltip: {
      pointFormat: `${data[0].Name} : ${data[0].value}`
    },
    series: [
      {
        data: data,
        name: "Random data",
        states: {
          color: "none"
        },
        dataLabels: {
          enabled: true,
          formatter: function () {
            return this.point.name + '<br><div style="">' + this.point.value + "</div>";
          }
        }
      }
    ]
  });
  return container;
}
```
