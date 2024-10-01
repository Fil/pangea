---
source: https://observablehq.com/@observablehq/calendar-component
index: true
---

# Calendar component

Based on [Observable Plot](https://observablehq.com/@observablehq/plot), this component displays a calendar, highlighting some dates passed as data:

```js echo
const c = Calendar([
  ["2022-03-01", "My birthday"],
  ["2022-05-02", "My unbirthday"],
  ["2022-12-03", "Another one of my unbirthdays"]
]);

display(c);
```

The code is quite complete, see [./dow-jones-calendar] for a simple alternative. To use, copy the **calendar component** and import it like so:

```js echo
import {Calendar} from "../components/calendar.js";
```

```js
display(showCode(FileAttachment("../components/calendar.js")));
```

Then run:

```js run=false
display(Calendar(data, options));
```

where **data** is an _iterable_ of calendar items.

The **options** are:

- **date** — the date accessor; defaults to the first element of the item. The date is expected to be set in UTC—otherwise a viewer who is not in the same timezone as the author might see 1-day shifts. You can pass the date as an ISO string format (like "2022-03-01"), which will be converted via [d3.isoParse](https://github.com/d3/d3-time-format#isoParse)—this is the recommended (risk-free) approach.

- **value** — value accessor; defaults to the second element of the item.

- **reduce** — a function that decides what happens when multiple events happen on the same day. Defaults to “first”.

- **width** — the width of the calendar in pixels; defaults to 726; if smaller than 726, the calendar will be displayed by semester—allowing a responsive layout.

- **gap** — the gap between months, as a percentage of the cell’s width (defaults to 0.15).

- **color** — a color scale options object to pass to Plot.

- **fill** — controls the color of the marked dates; defaults to _value_ if a value was specified, steelblue otherwise.

- **textFill** — text color for marked days; defaults to var(--plot-background).

- **title** — a title attribute.

- **colors** — an object with specific color constants: { base: "#eee", today: "red" }. colors.base will be used to display the background of unmarked days. colors.today is the outline of the current day.

- **weekStart** - 0 for Sunday-based weeks (default); 1 for Monday-based weeks.

- **daysToShow** — which days of the week to show, as an array of weekday numbers (defaults to [0, 1, 2, 3, 4, 5, 6], the whole week—[1, 2, 3, 4, 5, 6, 0] for Monday-based weeks).

- **weekNumber** — should we display the week number? Defaults to false.

- **locale** — the locale for date, days and months formatting; defaults to en-US.

- **dayFormat** - A formatter function for the days; if specified as a string, it is passed to d3.utcFormat (in the default English locale). Defaults to the initial of the day’s name.

- **monthFormat** - A formatter function for the months; if specified as a string, it is passed to d3.utcFormat (in the default English locale). Defaults to the short month name.

- **weekNumberFormat** - A formatter function to receive the date of the last day of the week; if specified as a string, it is passed to d3.utcFormat. %V formats the week as [ISO 8601 week of the year](https://en.wikipedia.org/wiki/ISO_week_date); defaults to [%U for Sunday-based, %W for Monday-based weeks](https://github.com/d3/d3-time-format). Week numbers are expressed as a decimal number [01, 53].

Here’s the nimblest calendar, with a handful of dates:

```js echo
Calendar(["2022-03-01", "2022-05-02", "2022-12-03"]);
```

And here’s a hero calendar, with a color representing the daily number of views since 2015 on Wikipedia’s “[Pumpkin Spice Latte](https://en.wikipedia.org/wiki/Pumpkin_Spice_Latte)” page (yes, it’s that time of the year again!—thank you [Yuri Vishnevsky](https://observablehq.com/@yurivish/wikipedia-pageviews-calendar) for the data):

```js
const data = fetch(
  `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/user/Pumpkin_Spice_Latte/daily/20170301/${d3.utcFormat(
    "%Y%m%d"
  )(new Date())}`
)
  .then((res) => res.json())
  .then((d) =>
    d.items.map(({views, timestamp: ts}) => ({
      date: `${ts.slice(0, 4)}-${ts.slice(4, 6)}-${ts.slice(6, 8)}`,
      views: +views
    }))
  );
```

```js echo
const calendar = Calendar(data, {
  width,
  fill: "views",
  title: (d) => `${d.views} views`,
  color: {scheme: "RdYlBu", domain: [0, 1000], type: "sqrt", reverse: true}
});

display(calendar);
```

To demonstrate the function’s responsiveness to the width, here’s a smaller calendar:

```js echo
display(
  Calendar(
    [
      ["2021-03-01", 0.4],
      ["2021-03-02", 0.7],
      ["2021-04-01", 0.99],
      ["2021-04-02", 0.1],
      ["2021-05-01", 0.4],
      ["2021-05-02", 0.0],
      ["2021-06-01", 0.5],
      ["2021-06-01", 0.6]
    ],
    {
      fill: (d) => d3.scaleSequential(d3.interpolateSinebow)(d[1]),
      color: {type: "identity"},
      colors: {base: "var(--theme-background-alt)"}, // no mark for "today"
      width: 500 // responsive: groups by semester
    }
  )
);
```

And here’s a Spanish-language calendar of all the week-ends of 2021, with week numbers:

```js echo
display(
  Calendar(["2021-01-01", "2021-12-31"], {
    weekStart: 1, // Monday-based (not for Spain, but because we want consecutive Saturdays and Sundays)
    daysToShow: [6, 0], // Sat, Sun
    weekNumber: true,
    locale: "es",
    dayFormat: (d) => d.toLocaleString("es", {weekday: "short", timeZone: "UTC"})
  })
);
```

---

_Many thanks to [Martien van Steenbergen](https://observablehq.com/@martien) and [Fati CHEN](https://observablehq.com/@stardisblue) for the suggestions on weekStart and weekNumber. This is much harder that it seems!_

```js
import {showCode} from "../components/showCode.js";
```
