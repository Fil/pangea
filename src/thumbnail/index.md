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
#list a span {
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

<a href="../eurostat"><span>Eurostat data loaders</span></a>
<a href="../search-graph"><span>Multi-site search graph</span></a>
<a href="../search"><span>Multi-site search</span></a>
<a href="../d3/adaptive-sampling"><span>Adaptive sampling</span></a>
<a href="../d3/animated-treemap"><span>Animated treemap</span></a>
<a href="../d3/arc-clock"><span>Arc clock</span></a>
<a href="../d3/arc-diagram"><span>Arc diagram</span></a>
<a href="../d3/arc-tween"><span>Arc tween</span></a>
<a href="../d3/area-chart-missing-data"><span>Area chart with missing data</span></a>
<a href="../d3/area-chart"><span>Area chart</span></a>
<a href="../d3/bar-chart-race"><span>Bar chart race</span></a>
<a href="../d3/bar-chart-transitions"><span>Bar chart transitions</span></a>
<a href="../d3/bar-chart"><span>Bar chart</span></a>
<a href="../d3/bivariate-choropleth"><span>Bivariate choropleth</span></a>
<a href="../d3/brushable-scatterplot-matrix"><span>Brushable scatterplot matrix</span></a>
<a href="../d3/brushable-scatterplot"><span>Brushable scatterplot</span></a>
<a href="../d3/bubble-chart"><span>Bubble chart</span></a>
<a href="../d3/burtins-antibiotics"><span>Burtin’s Antibiotics</span></a>
<a href="../d3/candlestick-chart"><span>Candlestick chart</span></a>
<a href="../d3/cascaded-treemap"><span>Cascaded treemap</span></a>
<a href="../d3/change-line-chart"><span>Line chart, percent change</span></a>
<a href="../d3/chord-dependency-diagram"><span>Chord dependency diagram</span></a>
<a href="../d3/chord-diagram"><span>Chord diagram</span></a>
<a href="../d3/choropleth"><span>Choropleth</span></a>
<a href="../d3/clipped-map-tiles"><span>Clipped map tiles</span></a>
<a href="../d3/cluster"><span>Cluster tree</span></a>
<a href="../d3/collapsible-tree"><span>Collapsible tree</span></a>
<a href="../d3/connected-scatterplot"><span>Connected scatterplot (D3)</span></a>
<a href="../d3/disjoint-force-directed-graph"><span>Disjoint force-directed graph</span></a>
<a href="../d3/diverging-horizon-chart"><span>Diverging horizon chart</span></a>
<a href="../d3/donut-chart"><span>Donut chart</span></a>
<a href="../d3/force-directed-graph"><span>Force-directed graph</span></a>
<a href="../d3/geodesic-rainbow"><span>Geodesic rainbow</span></a>
<a href="../d3/geodesic-voronoi"><span>Geodesic voronoi</span></a>
<a href="../d3/graticule-labels-stereographic"><span>Graticule labels (stereographic)</span></a>
<a href="../d3/hertzsprung-russell-diagram"><span>Hertzsprung–Russell diagram</span></a>
<a href="../d3/hierarchical-edge-bundling"><span>Hierarchical edge bundling</span></a>
<a href="../d3/horizon-chart"><span>Horizon chart</span></a>
<a href="../d3/icicle"><span>Icicle</span></a>
<a href="../d3/impact-of-vaccines"><span>The impact of vaccines</span></a>
<a href="../d3/index-chart"><span>Index chart</span></a>
<a href="../d3/inline-labels"><span>Inline labels</span></a>
<a href="../d3/line-chart"><span>Line chart</span></a>
<a href="../d3/line-with-tooltip"><span>Line chart with tooltip</span></a>
<a href="../d3/mobile-patent-suits"><span>Mobile patent suits</span></a>
<a href="../d3/moving-average"><span>Moving average</span></a>
<a href="../d3/multi-line-chart"><span>Line chart, multiple series</span></a>
<a href="../d3/nested-treemap"><span>Nested treemap</span></a>
<a href="../d3/new-zealand-tourists-1921-2018"><span>New Zealand tourists, 1921–2018</span></a>
<a href="../d3/non-contiguous-cartogram"><span>Non-contiguous cartogram</span></a>
<a href="../d3/normal-quantile-plot"><span>Normal quantile plot</span></a>
<a href="../d3/occlusion"><span>Occlusion</span></a>
<a href="../d3/pack"><span>Circle packing</span></a>
<a href="../d3/pie-chart-update"><span>Pie chart update</span></a>
<a href="../d3/pie-chart"><span>Pie chart</span></a>
<a href="../d3/polar-clock"><span>Polar clock</span></a>
<a href="../d3/psr-b1919-21"><span>PSR B1919+21</span></a>
<a href="../d3/qq-plot"><span>Q–Q Plot</span></a>
<a href="../d3/radial-area-chart"><span>Radial area chart</span></a>
<a href="../d3/radial-cluster"><span>Radial cluster tree</span></a>
<a href="../d3/radial-tree"><span>Radial tree component</span></a>
<a href="../d3/random-tree"><span>Random Tree</span></a>
<a href="../d3/ridgeline-plot"><span>Ridgeline plot</span></a>
<a href="../d3/sankey"><span>Sankey diagram</span></a>
<a href="../d3/solar-terminator"><span>Solar Terminator</span></a>
<a href="../d3/spherical-alpha-shapes"><span>Spherical alpha shapes</span></a>
<a href="../d3/spilhaus-shoreline-map"><span>Spilhaus shoreline map</span></a>
<a href="../d3/splom"><span>Scatterplot matrix</span></a>
<a href="../d3/star-map"><span>Star map</span></a>
<a href="../d3/streaming-shapefiles"><span>Streaming shapefiles</span></a>
<a href="../d3/sunburst"><span>Sunburst</span></a>
<a href="../d3/tree-of-life"><span>Tree of Life</span></a>
<a href="../d3/tree"><span>Tidy tree</span></a>
<a href="../d3/treemap"><span>Treemap</span></a>
<a href="../d3/vector-tiles"><span>D3: Vector tiles</span></a>
<a href="../d3/versor-dragging"><span>Versor dragging</span></a>
<a href="../d3/voronoi-labels"><span>D3 Voronoi labels</span></a>
<a href="../d3/voronoi-stippling"><span>Voronoi stippling</span></a>
<a href="../d3/walmarts-growth-tree"><span>Walmart’s growth - tree</span></a>
<a href="../d3/walmarts-growth"><span>Walmart’s growth</span></a>
<a href="../d3/wordcloud"><span>Word cloud</span></a>
<a href="../d3/world-airports-voronoi"><span>World airports voronoi</span></a>
<a href="../d3/world-tour"><span>World tour</span></a>
<a href="../d3/zoomable-bar-chart"><span>Zoomable bar chart</span></a>
<a href="../d3/zoomable-icicle"><span>Zoomable icicle</span></a>
<a href="../d3/zoomable-sunburst"><span>Zoomable sunburst</span></a>
<a href="../d3/zoomable-treemap"><span>Zoomable treemap</span></a>
<a href="../duckdb/histogram"><span>DuckDB histogram</span></a>
<a href="../examples/netcdf"><span>NetCDF</span></a>
<a href="../loaders/email-timestamps"><span>email timestamps</span></a>
<a href="../loaders/google-sheets"><span>Google Sheets data loader</span></a>
<a href="../loaders/greek-youth"><span>Greek youth</span></a>
<a href="../party/4-color-clingo"><span>Four-color world map with Clingo</span></a>
<a href="../party/arrow2parquet"><span>Convert Arrow files to parquet</span></a>
<a href="../party/bitcoin-transaction-size"><span>Bitcoin transaction size</span></a>
<a href="../party/blue-comments"><span>Bluesky comments</span></a>
<a href="../party/deck.gl-map"><span>deck.gl map</span></a>
<a href="../party/deck.gl"><span>deck.gl point cloud</span></a>
<a href="../party/dobbyscan"><span>Hello, dobbyscan</span></a>
<a href="../party/duckdb-spatial"><span>DuckDB spatial</span></a>
<a href="../party/duckdb"><span>DuckDB</span></a>
<a href="../party/earcut"><span>Hello, earcut</span></a>
<a href="../party/geocontour"><span>Spherical contours</span></a>
<a href="../party/geotiff"><span>GeoTIFF contours</span></a>
<a href="../party/geotoolbox"><span>Hello, geotoolbox</span></a>
<a href="../party/google-sheets"><span>Hello, Google sheets</span></a>
<a href="../party/graphviz-connected-clusters"><span>Graphviz - connected clusters</span></a>
<a href="../party/greenlet"><span>Greenlet & workerize</span></a>
<a href="../party/highcharts"><span>Highcharts</span></a>
<a href="../party/hljs"><span>Display code with hljs</span></a>
<a href="../party/hyparquet"><span>hyparquet</span></a>
<a href="../party/interactive-jsx"><span>Interactive JSX</span></a>
<a href="../party/jszip"><span>Hello, jszip</span></a>
<a href="../party/mandelbrot"><span>The Mandelbrot Set in HTML5 Canvas & JavaScript</span></a>
<a href="../party/maplibre-gl"><span>MapLibre-GL</span></a>
<a href="../party/markdown-it"><span>Markdown-it</span></a>
<a href="../party/mhchem"><span>Chemistry notation using mhchem</span></a>
<a href="../party/ml-matrix"><span>Hello, ml-matrix</span></a>
<a href="../party/mosaic-flights"><span>Mosaic Cross-Filter Flights 10M</span></a>
<a href="../party/mosaic-nyc-taxi-rides"><span>NYC Taxi Rides</span></a>
<a href="../party/navio"><span>Navio</span></a>
<a href="../party/p5"><span>p5.js</span></a>
<a href="../party/plotly"><span>Plotly 3D elevation map</span></a>
<a href="../party/polylabel"><span>Polylabel vs. centroid</span></a>
<a href="../party/roughviz"><span>RoughViz</span></a>
<a href="../party/sda"><span>Simple data analysis</span></a>
<a href="../party/surge"><span>surge.sh hosting</span></a>
<a href="../party/three"><span>Three</span></a>
<a href="../party/vega-lite-tooltips"><span>Vega lite tooltips</span></a>
<a href="../party/webr"><span>WebR</span></a>
<a href="../party/wikidata"><span>Wikidata</span></a>
<a href="../plot/albers-usa"><span>Albers-USA projection</span></a>
<a href="../plot/anscombes-quartet"><span>Anscombe’s quartet</span></a>
<a href="../plot/apportionment-of-seats-in-the-ep"><span>Apportionment of seats in the European Parliament</span></a>
<a href="../plot/arc-diagram"><span>Arc diagram</span></a>
<a href="../plot/area-chart-gradient"><span>Area chart with gradient</span></a>
<a href="../plot/area-chart-missing-data"><span>Area chart, missing data</span></a>
<a href="../plot/area-chart"><span>Area chart</span></a>
<a href="../plot/arealiney-custom-mark"><span>arealineY custom mark</span></a>
<a href="../plot/arrow-variation-chart"><span>Arrow variation chart</span></a>
<a href="../plot/auto-mark-heatmap"><span>Auto mark, heatmap</span></a>
<a href="../plot/background-image"><span>Background image</span></a>
<a href="../plot/band-chart-with-rule"><span>Band chart with rule</span></a>
<a href="../plot/bar-and-tick"><span>Bar and tick</span></a>
<a href="../plot/barcode"><span>Barcode chart</span></a>
<a href="../plot/barley-trellis"><span>Barley Trellis</span></a>
<a href="../plot/beagle-voyage"><span>Spherical line with a varying stroke</span></a>
<a href="../plot/binned-box-plot"><span>Binned box plot</span></a>
<a href="../plot/bivariate-choropleth"><span>Bivariate choropleth</span></a>
<a href="../plot/blurred-contours"><span>Blurred contours</span></a>
<a href="../plot/bollinger-bands"><span>Bollinger bands</span></a>
<a href="../plot/bullet-graph"><span>Bullet graph</span></a>
<a href="../plot/calendar"><span>Calendar component</span></a>
<a href="../plot/caltrain-schedule"><span>Stem-and-leaf plot</span></a>
<a href="../plot/cancer-survival-rates"><span>Cancer survival rates</span></a>
<a href="../plot/candlestick-chart"><span>Candlestick chart</span></a>
<a href="../plot/centroid-dot"><span>Centroid dot</span></a>
<a href="../plot/centroid-hexbin"><span>Centroid hexbin</span></a>
<a href="../plot/centroid-voronoi"><span>Centroid Voronoi</span></a>
<a href="../plot/choropleth"><span>Choropleth</span></a>
<a href="../plot/civilizations-timeline"><span>Civilizations timeline</span></a>
<a href="../plot/cluster-diagram"><span>Cluster diagram</span></a>
<a href="../plot/color-crosshair"><span>Color crosshair</span></a>
<a href="../plot/color-scatterplot"><span>Scatterplot with color</span></a>
<a href="../plot/connected-scatterplot"><span>Connected scatterplot</span></a>
<a href="../plot/continuous-dimensions-heatmap"><span>Quantitative dimensions heatmap</span></a>
<a href="../plot/contours-projection"><span>Contours & projection</span></a>
<a href="../plot/correlation-heatmap"><span>Correlation heatmap</span></a>
<a href="../plot/county-boxes"><span>County boxes</span></a>
<a href="../plot/crimean-war-bary"><span>Crimean war casualties by cause (bar)</span></a>
<a href="../plot/crimean-war-recty"><span>Crimean war casualties by cause (rect)</span></a>
<a href="../plot/crosshair"><span>Crosshair</span></a>
<a href="../plot/crosshairx"><span>CrosshairX</span></a>
<a href="../plot/cumulative-distribution-of-poverty"><span>Cumulative distribution of poverty</span></a>
<a href="../plot/cumulative-histogram"><span>Cumulative histogram</span></a>
<a href="../plot/data-based-axis"><span>Data-based axis</span></a>
<a href="../plot/datawrapper-style-date-axis"><span>Datawrapper-style date axis</span></a>
<a href="../plot/delaunay-hull"><span>Delaunay & hull</span></a>
<a href="../plot/delaunay-links"><span>Delaunay links</span></a>
<a href="../plot/density-estimation"><span>Continuous histogram</span></a>
<a href="../plot/density-faceted"><span>Density, faceted</span></a>
<a href="../plot/density-options"><span>Density options</span></a>
<a href="../plot/density-stroke"><span>Density stroke</span></a>
<a href="../plot/density-weighted"><span>Density skew (weight) interactive</span></a>
<a href="../plot/difference-arrows"><span>Difference arrows</span></a>
<a href="../plot/difference-chart"><span>Difference chart</span></a>
<a href="../plot/diverging-color-scatterplot"><span>Diverging color scatterplot</span></a>
<a href="../plot/diverging-stacked-bar"><span>Diverging stacked bars</span></a>
<a href="../plot/dodge-cars"><span>Dodge cars (beeswarm)</span></a>
<a href="../plot/dodge-penguins"><span>Dodge penguins</span></a>
<a href="../plot/dot-heatmap"><span>Dot heatmap</span></a>
<a href="../plot/dot-histogram"><span>Dot histogram</span></a>
<a href="../plot/dot-plot"><span>Dot plot</span></a>
<a href="../plot/dot-sort"><span>Bubble map</span></a>
<a href="../plot/dow-jones-calendar"><span>Simple calendar</span></a>
<a href="../plot/earthquake-globe"><span>Earthquake globe</span></a>
<a href="../plot/eld-viewer"><span>ELD Viewer</span></a>
<a href="../plot/election-wind-map"><span>Election wind map</span></a>
<a href="../plot/facet-lollipop"><span>Small multiple lollipop</span></a>
<a href="../plot/facet-wrap"><span>Facet wrap</span></a>
<a href="../plot/faceted-areas"><span>Faceted areas</span></a>
<a href="../plot/faceted-function-contour"><span>Faceted function contour</span></a>
<a href="../plot/filled-contours"><span>Filled contours</span></a>
<a href="../plot/finite-state-machine"><span>Finite state machine</span></a>
<a href="../plot/floor-plan"><span>Floor plan</span></a>
<a href="../plot/function-contour-2"><span>Function contour 2</span></a>
<a href="../plot/function-contour"><span>Function contour</span></a>
<a href="../plot/ggplot2-style-axes"><span>ggplot2-style axes</span></a>
<a href="../plot/gradient-bars"><span>Gradient bars</span></a>
<a href="../plot/gradient-encoding"><span>Gradient encoding</span></a>
<a href="../plot/grid-choropleth"><span>Grid choropleth</span></a>
<a href="../plot/grouped-bar-chart"><span>Grouped bar chart</span></a>
<a href="../plot/hexbin-binwidth"><span>Hexbin binWidth option</span></a>
<a href="../plot/hexbin-map"><span>Hexbin map</span></a>
<a href="../plot/hexbin-text"><span>Hexbin text</span></a>
<a href="../plot/highlighted-bin"><span>Highlighted bin</span></a>
<a href="../plot/horizon"><span>Horizon chart</span></a>
<a href="../plot/horizontal-bar-chart-with-label"><span>Horizontal bar chart with a label</span></a>
<a href="../plot/horizontal-bar-chart"><span>Horizontal bar chart</span></a>
<a href="../plot/horizontal-stacked-bars"><span>Horizontal stacked bars</span></a>
<a href="../plot/igrf90-contours"><span>IGRF90 contours</span></a>
<a href="../plot/image-dodge"><span>Image beeswarm (dodge)</span></a>
<a href="../plot/image-medals"><span>Image medals</span></a>
<a href="../plot/image-scatterplot-2"><span>Default image scatterplot</span></a>
<a href="../plot/image-scatterplot"><span>Image scatterplot</span></a>
<a href="../plot/imago-projection"><span>Plot: Imago projection</span></a>
<a href="../plot/impact-of-vaccines"><span>The impact of vaccines</span></a>
<a href="../plot/indented-tree"><span>Indented tree</span></a>
<a href="../plot/index-chart"><span>Index chart</span></a>
<a href="../plot/interpolate-flood"><span>Flood spatial interpolator</span></a>
<a href="../plot/isotype"><span>Isotype</span></a>
<a href="../plot/job-vacancies"><span>Job vacancies</span></a>
<a href="../plot/labeled-multi-line-chart"><span>Labeled multi-line chart</span></a>
<a href="../plot/labelled-horizontal-bar-chart-variants"><span>Plot: labelled horizontal bar charts</span></a>
<a href="../plot/lebron-james-shots"><span>LeBron James’ shots</span></a>
<a href="../plot/line-chart-interactive-tip"><span>Line chart, interactive tip</span></a>
<a href="../plot/line-chart-percent-change"><span>Line chart, percent change</span></a>
<a href="../plot/line-chart-with-gaps"><span>Line with missing data</span></a>
<a href="../plot/line-chart-with-markers"><span>Line chart with markers</span></a>
<a href="../plot/line-with-moving-average"><span>Line with moving average</span></a>
<a href="../plot/linear-regression-simpson"><span>Simpson’s paradox</span></a>
<a href="../plot/liquid-flow-velocity"><span>Liquid flow velocity in pipes</span></a>
<a href="../plot/log-heatmap"><span>Log heatmap</span></a>
<a href="../plot/lollipop"><span>Lollipop</span></a>
<a href="../plot/london-facets"><span>London facets</span></a>
<a href="../plot/major-and-minor-axis-ticks"><span>Major and minor axis ticks</span></a>
<a href="../plot/mandelbrot-set"><span>Mandelbrot set</span></a>
<a href="../plot/map-small-multiples"><span>Map small multiples</span></a>
<a href="../plot/map-tips"><span>Map and tips</span></a>
<a href="../plot/mareys-trains"><span>Marey’s trains</span></a>
<a href="../plot/marimekko"><span>Marimekko</span></a>
<a href="../plot/multi-series-line-chart-interactive-tips"><span>Multi-series line chart, interactive tips</span></a>
<a href="../plot/multiple-line-chart"><span>Multiple line chart</span></a>
<a href="../plot/non-faceted-marks"><span>Non-faceted marks</span></a>
<a href="../plot/non-overlapping-density-regions"><span>Non-overlapping density regions</span></a>
<a href="../plot/non-temporal-line-chart"><span>Non-temporal line chart</span></a>
<a href="../plot/normal-histogram"><span>Normal histogram</span></a>
<a href="../plot/normalized-stack"><span>Normalized stack</span></a>
<a href="../plot/nyt-style-axes"><span>New York Times-style axes</span></a>
<a href="../plot/olympians-density"><span>Olympians density</span></a>
<a href="../plot/olympians-grouped-bar-chart"><span>Olympians grouped bar chart</span></a>
<a href="../plot/olympians-hexbin"><span>Hexbin heatmap</span></a>
<a href="../plot/one-dimensional-crosshair"><span>One-dimensional crosshair</span></a>
<a href="../plot/one-dimensional-density"><span>One-dimensional density</span></a>
<a href="../plot/one-dimensional-pointing"><span>One-dimensional pointing</span></a>
<a href="../plot/ordinal-bar-chart"><span>Ordinal bar chart</span></a>
<a href="../plot/ordinal-scale-interval"><span>Ordinal scale interval</span></a>
<a href="../plot/ordinal-scatterplot"><span>Ordinal scatterplot</span></a>
<a href="../plot/overlapping-density-estimations"><span>Overlapping density estimations</span></a>
<a href="../plot/overlapping-histogram"><span>Overlapping histogram</span></a>
<a href="../plot/parcoords"><span>Parallel coordinates</span></a>
<a href="../plot/percentogram"><span>Percentogram</span></a>
<a href="../plot/perlin-noise"><span>Perlin noise</span></a>
<a href="../plot/phases-of-the-moon"><span>Phases of the Moon</span></a>
<a href="../plot/planar-vs-spherical-voronoi"><span>Planar vs. Spherical Voronoi</span></a>
<a href="../plot/plot-of-plots"><span>Plot of plots</span></a>
<a href="../plot/point-cloud-density"><span>Point cloud density</span></a>
<a href="../plot/pointer-modes-x-y-and-xy"><span>Pointer modes (x, y, and xy)</span></a>
<a href="../plot/pointer-target-position"><span>Pointer target position</span></a>
<a href="../plot/pointer-transform"><span>Pointer transform</span></a>
<a href="../plot/polar-projection"><span>Polar projection</span></a>
<a href="../plot/population-pyramid"><span>Population pyramid</span></a>
<a href="../plot/prebinned-histogram"><span>Pre-binned histogram</span></a>
<a href="../plot/projection-domain"><span>Projection domain</span></a>
<a href="../plot/proportion-plot"><span>Proportion plot</span></a>
<a href="../plot/proportional-symbol-scatterplot"><span>Proportional symbol scatterplot</span></a>
<a href="../plot/psr-b1919-21"><span>PSR B1919+21</span></a>
<a href="../plot/qq-plot"><span>Quantile-quantile plot</span></a>
<a href="../plot/radar-chart-faceted"><span>Radar chart, small multiples</span></a>
<a href="../plot/radar-chart"><span>Radar chart</span></a>
<a href="../plot/random-walk"><span>Random walk</span></a>
<a href="../plot/raster-projection"><span>Projected raster: vapor</span></a>
<a href="../plot/ribbon-chart"><span>Ribbon chart</span></a>
<a href="../plot/ridgeline"><span>Ridgeline plot</span></a>
<a href="../plot/rough-plot"><span>Rough Plot</span></a>
<a href="../plot/scatterplot-with-interactive-tips"><span>Scatterplot with interactive tips</span></a>
<a href="../plot/scatterplot-with-ordinal-dimension"><span>Scatterplot with ordinal dimension</span></a>
<a href="../plot/scatterplot"><span>Scatterplot</span></a>
<a href="../plot/seattle-temperature-heatmap"><span>Seattle temperature temporal heatmap</span></a>
<a href="../plot/shockwave"><span>Shockwave</span></a>
<a href="../plot/simple-line-chart"><span>Simple line chart</span></a>
<a href="../plot/simpsons-ratings"><span>Simpsons ratings</span></a>
<a href="../plot/single-stacked-bar"><span>Single stacked bar</span></a>
<a href="../plot/slope-chart"><span>Slope chart</span></a>
<a href="../plot/small-grid-contours"><span>Small grid contours</span></a>
<a href="../plot/sorted-groups"><span>Germany traffic patterns</span></a>
<a href="../plot/sorted-heatmap"><span>Sorted heatmap</span></a>
<a href="../plot/spiral-heatmap"><span>Spiral heatmap</span></a>
<a href="../plot/stacked-area-chart"><span>Stacked area chart</span></a>
<a href="../plot/stacked-bars"><span>Stacked bars</span></a>
<a href="../plot/stacked-dots"><span>Stacked dots</span></a>
<a href="../plot/stacked-histogram"><span>Stacked histogram</span></a>
<a href="../plot/stacked-percentages"><span>Stacked percentages</span></a>
<a href="../plot/stacked-unit-chart"><span>Stacked unit chart</span></a>
<a href="../plot/stacking-order-and-reverse"><span>Stacking order and reverse</span></a>
<a href="../plot/state-centroids"><span>State centroids</span></a>
<a href="../plot/state-labels"><span>State labels</span></a>
<a href="../plot/state-population-change"><span>State population change</span></a>
<a href="../plot/static-annotations"><span>Static annotations</span></a>
<a href="../plot/stroked-contours"><span>Stroked contours</span></a>
<a href="../plot/symbol-channel"><span>Symbol channel</span></a>
<a href="../plot/temperature-amplitude"><span>Seattle temperature amplitude</span></a>
<a href="../plot/temporal-bar-chart"><span>Temporal bar chart</span></a>
<a href="../plot/ternary"><span>Ternary diagrams</span></a>
<a href="../plot/text-dodge"><span>Text dodge</span></a>
<a href="../plot/text-spiral"><span>Text spiral</span></a>
<a href="../plot/this-is-just-to-say"><span>This is just to say</span></a>
<a href="../plot/tip-format"><span>Tip format</span></a>
<a href="../plot/tips-additional-channels"><span>Interactive tips with additional channels</span></a>
<a href="../plot/tips-longer-text"><span>Interactive tips with longer text</span></a>
<a href="../plot/tips-paired-channels"><span>Tips, paired channels</span></a>
<a href="../plot/tree"><span>Tidy tree (Plot)</span></a>
<a href="../plot/trellis-anomaly"><span>Barley Trellis plot with arrows</span></a>
<a href="../plot/two-dimensional-faceting"><span>Two-dimensional faceting</span></a>
<a href="../plot/unemployment-horizon-chart"><span>Unemployment horizon chart</span></a>
<a href="../plot/us-bubble-map"><span>U.S. bubble map</span></a>
<a href="../plot/us-spike-map"><span>Spike map</span></a>
<a href="../plot/v-counties"><span>V-Counties</span></a>
<a href="../plot/variable-fill-area"><span>Variable fill area</span></a>
<a href="../plot/vertical-bar-chart"><span>Vertical bar chart</span></a>
<a href="../plot/vertical-bars-rotated-labels"><span>Vertical bars, rotated labels</span></a>
<a href="../plot/volcano-raster"><span>Volcano raster</span></a>
<a href="../plot/voronoi-labels"><span>Voronoi labels</span></a>
<a href="../plot/voronoi-map"><span>Voronoi map</span></a>
<a href="../plot/voronoi-scatterplot"><span>Voronoi scatterplot</span></a>
<a href="../plot/voronoi-treemap"><span>Voronoi treemap</span></a>
<a href="../plot/walmart-density"><span>Walmart density</span></a>
<a href="../plot/walmart-voronoi"><span>Walmart Voronoi</span></a>
<a href="../plot/warming-stripes"><span>Warming stripes</span></a>
<a href="../plot/wealth-health-nations"><span>The Wealth & Health of Nations</span></a>
<a href="../plot/wiggle-streamgraph"><span>Wiggle streamgraph</span></a>
<a href="../plot/wind-map"><span>Wind map</span></a>
<a href="../plot/window-and-map"><span>Difference stroke</span></a>
<a href="../plot/window-reduce"><span>Plot: window reducers</span></a>
<a href="../plot/world-projections"><span>World projections</span></a>
<a href="../plot/wrap-tick-labels"><span>Axis with wrapped labels</span></a>
<a href="../projections/d3-geo-polygon"><span>d3-geo-polygon</span></a>
<a href="../projections/himawari-8"><span>Himawari 8</span></a>
<a href="../projections/"><span>Projections</span></a>
<a href="../projections/markley"><span>Markley’s tetrahedral map</span></a>
<a href="../projections/renner"><span>Renner hemispheric projection</span></a>
<a href="../stash/coolprop"><span>Hello, coolprop</span></a>
<a href="../support/a-frame"><span>A-frame</span></a>
<a href="../support/becker-barley-ssr"><span>Image data loaders</span></a>
<a href="../support/dark-mode"><span>Dark mode</span></a>
<a href="../support/debouncing-inputs"><span>Debouncing inputs</span></a>
<a href="../support/html-inputs"><span>HTML inputs</span></a>
<a href="../support/inputs-bind"><span>Inputs.bind</span></a>
<a href="../support/mollweide-with-ticks"><span>Mollweide projection with ticks</span></a>
<a href="../support/stored-inputs"><span>Stored inputs</span></a>
<a href="../topojson/country-topology"><span>Country Topology</span></a>
<a href="../topojson/county-topology"><span>County Topology</span></a>
<a href="../topojson/hexagon-mesh"><span>Hexagon Mesh</span></a>
<a href="../varia/covid-sumeau"><span>Sum’eau (Covid tracker)</span></a>
<a href="../varia/lap-jv"><span>The linear assignment problem</span></a>
<a href="../varia/pt"><span>pretty-print matrices & tensors</span></a>
<a href="../varia/sequence-logos"><span>Sequence Logos</span></a>
<a href="../video/ed3RfgPPZ2w"><span>Video: Deploy Framework projects to Observable</span></a>

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
~~~
