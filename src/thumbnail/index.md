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

<a id="_0" href="../eurostat"><span>Eurostat data loaders</span></a>
<a id="_1" href="../search-graph"><span>Multi-site search graph</span></a>
<a id="_2" href="../search"><span>Multi-site search</span></a>
<a id="_3" href="../d3/adaptive-sampling"><span>Adaptive sampling</span></a>
<a id="_4" href="../d3/animated-treemap"><span>Animated treemap</span></a>
<a id="_5" href="../d3/arc-clock"><span>Arc clock</span></a>
<a id="_6" href="../d3/arc-diagram"><span>Arc diagram</span></a>
<a id="_7" href="../d3/arc-tween"><span>Arc tween</span></a>
<a id="_8" href="../d3/area-chart-missing-data"><span>Area chart with missing data</span></a>
<a id="_9" href="../d3/area-chart"><span>Area chart</span></a>
<a id="_10" href="../d3/bar-chart-race"><span>Bar chart race</span></a>
<a id="_11" href="../d3/bar-chart-transitions"><span>Bar chart transitions</span></a>
<a id="_12" href="../d3/bar-chart"><span>Bar chart</span></a>
<a id="_13" href="../d3/bivariate-choropleth"><span>Bivariate choropleth</span></a>
<a id="_14" href="../d3/brushable-scatterplot-matrix"><span>Brushable scatterplot matrix</span></a>
<a id="_15" href="../d3/brushable-scatterplot"><span>Brushable scatterplot</span></a>
<a id="_16" href="../d3/bubble-chart"><span>Bubble chart</span></a>
<a id="_17" href="../d3/burtins-antibiotics"><span>Burtin’s Antibiotics</span></a>
<a id="_18" href="../d3/candlestick-chart"><span>Candlestick chart</span></a>
<a id="_19" href="../d3/cascaded-treemap"><span>Cascaded treemap</span></a>
<a id="_20" href="../d3/change-line-chart"><span>Line chart, percent change</span></a>
<a id="_21" href="../d3/chord-dependency-diagram"><span>Chord dependency diagram</span></a>
<a id="_22" href="../d3/chord-diagram"><span>Chord diagram</span></a>
<a id="_23" href="../d3/choropleth"><span>Choropleth</span></a>
<a id="_24" href="../d3/clipped-map-tiles"><span>Clipped map tiles</span></a>
<a id="_25" href="../d3/cluster"><span>Cluster tree</span></a>
<a id="_26" href="../d3/collapsible-tree"><span>Collapsible tree</span></a>
<a id="_27" href="../d3/connected-scatterplot"><span>Connected scatterplot (D3)</span></a>
<a id="_28" href="../d3/disjoint-force-directed-graph"><span>Disjoint force-directed graph</span></a>
<a id="_29" href="../d3/diverging-horizon-chart"><span>Diverging horizon chart</span></a>
<a id="_30" href="../d3/donut-chart"><span>Donut chart</span></a>
<a id="_31" href="../d3/force-directed-graph"><span>Force-directed graph</span></a>
<a id="_32" href="../d3/geodesic-rainbow"><span>Geodesic rainbow</span></a>
<a id="_33" href="../d3/geodesic-voronoi"><span>Geodesic voronoi</span></a>
<a id="_34" href="../d3/graticule-labels-stereographic"><span>Graticule labels (stereographic)</span></a>
<a id="_35" href="../d3/hertzsprung-russell-diagram"><span>Hertzsprung–Russell diagram</span></a>
<a id="_36" href="../d3/hierarchical-edge-bundling"><span>Hierarchical edge bundling</span></a>
<a id="_37" href="../d3/horizon-chart"><span>Horizon chart</span></a>
<a id="_38" href="../d3/icicle"><span>Icicle</span></a>
<a id="_39" href="../d3/impact-of-vaccines"><span>The impact of vaccines</span></a>
<a id="_40" href="../d3/index-chart"><span>Index chart</span></a>
<a id="_41" href="../d3/inline-labels"><span>Inline labels</span></a>
<a id="_42" href="../d3/line-chart"><span>Line chart</span></a>
<a id="_43" href="../d3/line-with-tooltip"><span>Line chart with tooltip</span></a>
<a id="_44" href="../d3/mobile-patent-suits"><span>Mobile patent suits</span></a>
<a id="_45" href="../d3/moving-average"><span>Moving average</span></a>
<a id="_46" href="../d3/multi-line-chart"><span>Line chart, multiple series</span></a>
<a id="_47" href="../d3/nested-treemap"><span>Nested treemap</span></a>
<a id="_48" href="../d3/new-zealand-tourists-1921-2018"><span>New Zealand tourists, 1921–2018</span></a>
<a id="_49" href="../d3/non-contiguous-cartogram"><span>Non-contiguous cartogram</span></a>
<a id="_50" href="../d3/normal-quantile-plot"><span>Normal quantile plot</span></a>
<a id="_51" href="../d3/occlusion"><span>Occlusion</span></a>
<a id="_52" href="../d3/pack"><span>Circle packing</span></a>
<a id="_53" href="../d3/pie-chart-update"><span>Pie chart update</span></a>
<a id="_54" href="../d3/pie-chart"><span>Pie chart</span></a>
<a id="_55" href="../d3/polar-clock"><span>Polar clock</span></a>
<a id="_56" href="../d3/psr-b1919-21"><span>PSR B1919+21</span></a>
<a id="_57" href="../d3/qq-plot"><span>Q–Q Plot</span></a>
<a id="_58" href="../d3/radial-area-chart"><span>Radial area chart</span></a>
<a id="_59" href="../d3/radial-cluster"><span>Radial cluster tree</span></a>
<a id="_60" href="../d3/radial-tree"><span>Radial tree component</span></a>
<a id="_61" href="../d3/random-tree"><span>Random Tree</span></a>
<a id="_62" href="../d3/ridgeline-plot"><span>Ridgeline plot</span></a>
<a id="_63" href="../d3/sankey"><span>Sankey diagram</span></a>
<a id="_64" href="../d3/solar-terminator"><span>Solar Terminator</span></a>
<a id="_65" href="../d3/spherical-alpha-shapes"><span>Spherical alpha shapes</span></a>
<a id="_66" href="../d3/spilhaus-shoreline-map"><span>Spilhaus shoreline map</span></a>
<a id="_67" href="../d3/splom"><span>Scatterplot matrix</span></a>
<a id="_68" href="../d3/star-map"><span>Star map</span></a>
<a id="_69" href="../d3/streaming-shapefiles"><span>Streaming shapefiles</span></a>
<a id="_70" href="../d3/sunburst"><span>Sunburst</span></a>
<a id="_71" href="../d3/tree-of-life"><span>Tree of Life</span></a>
<a id="_72" href="../d3/tree"><span>Tidy tree</span></a>
<a id="_73" href="../d3/treemap"><span>Treemap</span></a>
<a id="_74" href="../d3/vector-tiles"><span>D3: Vector tiles</span></a>
<a id="_75" href="../d3/versor-dragging"><span>Versor dragging</span></a>
<a id="_76" href="../d3/voronoi-labels"><span>D3 Voronoi labels</span></a>
<a id="_77" href="../d3/voronoi-stippling"><span>Voronoi stippling</span></a>
<a id="_78" href="../d3/walmarts-growth-tree"><span>Walmart’s growth - tree</span></a>
<a id="_79" href="../d3/walmarts-growth"><span>Walmart’s growth</span></a>
<a id="_80" href="../d3/wordcloud"><span>Word cloud</span></a>
<a id="_81" href="../d3/world-airports-voronoi"><span>World airports voronoi</span></a>
<a id="_82" href="../d3/world-tour"><span>World tour</span></a>
<a id="_83" href="../d3/zoomable-bar-chart"><span>Zoomable bar chart</span></a>
<a id="_84" href="../d3/zoomable-icicle"><span>Zoomable icicle</span></a>
<a id="_85" href="../d3/zoomable-sunburst"><span>Zoomable sunburst</span></a>
<a id="_86" href="../d3/zoomable-treemap"><span>Zoomable treemap</span></a>
<a id="_87" href="../duckdb/histogram"><span>DuckDB histogram</span></a>
<a id="_88" href="../examples/netcdf"><span>NetCDF</span></a>
<a id="_89" href="../loaders/email-timestamps"><span>email timestamps</span></a>
<a id="_90" href="../loaders/google-sheets"><span>Google Sheets data loader</span></a>
<a id="_91" href="../loaders/greek-youth"><span>Greek youth</span></a>
<a id="_92" href="../party/4-color-clingo"><span>Four-color world map with Clingo</span></a>
<a id="_93" href="../party/arrow2parquet"><span>Convert Arrow files to parquet</span></a>
<a id="_94" href="../party/bitcoin-transaction-size"><span>Bitcoin transaction size</span></a>
<a id="_95" href="../party/blue-comments"><span>Bluesky comments</span></a>
<a id="_96" href="../party/deck.gl-map"><span>deck.gl map</span></a>
<a id="_97" href="../party/deck.gl"><span>deck.gl point cloud</span></a>
<a id="_98" href="../party/dobbyscan"><span>Hello, dobbyscan</span></a>
<a id="_99" href="../party/duckdb-spatial"><span>DuckDB spatial</span></a>
<a id="_100" href="../party/duckdb"><span>DuckDB</span></a>
<a id="_101" href="../party/earcut"><span>Hello, earcut</span></a>
<a id="_102" href="../party/geocontour"><span>Spherical contours</span></a>
<a id="_103" href="../party/geotiff"><span>GeoTIFF contours</span></a>
<a id="_104" href="../party/geotoolbox"><span>Hello, geotoolbox</span></a>
<a id="_105" href="../party/google-sheets"><span>Hello, Google sheets</span></a>
<a id="_106" href="../party/graphviz-connected-clusters"><span>Graphviz - connected clusters</span></a>
<a id="_107" href="../party/greenlet"><span>Greenlet & workerize</span></a>
<a id="_108" href="../party/highcharts"><span>Highcharts</span></a>
<a id="_109" href="../party/hljs"><span>Display code with hljs</span></a>
<a id="_110" href="../party/hyparquet"><span>hyparquet</span></a>
<a id="_111" href="../party/interactive-jsx"><span>Interactive JSX</span></a>
<a id="_112" href="../party/jszip"><span>Hello, jszip</span></a>
<a id="_113" href="../party/mandelbrot"><span>The Mandelbrot Set in HTML5 Canvas & JavaScript</span></a>
<a id="_114" href="../party/maplibre-gl"><span>MapLibre-GL</span></a>
<a id="_115" href="../party/markdown-it"><span>Markdown-it</span></a>
<a id="_116" href="../party/mhchem"><span>Chemistry notation using mhchem</span></a>
<a id="_117" href="../party/ml-matrix"><span>Hello, ml-matrix</span></a>
<a id="_118" href="../party/mosaic-flights"><span>Mosaic Cross-Filter Flights 10M</span></a>
<a id="_119" href="../party/mosaic-nyc-taxi-rides"><span>NYC Taxi Rides</span></a>
<a id="_120" href="../party/navio"><span>Navio</span></a>
<a id="_121" href="../party/p5"><span>p5.js</span></a>
<a id="_122" href="../party/plotly"><span>Plotly 3D elevation map</span></a>
<a id="_123" href="../party/polylabel"><span>Polylabel vs. centroid</span></a>
<a id="_124" href="../party/roughviz"><span>RoughViz</span></a>
<a id="_125" href="../party/sda"><span>Simple data analysis</span></a>
<a id="_126" href="../party/surge"><span>surge.sh hosting</span></a>
<a id="_127" href="../party/three"><span>Three</span></a>
<a id="_128" href="../party/vega-lite-tooltips"><span>Vega lite tooltips</span></a>
<a id="_129" href="../party/webr"><span>WebR</span></a>
<a id="_130" href="../party/wikidata"><span>Wikidata</span></a>
<a id="_131" href="../plot/albers-usa"><span>Albers-USA projection</span></a>
<a id="_132" href="../plot/anscombes-quartet"><span>Anscombe’s quartet</span></a>
<a id="_133" href="../plot/apportionment-of-seats-in-the-ep"><span>Apportionment of seats in the European Parliament</span></a>
<a id="_134" href="../plot/arc-diagram"><span>Arc diagram</span></a>
<a id="_135" href="../plot/area-chart-gradient"><span>Area chart with gradient</span></a>
<a id="_136" href="../plot/area-chart-missing-data"><span>Area chart, missing data</span></a>
<a id="_137" href="../plot/area-chart"><span>Area chart</span></a>
<a id="_138" href="../plot/arealiney-custom-mark"><span>arealineY custom mark</span></a>
<a id="_139" href="../plot/arrow-variation-chart"><span>Arrow variation chart</span></a>
<a id="_140" href="../plot/auto-mark-heatmap"><span>Auto mark, heatmap</span></a>
<a id="_141" href="../plot/background-image"><span>Background image</span></a>
<a id="_142" href="../plot/band-chart-with-rule"><span>Band chart with rule</span></a>
<a id="_143" href="../plot/bar-and-tick"><span>Bar and tick</span></a>
<a id="_144" href="../plot/barcode"><span>Barcode chart</span></a>
<a id="_145" href="../plot/barley-trellis"><span>Barley Trellis</span></a>
<a id="_146" href="../plot/beagle-voyage"><span>Spherical line with a varying stroke</span></a>
<a id="_147" href="../plot/binned-box-plot"><span>Binned box plot</span></a>
<a id="_148" href="../plot/bivariate-choropleth"><span>Bivariate choropleth</span></a>
<a id="_149" href="../plot/blurred-contours"><span>Blurred contours</span></a>
<a id="_150" href="../plot/bollinger-bands"><span>Bollinger bands</span></a>
<a id="_151" href="../plot/bullet-graph"><span>Bullet graph</span></a>
<a id="_152" href="../plot/calendar"><span>Calendar component</span></a>
<a id="_153" href="../plot/caltrain-schedule"><span>Stem-and-leaf plot</span></a>
<a id="_154" href="../plot/cancer-survival-rates"><span>Cancer survival rates</span></a>
<a id="_155" href="../plot/candlestick-chart"><span>Candlestick chart</span></a>
<a id="_156" href="../plot/centroid-dot"><span>Centroid dot</span></a>
<a id="_157" href="../plot/centroid-hexbin"><span>Centroid hexbin</span></a>
<a id="_158" href="../plot/centroid-voronoi"><span>Centroid Voronoi</span></a>
<a id="_159" href="../plot/choropleth"><span>Choropleth</span></a>
<a id="_160" href="../plot/civilizations-timeline"><span>Civilizations timeline</span></a>
<a id="_161" href="../plot/cluster-diagram"><span>Cluster diagram</span></a>
<a id="_162" href="../plot/color-crosshair"><span>Color crosshair</span></a>
<a id="_163" href="../plot/color-scatterplot"><span>Scatterplot with color</span></a>
<a id="_164" href="../plot/connected-scatterplot"><span>Connected scatterplot</span></a>
<a id="_165" href="../plot/continuous-dimensions-heatmap"><span>Quantitative dimensions heatmap</span></a>
<a id="_166" href="../plot/contours-projection"><span>Contours & projection</span></a>
<a id="_167" href="../plot/correlation-heatmap"><span>Correlation heatmap</span></a>
<a id="_168" href="../plot/county-boxes"><span>County boxes</span></a>
<a id="_169" href="../plot/crimean-war-bary"><span>Crimean war casualties by cause (bar)</span></a>
<a id="_170" href="../plot/crimean-war-recty"><span>Crimean war casualties by cause (rect)</span></a>
<a id="_171" href="../plot/crosshair"><span>Crosshair</span></a>
<a id="_172" href="../plot/crosshairx"><span>CrosshairX</span></a>
<a id="_173" href="../plot/cumulative-distribution-of-poverty"><span>Cumulative distribution of poverty</span></a>
<a id="_174" href="../plot/cumulative-histogram"><span>Cumulative histogram</span></a>
<a id="_175" href="../plot/data-based-axis"><span>Data-based axis</span></a>
<a id="_176" href="../plot/datawrapper-style-date-axis"><span>Datawrapper-style date axis</span></a>
<a id="_177" href="../plot/delaunay-hull"><span>Delaunay & hull</span></a>
<a id="_178" href="../plot/delaunay-links"><span>Delaunay links</span></a>
<a id="_179" href="../plot/density-estimation"><span>Continuous histogram</span></a>
<a id="_180" href="../plot/density-faceted"><span>Density, faceted</span></a>
<a id="_181" href="../plot/density-options"><span>Density options</span></a>
<a id="_182" href="../plot/density-stroke"><span>Density stroke</span></a>
<a id="_183" href="../plot/density-weighted"><span>Density skew (weight) interactive</span></a>
<a id="_184" href="../plot/difference-arrows"><span>Difference arrows</span></a>
<a id="_185" href="../plot/difference-chart"><span>Difference chart</span></a>
<a id="_186" href="../plot/diverging-color-scatterplot"><span>Diverging color scatterplot</span></a>
<a id="_187" href="../plot/diverging-stacked-bar"><span>Diverging stacked bars</span></a>
<a id="_188" href="../plot/dodge-cars"><span>Dodge cars (beeswarm)</span></a>
<a id="_189" href="../plot/dodge-penguins"><span>Dodge penguins</span></a>
<a id="_190" href="../plot/dot-heatmap"><span>Dot heatmap</span></a>
<a id="_191" href="../plot/dot-histogram"><span>Dot histogram</span></a>
<a id="_192" href="../plot/dot-plot"><span>Dot plot</span></a>
<a id="_193" href="../plot/dot-sort"><span>Bubble map</span></a>
<a id="_194" href="../plot/dow-jones-calendar"><span>Simple calendar</span></a>
<a id="_195" href="../plot/earthquake-globe"><span>Earthquake globe</span></a>
<a id="_196" href="../plot/eld-viewer"><span>ELD Viewer</span></a>
<a id="_197" href="../plot/election-wind-map"><span>Election wind map</span></a>
<a id="_198" href="../plot/facet-lollipop"><span>Small multiple lollipop</span></a>
<a id="_199" href="../plot/facet-wrap"><span>Facet wrap</span></a>
<a id="_200" href="../plot/faceted-areas"><span>Faceted areas</span></a>
<a id="_201" href="../plot/faceted-function-contour"><span>Faceted function contour</span></a>
<a id="_202" href="../plot/filled-contours"><span>Filled contours</span></a>
<a id="_203" href="../plot/finite-state-machine"><span>Finite state machine</span></a>
<a id="_204" href="../plot/floor-plan"><span>Floor plan</span></a>
<a id="_205" href="../plot/function-contour-2"><span>Function contour 2</span></a>
<a id="_206" href="../plot/function-contour"><span>Function contour</span></a>
<a id="_207" href="../plot/ggplot2-style-axes"><span>ggplot2-style axes</span></a>
<a id="_208" href="../plot/gradient-bars"><span>Gradient bars</span></a>
<a id="_209" href="../plot/gradient-encoding"><span>Gradient encoding</span></a>
<a id="_210" href="../plot/grid-choropleth"><span>Grid choropleth</span></a>
<a id="_211" href="../plot/grouped-bar-chart"><span>Grouped bar chart</span></a>
<a id="_212" href="../plot/hexbin-binwidth"><span>Hexbin binWidth option</span></a>
<a id="_213" href="../plot/hexbin-map"><span>Hexbin map</span></a>
<a id="_214" href="../plot/hexbin-text"><span>Hexbin text</span></a>
<a id="_215" href="../plot/highlighted-bin"><span>Highlighted bin</span></a>
<a id="_216" href="../plot/horizon"><span>Horizon chart</span></a>
<a id="_217" href="../plot/horizontal-bar-chart-with-label"><span>Horizontal bar chart with a label</span></a>
<a id="_218" href="../plot/horizontal-bar-chart"><span>Horizontal bar chart</span></a>
<a id="_219" href="../plot/horizontal-stacked-bars"><span>Horizontal stacked bars</span></a>
<a id="_220" href="../plot/igrf90-contours"><span>IGRF90 contours</span></a>
<a id="_221" href="../plot/image-dodge"><span>Image beeswarm (dodge)</span></a>
<a id="_222" href="../plot/image-medals"><span>Image medals</span></a>
<a id="_223" href="../plot/image-scatterplot-2"><span>Default image scatterplot</span></a>
<a id="_224" href="../plot/image-scatterplot"><span>Image scatterplot</span></a>
<a id="_225" href="../plot/imago-projection"><span>Plot: Imago projection</span></a>
<a id="_226" href="../plot/impact-of-vaccines"><span>The impact of vaccines</span></a>
<a id="_227" href="../plot/indented-tree"><span>Indented tree</span></a>
<a id="_228" href="../plot/index-chart"><span>Index chart</span></a>
<a id="_229" href="../plot/interpolate-flood"><span>Flood spatial interpolator</span></a>
<a id="_230" href="../plot/isotype"><span>Isotype</span></a>
<a id="_231" href="../plot/job-vacancies"><span>Job vacancies</span></a>
<a id="_232" href="../plot/labeled-multi-line-chart"><span>Labeled multi-line chart</span></a>
<a id="_233" href="../plot/labelled-horizontal-bar-chart-variants"><span>Plot: labelled horizontal bar charts</span></a>
<a id="_234" href="../plot/lebron-james-shots"><span>LeBron James’ shots</span></a>
<a id="_235" href="../plot/line-chart-interactive-tip"><span>Line chart, interactive tip</span></a>
<a id="_236" href="../plot/line-chart-percent-change"><span>Line chart, percent change</span></a>
<a id="_237" href="../plot/line-chart-with-gaps"><span>Line with missing data</span></a>
<a id="_238" href="../plot/line-chart-with-markers"><span>Line chart with markers</span></a>
<a id="_239" href="../plot/line-with-moving-average"><span>Line with moving average</span></a>
<a id="_240" href="../plot/linear-regression-simpson"><span>Simpson’s paradox</span></a>
<a id="_241" href="../plot/liquid-flow-velocity"><span>Liquid flow velocity in pipes</span></a>
<a id="_242" href="../plot/log-heatmap"><span>Log heatmap</span></a>
<a id="_243" href="../plot/lollipop"><span>Lollipop</span></a>
<a id="_244" href="../plot/london-facets"><span>London facets</span></a>
<a id="_245" href="../plot/major-and-minor-axis-ticks"><span>Major and minor axis ticks</span></a>
<a id="_246" href="../plot/mandelbrot-set"><span>Mandelbrot set</span></a>
<a id="_247" href="../plot/map-small-multiples"><span>Map small multiples</span></a>
<a id="_248" href="../plot/map-tips"><span>Map and tips</span></a>
<a id="_249" href="../plot/mareys-trains"><span>Marey’s trains</span></a>
<a id="_250" href="../plot/marimekko"><span>Marimekko</span></a>
<a id="_251" href="../plot/multi-series-line-chart-interactive-tips"><span>Multi-series line chart, interactive tips</span></a>
<a id="_252" href="../plot/multiple-line-chart"><span>Multiple line chart</span></a>
<a id="_253" href="../plot/non-faceted-marks"><span>Non-faceted marks</span></a>
<a id="_254" href="../plot/non-overlapping-density-regions"><span>Non-overlapping density regions</span></a>
<a id="_255" href="../plot/non-temporal-line-chart"><span>Non-temporal line chart</span></a>
<a id="_256" href="../plot/normal-histogram"><span>Normal histogram</span></a>
<a id="_257" href="../plot/normalized-stack"><span>Normalized stack</span></a>
<a id="_258" href="../plot/nyt-style-axes"><span>New York Times-style axes</span></a>
<a id="_259" href="../plot/olympians-density"><span>Olympians density</span></a>
<a id="_260" href="../plot/olympians-grouped-bar-chart"><span>Olympians grouped bar chart</span></a>
<a id="_261" href="../plot/olympians-hexbin"><span>Hexbin heatmap</span></a>
<a id="_262" href="../plot/one-dimensional-crosshair"><span>One-dimensional crosshair</span></a>
<a id="_263" href="../plot/one-dimensional-density"><span>One-dimensional density</span></a>
<a id="_264" href="../plot/one-dimensional-pointing"><span>One-dimensional pointing</span></a>
<a id="_265" href="../plot/ordinal-bar-chart"><span>Ordinal bar chart</span></a>
<a id="_266" href="../plot/ordinal-scale-interval"><span>Ordinal scale interval</span></a>
<a id="_267" href="../plot/ordinal-scatterplot"><span>Ordinal scatterplot</span></a>
<a id="_268" href="../plot/overlapping-density-estimations"><span>Overlapping density estimations</span></a>
<a id="_269" href="../plot/overlapping-histogram"><span>Overlapping histogram</span></a>
<a id="_270" href="../plot/parcoords"><span>Parallel coordinates</span></a>
<a id="_271" href="../plot/percentogram"><span>Percentogram</span></a>
<a id="_272" href="../plot/perlin-noise"><span>Perlin noise</span></a>
<a id="_273" href="../plot/phases-of-the-moon"><span>Phases of the Moon</span></a>
<a id="_274" href="../plot/planar-vs-spherical-voronoi"><span>Planar vs. Spherical Voronoi</span></a>
<a id="_275" href="../plot/plot-of-plots"><span>Plot of plots</span></a>
<a id="_276" href="../plot/point-cloud-density"><span>Point cloud density</span></a>
<a id="_277" href="../plot/pointer-modes-x-y-and-xy"><span>Pointer modes (x, y, and xy)</span></a>
<a id="_278" href="../plot/pointer-target-position"><span>Pointer target position</span></a>
<a id="_279" href="../plot/pointer-transform"><span>Pointer transform</span></a>
<a id="_280" href="../plot/polar-projection"><span>Polar projection</span></a>
<a id="_281" href="../plot/population-pyramid"><span>Population pyramid</span></a>
<a id="_282" href="../plot/prebinned-histogram"><span>Pre-binned histogram</span></a>
<a id="_283" href="../plot/projection-domain"><span>Projection domain</span></a>
<a id="_284" href="../plot/proportion-plot"><span>Proportion plot</span></a>
<a id="_285" href="../plot/proportional-symbol-scatterplot"><span>Proportional symbol scatterplot</span></a>
<a id="_286" href="../plot/psr-b1919-21"><span>PSR B1919+21</span></a>
<a id="_287" href="../plot/qq-plot"><span>Quantile-quantile plot</span></a>
<a id="_288" href="../plot/radar-chart-faceted"><span>Radar chart, small multiples</span></a>
<a id="_289" href="../plot/radar-chart"><span>Radar chart</span></a>
<a id="_290" href="../plot/random-walk"><span>Random walk</span></a>
<a id="_291" href="../plot/raster-projection"><span>Projected raster: vapor</span></a>
<a id="_292" href="../plot/ribbon-chart"><span>Ribbon chart</span></a>
<a id="_293" href="../plot/ridgeline"><span>Ridgeline plot</span></a>
<a id="_294" href="../plot/rough-plot"><span>Rough Plot</span></a>
<a id="_295" href="../plot/scatterplot-with-interactive-tips"><span>Scatterplot with interactive tips</span></a>
<a id="_296" href="../plot/scatterplot-with-ordinal-dimension"><span>Scatterplot with ordinal dimension</span></a>
<a id="_297" href="../plot/scatterplot"><span>Scatterplot</span></a>
<a id="_298" href="../plot/seattle-temperature-heatmap"><span>Seattle temperature temporal heatmap</span></a>
<a id="_299" href="../plot/shockwave"><span>Shockwave</span></a>
<a id="_300" href="../plot/simple-line-chart"><span>Simple line chart</span></a>
<a id="_301" href="../plot/simpsons-ratings"><span>Simpsons ratings</span></a>
<a id="_302" href="../plot/single-stacked-bar"><span>Single stacked bar</span></a>
<a id="_303" href="../plot/slope-chart"><span>Slope chart</span></a>
<a id="_304" href="../plot/small-grid-contours"><span>Small grid contours</span></a>
<a id="_305" href="../plot/sorted-groups"><span>Germany traffic patterns</span></a>
<a id="_306" href="../plot/sorted-heatmap"><span>Sorted heatmap</span></a>
<a id="_307" href="../plot/spiral-heatmap"><span>Spiral heatmap</span></a>
<a id="_308" href="../plot/stacked-area-chart"><span>Stacked area chart</span></a>
<a id="_309" href="../plot/stacked-bars"><span>Stacked bars</span></a>
<a id="_310" href="../plot/stacked-dots"><span>Stacked dots</span></a>
<a id="_311" href="../plot/stacked-histogram"><span>Stacked histogram</span></a>
<a id="_312" href="../plot/stacked-percentages"><span>Stacked percentages</span></a>
<a id="_313" href="../plot/stacked-unit-chart"><span>Stacked unit chart</span></a>
<a id="_314" href="../plot/stacking-order-and-reverse"><span>Stacking order and reverse</span></a>
<a id="_315" href="../plot/state-centroids"><span>State centroids</span></a>
<a id="_316" href="../plot/state-labels"><span>State labels</span></a>
<a id="_317" href="../plot/state-population-change"><span>State population change</span></a>
<a id="_318" href="../plot/static-annotations"><span>Static annotations</span></a>
<a id="_319" href="../plot/stroked-contours"><span>Stroked contours</span></a>
<a id="_320" href="../plot/symbol-channel"><span>Symbol channel</span></a>
<a id="_321" href="../plot/temperature-amplitude"><span>Seattle temperature amplitude</span></a>
<a id="_322" href="../plot/temporal-bar-chart"><span>Temporal bar chart</span></a>
<a id="_323" href="../plot/ternary"><span>Ternary diagrams</span></a>
<a id="_324" href="../plot/text-dodge"><span>Text dodge</span></a>
<a id="_325" href="../plot/text-spiral"><span>Text spiral</span></a>
<a id="_326" href="../plot/this-is-just-to-say"><span>This is just to say</span></a>
<a id="_327" href="../plot/tip-format"><span>Tip format</span></a>
<a id="_328" href="../plot/tips-additional-channels"><span>Interactive tips with additional channels</span></a>
<a id="_329" href="../plot/tips-longer-text"><span>Interactive tips with longer text</span></a>
<a id="_330" href="../plot/tips-paired-channels"><span>Tips, paired channels</span></a>
<a id="_331" href="../plot/tree"><span>Tidy tree (Plot)</span></a>
<a id="_332" href="../plot/trellis-anomaly"><span>Barley Trellis plot with arrows</span></a>
<a id="_333" href="../plot/two-dimensional-faceting"><span>Two-dimensional faceting</span></a>
<a id="_334" href="../plot/unemployment-horizon-chart"><span>Unemployment horizon chart</span></a>
<a id="_335" href="../plot/us-bubble-map"><span>U.S. bubble map</span></a>
<a id="_336" href="../plot/us-spike-map"><span>Spike map</span></a>
<a id="_337" href="../plot/v-counties"><span>V-Counties</span></a>
<a id="_338" href="../plot/variable-fill-area"><span>Variable fill area</span></a>
<a id="_339" href="../plot/vertical-bar-chart"><span>Vertical bar chart</span></a>
<a id="_340" href="../plot/vertical-bars-rotated-labels"><span>Vertical bars, rotated labels</span></a>
<a id="_341" href="../plot/volcano-raster"><span>Volcano raster</span></a>
<a id="_342" href="../plot/voronoi-labels"><span>Voronoi labels</span></a>
<a id="_343" href="../plot/voronoi-map"><span>Voronoi map</span></a>
<a id="_344" href="../plot/voronoi-scatterplot"><span>Voronoi scatterplot</span></a>
<a id="_345" href="../plot/voronoi-treemap"><span>Voronoi treemap</span></a>
<a id="_346" href="../plot/walmart-density"><span>Walmart density</span></a>
<a id="_347" href="../plot/walmart-voronoi"><span>Walmart Voronoi</span></a>
<a id="_348" href="../plot/warming-stripes"><span>Warming stripes</span></a>
<a id="_349" href="../plot/wealth-health-nations"><span>The Wealth & Health of Nations</span></a>
<a id="_350" href="../plot/wiggle-streamgraph"><span>Wiggle streamgraph</span></a>
<a id="_351" href="../plot/wind-map"><span>Wind map</span></a>
<a id="_352" href="../plot/window-and-map"><span>Difference stroke</span></a>
<a id="_353" href="../plot/window-reduce"><span>Plot: window reducers</span></a>
<a id="_354" href="../plot/world-projections"><span>World projections</span></a>
<a id="_355" href="../plot/wrap-tick-labels"><span>Axis with wrapped labels</span></a>
<a id="_356" href="../projections/d3-geo-polygon"><span>d3-geo-polygon</span></a>
<a id="_357" href="../projections/himawari-8"><span>Himawari 8</span></a>
<a id="_358" href="../projections/"><span>Projections</span></a>
<a id="_359" href="../projections/markley"><span>Markley’s tetrahedral map</span></a>
<a id="_360" href="../projections/renner"><span>Renner hemispheric projection</span></a>
<a id="_361" href="../stash/coolprop"><span>Hello, coolprop</span></a>
<a id="_362" href="../support/a-frame"><span>A-frame</span></a>
<a id="_363" href="../support/becker-barley-ssr"><span>Image data loaders</span></a>
<a id="_364" href="../support/dark-mode"><span>Dark mode</span></a>
<a id="_365" href="../support/debouncing-inputs"><span>Debouncing inputs</span></a>
<a id="_366" href="../support/html-inputs"><span>HTML inputs</span></a>
<a id="_367" href="../support/inputs-bind"><span>Inputs.bind</span></a>
<a id="_368" href="../support/mollweide-with-ticks"><span>Mollweide projection with ticks</span></a>
<a id="_369" href="../support/stored-inputs"><span>Stored inputs</span></a>
<a id="_370" href="../topojson/country-topology"><span>Country Topology</span></a>
<a id="_371" href="../topojson/county-topology"><span>County Topology</span></a>
<a id="_372" href="../topojson/hexagon-mesh"><span>Hexagon Mesh</span></a>
<a id="_373" href="../varia/covid-sumeau"><span>Sum’eau (Covid tracker)</span></a>
<a id="_374" href="../varia/lap-jv"><span>The linear assignment problem</span></a>
<a id="_375" href="../varia/pt"><span>pretty-print matrices & tensors</span></a>
<a id="_376" href="../varia/sequence-logos"><span>Sequence Logos</span></a>
<a id="_377" href="../video/ed3RfgPPZ2w"><span>Video: Deploy Framework projects to Observable</span></a>

