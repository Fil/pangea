---
index: true
source: https://bl.ocks.org/Fil/7ab1d07c71826ae0f7ccdfb4bd4211e3
---

# Spherical alpha shapes

[Alpha shapes](https://en.wikipedia.org/wiki/Alpha_shape), aka concave hulls. To compute the Delaunay triangulation on the sphere, we use [d3-geo-voronoi](https://github.com/Fil/d3-geo-voronoi). Based on [zpconn’s experiment](https://gist.github.com/zpconn/11387143); to merge the triangles, we use Jason Davies’s [code](https://gist.github.com/jasondavies/1554783).

```js
import {geoVoronoi} from "npm:d3-geo-voronoi"
```

```js
const height = 400;

const projection = d3.geoOrthographic()
  .fitExtent([[2, 2], [width - 2, height - 2]], {type: "Sphere"});
const path = d3.geoPath()
  .projection(projection)
  .pointRadius(2.5);

const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);
display(svg.node());

svg.append("path").attr("class", "sphere").datum({type: "Sphere"});
svg.append("path").datum(d3.geoGraticule()).attr("class", "graticule").attr("d", path);
const geom = svg.append("path").attr("class", "geom");
svg.append("path").attr("class", "point");

const points = cities.map((d) => d.coordinates);

svg.select(".point").datum({type: "MultiPoint", coordinates: points}).attr("d", path);

const alpha = 0.406;
const distance2 = function (a, b) {
  var d = d3.geoDistance(a, b);
  return d * d;
};
const alpha2 = alpha * alpha;

const tr = geoVoronoi()
  .triangles(points)
  .features.map((s) => s.geometry.coordinates[0])
  .filter((t) => distance2(t[0], t[1]) < alpha2 && distance2(t[1], t[2]) < alpha2 && distance2(t[0], t[2]) < alpha2);

geom.datum({type: "Polygon", coordinates: boundary(tr)}).attr("d", path);

// gentle animation
d3.interval(function (elapsed) {
  projection.rotate([elapsed / 150, 0]);
  svg.selectAll("path").attr("d", path);
}, 10);

// Computes boundaries of connected triangles, given an array of triangles.
// Jason Davies - https://bl.ocks.org/jasondavies/1554783
function boundary(mesh) {
  const counts = {};
  const edges = {};
  const result = [];
  let r;
  // Traverse the edges of all triangles and discard any edge that appears twice.
  mesh.forEach((triangle) => {
    for (let i = 0; i < 3; ++i) {
      const edge = [triangle[i], triangle[(i + 1) % 3]].sort(ascendingCoords).map(String);
      (edges[edge[0]] = edges[edge[0]] || []).push(edge[1]);
      (edges[edge[1]] = edges[edge[1]] || []).push(edge[0]);
      const k = edge.join(":");
      if (counts[k]) delete counts[k];
      else counts[k] = 1;
    }
  });
  while (1) {
    let k = null;
    // Pick an arbitrary starting point on a boundary.
    for (k in counts) break;
    if (k == null) break;
    result.push((r = k.split(":").map((d) => d.split(",").map(Number))));
    delete counts[k];
    let q = r[1];
    while (q[0] !== r[0][0] || q[1] !== r[0][1]) {
      let p = q;
      const qs = edges[p.join(",")];
      for (let i = 0; i < qs.length; ++i) {
        q = qs[i].split(",").map(Number);
        const edge = [p, q].sort(ascendingCoords).join(":");
        if (counts[edge]) {
          delete counts[edge];
          r.push(q);
          break;
        }
      }
    }
  }
  return result;
}

function ascendingCoords(a, b) {
  return a[0] === b[0] ? b[1] - a[1] : b[0] - a[0];
}
```

```js
const cities = [{"region": "Vatican (Holy Sea)", "name": "Vatican City", "coordinates": [12.453386544971766, 41.903282179960115]}, {"region": "San Marino", "name": "San Marino", "coordinates": [12.441770157800141, 43.936095834768004]}, {"region": "Liechtenstein", "name": "Vaduz", "coordinates": [9.516669472907267, 47.13372377429357]}, {"region": "Luxembourg", "name": "Luxembourg", "coordinates": [6.130002806227083, 49.611660379121076]}, {"region": "Federated States of Micronesia", "name": "Palikir", "coordinates": [158.1499743237623, 6.916643696007725]}, {"region": "Marshall Islands", "name": "Majuro", "coordinates": [171.38000017574655, 7.103004311216239]}, {"region": "Tuvalu", "name": "Funafuti", "coordinates": [179.21664709402887, -8.516651999041073]}, {"region": "Palau", "name": "Melekeok", "coordinates": [134.62654846699218, 7.487396172977981]}, {"region": "Monaco", "name": "Monaco", "coordinates": [7.406913173465057, 43.73964568785249]}, {"region": "Kiribati", "name": "Tarawa", "coordinates": [173.01757082854942, 1.338187505624603]}, {"region": "Comoros", "name": "Moroni", "coordinates": [43.240244098693324, -11.70415769566847]}, {"region": "Andorra", "name": "Andorra", "coordinates": [1.51648596050552, 42.5000014435459]}, {"region": "Trinidad and Tobago", "name": "Port-of-Spain", "coordinates": [-61.51703088544974, 10.651997089577264]}, {"region": "Rwanda", "name": "Kigali", "coordinates": [30.058585919064114, -1.95164421006325]}, {"region": "Swaziland", "name": "Mbabane", "coordinates": [31.133334512056365, -26.316650778409212]}, {"region": "South Sudan", "name": "Juba", "coordinates": [31.580025592787308, 4.829975198277964]}, {"region": "Slovenia", "name": "Ljubljana", "coordinates": [14.51496903347413, 46.0552883087945]}, {"region": "Slovakia", "name": "Bratislava", "coordinates": [17.11698075223461, 48.15001832996171]}, {"region": "Qatar", "name": "Doha", "coordinates": [51.532967894299304, 25.286556008906587]}, {"region": "Montenegro", "name": "Podgorica", "coordinates": [19.266306924118226, 42.465972512881706]}, {"region": "Switzerland", "name": "Bern", "coordinates": [7.466975462482424, 46.91668275866772]}, {"region": "Kosovo", "name": "Pristina", "coordinates": [21.165984251599866, 42.666709614119384]}, {"region": "Dominica", "name": "Roseau", "coordinates": [-61.387012981803366, 15.301015644283325]}, {"region": "Djibouti", "name": "Djibouti", "coordinates": [43.148001667052256, 11.595014464255485]}, {"region": "The Gambia", "name": "Banjul", "coordinates": [-16.591701489212596, 13.45387646031594]}, {"region": "Macedonia", "name": "Skopje", "coordinates": [21.4334614651425, 42.00000612290586]}, {"region": "Barbados", "name": "Bridgetown", "coordinates": [-59.61652673505159, 13.10200258275114]}, {"region": "Burundi", "name": "Bujumbura", "coordinates": [29.360006061528395, -3.376087220374643]}, {"region": "Saint Vincent and the Grenadines", "name": "Kingstown", "coordinates": [-61.212062420279324, 13.14827882786841]}, {"region": "Saint Lucia", "name": "Castries", "coordinates": [-61.00000818036955, 14.00197348933034]}, {"region": "Saint Kitts and Nevis", "name": "Basseterre", "coordinates": [-62.71700931969934, 17.302030455489387]}, {"region": "Mauritius", "name": "Port Louis", "coordinates": [57.49999385460973, -20.166638571353246]}, {"region": "Grenada", "name": "Saint George's", "coordinates": [-61.74164322607476, 12.052633401720414]}, {"region": "Bahrain", "name": "Manama", "coordinates": [50.58305171591019, 26.236136290485945]}, {"region": "Antigua and Barbuda", "name": "Saint John's", "coordinates": [-61.85003381513866, 17.118036518314113]}, {"region": "Uruguay", "name": "Montevideo", "coordinates": [-56.17299814703597, -34.856095707590725]}, {"region": "Togo", "name": "Lome", "coordinates": [1.22081126074562, 6.133882930268385]}, {"region": "Tunisia", "name": "Tunis", "coordinates": [10.179678099212026, 36.80277813623144]}, {"region": "United Arab Emirates", "name": "Abu Dhabi", "coordinates": [54.36659338259199, 24.466683572379907]}, {"region": "Turkmenistan", "name": "Ashgabat", "coordinates": [58.38329911177465, 37.949994933110986]}, {"region": "Zambia", "name": "Lusaka", "coordinates": [28.28138173611427, -15.414698409335926]}, {"region": "Zimbabwe", "name": "Harare", "coordinates": [31.042763572062825, -17.815843835777798]}, {"region": "East Timor", "name": "Dili", "coordinates": [125.57945593170507, -8.559388408546454]}, {"region": "Vanuatu", "name": "Port Vila", "coordinates": [168.31664058356864, -17.733350404025828]}, {"region": "Honduras", "name": "Tegucigalpa", "coordinates": [-87.2194751979415, 14.103990759076396]}, {"region": "Guyana", "name": "Georgetown", "coordinates": [-58.167028647480606, 6.801973692752028]}, {"region": "Iceland", "name": "Reykjav k", "coordinates": [-21.950014487179544, 64.15002361973922]}, {"region": "Haiti", "name": "Port-au-Prince", "coordinates": [-72.33798044690553, 18.54297045473237]}, {"region": "Uganda", "name": "Kampala", "coordinates": [32.581377667121046, 0.318604813383331]}, {"region": "Suriname", "name": "Paramaribo", "coordinates": [-55.16703088542437, 5.835030129922586]}, {"region": "Niger", "name": "Niamey", "coordinates": [2.114710186530374, 13.51865181050647]}, {"region": "Tajikistan", "name": "Dushanbe", "coordinates": [68.77387935270173, 38.56003521631658]}, {"region": "Paraguay", "name": "Asuncion", "coordinates": [-57.643451027901335, -25.294457117057675]}, {"region": "Nicaragua", "name": "Managua", "coordinates": [-86.27043751890119, 12.154962438756115]}, {"region": "Sierra Leone", "name": "Freetown", "coordinates": [-13.236161599012746, 8.471957271098177]}, {"region": "Pakistan", "name": "Islamabad", "coordinates": [73.16468862105955, 33.70194180895959]}, {"region": "Nepal", "name": "Kathmandu", "coordinates": [85.31469635222788, 27.718637772477223]}, {"region": "South Africa", "name": "Bloemfontein", "coordinates": [26.22991288117737, -29.119993877378704]}, {"region": "South Africa", "name": "Pretoria", "coordinates": [28.22748321723384, -25.704974695184433]}, {"region": "Papua New Guinea", "name": "Port Moresby", "coordinates": [147.19250362059358, -9.464707825867777]}, {"region": "Solomon Islands", "name": "Honiara", "coordinates": [159.94976573360566, -9.437994295089595]}, {"region": "Panama", "name": "Panama City", "coordinates": [-79.53498301041077, 8.969963049094872]}, {"region": "Morocco", "name": "Rabat", "coordinates": [-6.83640815612614, 34.02530731107282]}, {"region": "Moldova", "name": "Chisinau", "coordinates": [28.85771113965143, 47.005023619670624]}, {"region": "Mozambique", "name": "Maputo", "coordinates": [32.58721710397009, -25.953331628778983]}, {"region": "Somalia", "name": "Mogadishu", "coordinates": [45.36473175245874, 2.068627192947531]}, {"region": "Oman", "name": "Muscat", "coordinates": [58.593312132608844, 23.613324807728134]}, {"region": "Sri Lanka", "name": "Colombo", "coordinates": [79.85775060925641, 6.931965758182116]}, {"region": "Mongolia", "name": "Ulaanbaatar", "coordinates": [106.91466990374653, 47.91861925856074]}, {"region": "Namibia", "name": "Windhoek", "coordinates": [17.08354610054181, -22.570006084383806]}, {"region": "Nigeria", "name": "Abuja", "coordinates": [7.53138214293233, 9.085279007754195]}, {"region": "Guinea Bissau", "name": "Bissau", "coordinates": [-15.598360841320755, 11.865023822980561]}, {"region": "Jordan", "name": "Amman", "coordinates": [35.93135406687412, 31.951971105827454]}, {"region": "Lithuania", "name": "Vilnius", "coordinates": [25.3166352932829, 54.68336631175862]}, {"region": "Latvia", "name": "Riga", "coordinates": [24.099965371403187, 56.95002382316096]}, {"region": "Kyrgyzstan", "name": "Bishkek", "coordinates": [74.58325836390367, 42.875025305090105]}, {"region": "Lesotho", "name": "Maseru", "coordinates": [27.483273069984477, -29.316674378681626]}, {"region": "Madagascar", "name": "Antananarivo", "coordinates": [47.51467804152986, -18.914691492032148]}, {"region": "Ecuador", "name": "Quito", "coordinates": [-78.5019969671124, -0.213042322035562]}, {"region": "Costa Rica", "name": "San Jose", "coordinates": [-84.08599721127536, 9.936958288356607]}, {"region": "El Salvador", "name": "San Salvador", "coordinates": [-89.2049870794599, 13.711947505494038]}, {"region": "Jamaica", "name": "Kingston", "coordinates": [-76.7674337136691, 17.977076623830897]}, {"region": "Chad", "name": "Ndjamena", "coordinates": [15.047202455462298, 12.115042394810644]}, {"region": "Equatorial Guinea", "name": "Malabo", "coordinates": [8.783277545821136, 3.750015278026183]}, {"region": "Eritrea", "name": "Asmara", "coordinates": [38.933323525759306, 15.333339252681924]}, {"region": "Croatia", "name": "Zagreb", "coordinates": [15.999994668245677, 45.80000673327254]}, {"region": "Estonia", "name": "Tallinn", "coordinates": [24.72804072947855, 59.43387737948592]}, {"region": "Malawi", "name": "Lilongwe", "coordinates": [33.78330195998353, -13.983295065469179]}, {"region": "Guatemala", "name": "Guatemala", "coordinates": [-90.52891143656154, 14.623080521448173]}, {"region": "Gabon", "name": "Libreville", "coordinates": [9.457965045823698, 0.385388609718518]}, {"region": "Fiji", "name": "Suva", "coordinates": [178.44170731537986, -18.133015931371233]}, {"region": "Mauritania", "name": "Nouakchott", "coordinates": [-15.975340414890013, 18.086427021247516]}, {"region": "Mali", "name": "Bamako", "coordinates": [-8.001984963249697, 12.65196052632325]}, {"region": "Lebanon", "name": "Beirut", "coordinates": [35.507762351377664, 33.8739209756269]}, {"region": "Georgia", "name": "Tbilisi", "coordinates": [44.788849590997984, 41.72695584707759]}, {"region": "Kazakhstan", "name": "Astana", "coordinates": [71.427774209483, 51.18112530425759]}, {"region": "Laos", "name": "Vientiane", "coordinates": [102.59998002015476, 17.96669272762739]}, {"region": "Congo (Brazzaville)", "name": "Brazzaville", "coordinates": [15.282743633848668, -4.257239913197509]}, {"region": "Guinea", "name": "Conakry", "coordinates": [-13.682180886123945, 9.53346870502179]}, {"region": "Ivory Coast", "name": "Yamoussoukro", "coordinates": [-5.275502564912301, 6.818380960004617]}, {"region": "Canada", "name": "Ottawa", "coordinates": [-75.70196115980951, 45.41864265536043]}, {"region": "Serbia", "name": "Belgrade", "coordinates": [20.466044822020535, 44.82059130444674]}, {"region": "Brunei", "name": "Bandar Seri Begawan", "coordinates": [114.93328405666227, 4.883331114619239]}, {"region": "Bolivia", "name": "Sucre", "coordinates": [-65.25951562667564, -19.04097084673947]}, {"region": "Belize", "name": "Belmopan", "coordinates": [-88.76707299981655, 17.252033507246892]}, {"region": "Central African Republic", "name": "Bangui", "coordinates": [18.558288125287277, 4.366644306349087]}, {"region": "Cameroon", "name": "Yaounde", "coordinates": [11.514704896854425, 3.868646520754112]}, {"region": "Albania", "name": "Tirana", "coordinates": [19.81888301461521, 41.327540709491586]}, {"region": "Armenia", "name": "Yerevan", "coordinates": [44.51160553175208, 40.18309659414189]}, {"region": "Azerbaijan", "name": "Baku", "coordinates": [49.860271303257775, 40.39721789134302]}, {"region": "Cambodia", "name": "Phnom Penh", "coordinates": [104.91468862118643, 11.55197598855841]}, {"region": "Bolivia", "name": "La Paz", "coordinates": [-68.15193104910219, -16.49602775504337]}, {"region": "Benin", "name": "Cotonou", "coordinates": [2.518044740568598, 6.401954422782467]}, {"region": "Bulgaria", "name": "Sofia", "coordinates": [23.314708152110086, 42.68529528393054]}, {"region": "Belarus", "name": "Minsk", "coordinates": [27.56468129665825, 53.901923295043105]}, {"region": "Bhutan", "name": "Thimphu", "coordinates": [89.63901403703, 27.472985859175765]}, {"region": "Botswana", "name": "Gaborone", "coordinates": [25.91194779328538, -24.646313457438907]}, {"region": "Australia", "name": "Canberra", "coordinates": [149.1290262442992, -35.283028545372076]}, {"region": "Burkina Faso", "name": "Ouagadougou", "coordinates": [-1.526669614916443, 12.372261836543373]}, {"region": "Bosnia and Herzegovina", "name": "Sarajevo", "coordinates": [18.383001666953305, 43.850022398954934]}, {"region": "Myanmar", "name": "Naypyidaw", "coordinates": [96.11667267063035, 19.76850288475015]}, {"region": "Tonga", "name": "Nukualofa", "coordinates": [-175.22056447761656, -21.13851235669864]}, {"region": "Somaliland", "name": "Hargeysa", "coordinates": [44.06531001666542, 9.56002239881775]}, {"region": "Seychelles", "name": "Victoria", "coordinates": [55.44998978559113, -4.6166316539734]}, {"region": "Sao Tome and Principe", "name": "Sao Tome", "coordinates": [6.733325153234773, 0.333402118832907]}, {"region": "Samoa", "name": "Apia", "coordinates": [-171.73864160860316, -13.841545042448445]}, {"region": "Malta", "name": "Valletta", "coordinates": [14.514710651312782, 35.89973248193087]}, {"region": "Maldives", "name": "Male", "coordinates": [73.499947467955, 4.1667081898118]}, {"region": "Israel", "name": "Jerusalem", "coordinates": [35.20662593459866, 31.778407815573303]}, {"region": "Cape Verde", "name": "Praia", "coordinates": [-23.51668888497221, 14.916698017328656]}, {"region": "The Bahamas", "name": "Nassau", "coordinates": [-77.35004378427612, 25.08339011535122]}, {"region": "Cyprus", "name": "Nicosia", "coordinates": [33.36663488641415, 35.166676451654496]}, {"region": "Vietnam", "name": "Hanoi", "coordinates": [105.8480683412422, 21.035273107737055]}, {"region": "Turkey", "name": "Ankara", "coordinates": [32.862445782356644, 39.929184444075474]}, {"region": "Hungary", "name": "Budapest", "coordinates": [19.081374818759684, 47.50195218499135]}, {"region": "Yemen", "name": "Sanaa", "coordinates": [44.20464752393843, 15.356679154263645]}, {"region": "Romania", "name": "Bucharest", "coordinates": [26.0980007953504, 44.43531766349457]}, {"region": "Syria", "name": "Damascus", "coordinates": [36.29805003041707, 33.50197985420613]}, {"region": "Portugal", "name": "Lisbon", "coordinates": [-9.14681216410213, 38.72466873648784]}, {"region": "Sudan", "name": "Khartoum", "coordinates": [32.532233380011576, 15.590024084277673]}, {"region": "Norway", "name": "Oslo", "coordinates": [10.748033347372314, 59.91863614500187]}, {"region": "Poland", "name": "Warsaw", "coordinates": [20.998053692465305, 52.25194648839556]}, {"region": "North Korea", "name": "Pyongyang", "coordinates": [125.75274485499392, 39.02138455800434]}, {"region": "Tanzania", "name": "Dar es Salaam", "coordinates": [39.26639597769457, -6.798066736124383]}, {"region": "Ireland", "name": "Dublin", "coordinates": [-6.250851540391068, 53.335006994584944]}, {"region": "Liberia", "name": "Monrovia", "coordinates": [-10.799660436775923, 6.314581647160139]}, {"region": "Malaysia", "name": "Kuala Lumpur", "coordinates": [101.69803741674644, 3.168611730712371]}, {"region": "Cuba", "name": "Havana", "coordinates": [-82.3661280299533, 23.1339046995422]}, {"region": "Czech Republic", "name": "Prague", "coordinates": [14.464033917048539, 50.08528287347832]}, {"region": "Kuwait", "name": "Kuwait", "coordinates": [47.97635528762527, 29.371663488629565]}, {"region": "Dominican Republic", "name": "Santo Domingo", "coordinates": [-69.90203094331503, 18.472018713195382]}, {"region": "Ghana", "name": "Accra", "coordinates": [-0.218661598960693, 5.551980464445933]}, {"region": "Libya", "name": "Tripoli", "coordinates": [13.180011758078194, 32.89250001935369]}, {"region": "Finland", "name": "Helsinki", "coordinates": [24.93218048284558, 60.17750923256807]}, {"region": "Denmark", "name": "Kdbenhavn", "coordinates": [12.561539888703294, 55.68051004902594]}, {"region": "Ivory Coast", "name": "Abidjan", "coordinates": [-4.041994118507091, 5.321942826098564]}, {"region": "Brazil", "name": "Brasilia", "coordinates": [-47.91799814700306, -15.781394372878992]}, {"region": "Belgium", "name": "Brussels", "coordinates": [4.33137074969045, 50.83526293533032]}, {"region": "Bangladesh", "name": "Dhaka", "coordinates": [90.40663360810754, 23.725005570312817]}, {"region": "Angola", "name": "Luanda", "coordinates": [13.23248118266855, -8.836340255012658]}, {"region": "Algeria", "name": "Algiers", "coordinates": [3.048606670909237, 36.765010656628135]}, {"region": "Myanmar", "name": "Rangoon", "coordinates": [96.16473175266185, 16.785299963188777]}, {"region": "Venezuela", "name": "Caracas", "coordinates": [-66.91898305105042, 10.502944413033333]}, {"region": "Ukraine", "name": "Kiev", "coordinates": [30.514682110472165, 50.43531318760722]}, {"region": "Uzbekistan", "name": "Tashkent", "coordinates": [69.29298696088779, 41.31364774160721]}, {"region": "Spain", "name": "Madrid", "coordinates": [-3.685297544612524, 40.40197212311381]}, {"region": "Sweden", "name": "Stockholm", "coordinates": [18.095388874180912, 59.35270581286585]}, {"region": "Thailand", "name": "Bangkok", "coordinates": [100.51469879369489, 13.751945064087977]}, {"region": "Peru", "name": "Lima", "coordinates": [-77.05200795343472, -12.04606681752557]}, {"region": "Senegal", "name": "Dakar", "coordinates": [-17.47507598705056, 14.717777583623274]}, {"region": "South Africa", "name": "Johannesburg", "coordinates": [28.028063865019476, -26.16809888138414]}, {"region": "Netherlands", "name": "Amsterdam", "coordinates": [4.914694317400972, 52.35191454666443]}, {"region": "South Korea", "name": "Seoul", "coordinates": [126.99778513820195, 37.56829495838895]}, {"region": "Philippines", "name": "Manila", "coordinates": [120.9802713035424, 14.606104813440538]}, {"region": "Germany", "name": "Berlin", "coordinates": [13.399602764700546, 52.523764522251156]}, {"region": "Congo (Kinshasa)", "name": "Kinshasa", "coordinates": [15.313026023171744, -4.327778243275986]}, {"region": "India", "name": "New Delhi", "coordinates": [77.19998002005303, 28.600023009245433]}, {"region": "Greece", "name": "Athens", "coordinates": [23.731375225679358, 37.98527209055226]}, {"region": "Iraq", "name": "Baghdad", "coordinates": [44.391922914564134, 33.34059435615865]}, {"region": "Ethiopia", "name": "Addis Ababa", "coordinates": [38.69805857534868, 9.035256221295754]}, {"region": "Iran", "name": "Tehran", "coordinates": [51.42239817500899, 35.673888627001304]}, {"region": "Argentina", "name": "Buenos Aires", "coordinates": [-58.399477232331435, -34.600555749907414]}, {"region": "Afghanistan", "name": "Kabul", "coordinates": [69.18131419070505, 34.51863614490031]}, {"region": "Austria", "name": "Vienna", "coordinates": [16.364693096743736, 48.20196113681686]}, {"region": "Taiwan", "name": "Taipei", "coordinates": [121.568333333333, 25.0358333333333]}, {"region": "United States of America", "name": "Washington, D.C.", "coordinates": [-77.01136443943716, 38.901495235087054]}, {"region": "United Kingdom", "name": "London", "coordinates": [-0.118667702475932, 51.5019405883275]}, {"region": "Saudi Arabia", "name": "Riyadh", "coordinates": [46.770795798688255, 24.642779007816443]}, {"region": "South Africa", "name": "Cape Town", "coordinates": [18.43304229922603, -33.91806510862875]}, {"region": "Russia", "name": "Moscow", "coordinates": [37.6135769672714, 55.75410998124818]}, {"region": "Mexico", "name": "Mexico City", "coordinates": [-99.1329340602939, 19.444388301415472]}, {"region": "Italy", "name": "Rome", "coordinates": [12.481312562873995, 41.89790148509894]}, {"region": "China", "name": "Beijing", "coordinates": [116.38633982565943, 39.93083808990906]}, {"region": "Kenya", "name": "Nairobi", "coordinates": [36.81471100047145, -1.281400883237779]}, {"region": "Indonesia", "name": "Jakarta", "coordinates": [106.82749176247012, -6.172471846798885]}, {"region": "Colombia", "name": "Bogota", "coordinates": [-74.08528981377441, 4.598369421147822]}, {"region": "Egypt", "name": "Cairo", "coordinates": [31.248022361126118, 30.051906205103705]}, {"region": "Japan", "name": "Tokyo", "coordinates": [139.74946157054467, 35.686962764371174]}, {"region": "France", "name": "Paris", "coordinates": [2.33138946713035, 48.86863878981461]}, {"region": "Chile", "name": "Santiago", "coordinates": [-70.66898671317483, -33.448067956934096]}, {"region": "Singapore", "name": "Singapore", "coordinates": [103.85387481909902, 1.294979325105942]}, {"region": "New Zealand", "name": "Wellington", "coordinates": [174.7832658592819, -41.29998785369173]}];
```

<style>
	.point {
		stroke: #000;
		stroke-width: .5px;
		fill: red;
	}

	.graticule {
    fill: none;
		stroke: #000;
		stroke-width: .25px;
	}

	.geom {
		fill: none;
		stroke: #000;
		stroke-width: 1;
	}

  .sphere {
    fill: white;
    stroke: black;
    stroke-width: 2;
  }
</style>
