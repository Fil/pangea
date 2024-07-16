---
theme: dashboard
title: Gallery
index: false
sidebar: false
---

<style>
#list {
  margin-top: 2em;
}
#list p {
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  gap: 10px;
}
#list a {
  display: block;
  max-width: 320px;
  width: 260px;
  flex-grow: 1;
  height: 195px;
  background-size: cover;
  border: 2px solid var(--theme-foreground-focus);
  font-family: var(--sans-serif);
}
#list a:hover {
  box-shadow: 0 4px 12px var(--theme-foreground-focus);
  transform: translateY(-1px);
}
#list a q {
  quotes: none;
  padding: 4px 15px;
  background: var(--theme-foreground-focus);
  color: var(--theme-background-alt);
  max-width: 60%;
  border-radius: 0 0 14px;
  display: inline-block;
  line-height: 1.25em;
  max-height: 2.5em;
  text-overflow: ellipsis;
  overflow: hidden;  
}
</style>

<div id=list>

<a href="../eurostat"><q>Eurostat data loaders</q></a>
<a href="../search-graph"><q>Multi-site search graph</q></a>
<a href="../search"><q>Multi-site search</q></a>
<a href="../d3/adaptive-sampling"><q>Adaptive sampling</q></a>
<a href="../d3/animated-treemap"><q>Animated treemap</q></a>
<a href="../d3/arc-clock"><q>Arc clock</q></a>
<a href="../d3/arc-diagram"><q>Arc diagram</q></a>
<a href="../d3/arc-tween"><q>Arc tween</q></a>
<a href="../d3/area-chart-missing-data"><q>Area chart with missing data</q></a>
<a href="../d3/area-chart"><q>Area chart</q></a>
<a href="../d3/bar-chart-race"><q>Bar chart race</q></a>
<a href="../d3/bar-chart-transitions"><q>Bar chart transitions</q></a>
<a href="../d3/bar-chart"><q>Bar chart</q></a>
<a href="../d3/bivariate-choropleth"><q>Bivariate choropleth</q></a>
<a href="../d3/brushable-scatterplot-matrix"><q>Brushable scatterplot matrix</q></a>
<a href="../d3/brushable-scatterplot"><q>Brushable scatterplot</q></a>
<a href="../d3/bubble-chart"><q>Bubble chart</q></a>
<a href="../d3/burtins-antibiotics"><q>Burtin’s Antibiotics</q></a>
<a href="../d3/candlestick-chart"><q>Candlestick chart</q></a>
<a href="../d3/cascaded-treemap"><q>Cascaded treemap</q></a>
<a href="../d3/change-line-chart"><q>Line chart, percent change</q></a>
<a href="../d3/chord-dependency-diagram"><q>Chord dependency diagram</q></a>
<a href="../d3/chord-diagram"><q>Chord diagram</q></a>
<a href="../d3/choropleth"><q>Choropleth</q></a>
<a href="../d3/clipped-map-tiles"><q>Clipped map tiles</q></a>
<a href="../d3/cluster"><q>Cluster tree</q></a>
<a href="../d3/collapsible-tree"><q>Collapsible tree</q></a>
<a href="../d3/connected-scatterplot"><q>Connected scatterplot (D3)</q></a>
<a href="../d3/disjoint-force-directed-graph"><q>Disjoint force-directed graph</q></a>
<a href="../d3/diverging-horizon-chart"><q>Diverging horizon chart</q></a>
<a href="../d3/donut-chart"><q>Donut chart</q></a>
<a href="../d3/force-directed-graph"><q>Force-directed graph</q></a>
<a href="../d3/geodesic-rainbow"><q>Geodesic rainbow</q></a>
<a href="../d3/geodesic-voronoi"><q>Geodesic voronoi</q></a>
<a href="../d3/graticule-labels-stereographic"><q>Graticule labels (stereographic)</q></a>
<a href="../d3/hertzsprung-russell-diagram"><q>Hertzsprung–Russell diagram</q></a>
<a href="../d3/hierarchical-edge-bundling"><q>Hierarchical edge bundling</q></a>
<a href="../d3/horizon-chart"><q>Horizon chart</q></a>
<a href="../d3/icicle"><q>Icicle</q></a>
<a href="../d3/impact-of-vaccines"><q>The impact of vaccines</q></a>
<a href="../d3/index-chart"><q>Index chart</q></a>
<a href="../d3/inline-labels"><q>Inline labels</q></a>
<a href="../d3/line-chart"><q>Line chart</q></a>
<a href="../d3/line-with-tooltip"><q>Line chart with tooltip</q></a>
<a href="../d3/mobile-patent-suits"><q>Mobile patent suits</q></a>
<a href="../d3/moving-average"><q>Moving average</q></a>
<a href="../d3/multi-line-chart"><q>Line chart, multiple series</q></a>
<a href="../d3/nested-treemap"><q>Nested treemap</q></a>
<a href="../d3/new-zealand-tourists-1921-2018"><q>New Zealand tourists, 1921–2018</q></a>
<a href="../d3/non-contiguous-cartogram"><q>Non-contiguous cartogram</q></a>
<a href="../d3/normal-quantile-plot"><q>Normal quantile plot</q></a>
<a href="../d3/occlusion"><q>Occlusion</q></a>
<a href="../d3/pack"><q>Circle packing</q></a>
<a href="../d3/pie-chart-update"><q>Pie chart update</q></a>
<a href="../d3/pie-chart"><q>Pie chart</q></a>
<a href="../d3/polar-clock"><q>Polar clock</q></a>
<a href="../d3/psr-b1919-21"><q>PSR B1919+21</q></a>
<a href="../d3/qq-plot"><q>Q–Q Plot</q></a>
<a href="../d3/radial-area-chart"><q>Radial area chart</q></a>
<a href="../d3/radial-cluster"><q>Radial cluster tree</q></a>
<a href="../d3/radial-tree"><q>Radial tree component</q></a>
<a href="../d3/random-tree"><q>Random Tree</q></a>
<a href="../d3/ridgeline-plot"><q>Ridgeline plot</q></a>
<a href="../d3/sankey"><q>Sankey diagram</q></a>
<a href="../d3/solar-terminator"><q>Solar Terminator</q></a>
<a href="../d3/spherical-alpha-shapes"><q>Spherical alpha shapes</q></a>
<a href="../d3/spilhaus-shoreline-map"><q>Spilhaus shoreline map</q></a>
<a href="../d3/splom"><q>Scatterplot matrix</q></a>
<a href="../d3/star-map"><q>Star map</q></a>
<a href="../d3/streaming-shapefiles"><q>Streaming shapefiles</q></a>
<a href="../d3/sunburst"><q>Sunburst</q></a>
<a href="../d3/tree-of-life"><q>Tree of Life</q></a>
<a href="../d3/tree"><q>Tidy tree</q></a>
<a href="../d3/treemap"><q>Treemap</q></a>
<a href="../d3/vector-tiles"><q>D3: Vector tiles</q></a>
<a href="../d3/versor-dragging"><q>Versor dragging</q></a>
<a href="../d3/voronoi-labels"><q>D3 Voronoi labels</q></a>
<a href="../d3/voronoi-stippling"><q>Voronoi stippling</q></a>
<a href="../d3/walmarts-growth-tree"><q>Walmart’s growth - tree</q></a>
<a href="../d3/walmarts-growth"><q>Walmart’s growth</q></a>
<a href="../d3/wordcloud"><q>Word cloud</q></a>
<a href="../d3/world-airports-voronoi"><q>World airports voronoi</q></a>
<a href="../d3/world-tour"><q>World tour</q></a>
<a href="../d3/zoomable-bar-chart"><q>Zoomable bar chart</q></a>
<a href="../d3/zoomable-icicle"><q>Zoomable icicle</q></a>
<a href="../d3/zoomable-sunburst"><q>Zoomable sunburst</q></a>
<a href="../d3/zoomable-treemap"><q>Zoomable treemap</q></a>
<a href="../duckdb/histogram"><q>DuckDB histogram</q></a>
<a href="../examples/netcdf"><q>NetCDF</q></a>
<a href="../loaders/email-timestamps"><q>email timestamps</q></a>
<a href="../loaders/google-sheets"><q>Google Sheets data loader</q></a>
<a href="../loaders/greek-youth"><q>Greek youth</q></a>
<a href="../party/4-color-clingo"><q>Four-color world map with Clingo</q></a>
<a href="../party/arrow2parquet"><q>Convert Arrow files to parquet</q></a>
<a href="../party/bitcoin-transaction-size"><q>Bitcoin transaction size</q></a>
<a href="../party/blue-comments"><q>Bluesky comments</q></a>
<a href="../party/deck.gl-map"><q>deck.gl map</q></a>
<a href="../party/deck.gl"><q>deck.gl point cloud</q></a>
<a href="../party/dobbyscan"><q>Hello, dobbyscan</q></a>
<a href="../party/duckdb-spatial"><q>DuckDB spatial</q></a>
<a href="../party/duckdb"><q>DuckDB</q></a>
<a href="../party/earcut"><q>Hello, earcut</q></a>
<a href="../party/geocontour"><q>Spherical contours</q></a>
<a href="../party/geotiff"><q>GeoTIFF contours</q></a>
<a href="../party/geotoolbox"><q>Hello, geotoolbox</q></a>
<a href="../party/google-sheets"><q>Hello, Google sheets</q></a>
<a href="../party/graphviz-connected-clusters"><q>Graphviz - connected clusters</q></a>
<a href="../party/greenlet"><q>Greenlet & workerize</q></a>
<a href="../party/highcharts"><q>Highcharts</q></a>
<a href="../party/hljs"><q>Display code with hljs</q></a>
<a href="../party/hyparquet"><q>hyparquet</q></a>
<a href="../party/interactive-jsx"><q>Interactive JSX</q></a>
<a href="../party/jszip"><q>Hello, jszip</q></a>
<a href="../party/mandelbrot"><q>The Mandelbrot Set in HTML5 Canvas & JavaScript</q></a>
<a href="../party/maplibre-gl"><q>MapLibre-GL</q></a>
<a href="../party/markdown-it"><q>Markdown-it</q></a>
<a href="../party/mhchem"><q>Chemistry notation using mhchem</q></a>
<a href="../party/ml-matrix"><q>Hello, ml-matrix</q></a>
<a href="../party/mosaic-flights"><q>Mosaic Cross-Filter Flights 10M</q></a>
<a href="../party/mosaic-nyc-taxi-rides"><q>NYC Taxi Rides</q></a>
<a href="../party/navio"><q>Navio</q></a>
<a href="../party/p5"><q>p5.js</q></a>
<a href="../party/plotly"><q>Plotly 3D elevation map</q></a>
<a href="../party/polylabel"><q>Polylabel vs. centroid</q></a>
<a href="../party/roughviz"><q>RoughViz</q></a>
<a href="../party/sda"><q>Simple data analysis</q></a>
<a href="../party/surge"><q>surge.sh hosting</q></a>
<a href="../party/three"><q>Three</q></a>
<a href="../party/vega-lite-tooltips"><q>Vega lite tooltips</q></a>
<a href="../party/webr"><q>WebR</q></a>
<a href="../party/wikidata"><q>Wikidata</q></a>
<a href="../plot/albers-usa"><q>Albers-USA projection</q></a>
<a href="../plot/anscombes-quartet"><q>Anscombe’s quartet</q></a>
<a href="../plot/apportionment-of-seats-in-the-ep"><q>Apportionment of seats in the European Parliament</q></a>
<a href="../plot/arc-diagram"><q>Arc diagram</q></a>
<a href="../plot/area-chart-gradient"><q>Area chart with gradient</q></a>
<a href="../plot/area-chart-missing-data"><q>Area chart, missing data</q></a>
<a href="../plot/area-chart"><q>Area chart</q></a>
<a href="../plot/arealiney-custom-mark"><q>arealineY custom mark</q></a>
<a href="../plot/arrow-variation-chart"><q>Arrow variation chart</q></a>
<a href="../plot/auto-mark-heatmap"><q>Auto mark, heatmap</q></a>
<a href="../plot/background-image"><q>Background image</q></a>
<a href="../plot/band-chart-with-rule"><q>Band chart with rule</q></a>
<a href="../plot/bar-and-tick"><q>Bar and tick</q></a>
<a href="../plot/barcode"><q>Barcode chart</q></a>
<a href="../plot/barley-trellis"><q>Barley Trellis</q></a>
<a href="../plot/beagle-voyage"><q>Spherical line with a varying stroke</q></a>
<a href="../plot/binned-box-plot"><q>Binned box plot</q></a>
<a href="../plot/bivariate-choropleth"><q>Bivariate choropleth</q></a>
<a href="../plot/blurred-contours"><q>Blurred contours</q></a>
<a href="../plot/bollinger-bands"><q>Bollinger bands</q></a>
<a href="../plot/bullet-graph"><q>Bullet graph</q></a>
<a href="../plot/calendar"><q>Calendar component</q></a>
<a href="../plot/caltrain-schedule"><q>Stem-and-leaf plot</q></a>
<a href="../plot/cancer-survival-rates"><q>Cancer survival rates</q></a>
<a href="../plot/candlestick-chart"><q>Candlestick chart</q></a>
<a href="../plot/centroid-dot"><q>Centroid dot</q></a>
<a href="../plot/centroid-hexbin"><q>Centroid hexbin</q></a>
<a href="../plot/centroid-voronoi"><q>Centroid Voronoi</q></a>
<a href="../plot/choropleth"><q>Choropleth</q></a>
<a href="../plot/civilizations-timeline"><q>Civilizations timeline</q></a>
<a href="../plot/cluster-diagram"><q>Cluster diagram</q></a>
<a href="../plot/color-crosshair"><q>Color crosshair</q></a>
<a href="../plot/color-scatterplot"><q>Scatterplot with color</q></a>
<a href="../plot/connected-scatterplot"><q>Connected scatterplot</q></a>
<a href="../plot/continuous-dimensions-heatmap"><q>Quantitative dimensions heatmap</q></a>
<a href="../plot/contours-projection"><q>Contours & projection</q></a>
<a href="../plot/correlation-heatmap"><q>Correlation heatmap</q></a>
<a href="../plot/county-boxes"><q>County boxes</q></a>
<a href="../plot/crimean-war-bary"><q>Crimean war casualties by cause (bar)</q></a>
<a href="../plot/crimean-war-recty"><q>Crimean war casualties by cause (rect)</q></a>
<a href="../plot/crosshair"><q>Crosshair</q></a>
<a href="../plot/crosshairx"><q>CrosshairX</q></a>
<a href="../plot/cumulative-distribution-of-poverty"><q>Cumulative distribution of poverty</q></a>
<a href="../plot/cumulative-histogram"><q>Cumulative histogram</q></a>
<a href="../plot/data-based-axis"><q>Data-based axis</q></a>
<a href="../plot/datawrapper-style-date-axis"><q>Datawrapper-style date axis</q></a>
<a href="../plot/delaunay-hull"><q>Delaunay & hull</q></a>
<a href="../plot/delaunay-links"><q>Delaunay links</q></a>
<a href="../plot/density-estimation"><q>Continuous histogram</q></a>
<a href="../plot/density-faceted"><q>Density, faceted</q></a>
<a href="../plot/density-options"><q>Density options</q></a>
<a href="../plot/density-stroke"><q>Density stroke</q></a>
<a href="../plot/density-weighted"><q>Density skew (weight) interactive</q></a>
<a href="../plot/difference-arrows"><q>Difference arrows</q></a>
<a href="../plot/difference-chart"><q>Difference chart</q></a>
<a href="../plot/diverging-color-scatterplot"><q>Diverging color scatterplot</q></a>
<a href="../plot/diverging-stacked-bar"><q>Diverging stacked bars</q></a>
<a href="../plot/dodge-cars"><q>Dodge cars (beeswarm)</q></a>
<a href="../plot/dodge-penguins"><q>Dodge penguins</q></a>
<a href="../plot/dot-heatmap"><q>Dot heatmap</q></a>
<a href="../plot/dot-histogram"><q>Dot histogram</q></a>
<a href="../plot/dot-plot"><q>Dot plot</q></a>
<a href="../plot/dot-sort"><q>Bubble map</q></a>
<a href="../plot/dow-jones-calendar"><q>Simple calendar</q></a>
<a href="../plot/earthquake-globe"><q>Earthquake globe</q></a>
<a href="../plot/eld-viewer"><q>ELD Viewer</q></a>
<a href="../plot/election-wind-map"><q>Election wind map</q></a>
<a href="../plot/facet-lollipop"><q>Small multiple lollipop</q></a>
<a href="../plot/facet-wrap"><q>Facet wrap</q></a>
<a href="../plot/faceted-areas"><q>Faceted areas</q></a>
<a href="../plot/faceted-function-contour"><q>Faceted function contour</q></a>
<a href="../plot/filled-contours"><q>Filled contours</q></a>
<a href="../plot/finite-state-machine"><q>Finite state machine</q></a>
<a href="../plot/floor-plan"><q>Floor plan</q></a>
<a href="../plot/function-contour-2"><q>Function contour 2</q></a>
<a href="../plot/function-contour"><q>Function contour</q></a>
<a href="../plot/ggplot2-style-axes"><q>ggplot2-style axes</q></a>
<a href="../plot/gradient-bars"><q>Gradient bars</q></a>
<a href="../plot/gradient-encoding"><q>Gradient encoding</q></a>
<a href="../plot/grid-choropleth"><q>Grid choropleth</q></a>
<a href="../plot/grouped-bar-chart"><q>Grouped bar chart</q></a>
<a href="../plot/hexbin-binwidth"><q>Hexbin binWidth option</q></a>
<a href="../plot/hexbin-map"><q>Hexbin map</q></a>
<a href="../plot/hexbin-text"><q>Hexbin text</q></a>
<a href="../plot/highlighted-bin"><q>Highlighted bin</q></a>
<a href="../plot/horizon"><q>Horizon chart</q></a>
<a href="../plot/horizontal-bar-chart-with-label"><q>Horizontal bar chart with a label</q></a>
<a href="../plot/horizontal-bar-chart"><q>Horizontal bar chart</q></a>
<a href="../plot/horizontal-stacked-bars"><q>Horizontal stacked bars</q></a>
<a href="../plot/igrf90-contours"><q>IGRF90 contours</q></a>
<a href="../plot/image-dodge"><q>Image beeswarm (dodge)</q></a>
<a href="../plot/image-medals"><q>Image medals</q></a>
<a href="../plot/image-scatterplot-2"><q>Default image scatterplot</q></a>
<a href="../plot/image-scatterplot"><q>Image scatterplot</q></a>
<a href="../plot/imago-projection"><q>Plot: Imago projection</q></a>
<a href="../plot/impact-of-vaccines"><q>The impact of vaccines</q></a>
<a href="../plot/indented-tree"><q>Indented tree</q></a>
<a href="../plot/index-chart"><q>Index chart</q></a>
<a href="../plot/interpolate-flood"><q>Flood spatial interpolator</q></a>
<a href="../plot/isotype"><q>Isotype</q></a>
<a href="../plot/job-vacancies"><q>Job vacancies</q></a>
<a href="../plot/labeled-multi-line-chart"><q>Labeled multi-line chart</q></a>
<a href="../plot/labelled-horizontal-bar-chart-variants"><q>Plot: labelled horizontal bar charts</q></a>
<a href="../plot/lebron-james-shots"><q>LeBron James’ shots</q></a>
<a href="../plot/line-chart-interactive-tip"><q>Line chart, interactive tip</q></a>
<a href="../plot/line-chart-percent-change"><q>Line chart, percent change</q></a>
<a href="../plot/line-chart-with-gaps"><q>Line with missing data</q></a>
<a href="../plot/line-chart-with-markers"><q>Line chart with markers</q></a>
<a href="../plot/line-with-moving-average"><q>Line with moving average</q></a>
<a href="../plot/linear-regression-simpson"><q>Simpson’s paradox</q></a>
<a href="../plot/liquid-flow-velocity"><q>Liquid flow velocity in pipes</q></a>
<a href="../plot/log-heatmap"><q>Log heatmap</q></a>
<a href="../plot/lollipop"><q>Lollipop</q></a>
<a href="../plot/london-facets"><q>London facets</q></a>
<a href="../plot/major-and-minor-axis-ticks"><q>Major and minor axis ticks</q></a>
<a href="../plot/mandelbrot-set"><q>Mandelbrot set</q></a>
<a href="../plot/map-small-multiples"><q>Map small multiples</q></a>
<a href="../plot/map-tips"><q>Map and tips</q></a>
<a href="../plot/mareys-trains"><q>Marey’s trains</q></a>
<a href="../plot/marimekko"><q>Marimekko</q></a>
<a href="../plot/multi-series-line-chart-interactive-tips"><q>Multi-series line chart, interactive tips</q></a>
<a href="../plot/multiple-line-chart"><q>Multiple line chart</q></a>
<a href="../plot/non-faceted-marks"><q>Non-faceted marks</q></a>
<a href="../plot/non-overlapping-density-regions"><q>Non-overlapping density regions</q></a>
<a href="../plot/non-temporal-line-chart"><q>Non-temporal line chart</q></a>
<a href="../plot/normal-histogram"><q>Normal histogram</q></a>
<a href="../plot/normalized-stack"><q>Normalized stack</q></a>
<a href="../plot/nyt-style-axes"><q>New York Times-style axes</q></a>
<a href="../plot/olympians-density"><q>Olympians density</q></a>
<a href="../plot/olympians-grouped-bar-chart"><q>Olympians grouped bar chart</q></a>
<a href="../plot/olympians-hexbin"><q>Hexbin heatmap</q></a>
<a href="../plot/one-dimensional-crosshair"><q>One-dimensional crosshair</q></a>
<a href="../plot/one-dimensional-density"><q>One-dimensional density</q></a>
<a href="../plot/one-dimensional-pointing"><q>One-dimensional pointing</q></a>
<a href="../plot/ordinal-bar-chart"><q>Ordinal bar chart</q></a>
<a href="../plot/ordinal-scale-interval"><q>Ordinal scale interval</q></a>
<a href="../plot/ordinal-scatterplot"><q>Ordinal scatterplot</q></a>
<a href="../plot/overlapping-density-estimations"><q>Overlapping density estimations</q></a>
<a href="../plot/overlapping-histogram"><q>Overlapping histogram</q></a>
<a href="../plot/parcoords"><q>Parallel coordinates</q></a>
<a href="../plot/percentogram"><q>Percentogram</q></a>
<a href="../plot/perlin-noise"><q>Perlin noise</q></a>
<a href="../plot/phases-of-the-moon"><q>Phases of the Moon</q></a>
<a href="../plot/planar-vs-spherical-voronoi"><q>Planar vs. Spherical Voronoi</q></a>
<a href="../plot/plot-of-plots"><q>Plot of plots</q></a>
<a href="../plot/point-cloud-density"><q>Point cloud density</q></a>
<a href="../plot/pointer-modes-x-y-and-xy"><q>Pointer modes (x, y, and xy)</q></a>
<a href="../plot/pointer-target-position"><q>Pointer target position</q></a>
<a href="../plot/pointer-transform"><q>Pointer transform</q></a>
<a href="../plot/polar-projection"><q>Polar projection</q></a>
<a href="../plot/population-pyramid"><q>Population pyramid</q></a>
<a href="../plot/prebinned-histogram"><q>Pre-binned histogram</q></a>
<a href="../plot/projection-domain"><q>Projection domain</q></a>
<a href="../plot/proportion-plot"><q>Proportion plot</q></a>
<a href="../plot/proportional-symbol-scatterplot"><q>Proportional symbol scatterplot</q></a>
<a href="../plot/psr-b1919-21"><q>PSR B1919+21</q></a>
<a href="../plot/qq-plot"><q>Quantile-quantile plot</q></a>
<a href="../plot/radar-chart-faceted"><q>Radar chart, small multiples</q></a>
<a href="../plot/radar-chart"><q>Radar chart</q></a>
<a href="../plot/random-walk"><q>Random walk</q></a>
<a href="../plot/raster-projection"><q>Projected raster: vapor</q></a>
<a href="../plot/ribbon-chart"><q>Ribbon chart</q></a>
<a href="../plot/ridgeline"><q>Ridgeline plot</q></a>
<a href="../plot/rough-plot"><q>Rough Plot</q></a>
<a href="../plot/scatterplot-with-interactive-tips"><q>Scatterplot with interactive tips</q></a>
<a href="../plot/scatterplot-with-ordinal-dimension"><q>Scatterplot with ordinal dimension</q></a>
<a href="../plot/scatterplot"><q>Scatterplot</q></a>
<a href="../plot/seattle-temperature-heatmap"><q>Seattle temperature temporal heatmap</q></a>
<a href="../plot/shockwave"><q>Shockwave</q></a>
<a href="../plot/simple-line-chart"><q>Simple line chart</q></a>
<a href="../plot/simpsons-ratings"><q>Simpsons ratings</q></a>
<a href="../plot/single-stacked-bar"><q>Single stacked bar</q></a>
<a href="../plot/slope-chart"><q>Slope chart</q></a>
<a href="../plot/small-grid-contours"><q>Small grid contours</q></a>
<a href="../plot/sorted-groups"><q>Germany traffic patterns</q></a>
<a href="../plot/sorted-heatmap"><q>Sorted heatmap</q></a>
<a href="../plot/spiral-heatmap"><q>Spiral heatmap</q></a>
<a href="../plot/stacked-area-chart"><q>Stacked area chart</q></a>
<a href="../plot/stacked-bars"><q>Stacked bars</q></a>
<a href="../plot/stacked-dots"><q>Stacked dots</q></a>
<a href="../plot/stacked-histogram"><q>Stacked histogram</q></a>
<a href="../plot/stacked-percentages"><q>Stacked percentages</q></a>
<a href="../plot/stacked-unit-chart"><q>Stacked unit chart</q></a>
<a href="../plot/stacking-order-and-reverse"><q>Stacking order and reverse</q></a>
<a href="../plot/state-centroids"><q>State centroids</q></a>
<a href="../plot/state-labels"><q>State labels</q></a>
<a href="../plot/state-population-change"><q>State population change</q></a>
<a href="../plot/static-annotations"><q>Static annotations</q></a>
<a href="../plot/stroked-contours"><q>Stroked contours</q></a>
<a href="../plot/symbol-channel"><q>Symbol channel</q></a>
<a href="../plot/temperature-amplitude"><q>Seattle temperature amplitude</q></a>
<a href="../plot/temporal-bar-chart"><q>Temporal bar chart</q></a>
<a href="../plot/ternary"><q>Ternary diagrams</q></a>
<a href="../plot/text-dodge"><q>Text dodge</q></a>
<a href="../plot/text-spiral"><q>Text spiral</q></a>
<a href="../plot/this-is-just-to-say"><q>This is just to say</q></a>
<a href="../plot/tip-format"><q>Tip format</q></a>
<a href="../plot/tips-additional-channels"><q>Interactive tips with additional channels</q></a>
<a href="../plot/tips-longer-text"><q>Interactive tips with longer text</q></a>
<a href="../plot/tips-paired-channels"><q>Tips, paired channels</q></a>
<a href="../plot/tree"><q>Tidy tree (Plot)</q></a>
<a href="../plot/trellis-anomaly"><q>Barley Trellis plot with arrows</q></a>
<a href="../plot/two-dimensional-faceting"><q>Two-dimensional faceting</q></a>
<a href="../plot/unemployment-horizon-chart"><q>Unemployment horizon chart</q></a>
<a href="../plot/us-bubble-map"><q>U.S. bubble map</q></a>
<a href="../plot/us-spike-map"><q>Spike map</q></a>
<a href="../plot/v-counties"><q>V-Counties</q></a>
<a href="../plot/variable-fill-area"><q>Variable fill area</q></a>
<a href="../plot/vertical-bar-chart"><q>Vertical bar chart</q></a>
<a href="../plot/vertical-bars-rotated-labels"><q>Vertical bars, rotated labels</q></a>
<a href="../plot/volcano-raster"><q>Volcano raster</q></a>
<a href="../plot/voronoi-labels"><q>Voronoi labels</q></a>
<a href="../plot/voronoi-map"><q>Voronoi map</q></a>
<a href="../plot/voronoi-scatterplot"><q>Voronoi scatterplot</q></a>
<a href="../plot/voronoi-treemap"><q>Voronoi treemap</q></a>
<a href="../plot/walmart-density"><q>Walmart density</q></a>
<a href="../plot/walmart-voronoi"><q>Walmart Voronoi</q></a>
<a href="../plot/warming-stripes"><q>Warming stripes</q></a>
<a href="../plot/wealth-health-nations"><q>The Wealth & Health of Nations</q></a>
<a href="../plot/wiggle-streamgraph"><q>Wiggle streamgraph</q></a>
<a href="../plot/wind-map"><q>Wind map</q></a>
<a href="../plot/window-and-map"><q>Difference stroke</q></a>
<a href="../plot/window-reduce"><q>Plot: window reducers</q></a>
<a href="../plot/world-projections"><q>World projections</q></a>
<a href="../plot/wrap-tick-labels"><q>Axis with wrapped labels</q></a>
<a href="../projections/d3-geo-polygon"><q>d3-geo-polygon</q></a>
<a href="../projections/himawari-8"><q>Himawari 8</q></a>
<a href="../projections/"><q>Projections</q></a>
<a href="../projections/markley"><q>Markley’s tetrahedral map</q></a>
<a href="../projections/renner"><q>Renner hemispheric projection</q></a>
<a href="../stash/coolprop"><q>Hello, coolprop</q></a>
<a href="../support/a-frame"><q>A-frame</q></a>
<a href="../support/becker-barley-ssr"><q>Image data loaders</q></a>
<a href="../support/dark-mode"><q>Dark mode</q></a>
<a href="../support/debouncing-inputs"><q>Debouncing inputs</q></a>
<a href="../support/html-inputs"><q>HTML inputs</q></a>
<a href="../support/inputs-bind"><q>Inputs.bind</q></a>
<a href="../support/mollweide-with-ticks"><q>Mollweide projection with ticks</q></a>
<a href="../support/stored-inputs"><q>Stored inputs</q></a>
<a href="../topojson/country-topology"><q>Country Topology</q></a>
<a href="../topojson/county-topology"><q>County Topology</q></a>
<a href="../topojson/hexagon-mesh"><q>Hexagon Mesh</q></a>
<a href="../varia/covid-sumeau"><q>Sum’eau (Covid tracker)</q></a>
<a href="../varia/lap-jv"><q>The linear assignment problem</q></a>
<a href="../varia/pt"><q>pretty-print matrices & tensors</q></a>
<a href="../varia/sequence-logos"><q>Sequence Logos</q></a>
<a href="../video/ed3RfgPPZ2w"><q>Video: Deploy Framework projects to Observable</q></a>