</div>

~~~js
{
function s(i, d, l) {
  document.querySelector(`#_${i}`).style.backgroundImage = "url(" + (dark ? (d ?? l) : (l ?? d)).href + ")";
}
s(0, FileAttachment("../thumbnail/eurostat-dark.png"), FileAttachment("../thumbnail/eurostat-light.png"))
s(1, FileAttachment("../thumbnail/search-graph-dark.png"), FileAttachment("../thumbnail/search-graph-light.png"))
s(2, FileAttachment("../thumbnail/search-dark.png"), FileAttachment("../thumbnail/search-light.png"))
s(3, FileAttachment("../thumbnail/d3/adaptive-sampling-dark.png"), FileAttachment("../thumbnail/d3/adaptive-sampling-light.png"))
s(4, FileAttachment("../thumbnail/d3/animated-treemap-dark.png"), FileAttachment("../thumbnail/d3/animated-treemap-light.png"))
s(5, FileAttachment("../thumbnail/d3/arc-clock-dark.png"), FileAttachment("../thumbnail/d3/arc-clock-light.png"))
s(6, FileAttachment("../thumbnail/d3/arc-diagram-dark.png"), FileAttachment("../thumbnail/d3/arc-diagram-light.png"))
s(7, FileAttachment("../thumbnail/d3/arc-tween-dark.png"), FileAttachment("../thumbnail/d3/arc-tween-light.png"))
s(8, FileAttachment("../thumbnail/d3/area-chart-missing-data-dark.png"), FileAttachment("../thumbnail/d3/area-chart-missing-data-light.png"))
s(9, FileAttachment("../thumbnail/d3/area-chart-dark.png"), FileAttachment("../thumbnail/d3/area-chart-light.png"))
s(10, FileAttachment("../thumbnail/d3/bar-chart-race-dark.png"), FileAttachment("../thumbnail/d3/bar-chart-race-light.png"))
s(11, FileAttachment("../thumbnail/d3/bar-chart-transitions-dark.png"), FileAttachment("../thumbnail/d3/bar-chart-transitions-light.png"))
s(12, FileAttachment("../thumbnail/d3/bar-chart-dark.png"), FileAttachment("../thumbnail/d3/bar-chart-light.png"))
s(13, FileAttachment("../thumbnail/d3/bivariate-choropleth-dark.png"), FileAttachment("../thumbnail/d3/bivariate-choropleth-light.png"))
s(14, FileAttachment("../thumbnail/d3/brushable-scatterplot-matrix-dark.png"), FileAttachment("../thumbnail/d3/brushable-scatterplot-matrix-light.png"))
s(15, FileAttachment("../thumbnail/d3/brushable-scatterplot-dark.png"), FileAttachment("../thumbnail/d3/brushable-scatterplot-light.png"))
s(16, FileAttachment("../thumbnail/d3/bubble-chart-dark.png"), FileAttachment("../thumbnail/d3/bubble-chart-light.png"))
s(17, FileAttachment("../thumbnail/d3/burtins-antibiotics-dark.png"), FileAttachment("../thumbnail/d3/burtins-antibiotics-light.png"))
s(18, FileAttachment("../thumbnail/d3/candlestick-chart-dark.png"), FileAttachment("../thumbnail/d3/candlestick-chart-light.png"))
s(19, FileAttachment("../thumbnail/d3/cascaded-treemap-dark.png"), FileAttachment("../thumbnail/d3/cascaded-treemap-light.png"))
s(20, FileAttachment("../thumbnail/d3/change-line-chart-dark.png"), FileAttachment("../thumbnail/d3/change-line-chart-light.png"))
s(21, FileAttachment("../thumbnail/d3/chord-dependency-diagram-dark.png"), FileAttachment("../thumbnail/d3/chord-dependency-diagram-light.png"))
s(22, FileAttachment("../thumbnail/d3/chord-diagram-dark.png"), FileAttachment("../thumbnail/d3/chord-diagram-light.png"))
s(23, FileAttachment("../thumbnail/d3/choropleth-dark.png"), FileAttachment("../thumbnail/d3/choropleth-light.png"))
s(24, FileAttachment("../thumbnail/d3/clipped-map-tiles-dark.png"), FileAttachment("../thumbnail/d3/clipped-map-tiles-light.png"))
s(25, FileAttachment("../thumbnail/d3/cluster-dark.png"), FileAttachment("../thumbnail/d3/cluster-light.png"))
s(26, FileAttachment("../thumbnail/d3/collapsible-tree-dark.png"), FileAttachment("../thumbnail/d3/collapsible-tree-light.png"))
s(27, FileAttachment("../thumbnail/d3/connected-scatterplot-dark.png"), FileAttachment("../thumbnail/d3/connected-scatterplot-light.png"))
s(28, FileAttachment("../thumbnail/d3/disjoint-force-directed-graph-dark.png"), FileAttachment("../thumbnail/d3/disjoint-force-directed-graph-light.png"))
s(29, FileAttachment("../thumbnail/d3/diverging-horizon-chart-dark.png"), FileAttachment("../thumbnail/d3/diverging-horizon-chart-light.png"))
s(30, FileAttachment("../thumbnail/d3/donut-chart-dark.png"), FileAttachment("../thumbnail/d3/donut-chart-light.png"))
s(31, FileAttachment("../thumbnail/d3/force-directed-graph-dark.png"), FileAttachment("../thumbnail/d3/force-directed-graph-light.png"))
s(32, FileAttachment("../thumbnail/d3/geodesic-rainbow-dark.png"), FileAttachment("../thumbnail/d3/geodesic-rainbow-light.png"))
s(33, FileAttachment("../thumbnail/d3/geodesic-voronoi-dark.png"), FileAttachment("../thumbnail/d3/geodesic-voronoi-light.png"))
s(34, FileAttachment("../thumbnail/d3/graticule-labels-stereographic-dark.png"), FileAttachment("../thumbnail/d3/graticule-labels-stereographic-light.png"))
s(35, FileAttachment("../thumbnail/d3/hertzsprung-russell-diagram-dark.png"), FileAttachment("../thumbnail/d3/hertzsprung-russell-diagram-light.png"))
s(36, FileAttachment("../thumbnail/d3/hierarchical-edge-bundling-dark.png"), FileAttachment("../thumbnail/d3/hierarchical-edge-bundling-light.png"))
s(37, FileAttachment("../thumbnail/d3/horizon-chart-dark.png"), FileAttachment("../thumbnail/d3/horizon-chart-light.png"))
s(38, FileAttachment("../thumbnail/d3/icicle-dark.png"), FileAttachment("../thumbnail/d3/icicle-light.png"))
s(39, FileAttachment("../thumbnail/d3/impact-of-vaccines-dark.png"), FileAttachment("../thumbnail/d3/impact-of-vaccines-light.png"))
s(40, FileAttachment("../thumbnail/d3/index-chart-dark.png"), FileAttachment("../thumbnail/d3/index-chart-light.png"))
s(41, FileAttachment("../thumbnail/d3/inline-labels-dark.png"), FileAttachment("../thumbnail/d3/inline-labels-light.png"))
s(42, FileAttachment("../thumbnail/d3/line-chart-dark.png"), FileAttachment("../thumbnail/d3/line-chart-light.png"))
s(43, FileAttachment("../thumbnail/d3/line-with-tooltip-dark.png"), FileAttachment("../thumbnail/d3/line-with-tooltip-light.png"))
s(44, FileAttachment("../thumbnail/d3/mobile-patent-suits-dark.png"), FileAttachment("../thumbnail/d3/mobile-patent-suits-light.png"))
s(45, FileAttachment("../thumbnail/d3/moving-average-dark.png"), FileAttachment("../thumbnail/d3/moving-average-light.png"))
s(46, FileAttachment("../thumbnail/d3/multi-line-chart-dark.png"), FileAttachment("../thumbnail/d3/multi-line-chart-light.png"))
s(47, FileAttachment("../thumbnail/d3/nested-treemap-dark.png"), FileAttachment("../thumbnail/d3/nested-treemap-light.png"))
s(48, FileAttachment("../thumbnail/d3/new-zealand-tourists-1921-2018-dark.png"), FileAttachment("../thumbnail/d3/new-zealand-tourists-1921-2018-light.png"))
s(49, FileAttachment("../thumbnail/d3/non-contiguous-cartogram-dark.png"), FileAttachment("../thumbnail/d3/non-contiguous-cartogram-light.png"))
s(50, FileAttachment("../thumbnail/d3/normal-quantile-plot-dark.png"), FileAttachment("../thumbnail/d3/normal-quantile-plot-light.png"))
s(51, FileAttachment("../thumbnail/d3/occlusion-dark.png"), FileAttachment("../thumbnail/d3/occlusion-light.png"))
s(52, FileAttachment("../thumbnail/d3/pack-dark.png"), FileAttachment("../thumbnail/d3/pack-light.png"))
s(53, FileAttachment("../thumbnail/d3/pie-chart-update-dark.png"), FileAttachment("../thumbnail/d3/pie-chart-update-light.png"))
s(54, FileAttachment("../thumbnail/d3/pie-chart-dark.png"), FileAttachment("../thumbnail/d3/pie-chart-light.png"))
s(55, FileAttachment("../thumbnail/d3/polar-clock-dark.png"), FileAttachment("../thumbnail/d3/polar-clock-light.png"))
s(56, FileAttachment("../thumbnail/d3/psr-b1919-21-dark.png"), FileAttachment("../thumbnail/d3/psr-b1919-21-light.png"))
s(57, FileAttachment("../thumbnail/d3/qq-plot-dark.png"), FileAttachment("../thumbnail/d3/qq-plot-light.png"))
s(58, FileAttachment("../thumbnail/d3/radial-area-chart-dark.png"), FileAttachment("../thumbnail/d3/radial-area-chart-light.png"))
s(59, FileAttachment("../thumbnail/d3/radial-cluster-dark.png"), FileAttachment("../thumbnail/d3/radial-cluster-light.png"))
s(60, FileAttachment("../thumbnail/d3/radial-tree-dark.png"), FileAttachment("../thumbnail/d3/radial-tree-light.png"))
s(61, FileAttachment("../thumbnail/d3/random-tree-dark.png"), FileAttachment("../thumbnail/d3/random-tree-light.png"))
s(62, FileAttachment("../thumbnail/d3/ridgeline-plot-dark.png"), FileAttachment("../thumbnail/d3/ridgeline-plot-light.png"))
s(63, FileAttachment("../thumbnail/d3/sankey-dark.png"), FileAttachment("../thumbnail/d3/sankey-light.png"))
s(64, FileAttachment("../thumbnail/d3/solar-terminator-dark.png"), FileAttachment("../thumbnail/d3/solar-terminator-light.png"))
s(65, FileAttachment("../thumbnail/d3/spherical-alpha-shapes-dark.png"), FileAttachment("../thumbnail/d3/spherical-alpha-shapes-light.png"))
s(66, FileAttachment("../thumbnail/d3/spilhaus-shoreline-map-dark.png"), FileAttachment("../thumbnail/d3/spilhaus-shoreline-map-light.png"))
s(67, FileAttachment("../thumbnail/d3/splom-dark.png"), FileAttachment("../thumbnail/d3/splom-light.png"))
s(68, FileAttachment("../thumbnail/d3/star-map-dark.png"), FileAttachment("../thumbnail/d3/star-map-light.png"))
s(69, FileAttachment("../thumbnail/d3/streaming-shapefiles-dark.png"), FileAttachment("../thumbnail/d3/streaming-shapefiles-light.png"))
s(70, FileAttachment("../thumbnail/d3/sunburst-dark.png"), FileAttachment("../thumbnail/d3/sunburst-light.png"))
s(71, FileAttachment("../thumbnail/d3/tree-of-life-dark.png"), FileAttachment("../thumbnail/d3/tree-of-life-light.png"))
s(72, FileAttachment("../thumbnail/d3/tree-dark.png"), FileAttachment("../thumbnail/d3/tree-light.png"))
s(73, FileAttachment("../thumbnail/d3/treemap-dark.png"), FileAttachment("../thumbnail/d3/treemap-light.png"))
s(74, FileAttachment("../thumbnail/d3/vector-tiles-dark.png"), FileAttachment("../thumbnail/d3/vector-tiles-light.png"))
s(75, FileAttachment("../thumbnail/d3/versor-dragging-dark.png"), FileAttachment("../thumbnail/d3/versor-dragging-light.png"))
s(76, FileAttachment("../thumbnail/d3/voronoi-labels-dark.png"), FileAttachment("../thumbnail/d3/voronoi-labels-light.png"))
s(77, FileAttachment("../thumbnail/d3/voronoi-stippling-dark.png"), FileAttachment("../thumbnail/d3/voronoi-stippling-light.png"))
s(78, FileAttachment("../thumbnail/d3/walmarts-growth-tree-dark.png"), FileAttachment("../thumbnail/d3/walmarts-growth-tree-light.png"))
s(79, FileAttachment("../thumbnail/d3/walmarts-growth-dark.png"), FileAttachment("../thumbnail/d3/walmarts-growth-light.png"))
s(80, FileAttachment("../thumbnail/d3/wordcloud-dark.png"), FileAttachment("../thumbnail/d3/wordcloud-light.png"))
s(81, FileAttachment("../thumbnail/d3/world-airports-voronoi-dark.png"), FileAttachment("../thumbnail/d3/world-airports-voronoi-light.png"))
s(82, FileAttachment("../thumbnail/d3/world-tour-dark.png"), FileAttachment("../thumbnail/d3/world-tour-light.png"))
s(83, FileAttachment("../thumbnail/d3/zoomable-bar-chart-dark.png"), FileAttachment("../thumbnail/d3/zoomable-bar-chart-light.png"))
s(84, FileAttachment("../thumbnail/d3/zoomable-icicle-dark.png"), FileAttachment("../thumbnail/d3/zoomable-icicle-light.png"))
s(85, FileAttachment("../thumbnail/d3/zoomable-sunburst-dark.png"), FileAttachment("../thumbnail/d3/zoomable-sunburst-light.png"))
s(86, FileAttachment("../thumbnail/d3/zoomable-treemap-dark.png"), FileAttachment("../thumbnail/d3/zoomable-treemap-light.png"))
s(87, FileAttachment("../thumbnail/duckdb/histogram-dark.png"), FileAttachment("../thumbnail/duckdb/histogram-light.png"))
s(88, FileAttachment("../thumbnail/examples/netcdf-dark.png"), FileAttachment("../thumbnail/examples/netcdf-light.png"))
s(89, FileAttachment("../thumbnail/loaders/email-timestamps-dark.png"), FileAttachment("../thumbnail/loaders/email-timestamps-light.png"))
s(90, FileAttachment("../thumbnail/loaders/google-sheets-dark.png"), FileAttachment("../thumbnail/loaders/google-sheets-light.png"))
s(91, FileAttachment("../thumbnail/loaders/greek-youth-dark.png"), FileAttachment("../thumbnail/loaders/greek-youth-light.png"))
s(92, FileAttachment("../thumbnail/party/4-color-clingo-dark.png"), FileAttachment("../thumbnail/party/4-color-clingo-light.png"))
s(93, FileAttachment("../thumbnail/party/arrow2parquet-dark.png"), FileAttachment("../thumbnail/party/arrow2parquet-light.png"))
s(94, FileAttachment("../thumbnail/party/bitcoin-transaction-size-dark.png"), FileAttachment("../thumbnail/party/bitcoin-transaction-size-light.png"))
s(95, FileAttachment("../thumbnail/party/blue-comments-dark.png"), FileAttachment("../thumbnail/party/blue-comments-light.png"))
s(96, FileAttachment("../thumbnail/party/deck.gl-map-dark.png"), FileAttachment("../thumbnail/party/deck.gl-map-light.png"))
s(97, FileAttachment("../thumbnail/party/deck.gl-dark.png"), FileAttachment("../thumbnail/party/deck.gl-light.png"))
s(98, FileAttachment("../thumbnail/party/dobbyscan-dark.png"), FileAttachment("../thumbnail/party/dobbyscan-light.png"))
s(99, FileAttachment("../thumbnail/party/duckdb-spatial-dark.png"), FileAttachment("../thumbnail/party/duckdb-spatial-light.png"))
s(100, FileAttachment("../thumbnail/party/duckdb-dark.png"), FileAttachment("../thumbnail/party/duckdb-light.png"))
s(101, FileAttachment("../thumbnail/party/earcut-dark.png"), FileAttachment("../thumbnail/party/earcut-light.png"))
s(102, FileAttachment("../thumbnail/party/geocontour-dark.png"), FileAttachment("../thumbnail/party/geocontour-light.png"))
s(103, FileAttachment("../thumbnail/party/geotiff-dark.png"), FileAttachment("../thumbnail/party/geotiff-light.png"))
s(104, FileAttachment("../thumbnail/party/geotoolbox-dark.png"), FileAttachment("../thumbnail/party/geotoolbox-light.png"))
s(105, FileAttachment("../thumbnail/party/google-sheets-dark.png"), FileAttachment("../thumbnail/party/google-sheets-light.png"))
s(106, FileAttachment("../thumbnail/party/graphviz-connected-clusters-dark.png"), FileAttachment("../thumbnail/party/graphviz-connected-clusters-light.png"))
s(107, FileAttachment("../thumbnail/party/greenlet-dark.png"), FileAttachment("../thumbnail/party/greenlet-light.png"))
s(108, FileAttachment("../thumbnail/party/highcharts-dark.png"), FileAttachment("../thumbnail/party/highcharts-light.png"))
s(109, FileAttachment("../thumbnail/party/hljs-dark.png"), FileAttachment("../thumbnail/party/hljs-light.png"))
s(110, FileAttachment("../thumbnail/party/hyparquet-dark.png"), FileAttachment("../thumbnail/party/hyparquet-light.png"))
s(111, FileAttachment("../thumbnail/party/interactive-jsx-dark.png"), FileAttachment("../thumbnail/party/interactive-jsx-light.png"))
s(112, FileAttachment("../thumbnail/party/jszip-dark.png"), FileAttachment("../thumbnail/party/jszip-light.png"))
s(113, FileAttachment("../thumbnail/party/mandelbrot-dark.png"), FileAttachment("../thumbnail/party/mandelbrot-light.png"))
s(114, FileAttachment("../thumbnail/party/maplibre-gl-dark.png"), FileAttachment("../thumbnail/party/maplibre-gl-light.png"))
s(115, FileAttachment("../thumbnail/party/markdown-it-dark.png"), FileAttachment("../thumbnail/party/markdown-it-light.png"))
s(116, FileAttachment("../thumbnail/party/mhchem-dark.png"), FileAttachment("../thumbnail/party/mhchem-light.png"))
s(117, FileAttachment("../thumbnail/party/ml-matrix-dark.png"), FileAttachment("../thumbnail/party/ml-matrix-light.png"))
s(118, FileAttachment("../thumbnail/party/mosaic-flights-dark.png"), FileAttachment("../thumbnail/party/mosaic-flights-light.png"))
s(119, FileAttachment("../thumbnail/party/mosaic-nyc-taxi-rides-dark.png"), FileAttachment("../thumbnail/party/mosaic-nyc-taxi-rides-light.png"))
s(120, FileAttachment("../thumbnail/party/navio-dark.png"), FileAttachment("../thumbnail/party/navio-light.png"))
s(121, FileAttachment("../thumbnail/party/p5-dark.png"), FileAttachment("../thumbnail/party/p5-light.png"))
s(122, FileAttachment("../thumbnail/party/plotly-dark.png"), FileAttachment("../thumbnail/party/plotly-light.png"))
s(123, FileAttachment("../thumbnail/party/polylabel-dark.png"), FileAttachment("../thumbnail/party/polylabel-light.png"))
s(124, FileAttachment("../thumbnail/party/roughviz-dark.png"), FileAttachment("../thumbnail/party/roughviz-light.png"))
s(125, FileAttachment("../thumbnail/party/sda-dark.png"), FileAttachment("../thumbnail/party/sda-light.png"))
s(126, FileAttachment("../thumbnail/party/surge-dark.png"), FileAttachment("../thumbnail/party/surge-light.png"))
s(127, FileAttachment("../thumbnail/party/three-dark.png"), FileAttachment("../thumbnail/party/three-light.png"))
s(128, FileAttachment("../thumbnail/party/vega-lite-tooltips-dark.png"), FileAttachment("../thumbnail/party/vega-lite-tooltips-light.png"))
s(129, FileAttachment("../thumbnail/party/webr-dark.png"), FileAttachment("../thumbnail/party/webr-light.png"))
s(130, FileAttachment("../thumbnail/party/wikidata-dark.png"), FileAttachment("../thumbnail/party/wikidata-light.png"))
s(131, FileAttachment("../thumbnail/plot/albers-usa-dark.png"), FileAttachment("../thumbnail/plot/albers-usa-light.png"))
s(132, FileAttachment("../thumbnail/plot/anscombes-quartet-dark.png"), FileAttachment("../thumbnail/plot/anscombes-quartet-light.png"))
s(133, FileAttachment("../thumbnail/plot/apportionment-of-seats-in-the-ep-dark.png"), FileAttachment("../thumbnail/plot/apportionment-of-seats-in-the-ep-light.png"))
s(134, FileAttachment("../thumbnail/plot/arc-diagram-dark.png"), FileAttachment("../thumbnail/plot/arc-diagram-light.png"))
s(135, FileAttachment("../thumbnail/plot/area-chart-gradient-dark.png"), FileAttachment("../thumbnail/plot/area-chart-gradient-light.png"))
s(136, FileAttachment("../thumbnail/plot/area-chart-missing-data-dark.png"), FileAttachment("../thumbnail/plot/area-chart-missing-data-light.png"))
s(137, FileAttachment("../thumbnail/plot/area-chart-dark.png"), FileAttachment("../thumbnail/plot/area-chart-light.png"))
s(138, FileAttachment("../thumbnail/plot/arealiney-custom-mark-dark.png"), FileAttachment("../thumbnail/plot/arealiney-custom-mark-light.png"))
s(139, FileAttachment("../thumbnail/plot/arrow-variation-chart-dark.png"), FileAttachment("../thumbnail/plot/arrow-variation-chart-light.png"))
s(140, FileAttachment("../thumbnail/plot/auto-mark-heatmap-dark.png"), FileAttachment("../thumbnail/plot/auto-mark-heatmap-light.png"))
s(141, FileAttachment("../thumbnail/plot/background-image-dark.png"), FileAttachment("../thumbnail/plot/background-image-light.png"))
s(142, FileAttachment("../thumbnail/plot/band-chart-with-rule-dark.png"), FileAttachment("../thumbnail/plot/band-chart-with-rule-light.png"))
s(143, FileAttachment("../thumbnail/plot/bar-and-tick-dark.png"), FileAttachment("../thumbnail/plot/bar-and-tick-light.png"))
s(144, FileAttachment("../thumbnail/plot/barcode-dark.png"), FileAttachment("../thumbnail/plot/barcode-light.png"))
s(145, FileAttachment("../thumbnail/plot/barley-trellis-dark.png"), FileAttachment("../thumbnail/plot/barley-trellis-light.png"))
s(146, FileAttachment("../thumbnail/plot/beagle-voyage-dark.png"), FileAttachment("../thumbnail/plot/beagle-voyage-light.png"))
s(147, FileAttachment("../thumbnail/plot/binned-box-plot-dark.png"), FileAttachment("../thumbnail/plot/binned-box-plot-light.png"))
s(148, FileAttachment("../thumbnail/plot/bivariate-choropleth-dark.png"), FileAttachment("../thumbnail/plot/bivariate-choropleth-light.png"))
s(149, FileAttachment("../thumbnail/plot/blurred-contours-dark.png"), FileAttachment("../thumbnail/plot/blurred-contours-light.png"))
s(150, FileAttachment("../thumbnail/plot/bollinger-bands-dark.png"), FileAttachment("../thumbnail/plot/bollinger-bands-light.png"))
s(151, FileAttachment("../thumbnail/plot/bullet-graph-dark.png"), FileAttachment("../thumbnail/plot/bullet-graph-light.png"))
s(152, FileAttachment("../thumbnail/plot/calendar-dark.png"), FileAttachment("../thumbnail/plot/calendar-light.png"))
s(153, FileAttachment("../thumbnail/plot/caltrain-schedule-dark.png"), FileAttachment("../thumbnail/plot/caltrain-schedule-light.png"))
s(154, FileAttachment("../thumbnail/plot/cancer-survival-rates-dark.png"), FileAttachment("../thumbnail/plot/cancer-survival-rates-light.png"))
s(155, FileAttachment("../thumbnail/plot/candlestick-chart-dark.png"), FileAttachment("../thumbnail/plot/candlestick-chart-light.png"))
s(156, FileAttachment("../thumbnail/plot/centroid-dot-dark.png"), FileAttachment("../thumbnail/plot/centroid-dot-light.png"))
s(157, FileAttachment("../thumbnail/plot/centroid-hexbin-dark.png"), FileAttachment("../thumbnail/plot/centroid-hexbin-light.png"))
s(158, FileAttachment("../thumbnail/plot/centroid-voronoi-dark.png"), FileAttachment("../thumbnail/plot/centroid-voronoi-light.png"))
s(159, FileAttachment("../thumbnail/plot/choropleth-dark.png"), FileAttachment("../thumbnail/plot/choropleth-light.png"))
s(160, FileAttachment("../thumbnail/plot/civilizations-timeline-dark.png"), FileAttachment("../thumbnail/plot/civilizations-timeline-light.png"))
s(161, FileAttachment("../thumbnail/plot/cluster-diagram-dark.png"), FileAttachment("../thumbnail/plot/cluster-diagram-light.png"))
s(162, FileAttachment("../thumbnail/plot/color-crosshair-dark.png"), FileAttachment("../thumbnail/plot/color-crosshair-light.png"))
s(163, FileAttachment("../thumbnail/plot/color-scatterplot-dark.png"), FileAttachment("../thumbnail/plot/color-scatterplot-light.png"))
s(164, FileAttachment("../thumbnail/plot/connected-scatterplot-dark.png"), FileAttachment("../thumbnail/plot/connected-scatterplot-light.png"))
s(165, FileAttachment("../thumbnail/plot/continuous-dimensions-heatmap-dark.png"), FileAttachment("../thumbnail/plot/continuous-dimensions-heatmap-light.png"))
s(166, FileAttachment("../thumbnail/plot/contours-projection-dark.png"), FileAttachment("../thumbnail/plot/contours-projection-light.png"))
s(167, FileAttachment("../thumbnail/plot/correlation-heatmap-dark.png"), FileAttachment("../thumbnail/plot/correlation-heatmap-light.png"))
s(168, FileAttachment("../thumbnail/plot/county-boxes-dark.png"), FileAttachment("../thumbnail/plot/county-boxes-light.png"))
s(169, FileAttachment("../thumbnail/plot/crimean-war-bary-dark.png"), FileAttachment("../thumbnail/plot/crimean-war-bary-light.png"))
s(170, FileAttachment("../thumbnail/plot/crimean-war-recty-dark.png"), FileAttachment("../thumbnail/plot/crimean-war-recty-light.png"))
s(171, FileAttachment("../thumbnail/plot/crosshair-dark.png"), FileAttachment("../thumbnail/plot/crosshair-light.png"))
s(172, FileAttachment("../thumbnail/plot/crosshairx-dark.png"), FileAttachment("../thumbnail/plot/crosshairx-light.png"))
s(173, FileAttachment("../thumbnail/plot/cumulative-distribution-of-poverty-dark.png"), FileAttachment("../thumbnail/plot/cumulative-distribution-of-poverty-light.png"))
s(174, FileAttachment("../thumbnail/plot/cumulative-histogram-dark.png"), FileAttachment("../thumbnail/plot/cumulative-histogram-light.png"))
s(175, FileAttachment("../thumbnail/plot/data-based-axis-dark.png"), FileAttachment("../thumbnail/plot/data-based-axis-light.png"))
s(176, FileAttachment("../thumbnail/plot/datawrapper-style-date-axis-dark.png"), FileAttachment("../thumbnail/plot/datawrapper-style-date-axis-light.png"))
s(177, FileAttachment("../thumbnail/plot/delaunay-hull-dark.png"), FileAttachment("../thumbnail/plot/delaunay-hull-light.png"))
s(178, FileAttachment("../thumbnail/plot/delaunay-links-dark.png"), FileAttachment("../thumbnail/plot/delaunay-links-light.png"))
s(179, FileAttachment("../thumbnail/plot/density-estimation-dark.png"), FileAttachment("../thumbnail/plot/density-estimation-light.png"))
s(180, FileAttachment("../thumbnail/plot/density-faceted-dark.png"), FileAttachment("../thumbnail/plot/density-faceted-light.png"))
s(181, FileAttachment("../thumbnail/plot/density-options-dark.png"), FileAttachment("../thumbnail/plot/density-options-light.png"))
s(182, FileAttachment("../thumbnail/plot/density-stroke-dark.png"), FileAttachment("../thumbnail/plot/density-stroke-light.png"))
s(183, FileAttachment("../thumbnail/plot/density-weighted-dark.png"), FileAttachment("../thumbnail/plot/density-weighted-light.png"))
s(184, FileAttachment("../thumbnail/plot/difference-arrows-dark.png"), FileAttachment("../thumbnail/plot/difference-arrows-light.png"))
s(185, FileAttachment("../thumbnail/plot/difference-chart-dark.png"), FileAttachment("../thumbnail/plot/difference-chart-light.png"))
s(186, FileAttachment("../thumbnail/plot/diverging-color-scatterplot-dark.png"), FileAttachment("../thumbnail/plot/diverging-color-scatterplot-light.png"))
s(187, FileAttachment("../thumbnail/plot/diverging-stacked-bar-dark.png"), FileAttachment("../thumbnail/plot/diverging-stacked-bar-light.png"))
s(188, FileAttachment("../thumbnail/plot/dodge-cars-dark.png"), FileAttachment("../thumbnail/plot/dodge-cars-light.png"))
s(189, FileAttachment("../thumbnail/plot/dodge-penguins-dark.png"), FileAttachment("../thumbnail/plot/dodge-penguins-light.png"))
s(190, FileAttachment("../thumbnail/plot/dot-heatmap-dark.png"), FileAttachment("../thumbnail/plot/dot-heatmap-light.png"))
s(191, FileAttachment("../thumbnail/plot/dot-histogram-dark.png"), FileAttachment("../thumbnail/plot/dot-histogram-light.png"))
s(192, FileAttachment("../thumbnail/plot/dot-plot-dark.png"), FileAttachment("../thumbnail/plot/dot-plot-light.png"))
s(193, FileAttachment("../thumbnail/plot/dot-sort-dark.png"), FileAttachment("../thumbnail/plot/dot-sort-light.png"))
s(194, FileAttachment("../thumbnail/plot/dow-jones-calendar-dark.png"), FileAttachment("../thumbnail/plot/dow-jones-calendar-light.png"))
s(195, FileAttachment("../thumbnail/plot/earthquake-globe-dark.png"), FileAttachment("../thumbnail/plot/earthquake-globe-light.png"))
s(196, FileAttachment("../thumbnail/plot/eld-viewer-dark.png"), FileAttachment("../thumbnail/plot/eld-viewer-light.png"))
s(197, FileAttachment("../thumbnail/plot/election-wind-map-dark.png"), FileAttachment("../thumbnail/plot/election-wind-map-light.png"))
s(198, FileAttachment("../thumbnail/plot/facet-lollipop-dark.png"), FileAttachment("../thumbnail/plot/facet-lollipop-light.png"))
s(199, FileAttachment("../thumbnail/plot/facet-wrap-dark.png"), FileAttachment("../thumbnail/plot/facet-wrap-light.png"))
s(200, FileAttachment("../thumbnail/plot/faceted-areas-dark.png"), FileAttachment("../thumbnail/plot/faceted-areas-light.png"))
s(201, FileAttachment("../thumbnail/plot/faceted-function-contour-dark.png"), FileAttachment("../thumbnail/plot/faceted-function-contour-light.png"))
s(202, FileAttachment("../thumbnail/plot/filled-contours-dark.png"), FileAttachment("../thumbnail/plot/filled-contours-light.png"))
s(203, FileAttachment("../thumbnail/plot/finite-state-machine-dark.png"), FileAttachment("../thumbnail/plot/finite-state-machine-light.png"))
s(204, FileAttachment("../thumbnail/plot/floor-plan-dark.png"), FileAttachment("../thumbnail/plot/floor-plan-light.png"))
s(205, FileAttachment("../thumbnail/plot/function-contour-2-dark.png"), FileAttachment("../thumbnail/plot/function-contour-2-light.png"))
s(206, FileAttachment("../thumbnail/plot/function-contour-dark.png"), FileAttachment("../thumbnail/plot/function-contour-light.png"))
s(207, FileAttachment("../thumbnail/plot/ggplot2-style-axes-dark.png"), FileAttachment("../thumbnail/plot/ggplot2-style-axes-light.png"))
s(208, FileAttachment("../thumbnail/plot/gradient-bars-dark.png"), FileAttachment("../thumbnail/plot/gradient-bars-light.png"))
s(209, FileAttachment("../thumbnail/plot/gradient-encoding-dark.png"), FileAttachment("../thumbnail/plot/gradient-encoding-light.png"))
s(210, FileAttachment("../thumbnail/plot/grid-choropleth-dark.png"), FileAttachment("../thumbnail/plot/grid-choropleth-light.png"))
s(211, FileAttachment("../thumbnail/plot/grouped-bar-chart-dark.png"), FileAttachment("../thumbnail/plot/grouped-bar-chart-light.png"))
s(212, FileAttachment("../thumbnail/plot/hexbin-binwidth-dark.png"), FileAttachment("../thumbnail/plot/hexbin-binwidth-light.png"))
s(213, FileAttachment("../thumbnail/plot/hexbin-map-dark.png"), FileAttachment("../thumbnail/plot/hexbin-map-light.png"))
s(214, FileAttachment("../thumbnail/plot/hexbin-text-dark.png"), FileAttachment("../thumbnail/plot/hexbin-text-light.png"))
s(215, FileAttachment("../thumbnail/plot/highlighted-bin-dark.png"), FileAttachment("../thumbnail/plot/highlighted-bin-light.png"))
s(216, FileAttachment("../thumbnail/plot/horizon-dark.png"), FileAttachment("../thumbnail/plot/horizon-light.png"))
s(217, FileAttachment("../thumbnail/plot/horizontal-bar-chart-with-label-dark.png"), FileAttachment("../thumbnail/plot/horizontal-bar-chart-with-label-light.png"))
s(218, FileAttachment("../thumbnail/plot/horizontal-bar-chart-dark.png"), FileAttachment("../thumbnail/plot/horizontal-bar-chart-light.png"))
s(219, FileAttachment("../thumbnail/plot/horizontal-stacked-bars-dark.png"), FileAttachment("../thumbnail/plot/horizontal-stacked-bars-light.png"))
s(220, FileAttachment("../thumbnail/plot/igrf90-contours-dark.png"), FileAttachment("../thumbnail/plot/igrf90-contours-light.png"))
s(221, FileAttachment("../thumbnail/plot/image-dodge-dark.png"), FileAttachment("../thumbnail/plot/image-dodge-light.png"))
s(222, FileAttachment("../thumbnail/plot/image-medals-dark.png"), FileAttachment("../thumbnail/plot/image-medals-light.png"))
s(223, FileAttachment("../thumbnail/plot/image-scatterplot-2-dark.png"), FileAttachment("../thumbnail/plot/image-scatterplot-2-light.png"))
s(224, FileAttachment("../thumbnail/plot/image-scatterplot-dark.png"), FileAttachment("../thumbnail/plot/image-scatterplot-light.png"))
s(225, FileAttachment("../thumbnail/plot/imago-projection-dark.png"), FileAttachment("../thumbnail/plot/imago-projection-light.png"))
s(226, FileAttachment("../thumbnail/plot/impact-of-vaccines-dark.png"), FileAttachment("../thumbnail/plot/impact-of-vaccines-light.png"))
s(227, FileAttachment("../thumbnail/plot/indented-tree-dark.png"), FileAttachment("../thumbnail/plot/indented-tree-light.png"))
s(228, FileAttachment("../thumbnail/plot/index-chart-dark.png"), FileAttachment("../thumbnail/plot/index-chart-light.png"))
s(229, FileAttachment("../thumbnail/plot/interpolate-flood-dark.png"), FileAttachment("../thumbnail/plot/interpolate-flood-light.png"))
s(230, FileAttachment("../thumbnail/plot/isotype-dark.png"), FileAttachment("../thumbnail/plot/isotype-light.png"))
s(231, FileAttachment("../thumbnail/plot/job-vacancies-dark.png"), FileAttachment("../thumbnail/plot/job-vacancies-light.png"))
s(232, FileAttachment("../thumbnail/plot/labeled-multi-line-chart-dark.png"), FileAttachment("../thumbnail/plot/labeled-multi-line-chart-light.png"))
s(233, FileAttachment("../thumbnail/plot/labelled-horizontal-bar-chart-variants-dark.png"), FileAttachment("../thumbnail/plot/labelled-horizontal-bar-chart-variants-light.png"))
s(234, FileAttachment("../thumbnail/plot/lebron-james-shots-dark.png"), FileAttachment("../thumbnail/plot/lebron-james-shots-light.png"))
s(235, FileAttachment("../thumbnail/plot/line-chart-interactive-tip-dark.png"), FileAttachment("../thumbnail/plot/line-chart-interactive-tip-light.png"))
s(236, FileAttachment("../thumbnail/plot/line-chart-percent-change-dark.png"), FileAttachment("../thumbnail/plot/line-chart-percent-change-light.png"))
s(237, FileAttachment("../thumbnail/plot/line-chart-with-gaps-dark.png"), FileAttachment("../thumbnail/plot/line-chart-with-gaps-light.png"))
s(238, FileAttachment("../thumbnail/plot/line-chart-with-markers-dark.png"), FileAttachment("../thumbnail/plot/line-chart-with-markers-light.png"))
s(239, FileAttachment("../thumbnail/plot/line-with-moving-average-dark.png"), FileAttachment("../thumbnail/plot/line-with-moving-average-light.png"))
s(240, FileAttachment("../thumbnail/plot/linear-regression-simpson-dark.png"), FileAttachment("../thumbnail/plot/linear-regression-simpson-light.png"))
s(241, FileAttachment("../thumbnail/plot/liquid-flow-velocity-dark.png"), FileAttachment("../thumbnail/plot/liquid-flow-velocity-light.png"))
s(242, FileAttachment("../thumbnail/plot/log-heatmap-dark.png"), FileAttachment("../thumbnail/plot/log-heatmap-light.png"))
s(243, FileAttachment("../thumbnail/plot/lollipop-dark.png"), FileAttachment("../thumbnail/plot/lollipop-light.png"))
s(244, FileAttachment("../thumbnail/plot/london-facets-dark.png"), FileAttachment("../thumbnail/plot/london-facets-light.png"))
s(245, FileAttachment("../thumbnail/plot/major-and-minor-axis-ticks-dark.png"), FileAttachment("../thumbnail/plot/major-and-minor-axis-ticks-light.png"))
s(246, FileAttachment("../thumbnail/plot/mandelbrot-set-dark.png"), FileAttachment("../thumbnail/plot/mandelbrot-set-light.png"))
s(247, FileAttachment("../thumbnail/plot/map-small-multiples-dark.png"), FileAttachment("../thumbnail/plot/map-small-multiples-light.png"))
s(248, FileAttachment("../thumbnail/plot/map-tips-dark.png"), FileAttachment("../thumbnail/plot/map-tips-light.png"))
s(249, FileAttachment("../thumbnail/plot/mareys-trains-dark.png"), FileAttachment("../thumbnail/plot/mareys-trains-light.png"))
s(250, FileAttachment("../thumbnail/plot/marimekko-dark.png"), FileAttachment("../thumbnail/plot/marimekko-light.png"))
s(251, FileAttachment("../thumbnail/plot/multi-series-line-chart-interactive-tips-dark.png"), FileAttachment("../thumbnail/plot/multi-series-line-chart-interactive-tips-light.png"))
s(252, FileAttachment("../thumbnail/plot/multiple-line-chart-dark.png"), FileAttachment("../thumbnail/plot/multiple-line-chart-light.png"))
s(253, FileAttachment("../thumbnail/plot/non-faceted-marks-dark.png"), FileAttachment("../thumbnail/plot/non-faceted-marks-light.png"))
s(254, FileAttachment("../thumbnail/plot/non-overlapping-density-regions-dark.png"), FileAttachment("../thumbnail/plot/non-overlapping-density-regions-light.png"))
s(255, FileAttachment("../thumbnail/plot/non-temporal-line-chart-dark.png"), FileAttachment("../thumbnail/plot/non-temporal-line-chart-light.png"))
s(256, FileAttachment("../thumbnail/plot/normal-histogram-dark.png"), FileAttachment("../thumbnail/plot/normal-histogram-light.png"))
s(257, FileAttachment("../thumbnail/plot/normalized-stack-dark.png"), FileAttachment("../thumbnail/plot/normalized-stack-light.png"))
s(258, FileAttachment("../thumbnail/plot/nyt-style-axes-dark.png"), FileAttachment("../thumbnail/plot/nyt-style-axes-light.png"))
s(259, FileAttachment("../thumbnail/plot/olympians-density-dark.png"), FileAttachment("../thumbnail/plot/olympians-density-light.png"))
s(260, FileAttachment("../thumbnail/plot/olympians-grouped-bar-chart-dark.png"), FileAttachment("../thumbnail/plot/olympians-grouped-bar-chart-light.png"))
s(261, FileAttachment("../thumbnail/plot/olympians-hexbin-dark.png"), FileAttachment("../thumbnail/plot/olympians-hexbin-light.png"))
s(262, FileAttachment("../thumbnail/plot/one-dimensional-crosshair-dark.png"), FileAttachment("../thumbnail/plot/one-dimensional-crosshair-light.png"))
s(263, FileAttachment("../thumbnail/plot/one-dimensional-density-dark.png"), FileAttachment("../thumbnail/plot/one-dimensional-density-light.png"))
s(264, FileAttachment("../thumbnail/plot/one-dimensional-pointing-dark.png"), FileAttachment("../thumbnail/plot/one-dimensional-pointing-light.png"))
s(265, FileAttachment("../thumbnail/plot/ordinal-bar-chart-dark.png"), FileAttachment("../thumbnail/plot/ordinal-bar-chart-light.png"))
s(266, FileAttachment("../thumbnail/plot/ordinal-scale-interval-dark.png"), FileAttachment("../thumbnail/plot/ordinal-scale-interval-light.png"))
s(267, FileAttachment("../thumbnail/plot/ordinal-scatterplot-dark.png"), FileAttachment("../thumbnail/plot/ordinal-scatterplot-light.png"))
s(268, FileAttachment("../thumbnail/plot/overlapping-density-estimations-dark.png"), FileAttachment("../thumbnail/plot/overlapping-density-estimations-light.png"))
s(269, FileAttachment("../thumbnail/plot/overlapping-histogram-dark.png"), FileAttachment("../thumbnail/plot/overlapping-histogram-light.png"))
s(270, FileAttachment("../thumbnail/plot/parcoords-dark.png"), FileAttachment("../thumbnail/plot/parcoords-light.png"))
s(271, FileAttachment("../thumbnail/plot/percentogram-dark.png"), FileAttachment("../thumbnail/plot/percentogram-light.png"))
s(272, FileAttachment("../thumbnail/plot/perlin-noise-dark.png"), FileAttachment("../thumbnail/plot/perlin-noise-light.png"))
s(273, FileAttachment("../thumbnail/plot/phases-of-the-moon-dark.png"), FileAttachment("../thumbnail/plot/phases-of-the-moon-light.png"))
s(274, FileAttachment("../thumbnail/plot/planar-vs-spherical-voronoi-dark.png"), FileAttachment("../thumbnail/plot/planar-vs-spherical-voronoi-light.png"))
s(275, FileAttachment("../thumbnail/plot/plot-of-plots-dark.png"), FileAttachment("../thumbnail/plot/plot-of-plots-light.png"))
s(276, FileAttachment("../thumbnail/plot/point-cloud-density-dark.png"), FileAttachment("../thumbnail/plot/point-cloud-density-light.png"))
s(277, FileAttachment("../thumbnail/plot/pointer-modes-x-y-and-xy-dark.png"), FileAttachment("../thumbnail/plot/pointer-modes-x-y-and-xy-light.png"))
s(278, FileAttachment("../thumbnail/plot/pointer-target-position-dark.png"), FileAttachment("../thumbnail/plot/pointer-target-position-light.png"))
s(279, FileAttachment("../thumbnail/plot/pointer-transform-dark.png"), FileAttachment("../thumbnail/plot/pointer-transform-light.png"))
s(280, FileAttachment("../thumbnail/plot/polar-projection-dark.png"), FileAttachment("../thumbnail/plot/polar-projection-light.png"))
s(281, FileAttachment("../thumbnail/plot/population-pyramid-dark.png"), FileAttachment("../thumbnail/plot/population-pyramid-light.png"))
s(282, FileAttachment("../thumbnail/plot/prebinned-histogram-dark.png"), FileAttachment("../thumbnail/plot/prebinned-histogram-light.png"))
s(283, FileAttachment("../thumbnail/plot/projection-domain-dark.png"), FileAttachment("../thumbnail/plot/projection-domain-light.png"))
s(284, FileAttachment("../thumbnail/plot/proportion-plot-dark.png"), FileAttachment("../thumbnail/plot/proportion-plot-light.png"))
s(285, FileAttachment("../thumbnail/plot/proportional-symbol-scatterplot-dark.png"), FileAttachment("../thumbnail/plot/proportional-symbol-scatterplot-light.png"))
s(286, FileAttachment("../thumbnail/plot/psr-b1919-21-dark.png"), FileAttachment("../thumbnail/plot/psr-b1919-21-light.png"))
s(287, FileAttachment("../thumbnail/plot/qq-plot-dark.png"), FileAttachment("../thumbnail/plot/qq-plot-light.png"))
s(288, FileAttachment("../thumbnail/plot/radar-chart-faceted-dark.png"), FileAttachment("../thumbnail/plot/radar-chart-faceted-light.png"))
s(289, FileAttachment("../thumbnail/plot/radar-chart-dark.png"), FileAttachment("../thumbnail/plot/radar-chart-light.png"))
s(290, FileAttachment("../thumbnail/plot/random-walk-dark.png"), FileAttachment("../thumbnail/plot/random-walk-light.png"))
s(291, FileAttachment("../thumbnail/plot/raster-projection-dark.png"), FileAttachment("../thumbnail/plot/raster-projection-light.png"))
s(292, FileAttachment("../thumbnail/plot/ribbon-chart-dark.png"), FileAttachment("../thumbnail/plot/ribbon-chart-light.png"))
s(293, FileAttachment("../thumbnail/plot/ridgeline-dark.png"), FileAttachment("../thumbnail/plot/ridgeline-light.png"))
s(294, FileAttachment("../thumbnail/plot/rough-plot-dark.png"), FileAttachment("../thumbnail/plot/rough-plot-light.png"))
s(295, FileAttachment("../thumbnail/plot/scatterplot-with-interactive-tips-dark.png"), FileAttachment("../thumbnail/plot/scatterplot-with-interactive-tips-light.png"))
s(296, FileAttachment("../thumbnail/plot/scatterplot-with-ordinal-dimension-dark.png"), FileAttachment("../thumbnail/plot/scatterplot-with-ordinal-dimension-light.png"))
s(297, FileAttachment("../thumbnail/plot/scatterplot-dark.png"), FileAttachment("../thumbnail/plot/scatterplot-light.png"))
s(298, FileAttachment("../thumbnail/plot/seattle-temperature-heatmap-dark.png"), FileAttachment("../thumbnail/plot/seattle-temperature-heatmap-light.png"))
s(299, FileAttachment("../thumbnail/plot/shockwave-dark.png"), FileAttachment("../thumbnail/plot/shockwave-light.png"))
s(300, FileAttachment("../thumbnail/plot/simple-line-chart-dark.png"), FileAttachment("../thumbnail/plot/simple-line-chart-light.png"))
s(301, FileAttachment("../thumbnail/plot/simpsons-ratings-dark.png"), FileAttachment("../thumbnail/plot/simpsons-ratings-light.png"))
s(302, FileAttachment("../thumbnail/plot/single-stacked-bar-dark.png"), FileAttachment("../thumbnail/plot/single-stacked-bar-light.png"))
s(303, FileAttachment("../thumbnail/plot/slope-chart-dark.png"), FileAttachment("../thumbnail/plot/slope-chart-light.png"))
s(304, FileAttachment("../thumbnail/plot/small-grid-contours-dark.png"), FileAttachment("../thumbnail/plot/small-grid-contours-light.png"))
s(305, FileAttachment("../thumbnail/plot/sorted-groups-dark.png"), FileAttachment("../thumbnail/plot/sorted-groups-light.png"))
s(306, FileAttachment("../thumbnail/plot/sorted-heatmap-dark.png"), FileAttachment("../thumbnail/plot/sorted-heatmap-light.png"))
s(307, FileAttachment("../thumbnail/plot/spiral-heatmap-dark.png"), FileAttachment("../thumbnail/plot/spiral-heatmap-light.png"))
s(308, FileAttachment("../thumbnail/plot/stacked-area-chart-dark.png"), FileAttachment("../thumbnail/plot/stacked-area-chart-light.png"))
s(309, FileAttachment("../thumbnail/plot/stacked-bars-dark.png"), FileAttachment("../thumbnail/plot/stacked-bars-light.png"))
s(310, FileAttachment("../thumbnail/plot/stacked-dots-dark.png"), FileAttachment("../thumbnail/plot/stacked-dots-light.png"))
s(311, FileAttachment("../thumbnail/plot/stacked-histogram-dark.png"), FileAttachment("../thumbnail/plot/stacked-histogram-light.png"))
s(312, FileAttachment("../thumbnail/plot/stacked-percentages-dark.png"), FileAttachment("../thumbnail/plot/stacked-percentages-light.png"))
s(313, FileAttachment("../thumbnail/plot/stacked-unit-chart-dark.png"), FileAttachment("../thumbnail/plot/stacked-unit-chart-light.png"))
s(314, FileAttachment("../thumbnail/plot/stacking-order-and-reverse-dark.png"), FileAttachment("../thumbnail/plot/stacking-order-and-reverse-light.png"))
s(315, FileAttachment("../thumbnail/plot/state-centroids-dark.png"), FileAttachment("../thumbnail/plot/state-centroids-light.png"))
s(316, FileAttachment("../thumbnail/plot/state-labels-dark.png"), FileAttachment("../thumbnail/plot/state-labels-light.png"))
s(317, FileAttachment("../thumbnail/plot/state-population-change-dark.png"), FileAttachment("../thumbnail/plot/state-population-change-light.png"))
s(318, FileAttachment("../thumbnail/plot/static-annotations-dark.png"), FileAttachment("../thumbnail/plot/static-annotations-light.png"))
s(319, FileAttachment("../thumbnail/plot/stroked-contours-dark.png"), FileAttachment("../thumbnail/plot/stroked-contours-light.png"))
s(320, FileAttachment("../thumbnail/plot/symbol-channel-dark.png"), FileAttachment("../thumbnail/plot/symbol-channel-light.png"))
s(321, FileAttachment("../thumbnail/plot/temperature-amplitude-dark.png"), FileAttachment("../thumbnail/plot/temperature-amplitude-light.png"))
s(322, FileAttachment("../thumbnail/plot/temporal-bar-chart-dark.png"), FileAttachment("../thumbnail/plot/temporal-bar-chart-light.png"))
s(323, FileAttachment("../thumbnail/plot/ternary-dark.png"), FileAttachment("../thumbnail/plot/ternary-light.png"))
s(324, FileAttachment("../thumbnail/plot/text-dodge-dark.png"), FileAttachment("../thumbnail/plot/text-dodge-light.png"))
s(325, FileAttachment("../thumbnail/plot/text-spiral-dark.png"), FileAttachment("../thumbnail/plot/text-spiral-light.png"))
s(326, FileAttachment("../thumbnail/plot/this-is-just-to-say-dark.png"), FileAttachment("../thumbnail/plot/this-is-just-to-say-light.png"))
s(327, FileAttachment("../thumbnail/plot/tip-format-dark.png"), FileAttachment("../thumbnail/plot/tip-format-light.png"))
s(328, FileAttachment("../thumbnail/plot/tips-additional-channels-dark.png"), FileAttachment("../thumbnail/plot/tips-additional-channels-light.png"))
s(329, FileAttachment("../thumbnail/plot/tips-longer-text-dark.png"), FileAttachment("../thumbnail/plot/tips-longer-text-light.png"))
s(330, FileAttachment("../thumbnail/plot/tips-paired-channels-dark.png"), FileAttachment("../thumbnail/plot/tips-paired-channels-light.png"))
s(331, FileAttachment("../thumbnail/plot/tree-dark.png"), FileAttachment("../thumbnail/plot/tree-light.png"))
s(332, FileAttachment("../thumbnail/plot/trellis-anomaly-dark.png"), FileAttachment("../thumbnail/plot/trellis-anomaly-light.png"))
s(333, FileAttachment("../thumbnail/plot/two-dimensional-faceting-dark.png"), FileAttachment("../thumbnail/plot/two-dimensional-faceting-light.png"))
s(334, FileAttachment("../thumbnail/plot/unemployment-horizon-chart-dark.png"), FileAttachment("../thumbnail/plot/unemployment-horizon-chart-light.png"))
s(335, FileAttachment("../thumbnail/plot/us-bubble-map-dark.png"), FileAttachment("../thumbnail/plot/us-bubble-map-light.png"))
s(336, FileAttachment("../thumbnail/plot/us-spike-map-dark.png"), FileAttachment("../thumbnail/plot/us-spike-map-light.png"))
s(337, FileAttachment("../thumbnail/plot/v-counties-dark.png"), FileAttachment("../thumbnail/plot/v-counties-light.png"))
s(338, FileAttachment("../thumbnail/plot/variable-fill-area-dark.png"), FileAttachment("../thumbnail/plot/variable-fill-area-light.png"))
s(339, FileAttachment("../thumbnail/plot/vertical-bar-chart-dark.png"), FileAttachment("../thumbnail/plot/vertical-bar-chart-light.png"))
s(340, FileAttachment("../thumbnail/plot/vertical-bars-rotated-labels-dark.png"), FileAttachment("../thumbnail/plot/vertical-bars-rotated-labels-light.png"))
s(341, FileAttachment("../thumbnail/plot/volcano-raster-dark.png"), FileAttachment("../thumbnail/plot/volcano-raster-light.png"))
s(342, FileAttachment("../thumbnail/plot/voronoi-labels-dark.png"), FileAttachment("../thumbnail/plot/voronoi-labels-light.png"))
s(343, FileAttachment("../thumbnail/plot/voronoi-map-dark.png"), FileAttachment("../thumbnail/plot/voronoi-map-light.png"))
s(344, FileAttachment("../thumbnail/plot/voronoi-scatterplot-dark.png"), FileAttachment("../thumbnail/plot/voronoi-scatterplot-light.png"))
s(345, FileAttachment("../thumbnail/plot/voronoi-treemap-dark.png"), FileAttachment("../thumbnail/plot/voronoi-treemap-light.png"))
s(346, FileAttachment("../thumbnail/plot/walmart-density-dark.png"), FileAttachment("../thumbnail/plot/walmart-density-light.png"))
s(347, FileAttachment("../thumbnail/plot/walmart-voronoi-dark.png"), FileAttachment("../thumbnail/plot/walmart-voronoi-light.png"))
s(348, FileAttachment("../thumbnail/plot/warming-stripes-dark.png"), FileAttachment("../thumbnail/plot/warming-stripes-light.png"))
s(349, FileAttachment("../thumbnail/plot/wealth-health-nations-dark.png"), FileAttachment("../thumbnail/plot/wealth-health-nations-light.png"))
s(350, FileAttachment("../thumbnail/plot/wiggle-streamgraph-dark.png"), FileAttachment("../thumbnail/plot/wiggle-streamgraph-light.png"))
s(351, FileAttachment("../thumbnail/plot/wind-map-dark.png"), FileAttachment("../thumbnail/plot/wind-map-light.png"))
s(352, FileAttachment("../thumbnail/plot/window-and-map-dark.png"), FileAttachment("../thumbnail/plot/window-and-map-light.png"))
s(353, FileAttachment("../thumbnail/plot/window-reduce-dark.png"), FileAttachment("../thumbnail/plot/window-reduce-light.png"))
s(354, FileAttachment("../thumbnail/plot/world-projections-dark.png"), FileAttachment("../thumbnail/plot/world-projections-light.png"))
s(355, FileAttachment("../thumbnail/plot/wrap-tick-labels-dark.png"), FileAttachment("../thumbnail/plot/wrap-tick-labels-light.png"))
s(356, FileAttachment("../thumbnail/projections/d3-geo-polygon-dark.png"), FileAttachment("../thumbnail/projections/d3-geo-polygon-light.png"))
s(357, FileAttachment("../thumbnail/projections/himawari-8-dark.png"), FileAttachment("../thumbnail/projections/himawari-8-light.png"))
s(358, FileAttachment("../thumbnail/projections/-dark.png"), FileAttachment("../thumbnail/projections/-light.png"))
s(359, FileAttachment("../thumbnail/projections/markley-dark.png"), FileAttachment("../thumbnail/projections/markley-light.png"))
s(360, FileAttachment("../thumbnail/projections/renner-dark.png"), FileAttachment("../thumbnail/projections/renner-light.png"))
s(361, FileAttachment("../thumbnail/stash/coolprop-dark.png"), FileAttachment("../thumbnail/stash/coolprop-light.png"))
s(362, FileAttachment("../thumbnail/support/a-frame-dark.png"), FileAttachment("../thumbnail/support/a-frame-light.png"))
s(363, FileAttachment("../thumbnail/support/becker-barley-ssr-dark.png"), FileAttachment("../thumbnail/support/becker-barley-ssr-light.png"))
s(364, FileAttachment("../thumbnail/support/dark-mode-dark.png"), FileAttachment("../thumbnail/support/dark-mode-light.png"))
s(365, FileAttachment("../thumbnail/support/debouncing-inputs-dark.png"), FileAttachment("../thumbnail/support/debouncing-inputs-light.png"))
s(366, FileAttachment("../thumbnail/support/html-inputs-dark.png"), FileAttachment("../thumbnail/support/html-inputs-light.png"))
s(367, FileAttachment("../thumbnail/support/inputs-bind-dark.png"), FileAttachment("../thumbnail/support/inputs-bind-light.png"))
s(368, FileAttachment("../thumbnail/support/mollweide-with-ticks-dark.png"), FileAttachment("../thumbnail/support/mollweide-with-ticks-light.png"))
s(369, FileAttachment("../thumbnail/support/stored-inputs-dark.png"), FileAttachment("../thumbnail/support/stored-inputs-light.png"))
s(370, FileAttachment("../thumbnail/topojson/country-topology-dark.png"), FileAttachment("../thumbnail/topojson/country-topology-light.png"))
s(371, FileAttachment("../thumbnail/topojson/county-topology-dark.png"), FileAttachment("../thumbnail/topojson/county-topology-light.png"))
s(372, FileAttachment("../thumbnail/topojson/hexagon-mesh-dark.png"), FileAttachment("../thumbnail/topojson/hexagon-mesh-light.png"))
s(373, FileAttachment("../thumbnail/varia/covid-sumeau-dark.png"), FileAttachment("../thumbnail/varia/covid-sumeau-light.png"))
s(374, FileAttachment("../thumbnail/varia/lap-jv-dark.png"), FileAttachment("../thumbnail/varia/lap-jv-light.png"))
s(375, FileAttachment("../thumbnail/varia/pt-dark.png"), FileAttachment("../thumbnail/varia/pt-light.png"))
s(376, FileAttachment("../thumbnail/varia/sequence-logos-dark.png"), FileAttachment("../thumbnail/varia/sequence-logos-light.png"))
s(377, FileAttachment("../thumbnail/video/ed3RfgPPZ2w-dark.png"), FileAttachment("../thumbnail/video/ed3RfgPPZ2w-light.png"))
}
~~~