</div>

~~~js
const bg = [
FileAttachment("../thumbnail/eurostat-dark.png"), FileAttachment("../thumbnail/eurostat-light.png"),
FileAttachment("../thumbnail/search-graph-dark.png"), FileAttachment("../thumbnail/search-graph-light.png"),
FileAttachment("../thumbnail/search-dark.png"), FileAttachment("../thumbnail/search-light.png"),
FileAttachment("../thumbnail/d3/adaptive-sampling-dark.png"), FileAttachment("../thumbnail/d3/adaptive-sampling-light.png"),
FileAttachment("../thumbnail/d3/animated-treemap-dark.png"), FileAttachment("../thumbnail/d3/animated-treemap-light.png"),
FileAttachment("../thumbnail/d3/arc-clock-dark.png"), FileAttachment("../thumbnail/d3/arc-clock-light.png"),
FileAttachment("../thumbnail/d3/arc-diagram-dark.png"), FileAttachment("../thumbnail/d3/arc-diagram-light.png"),
FileAttachment("../thumbnail/d3/arc-tween-dark.png"), FileAttachment("../thumbnail/d3/arc-tween-light.png"),
FileAttachment("../thumbnail/d3/area-chart-missing-data-dark.png"), FileAttachment("../thumbnail/d3/area-chart-missing-data-light.png"),
FileAttachment("../thumbnail/d3/area-chart-dark.png"), FileAttachment("../thumbnail/d3/area-chart-light.png"),
FileAttachment("../thumbnail/d3/bar-chart-race-dark.png"), FileAttachment("../thumbnail/d3/bar-chart-race-light.png"),
FileAttachment("../thumbnail/d3/bar-chart-transitions-dark.png"), FileAttachment("../thumbnail/d3/bar-chart-transitions-light.png"),
FileAttachment("../thumbnail/d3/bar-chart-dark.png"), FileAttachment("../thumbnail/d3/bar-chart-light.png"),
FileAttachment("../thumbnail/d3/bivariate-choropleth-dark.png"), FileAttachment("../thumbnail/d3/bivariate-choropleth-light.png"),
FileAttachment("../thumbnail/d3/brushable-scatterplot-matrix-dark.png"), FileAttachment("../thumbnail/d3/brushable-scatterplot-matrix-light.png"),
FileAttachment("../thumbnail/d3/brushable-scatterplot-dark.png"), FileAttachment("../thumbnail/d3/brushable-scatterplot-light.png"),
FileAttachment("../thumbnail/d3/bubble-chart-dark.png"), FileAttachment("../thumbnail/d3/bubble-chart-light.png"),
FileAttachment("../thumbnail/d3/burtins-antibiotics-dark.png"), FileAttachment("../thumbnail/d3/burtins-antibiotics-light.png"),
FileAttachment("../thumbnail/d3/candlestick-chart-dark.png"), FileAttachment("../thumbnail/d3/candlestick-chart-light.png"),
FileAttachment("../thumbnail/d3/cascaded-treemap-dark.png"), FileAttachment("../thumbnail/d3/cascaded-treemap-light.png"),
FileAttachment("../thumbnail/d3/change-line-chart-dark.png"), FileAttachment("../thumbnail/d3/change-line-chart-light.png"),
FileAttachment("../thumbnail/d3/chord-dependency-diagram-dark.png"), FileAttachment("../thumbnail/d3/chord-dependency-diagram-light.png"),
FileAttachment("../thumbnail/d3/chord-diagram-dark.png"), FileAttachment("../thumbnail/d3/chord-diagram-light.png"),
FileAttachment("../thumbnail/d3/choropleth-dark.png"), FileAttachment("../thumbnail/d3/choropleth-light.png"),
FileAttachment("../thumbnail/d3/clipped-map-tiles-dark.png"), FileAttachment("../thumbnail/d3/clipped-map-tiles-light.png"),
FileAttachment("../thumbnail/d3/cluster-dark.png"), FileAttachment("../thumbnail/d3/cluster-light.png"),
FileAttachment("../thumbnail/d3/collapsible-tree-dark.png"), FileAttachment("../thumbnail/d3/collapsible-tree-light.png"),
FileAttachment("../thumbnail/d3/connected-scatterplot-dark.png"), FileAttachment("../thumbnail/d3/connected-scatterplot-light.png"),
FileAttachment("../thumbnail/d3/disjoint-force-directed-graph-dark.png"), FileAttachment("../thumbnail/d3/disjoint-force-directed-graph-light.png"),
FileAttachment("../thumbnail/d3/diverging-horizon-chart-dark.png"), FileAttachment("../thumbnail/d3/diverging-horizon-chart-light.png"),
FileAttachment("../thumbnail/d3/donut-chart-dark.png"), FileAttachment("../thumbnail/d3/donut-chart-light.png"),
FileAttachment("../thumbnail/d3/force-directed-graph-dark.png"), FileAttachment("../thumbnail/d3/force-directed-graph-light.png"),
FileAttachment("../thumbnail/d3/geodesic-rainbow-dark.png"), FileAttachment("../thumbnail/d3/geodesic-rainbow-light.png"),
FileAttachment("../thumbnail/d3/geodesic-voronoi-dark.png"), FileAttachment("../thumbnail/d3/geodesic-voronoi-light.png"),
FileAttachment("../thumbnail/d3/graticule-labels-stereographic-dark.png"), FileAttachment("../thumbnail/d3/graticule-labels-stereographic-light.png"),
FileAttachment("../thumbnail/d3/hertzsprung-russell-diagram-dark.png"), FileAttachment("../thumbnail/d3/hertzsprung-russell-diagram-light.png"),
FileAttachment("../thumbnail/d3/hierarchical-edge-bundling-dark.png"), FileAttachment("../thumbnail/d3/hierarchical-edge-bundling-light.png"),
FileAttachment("../thumbnail/d3/horizon-chart-dark.png"), FileAttachment("../thumbnail/d3/horizon-chart-light.png"),
FileAttachment("../thumbnail/d3/icicle-dark.png"), FileAttachment("../thumbnail/d3/icicle-light.png"),
FileAttachment("../thumbnail/d3/impact-of-vaccines-dark.png"), FileAttachment("../thumbnail/d3/impact-of-vaccines-light.png"),
FileAttachment("../thumbnail/d3/index-chart-dark.png"), FileAttachment("../thumbnail/d3/index-chart-light.png"),
FileAttachment("../thumbnail/d3/inline-labels-dark.png"), FileAttachment("../thumbnail/d3/inline-labels-light.png"),
FileAttachment("../thumbnail/d3/line-chart-dark.png"), FileAttachment("../thumbnail/d3/line-chart-light.png"),
FileAttachment("../thumbnail/d3/line-with-tooltip-dark.png"), FileAttachment("../thumbnail/d3/line-with-tooltip-light.png"),
FileAttachment("../thumbnail/d3/mobile-patent-suits-dark.png"), FileAttachment("../thumbnail/d3/mobile-patent-suits-light.png"),
FileAttachment("../thumbnail/d3/moving-average-dark.png"), FileAttachment("../thumbnail/d3/moving-average-light.png"),
FileAttachment("../thumbnail/d3/multi-line-chart-dark.png"), FileAttachment("../thumbnail/d3/multi-line-chart-light.png"),
FileAttachment("../thumbnail/d3/nested-treemap-dark.png"), FileAttachment("../thumbnail/d3/nested-treemap-light.png"),
FileAttachment("../thumbnail/d3/new-zealand-tourists-1921-2018-dark.png"), FileAttachment("../thumbnail/d3/new-zealand-tourists-1921-2018-light.png"),
FileAttachment("../thumbnail/d3/non-contiguous-cartogram-dark.png"), FileAttachment("../thumbnail/d3/non-contiguous-cartogram-light.png"),
FileAttachment("../thumbnail/d3/normal-quantile-plot-dark.png"), FileAttachment("../thumbnail/d3/normal-quantile-plot-light.png"),
FileAttachment("../thumbnail/d3/occlusion-dark.png"), FileAttachment("../thumbnail/d3/occlusion-light.png"),
FileAttachment("../thumbnail/d3/pack-dark.png"), FileAttachment("../thumbnail/d3/pack-light.png"),
FileAttachment("../thumbnail/d3/pie-chart-update-dark.png"), FileAttachment("../thumbnail/d3/pie-chart-update-light.png"),
FileAttachment("../thumbnail/d3/pie-chart-dark.png"), FileAttachment("../thumbnail/d3/pie-chart-light.png"),
FileAttachment("../thumbnail/d3/polar-clock-dark.png"), FileAttachment("../thumbnail/d3/polar-clock-light.png"),
FileAttachment("../thumbnail/d3/psr-b1919-21-dark.png"), FileAttachment("../thumbnail/d3/psr-b1919-21-light.png"),
FileAttachment("../thumbnail/d3/qq-plot-dark.png"), FileAttachment("../thumbnail/d3/qq-plot-light.png"),
FileAttachment("../thumbnail/d3/radial-area-chart-dark.png"), FileAttachment("../thumbnail/d3/radial-area-chart-light.png"),
FileAttachment("../thumbnail/d3/radial-cluster-dark.png"), FileAttachment("../thumbnail/d3/radial-cluster-light.png"),
FileAttachment("../thumbnail/d3/radial-tree-dark.png"), FileAttachment("../thumbnail/d3/radial-tree-light.png"),
FileAttachment("../thumbnail/d3/random-tree-dark.png"), FileAttachment("../thumbnail/d3/random-tree-light.png"),
FileAttachment("../thumbnail/d3/ridgeline-plot-dark.png"), FileAttachment("../thumbnail/d3/ridgeline-plot-light.png"),
FileAttachment("../thumbnail/d3/sankey-dark.png"), FileAttachment("../thumbnail/d3/sankey-light.png"),
FileAttachment("../thumbnail/d3/solar-terminator-dark.png"), FileAttachment("../thumbnail/d3/solar-terminator-light.png"),
FileAttachment("../thumbnail/d3/spherical-alpha-shapes-dark.png"), FileAttachment("../thumbnail/d3/spherical-alpha-shapes-light.png"),
FileAttachment("../thumbnail/d3/spilhaus-shoreline-map-dark.png"), FileAttachment("../thumbnail/d3/spilhaus-shoreline-map-light.png"),
FileAttachment("../thumbnail/d3/splom-dark.png"), FileAttachment("../thumbnail/d3/splom-light.png"),
FileAttachment("../thumbnail/d3/star-map-dark.png"), FileAttachment("../thumbnail/d3/star-map-light.png"),
FileAttachment("../thumbnail/d3/streaming-shapefiles-dark.png"), FileAttachment("../thumbnail/d3/streaming-shapefiles-light.png"),
FileAttachment("../thumbnail/d3/sunburst-dark.png"), FileAttachment("../thumbnail/d3/sunburst-light.png"),
FileAttachment("../thumbnail/d3/tree-of-life-dark.png"), FileAttachment("../thumbnail/d3/tree-of-life-light.png"),
FileAttachment("../thumbnail/d3/tree-dark.png"), FileAttachment("../thumbnail/d3/tree-light.png"),
FileAttachment("../thumbnail/d3/treemap-dark.png"), FileAttachment("../thumbnail/d3/treemap-light.png"),
FileAttachment("../thumbnail/d3/vector-tiles-dark.png"), FileAttachment("../thumbnail/d3/vector-tiles-light.png"),
FileAttachment("../thumbnail/d3/versor-dragging-dark.png"), FileAttachment("../thumbnail/d3/versor-dragging-light.png"),
FileAttachment("../thumbnail/d3/voronoi-labels-dark.png"), FileAttachment("../thumbnail/d3/voronoi-labels-light.png"),
FileAttachment("../thumbnail/d3/voronoi-stippling-dark.png"), FileAttachment("../thumbnail/d3/voronoi-stippling-light.png"),
FileAttachment("../thumbnail/d3/walmarts-growth-tree-dark.png"), FileAttachment("../thumbnail/d3/walmarts-growth-tree-light.png"),
FileAttachment("../thumbnail/d3/walmarts-growth-dark.png"), FileAttachment("../thumbnail/d3/walmarts-growth-light.png"),
FileAttachment("../thumbnail/d3/wordcloud-dark.png"), FileAttachment("../thumbnail/d3/wordcloud-light.png"),
FileAttachment("../thumbnail/d3/world-airports-voronoi-dark.png"), FileAttachment("../thumbnail/d3/world-airports-voronoi-light.png"),
FileAttachment("../thumbnail/d3/world-tour-dark.png"), FileAttachment("../thumbnail/d3/world-tour-light.png"),
FileAttachment("../thumbnail/d3/zoomable-bar-chart-dark.png"), FileAttachment("../thumbnail/d3/zoomable-bar-chart-light.png"),
FileAttachment("../thumbnail/d3/zoomable-icicle-dark.png"), FileAttachment("../thumbnail/d3/zoomable-icicle-light.png"),
FileAttachment("../thumbnail/d3/zoomable-sunburst-dark.png"), FileAttachment("../thumbnail/d3/zoomable-sunburst-light.png"),
FileAttachment("../thumbnail/d3/zoomable-treemap-dark.png"), FileAttachment("../thumbnail/d3/zoomable-treemap-light.png"),
FileAttachment("../thumbnail/duckdb/histogram-dark.png"), FileAttachment("../thumbnail/duckdb/histogram-light.png"),
FileAttachment("../thumbnail/examples/netcdf-dark.png"), FileAttachment("../thumbnail/examples/netcdf-light.png"),
FileAttachment("../thumbnail/loaders/email-timestamps-dark.png"), FileAttachment("../thumbnail/loaders/email-timestamps-light.png"),
FileAttachment("../thumbnail/loaders/google-sheets-dark.png"), FileAttachment("../thumbnail/loaders/google-sheets-light.png"),
FileAttachment("../thumbnail/loaders/greek-youth-dark.png"), FileAttachment("../thumbnail/loaders/greek-youth-light.png"),
FileAttachment("../thumbnail/party/4-color-clingo-dark.png"), FileAttachment("../thumbnail/party/4-color-clingo-light.png"),
FileAttachment("../thumbnail/party/arrow2parquet-dark.png"), FileAttachment("../thumbnail/party/arrow2parquet-light.png"),
FileAttachment("../thumbnail/party/bitcoin-transaction-size-dark.png"), FileAttachment("../thumbnail/party/bitcoin-transaction-size-light.png"),
FileAttachment("../thumbnail/party/blue-comments-dark.png"), FileAttachment("../thumbnail/party/blue-comments-light.png"),
FileAttachment("../thumbnail/party/deck.gl-map-dark.png"), FileAttachment("../thumbnail/party/deck.gl-map-light.png"),
FileAttachment("../thumbnail/party/deck.gl-dark.png"), FileAttachment("../thumbnail/party/deck.gl-light.png"),
FileAttachment("../thumbnail/party/dobbyscan-dark.png"), FileAttachment("../thumbnail/party/dobbyscan-light.png"),
FileAttachment("../thumbnail/party/duckdb-spatial-dark.png"), FileAttachment("../thumbnail/party/duckdb-spatial-light.png"),
FileAttachment("../thumbnail/party/duckdb-dark.png"), FileAttachment("../thumbnail/party/duckdb-light.png"),
FileAttachment("../thumbnail/party/earcut-dark.png"), FileAttachment("../thumbnail/party/earcut-light.png"),
FileAttachment("../thumbnail/party/geocontour-dark.png"), FileAttachment("../thumbnail/party/geocontour-light.png"),
FileAttachment("../thumbnail/party/geotiff-dark.png"), FileAttachment("../thumbnail/party/geotiff-light.png"),
FileAttachment("../thumbnail/party/geotoolbox-dark.png"), FileAttachment("../thumbnail/party/geotoolbox-light.png"),
FileAttachment("../thumbnail/party/google-sheets-dark.png"), FileAttachment("../thumbnail/party/google-sheets-light.png"),
FileAttachment("../thumbnail/party/graphviz-connected-clusters-dark.png"), FileAttachment("../thumbnail/party/graphviz-connected-clusters-light.png"),
FileAttachment("../thumbnail/party/greenlet-dark.png"), FileAttachment("../thumbnail/party/greenlet-light.png"),
FileAttachment("../thumbnail/party/highcharts-dark.png"), FileAttachment("../thumbnail/party/highcharts-light.png"),
FileAttachment("../thumbnail/party/hljs-dark.png"), FileAttachment("../thumbnail/party/hljs-light.png"),
FileAttachment("../thumbnail/party/hyparquet-dark.png"), FileAttachment("../thumbnail/party/hyparquet-light.png"),
FileAttachment("../thumbnail/party/interactive-jsx-dark.png"), FileAttachment("../thumbnail/party/interactive-jsx-light.png"),
FileAttachment("../thumbnail/party/jszip-dark.png"), FileAttachment("../thumbnail/party/jszip-light.png"),
FileAttachment("../thumbnail/party/mandelbrot-dark.png"), FileAttachment("../thumbnail/party/mandelbrot-light.png"),
FileAttachment("../thumbnail/party/maplibre-gl-dark.png"), FileAttachment("../thumbnail/party/maplibre-gl-light.png"),
FileAttachment("../thumbnail/party/markdown-it-dark.png"), FileAttachment("../thumbnail/party/markdown-it-light.png"),
FileAttachment("../thumbnail/party/mhchem-dark.png"), FileAttachment("../thumbnail/party/mhchem-light.png"),
FileAttachment("../thumbnail/party/ml-matrix-dark.png"), FileAttachment("../thumbnail/party/ml-matrix-light.png"),
FileAttachment("../thumbnail/party/mosaic-flights-dark.png"), FileAttachment("../thumbnail/party/mosaic-flights-light.png"),
FileAttachment("../thumbnail/party/mosaic-nyc-taxi-rides-dark.png"), FileAttachment("../thumbnail/party/mosaic-nyc-taxi-rides-light.png"),
FileAttachment("../thumbnail/party/navio-dark.png"), FileAttachment("../thumbnail/party/navio-light.png"),
FileAttachment("../thumbnail/party/p5-dark.png"), FileAttachment("../thumbnail/party/p5-light.png"),
FileAttachment("../thumbnail/party/plotly-dark.png"), FileAttachment("../thumbnail/party/plotly-light.png"),
FileAttachment("../thumbnail/party/polylabel-dark.png"), FileAttachment("../thumbnail/party/polylabel-light.png"),
FileAttachment("../thumbnail/party/roughviz-dark.png"), FileAttachment("../thumbnail/party/roughviz-light.png"),
FileAttachment("../thumbnail/party/sda-dark.png"), FileAttachment("../thumbnail/party/sda-light.png"),
FileAttachment("../thumbnail/party/surge-dark.png"), FileAttachment("../thumbnail/party/surge-light.png"),
FileAttachment("../thumbnail/party/three-dark.png"), FileAttachment("../thumbnail/party/three-light.png"),
FileAttachment("../thumbnail/party/vega-lite-tooltips-dark.png"), FileAttachment("../thumbnail/party/vega-lite-tooltips-light.png"),
FileAttachment("../thumbnail/party/webr-dark.png"), FileAttachment("../thumbnail/party/webr-light.png"),
FileAttachment("../thumbnail/party/wikidata-dark.png"), FileAttachment("../thumbnail/party/wikidata-light.png"),
FileAttachment("../thumbnail/plot/albers-usa-dark.png"), FileAttachment("../thumbnail/plot/albers-usa-light.png"),
FileAttachment("../thumbnail/plot/anscombes-quartet-dark.png"), FileAttachment("../thumbnail/plot/anscombes-quartet-light.png"),
FileAttachment("../thumbnail/plot/apportionment-of-seats-in-the-ep-dark.png"), FileAttachment("../thumbnail/plot/apportionment-of-seats-in-the-ep-light.png"),
FileAttachment("../thumbnail/plot/arc-diagram-dark.png"), FileAttachment("../thumbnail/plot/arc-diagram-light.png"),
FileAttachment("../thumbnail/plot/area-chart-gradient-dark.png"), FileAttachment("../thumbnail/plot/area-chart-gradient-light.png"),
FileAttachment("../thumbnail/plot/area-chart-missing-data-dark.png"), FileAttachment("../thumbnail/plot/area-chart-missing-data-light.png"),
FileAttachment("../thumbnail/plot/area-chart-dark.png"), FileAttachment("../thumbnail/plot/area-chart-light.png"),
FileAttachment("../thumbnail/plot/arealiney-custom-mark-dark.png"), FileAttachment("../thumbnail/plot/arealiney-custom-mark-light.png"),
FileAttachment("../thumbnail/plot/arrow-variation-chart-dark.png"), FileAttachment("../thumbnail/plot/arrow-variation-chart-light.png"),
FileAttachment("../thumbnail/plot/auto-mark-heatmap-dark.png"), FileAttachment("../thumbnail/plot/auto-mark-heatmap-light.png"),
FileAttachment("../thumbnail/plot/background-image-dark.png"), FileAttachment("../thumbnail/plot/background-image-light.png"),
FileAttachment("../thumbnail/plot/band-chart-with-rule-dark.png"), FileAttachment("../thumbnail/plot/band-chart-with-rule-light.png"),
FileAttachment("../thumbnail/plot/bar-and-tick-dark.png"), FileAttachment("../thumbnail/plot/bar-and-tick-light.png"),
FileAttachment("../thumbnail/plot/barcode-dark.png"), FileAttachment("../thumbnail/plot/barcode-light.png"),
FileAttachment("../thumbnail/plot/barley-trellis-dark.png"), FileAttachment("../thumbnail/plot/barley-trellis-light.png"),
FileAttachment("../thumbnail/plot/beagle-voyage-dark.png"), FileAttachment("../thumbnail/plot/beagle-voyage-light.png"),
FileAttachment("../thumbnail/plot/binned-box-plot-dark.png"), FileAttachment("../thumbnail/plot/binned-box-plot-light.png"),
FileAttachment("../thumbnail/plot/bivariate-choropleth-dark.png"), FileAttachment("../thumbnail/plot/bivariate-choropleth-light.png"),
FileAttachment("../thumbnail/plot/blurred-contours-dark.png"), FileAttachment("../thumbnail/plot/blurred-contours-light.png"),
FileAttachment("../thumbnail/plot/bollinger-bands-dark.png"), FileAttachment("../thumbnail/plot/bollinger-bands-light.png"),
FileAttachment("../thumbnail/plot/bullet-graph-dark.png"), FileAttachment("../thumbnail/plot/bullet-graph-light.png"),
FileAttachment("../thumbnail/plot/calendar-dark.png"), FileAttachment("../thumbnail/plot/calendar-light.png"),
FileAttachment("../thumbnail/plot/caltrain-schedule-dark.png"), FileAttachment("../thumbnail/plot/caltrain-schedule-light.png"),
FileAttachment("../thumbnail/plot/cancer-survival-rates-dark.png"), FileAttachment("../thumbnail/plot/cancer-survival-rates-light.png"),
FileAttachment("../thumbnail/plot/candlestick-chart-dark.png"), FileAttachment("../thumbnail/plot/candlestick-chart-light.png"),
FileAttachment("../thumbnail/plot/centroid-dot-dark.png"), FileAttachment("../thumbnail/plot/centroid-dot-light.png"),
FileAttachment("../thumbnail/plot/centroid-hexbin-dark.png"), FileAttachment("../thumbnail/plot/centroid-hexbin-light.png"),
FileAttachment("../thumbnail/plot/centroid-voronoi-dark.png"), FileAttachment("../thumbnail/plot/centroid-voronoi-light.png"),
FileAttachment("../thumbnail/plot/choropleth-dark.png"), FileAttachment("../thumbnail/plot/choropleth-light.png"),
FileAttachment("../thumbnail/plot/civilizations-timeline-dark.png"), FileAttachment("../thumbnail/plot/civilizations-timeline-light.png"),
FileAttachment("../thumbnail/plot/cluster-diagram-dark.png"), FileAttachment("../thumbnail/plot/cluster-diagram-light.png"),
FileAttachment("../thumbnail/plot/color-crosshair-dark.png"), FileAttachment("../thumbnail/plot/color-crosshair-light.png"),
FileAttachment("../thumbnail/plot/color-scatterplot-dark.png"), FileAttachment("../thumbnail/plot/color-scatterplot-light.png"),
FileAttachment("../thumbnail/plot/connected-scatterplot-dark.png"), FileAttachment("../thumbnail/plot/connected-scatterplot-light.png"),
FileAttachment("../thumbnail/plot/continuous-dimensions-heatmap-dark.png"), FileAttachment("../thumbnail/plot/continuous-dimensions-heatmap-light.png"),
FileAttachment("../thumbnail/plot/contours-projection-dark.png"), FileAttachment("../thumbnail/plot/contours-projection-light.png"),
FileAttachment("../thumbnail/plot/correlation-heatmap-dark.png"), FileAttachment("../thumbnail/plot/correlation-heatmap-light.png"),
FileAttachment("../thumbnail/plot/county-boxes-dark.png"), FileAttachment("../thumbnail/plot/county-boxes-light.png"),
FileAttachment("../thumbnail/plot/crimean-war-bary-dark.png"), FileAttachment("../thumbnail/plot/crimean-war-bary-light.png"),
FileAttachment("../thumbnail/plot/crimean-war-recty-dark.png"), FileAttachment("../thumbnail/plot/crimean-war-recty-light.png"),
FileAttachment("../thumbnail/plot/crosshair-dark.png"), FileAttachment("../thumbnail/plot/crosshair-light.png"),
FileAttachment("../thumbnail/plot/crosshairx-dark.png"), FileAttachment("../thumbnail/plot/crosshairx-light.png"),
FileAttachment("../thumbnail/plot/cumulative-distribution-of-poverty-dark.png"), FileAttachment("../thumbnail/plot/cumulative-distribution-of-poverty-light.png"),
FileAttachment("../thumbnail/plot/cumulative-histogram-dark.png"), FileAttachment("../thumbnail/plot/cumulative-histogram-light.png"),
FileAttachment("../thumbnail/plot/data-based-axis-dark.png"), FileAttachment("../thumbnail/plot/data-based-axis-light.png"),
FileAttachment("../thumbnail/plot/datawrapper-style-date-axis-dark.png"), FileAttachment("../thumbnail/plot/datawrapper-style-date-axis-light.png"),
FileAttachment("../thumbnail/plot/delaunay-hull-dark.png"), FileAttachment("../thumbnail/plot/delaunay-hull-light.png"),
FileAttachment("../thumbnail/plot/delaunay-links-dark.png"), FileAttachment("../thumbnail/plot/delaunay-links-light.png"),
FileAttachment("../thumbnail/plot/density-estimation-dark.png"), FileAttachment("../thumbnail/plot/density-estimation-light.png"),
FileAttachment("../thumbnail/plot/density-faceted-dark.png"), FileAttachment("../thumbnail/plot/density-faceted-light.png"),
FileAttachment("../thumbnail/plot/density-options-dark.png"), FileAttachment("../thumbnail/plot/density-options-light.png"),
FileAttachment("../thumbnail/plot/density-stroke-dark.png"), FileAttachment("../thumbnail/plot/density-stroke-light.png"),
FileAttachment("../thumbnail/plot/density-weighted-dark.png"), FileAttachment("../thumbnail/plot/density-weighted-light.png"),
FileAttachment("../thumbnail/plot/difference-arrows-dark.png"), FileAttachment("../thumbnail/plot/difference-arrows-light.png"),
FileAttachment("../thumbnail/plot/difference-chart-dark.png"), FileAttachment("../thumbnail/plot/difference-chart-light.png"),
FileAttachment("../thumbnail/plot/diverging-color-scatterplot-dark.png"), FileAttachment("../thumbnail/plot/diverging-color-scatterplot-light.png"),
FileAttachment("../thumbnail/plot/diverging-stacked-bar-dark.png"), FileAttachment("../thumbnail/plot/diverging-stacked-bar-light.png"),
FileAttachment("../thumbnail/plot/dodge-cars-dark.png"), FileAttachment("../thumbnail/plot/dodge-cars-light.png"),
FileAttachment("../thumbnail/plot/dodge-penguins-dark.png"), FileAttachment("../thumbnail/plot/dodge-penguins-light.png"),
FileAttachment("../thumbnail/plot/dot-heatmap-dark.png"), FileAttachment("../thumbnail/plot/dot-heatmap-light.png"),
FileAttachment("../thumbnail/plot/dot-histogram-dark.png"), FileAttachment("../thumbnail/plot/dot-histogram-light.png"),
FileAttachment("../thumbnail/plot/dot-plot-dark.png"), FileAttachment("../thumbnail/plot/dot-plot-light.png"),
FileAttachment("../thumbnail/plot/dot-sort-dark.png"), FileAttachment("../thumbnail/plot/dot-sort-light.png"),
FileAttachment("../thumbnail/plot/dow-jones-calendar-dark.png"), FileAttachment("../thumbnail/plot/dow-jones-calendar-light.png"),
FileAttachment("../thumbnail/plot/earthquake-globe-dark.png"), FileAttachment("../thumbnail/plot/earthquake-globe-light.png"),
FileAttachment("../thumbnail/plot/eld-viewer-dark.png"), FileAttachment("../thumbnail/plot/eld-viewer-light.png"),
FileAttachment("../thumbnail/plot/election-wind-map-dark.png"), FileAttachment("../thumbnail/plot/election-wind-map-light.png"),
FileAttachment("../thumbnail/plot/facet-lollipop-dark.png"), FileAttachment("../thumbnail/plot/facet-lollipop-light.png"),
FileAttachment("../thumbnail/plot/facet-wrap-dark.png"), FileAttachment("../thumbnail/plot/facet-wrap-light.png"),
FileAttachment("../thumbnail/plot/faceted-areas-dark.png"), FileAttachment("../thumbnail/plot/faceted-areas-light.png"),
FileAttachment("../thumbnail/plot/faceted-function-contour-dark.png"), FileAttachment("../thumbnail/plot/faceted-function-contour-light.png"),
FileAttachment("../thumbnail/plot/filled-contours-dark.png"), FileAttachment("../thumbnail/plot/filled-contours-light.png"),
FileAttachment("../thumbnail/plot/finite-state-machine-dark.png"), FileAttachment("../thumbnail/plot/finite-state-machine-light.png"),
FileAttachment("../thumbnail/plot/floor-plan-dark.png"), FileAttachment("../thumbnail/plot/floor-plan-light.png"),
FileAttachment("../thumbnail/plot/function-contour-2-dark.png"), FileAttachment("../thumbnail/plot/function-contour-2-light.png"),
FileAttachment("../thumbnail/plot/function-contour-dark.png"), FileAttachment("../thumbnail/plot/function-contour-light.png"),
FileAttachment("../thumbnail/plot/ggplot2-style-axes-dark.png"), FileAttachment("../thumbnail/plot/ggplot2-style-axes-light.png"),
FileAttachment("../thumbnail/plot/gradient-bars-dark.png"), FileAttachment("../thumbnail/plot/gradient-bars-light.png"),
FileAttachment("../thumbnail/plot/gradient-encoding-dark.png"), FileAttachment("../thumbnail/plot/gradient-encoding-light.png"),
FileAttachment("../thumbnail/plot/grid-choropleth-dark.png"), FileAttachment("../thumbnail/plot/grid-choropleth-light.png"),
FileAttachment("../thumbnail/plot/grouped-bar-chart-dark.png"), FileAttachment("../thumbnail/plot/grouped-bar-chart-light.png"),
FileAttachment("../thumbnail/plot/hexbin-binwidth-dark.png"), FileAttachment("../thumbnail/plot/hexbin-binwidth-light.png"),
FileAttachment("../thumbnail/plot/hexbin-map-dark.png"), FileAttachment("../thumbnail/plot/hexbin-map-light.png"),
FileAttachment("../thumbnail/plot/hexbin-text-dark.png"), FileAttachment("../thumbnail/plot/hexbin-text-light.png"),
FileAttachment("../thumbnail/plot/highlighted-bin-dark.png"), FileAttachment("../thumbnail/plot/highlighted-bin-light.png"),
FileAttachment("../thumbnail/plot/horizon-dark.png"), FileAttachment("../thumbnail/plot/horizon-light.png"),
FileAttachment("../thumbnail/plot/horizontal-bar-chart-with-label-dark.png"), FileAttachment("../thumbnail/plot/horizontal-bar-chart-with-label-light.png"),
FileAttachment("../thumbnail/plot/horizontal-bar-chart-dark.png"), FileAttachment("../thumbnail/plot/horizontal-bar-chart-light.png"),
FileAttachment("../thumbnail/plot/horizontal-stacked-bars-dark.png"), FileAttachment("../thumbnail/plot/horizontal-stacked-bars-light.png"),
FileAttachment("../thumbnail/plot/igrf90-contours-dark.png"), FileAttachment("../thumbnail/plot/igrf90-contours-light.png"),
FileAttachment("../thumbnail/plot/image-dodge-dark.png"), FileAttachment("../thumbnail/plot/image-dodge-light.png"),
FileAttachment("../thumbnail/plot/image-medals-dark.png"), FileAttachment("../thumbnail/plot/image-medals-light.png"),
FileAttachment("../thumbnail/plot/image-scatterplot-2-dark.png"), FileAttachment("../thumbnail/plot/image-scatterplot-2-light.png"),
FileAttachment("../thumbnail/plot/image-scatterplot-dark.png"), FileAttachment("../thumbnail/plot/image-scatterplot-light.png"),
FileAttachment("../thumbnail/plot/imago-projection-dark.png"), FileAttachment("../thumbnail/plot/imago-projection-light.png"),
FileAttachment("../thumbnail/plot/impact-of-vaccines-dark.png"), FileAttachment("../thumbnail/plot/impact-of-vaccines-light.png"),
FileAttachment("../thumbnail/plot/indented-tree-dark.png"), FileAttachment("../thumbnail/plot/indented-tree-light.png"),
FileAttachment("../thumbnail/plot/index-chart-dark.png"), FileAttachment("../thumbnail/plot/index-chart-light.png"),
FileAttachment("../thumbnail/plot/interpolate-flood-dark.png"), FileAttachment("../thumbnail/plot/interpolate-flood-light.png"),
FileAttachment("../thumbnail/plot/isotype-dark.png"), FileAttachment("../thumbnail/plot/isotype-light.png"),
FileAttachment("../thumbnail/plot/job-vacancies-dark.png"), FileAttachment("../thumbnail/plot/job-vacancies-light.png"),
FileAttachment("../thumbnail/plot/labeled-multi-line-chart-dark.png"), FileAttachment("../thumbnail/plot/labeled-multi-line-chart-light.png"),
FileAttachment("../thumbnail/plot/labelled-horizontal-bar-chart-variants-dark.png"), FileAttachment("../thumbnail/plot/labelled-horizontal-bar-chart-variants-light.png"),
FileAttachment("../thumbnail/plot/lebron-james-shots-dark.png"), FileAttachment("../thumbnail/plot/lebron-james-shots-light.png"),
FileAttachment("../thumbnail/plot/line-chart-interactive-tip-dark.png"), FileAttachment("../thumbnail/plot/line-chart-interactive-tip-light.png"),
FileAttachment("../thumbnail/plot/line-chart-percent-change-dark.png"), FileAttachment("../thumbnail/plot/line-chart-percent-change-light.png"),
FileAttachment("../thumbnail/plot/line-chart-with-gaps-dark.png"), FileAttachment("../thumbnail/plot/line-chart-with-gaps-light.png"),
FileAttachment("../thumbnail/plot/line-chart-with-markers-dark.png"), FileAttachment("../thumbnail/plot/line-chart-with-markers-light.png"),
FileAttachment("../thumbnail/plot/line-with-moving-average-dark.png"), FileAttachment("../thumbnail/plot/line-with-moving-average-light.png"),
FileAttachment("../thumbnail/plot/linear-regression-simpson-dark.png"), FileAttachment("../thumbnail/plot/linear-regression-simpson-light.png"),
FileAttachment("../thumbnail/plot/liquid-flow-velocity-dark.png"), FileAttachment("../thumbnail/plot/liquid-flow-velocity-light.png"),
FileAttachment("../thumbnail/plot/log-heatmap-dark.png"), FileAttachment("../thumbnail/plot/log-heatmap-light.png"),
FileAttachment("../thumbnail/plot/lollipop-dark.png"), FileAttachment("../thumbnail/plot/lollipop-light.png"),
FileAttachment("../thumbnail/plot/london-facets-dark.png"), FileAttachment("../thumbnail/plot/london-facets-light.png"),
FileAttachment("../thumbnail/plot/major-and-minor-axis-ticks-dark.png"), FileAttachment("../thumbnail/plot/major-and-minor-axis-ticks-light.png"),
FileAttachment("../thumbnail/plot/mandelbrot-set-dark.png"), FileAttachment("../thumbnail/plot/mandelbrot-set-light.png"),
FileAttachment("../thumbnail/plot/map-small-multiples-dark.png"), FileAttachment("../thumbnail/plot/map-small-multiples-light.png"),
FileAttachment("../thumbnail/plot/map-tips-dark.png"), FileAttachment("../thumbnail/plot/map-tips-light.png"),
FileAttachment("../thumbnail/plot/mareys-trains-dark.png"), FileAttachment("../thumbnail/plot/mareys-trains-light.png"),
FileAttachment("../thumbnail/plot/marimekko-dark.png"), FileAttachment("../thumbnail/plot/marimekko-light.png"),
FileAttachment("../thumbnail/plot/multi-series-line-chart-interactive-tips-dark.png"), FileAttachment("../thumbnail/plot/multi-series-line-chart-interactive-tips-light.png"),
FileAttachment("../thumbnail/plot/multiple-line-chart-dark.png"), FileAttachment("../thumbnail/plot/multiple-line-chart-light.png"),
FileAttachment("../thumbnail/plot/non-faceted-marks-dark.png"), FileAttachment("../thumbnail/plot/non-faceted-marks-light.png"),
FileAttachment("../thumbnail/plot/non-overlapping-density-regions-dark.png"), FileAttachment("../thumbnail/plot/non-overlapping-density-regions-light.png"),
FileAttachment("../thumbnail/plot/non-temporal-line-chart-dark.png"), FileAttachment("../thumbnail/plot/non-temporal-line-chart-light.png"),
FileAttachment("../thumbnail/plot/normal-histogram-dark.png"), FileAttachment("../thumbnail/plot/normal-histogram-light.png"),
FileAttachment("../thumbnail/plot/normalized-stack-dark.png"), FileAttachment("../thumbnail/plot/normalized-stack-light.png"),
FileAttachment("../thumbnail/plot/nyt-style-axes-dark.png"), FileAttachment("../thumbnail/plot/nyt-style-axes-light.png"),
FileAttachment("../thumbnail/plot/olympians-density-dark.png"), FileAttachment("../thumbnail/plot/olympians-density-light.png"),
FileAttachment("../thumbnail/plot/olympians-grouped-bar-chart-dark.png"), FileAttachment("../thumbnail/plot/olympians-grouped-bar-chart-light.png"),
FileAttachment("../thumbnail/plot/olympians-hexbin-dark.png"), FileAttachment("../thumbnail/plot/olympians-hexbin-light.png"),
FileAttachment("../thumbnail/plot/one-dimensional-crosshair-dark.png"), FileAttachment("../thumbnail/plot/one-dimensional-crosshair-light.png"),
FileAttachment("../thumbnail/plot/one-dimensional-density-dark.png"), FileAttachment("../thumbnail/plot/one-dimensional-density-light.png"),
FileAttachment("../thumbnail/plot/one-dimensional-pointing-dark.png"), FileAttachment("../thumbnail/plot/one-dimensional-pointing-light.png"),
FileAttachment("../thumbnail/plot/ordinal-bar-chart-dark.png"), FileAttachment("../thumbnail/plot/ordinal-bar-chart-light.png"),
FileAttachment("../thumbnail/plot/ordinal-scale-interval-dark.png"), FileAttachment("../thumbnail/plot/ordinal-scale-interval-light.png"),
FileAttachment("../thumbnail/plot/ordinal-scatterplot-dark.png"), FileAttachment("../thumbnail/plot/ordinal-scatterplot-light.png"),
FileAttachment("../thumbnail/plot/overlapping-density-estimations-dark.png"), FileAttachment("../thumbnail/plot/overlapping-density-estimations-light.png"),
FileAttachment("../thumbnail/plot/overlapping-histogram-dark.png"), FileAttachment("../thumbnail/plot/overlapping-histogram-light.png"),
FileAttachment("../thumbnail/plot/parcoords-dark.png"), FileAttachment("../thumbnail/plot/parcoords-light.png"),
FileAttachment("../thumbnail/plot/percentogram-dark.png"), FileAttachment("../thumbnail/plot/percentogram-light.png"),
FileAttachment("../thumbnail/plot/perlin-noise-dark.png"), FileAttachment("../thumbnail/plot/perlin-noise-light.png"),
FileAttachment("../thumbnail/plot/phases-of-the-moon-dark.png"), FileAttachment("../thumbnail/plot/phases-of-the-moon-light.png"),
FileAttachment("../thumbnail/plot/planar-vs-spherical-voronoi-dark.png"), FileAttachment("../thumbnail/plot/planar-vs-spherical-voronoi-light.png"),
FileAttachment("../thumbnail/plot/plot-of-plots-dark.png"), FileAttachment("../thumbnail/plot/plot-of-plots-light.png"),
FileAttachment("../thumbnail/plot/point-cloud-density-dark.png"), FileAttachment("../thumbnail/plot/point-cloud-density-light.png"),
FileAttachment("../thumbnail/plot/pointer-modes-x-y-and-xy-dark.png"), FileAttachment("../thumbnail/plot/pointer-modes-x-y-and-xy-light.png"),
FileAttachment("../thumbnail/plot/pointer-target-position-dark.png"), FileAttachment("../thumbnail/plot/pointer-target-position-light.png"),
FileAttachment("../thumbnail/plot/pointer-transform-dark.png"), FileAttachment("../thumbnail/plot/pointer-transform-light.png"),
FileAttachment("../thumbnail/plot/polar-projection-dark.png"), FileAttachment("../thumbnail/plot/polar-projection-light.png"),
FileAttachment("../thumbnail/plot/population-pyramid-dark.png"), FileAttachment("../thumbnail/plot/population-pyramid-light.png"),
FileAttachment("../thumbnail/plot/prebinned-histogram-dark.png"), FileAttachment("../thumbnail/plot/prebinned-histogram-light.png"),
FileAttachment("../thumbnail/plot/projection-domain-dark.png"), FileAttachment("../thumbnail/plot/projection-domain-light.png"),
FileAttachment("../thumbnail/plot/proportion-plot-dark.png"), FileAttachment("../thumbnail/plot/proportion-plot-light.png"),
FileAttachment("../thumbnail/plot/proportional-symbol-scatterplot-dark.png"), FileAttachment("../thumbnail/plot/proportional-symbol-scatterplot-light.png"),
FileAttachment("../thumbnail/plot/psr-b1919-21-dark.png"), FileAttachment("../thumbnail/plot/psr-b1919-21-light.png"),
FileAttachment("../thumbnail/plot/qq-plot-dark.png"), FileAttachment("../thumbnail/plot/qq-plot-light.png"),
FileAttachment("../thumbnail/plot/radar-chart-faceted-dark.png"), FileAttachment("../thumbnail/plot/radar-chart-faceted-light.png"),
FileAttachment("../thumbnail/plot/radar-chart-dark.png"), FileAttachment("../thumbnail/plot/radar-chart-light.png"),
FileAttachment("../thumbnail/plot/random-walk-dark.png"), FileAttachment("../thumbnail/plot/random-walk-light.png"),
FileAttachment("../thumbnail/plot/raster-projection-dark.png"), FileAttachment("../thumbnail/plot/raster-projection-light.png"),
FileAttachment("../thumbnail/plot/ribbon-chart-dark.png"), FileAttachment("../thumbnail/plot/ribbon-chart-light.png"),
FileAttachment("../thumbnail/plot/ridgeline-dark.png"), FileAttachment("../thumbnail/plot/ridgeline-light.png"),
FileAttachment("../thumbnail/plot/rough-plot-dark.png"), FileAttachment("../thumbnail/plot/rough-plot-light.png"),
FileAttachment("../thumbnail/plot/scatterplot-with-interactive-tips-dark.png"), FileAttachment("../thumbnail/plot/scatterplot-with-interactive-tips-light.png"),
FileAttachment("../thumbnail/plot/scatterplot-with-ordinal-dimension-dark.png"), FileAttachment("../thumbnail/plot/scatterplot-with-ordinal-dimension-light.png"),
FileAttachment("../thumbnail/plot/scatterplot-dark.png"), FileAttachment("../thumbnail/plot/scatterplot-light.png"),
FileAttachment("../thumbnail/plot/seattle-temperature-heatmap-dark.png"), FileAttachment("../thumbnail/plot/seattle-temperature-heatmap-light.png"),
FileAttachment("../thumbnail/plot/shockwave-dark.png"), FileAttachment("../thumbnail/plot/shockwave-light.png"),
FileAttachment("../thumbnail/plot/simple-line-chart-dark.png"), FileAttachment("../thumbnail/plot/simple-line-chart-light.png"),
FileAttachment("../thumbnail/plot/simpsons-ratings-dark.png"), FileAttachment("../thumbnail/plot/simpsons-ratings-light.png"),
FileAttachment("../thumbnail/plot/single-stacked-bar-dark.png"), FileAttachment("../thumbnail/plot/single-stacked-bar-light.png"),
FileAttachment("../thumbnail/plot/slope-chart-dark.png"), FileAttachment("../thumbnail/plot/slope-chart-light.png"),
FileAttachment("../thumbnail/plot/small-grid-contours-dark.png"), FileAttachment("../thumbnail/plot/small-grid-contours-light.png"),
FileAttachment("../thumbnail/plot/sorted-groups-dark.png"), FileAttachment("../thumbnail/plot/sorted-groups-light.png"),
FileAttachment("../thumbnail/plot/sorted-heatmap-dark.png"), FileAttachment("../thumbnail/plot/sorted-heatmap-light.png"),
FileAttachment("../thumbnail/plot/spiral-heatmap-dark.png"), FileAttachment("../thumbnail/plot/spiral-heatmap-light.png"),
FileAttachment("../thumbnail/plot/stacked-area-chart-dark.png"), FileAttachment("../thumbnail/plot/stacked-area-chart-light.png"),
FileAttachment("../thumbnail/plot/stacked-bars-dark.png"), FileAttachment("../thumbnail/plot/stacked-bars-light.png"),
FileAttachment("../thumbnail/plot/stacked-dots-dark.png"), FileAttachment("../thumbnail/plot/stacked-dots-light.png"),
FileAttachment("../thumbnail/plot/stacked-histogram-dark.png"), FileAttachment("../thumbnail/plot/stacked-histogram-light.png"),
FileAttachment("../thumbnail/plot/stacked-percentages-dark.png"), FileAttachment("../thumbnail/plot/stacked-percentages-light.png"),
FileAttachment("../thumbnail/plot/stacked-unit-chart-dark.png"), FileAttachment("../thumbnail/plot/stacked-unit-chart-light.png"),
FileAttachment("../thumbnail/plot/stacking-order-and-reverse-dark.png"), FileAttachment("../thumbnail/plot/stacking-order-and-reverse-light.png"),
FileAttachment("../thumbnail/plot/state-centroids-dark.png"), FileAttachment("../thumbnail/plot/state-centroids-light.png"),
FileAttachment("../thumbnail/plot/state-labels-dark.png"), FileAttachment("../thumbnail/plot/state-labels-light.png"),
FileAttachment("../thumbnail/plot/state-population-change-dark.png"), FileAttachment("../thumbnail/plot/state-population-change-light.png"),
FileAttachment("../thumbnail/plot/static-annotations-dark.png"), FileAttachment("../thumbnail/plot/static-annotations-light.png"),
FileAttachment("../thumbnail/plot/stroked-contours-dark.png"), FileAttachment("../thumbnail/plot/stroked-contours-light.png"),
FileAttachment("../thumbnail/plot/symbol-channel-dark.png"), FileAttachment("../thumbnail/plot/symbol-channel-light.png"),
FileAttachment("../thumbnail/plot/temperature-amplitude-dark.png"), FileAttachment("../thumbnail/plot/temperature-amplitude-light.png"),
FileAttachment("../thumbnail/plot/temporal-bar-chart-dark.png"), FileAttachment("../thumbnail/plot/temporal-bar-chart-light.png"),
FileAttachment("../thumbnail/plot/ternary-dark.png"), FileAttachment("../thumbnail/plot/ternary-light.png"),
FileAttachment("../thumbnail/plot/text-dodge-dark.png"), FileAttachment("../thumbnail/plot/text-dodge-light.png"),
FileAttachment("../thumbnail/plot/text-spiral-dark.png"), FileAttachment("../thumbnail/plot/text-spiral-light.png"),
FileAttachment("../thumbnail/plot/this-is-just-to-say-dark.png"), FileAttachment("../thumbnail/plot/this-is-just-to-say-light.png"),
FileAttachment("../thumbnail/plot/tip-format-dark.png"), FileAttachment("../thumbnail/plot/tip-format-light.png"),
FileAttachment("../thumbnail/plot/tips-additional-channels-dark.png"), FileAttachment("../thumbnail/plot/tips-additional-channels-light.png"),
FileAttachment("../thumbnail/plot/tips-longer-text-dark.png"), FileAttachment("../thumbnail/plot/tips-longer-text-light.png"),
FileAttachment("../thumbnail/plot/tips-paired-channels-dark.png"), FileAttachment("../thumbnail/plot/tips-paired-channels-light.png"),
FileAttachment("../thumbnail/plot/tree-dark.png"), FileAttachment("../thumbnail/plot/tree-light.png"),
FileAttachment("../thumbnail/plot/trellis-anomaly-dark.png"), FileAttachment("../thumbnail/plot/trellis-anomaly-light.png"),
FileAttachment("../thumbnail/plot/two-dimensional-faceting-dark.png"), FileAttachment("../thumbnail/plot/two-dimensional-faceting-light.png"),
FileAttachment("../thumbnail/plot/unemployment-horizon-chart-dark.png"), FileAttachment("../thumbnail/plot/unemployment-horizon-chart-light.png"),
FileAttachment("../thumbnail/plot/us-bubble-map-dark.png"), FileAttachment("../thumbnail/plot/us-bubble-map-light.png"),
FileAttachment("../thumbnail/plot/us-spike-map-dark.png"), FileAttachment("../thumbnail/plot/us-spike-map-light.png"),
FileAttachment("../thumbnail/plot/v-counties-dark.png"), FileAttachment("../thumbnail/plot/v-counties-light.png"),
FileAttachment("../thumbnail/plot/variable-fill-area-dark.png"), FileAttachment("../thumbnail/plot/variable-fill-area-light.png"),
FileAttachment("../thumbnail/plot/vertical-bar-chart-dark.png"), FileAttachment("../thumbnail/plot/vertical-bar-chart-light.png"),
FileAttachment("../thumbnail/plot/vertical-bars-rotated-labels-dark.png"), FileAttachment("../thumbnail/plot/vertical-bars-rotated-labels-light.png"),
FileAttachment("../thumbnail/plot/volcano-raster-dark.png"), FileAttachment("../thumbnail/plot/volcano-raster-light.png"),
FileAttachment("../thumbnail/plot/voronoi-labels-dark.png"), FileAttachment("../thumbnail/plot/voronoi-labels-light.png"),
FileAttachment("../thumbnail/plot/voronoi-map-dark.png"), FileAttachment("../thumbnail/plot/voronoi-map-light.png"),
FileAttachment("../thumbnail/plot/voronoi-scatterplot-dark.png"), FileAttachment("../thumbnail/plot/voronoi-scatterplot-light.png"),
FileAttachment("../thumbnail/plot/voronoi-treemap-dark.png"), FileAttachment("../thumbnail/plot/voronoi-treemap-light.png"),
FileAttachment("../thumbnail/plot/walmart-density-dark.png"), FileAttachment("../thumbnail/plot/walmart-density-light.png"),
FileAttachment("../thumbnail/plot/walmart-voronoi-dark.png"), FileAttachment("../thumbnail/plot/walmart-voronoi-light.png"),
FileAttachment("../thumbnail/plot/warming-stripes-dark.png"), FileAttachment("../thumbnail/plot/warming-stripes-light.png"),
FileAttachment("../thumbnail/plot/wealth-health-nations-dark.png"), FileAttachment("../thumbnail/plot/wealth-health-nations-light.png"),
FileAttachment("../thumbnail/plot/wiggle-streamgraph-dark.png"), FileAttachment("../thumbnail/plot/wiggle-streamgraph-light.png"),
FileAttachment("../thumbnail/plot/wind-map-dark.png"), FileAttachment("../thumbnail/plot/wind-map-light.png"),
FileAttachment("../thumbnail/plot/window-and-map-dark.png"), FileAttachment("../thumbnail/plot/window-and-map-light.png"),
FileAttachment("../thumbnail/plot/window-reduce-dark.png"), FileAttachment("../thumbnail/plot/window-reduce-light.png"),
FileAttachment("../thumbnail/plot/world-projections-dark.png"), FileAttachment("../thumbnail/plot/world-projections-light.png"),
FileAttachment("../thumbnail/plot/wrap-tick-labels-dark.png"), FileAttachment("../thumbnail/plot/wrap-tick-labels-light.png"),
FileAttachment("../thumbnail/projections/d3-geo-polygon-dark.png"), FileAttachment("../thumbnail/projections/d3-geo-polygon-light.png"),
FileAttachment("../thumbnail/projections/himawari-8-dark.png"), FileAttachment("../thumbnail/projections/himawari-8-light.png"),
FileAttachment("../thumbnail/projections/-dark.png"), FileAttachment("../thumbnail/projections/-light.png"),
FileAttachment("../thumbnail/projections/markley-dark.png"), FileAttachment("../thumbnail/projections/markley-light.png"),
FileAttachment("../thumbnail/projections/renner-dark.png"), FileAttachment("../thumbnail/projections/renner-light.png"),
FileAttachment("../thumbnail/stash/coolprop-dark.png"), FileAttachment("../thumbnail/stash/coolprop-light.png"),
FileAttachment("../thumbnail/support/a-frame-dark.png"), FileAttachment("../thumbnail/support/a-frame-light.png"),
FileAttachment("../thumbnail/support/becker-barley-ssr-dark.png"), FileAttachment("../thumbnail/support/becker-barley-ssr-light.png"),
FileAttachment("../thumbnail/support/dark-mode-dark.png"), FileAttachment("../thumbnail/support/dark-mode-light.png"),
FileAttachment("../thumbnail/support/debouncing-inputs-dark.png"), FileAttachment("../thumbnail/support/debouncing-inputs-light.png"),
FileAttachment("../thumbnail/support/html-inputs-dark.png"), FileAttachment("../thumbnail/support/html-inputs-light.png"),
FileAttachment("../thumbnail/support/inputs-bind-dark.png"), FileAttachment("../thumbnail/support/inputs-bind-light.png"),
FileAttachment("../thumbnail/support/mollweide-with-ticks-dark.png"), FileAttachment("../thumbnail/support/mollweide-with-ticks-light.png"),
FileAttachment("../thumbnail/support/stored-inputs-dark.png"), FileAttachment("../thumbnail/support/stored-inputs-light.png"),
FileAttachment("../thumbnail/topojson/country-topology-dark.png"), FileAttachment("../thumbnail/topojson/country-topology-light.png"),
FileAttachment("../thumbnail/topojson/county-topology-dark.png"), FileAttachment("../thumbnail/topojson/county-topology-light.png"),
FileAttachment("../thumbnail/topojson/hexagon-mesh-dark.png"), FileAttachment("../thumbnail/topojson/hexagon-mesh-light.png"),
FileAttachment("../thumbnail/varia/covid-sumeau-dark.png"), FileAttachment("../thumbnail/varia/covid-sumeau-light.png"),
FileAttachment("../thumbnail/varia/lap-jv-dark.png"), FileAttachment("../thumbnail/varia/lap-jv-light.png"),
FileAttachment("../thumbnail/varia/pt-dark.png"), FileAttachment("../thumbnail/varia/pt-light.png"),
FileAttachment("../thumbnail/varia/sequence-logos-dark.png"), FileAttachment("../thumbnail/varia/sequence-logos-light.png"),
FileAttachment("../thumbnail/video/ed3RfgPPZ2w-dark.png"), FileAttachment("../thumbnail/video/ed3RfgPPZ2w-light.png")
];
~~~

~~~js
{
  function intersect(entries) {
    for (const {isIntersecting, target} of entries) {
      if (isIntersecting) {
        const {v} = target;
        if (v) target.style.backgroundImage = `url("${v.href}")`;
        observer.unobserve(target);
      }
    }
  }
  const observer = new IntersectionObserver(intersect);
  let i = 0;
  for (const node of document.querySelectorAll("#list a")) {
    const d = bg[i++];
    const l = bg[i++];
    const v = dark ? (d ?? l) : (l ?? d);
    if (v) observer.observe(Object.assign(node, {v}));
  }
}
~~~
