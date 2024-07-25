---
source: https://observablehq.com/@mbostock/methods-of-comparison-compared
index: false
draft: true
author: Mike Bostock
---

# Methods of Comparison, Compared

<p class=author>by <a href="https://observablehq.com/@mbostock">Mike Bostock</a></p>

We often wish to understand something by comparing values.

For example, say I’m happily biking along 🚲😅 at ${tex`17\,\text{mph}`} when I get passed by a car 🚗💨 going ${tex`51\,\text{mph}`}. I might think: _Yikes! That car was going ${tex`\tfrac{51}{17} = `} three times my speed!_ Or: _That car was going ${tex`51 - 17 = +34\,\text{mph}`} faster than me!_ (Cars are scary!) Or maybe I’m a cryptocurrency speculator, and I bought one Dinglecoin at the start of the year for ${tex`\$14{,}741`} and then sold it yesterday for ${tex`\$6{,}638`}. I’d say: _Oops, my return was ${tex`\tfrac{6{,}638 - 14{,}741}{14{,}741} = -55\%`}_. Maybe I should invest elsewhere.

There are many ways to compare values. Depending on what you seek to understand, one method may be better than another. In this post, we’ll walk through some common methods and consider their uses.

To make it concrete, we’ll use data from a study by [Dwyer-Lindgren _et al._](https://jamanetwork.com/journals/jama/fullarticle/2674665) on substance use disorders and intentional injuries, and specifically how deaths from alcoholism vary across the United States between 1980 and 2014.

## Side-by-Side

Let’s start by looking separately at 1980 and 2014. Hover over any of the counties to see the underlying values.

### Deaths from Alcohol Use Disorders, 1980

```js
map(
  (id) => color(deaths.get(id)[0]),
  (id) => `${names.get(id)}
${format(deaths.get(id)[0])} deaths per 100,000 people`
);
```

```js
legend(color, "Deaths per 100,000 people");
```

### Deaths from Alcohol Use Disorders, 2014

```js
map(
  (id) => color(deaths.get(id)[1]),
  (id) => `${names.get(id)}
${format(deaths.get(id)[1])} deaths per 100,000 people`,
  visibility
);
```

Some patterns are already visible: the high mortality rate from alcohol in low-density, predominantly [Native American counties](https://en.wikipedia.org/wiki/Alcohol_and_Native_Americans) (such as Apache County, Arizona with ${tex`31.5`} ${html`<div
  style="display:inline-block;width:16px;height:16px;background:${color(31.5)}"

> </div>`} deaths per 100,000 people in 2014), and the decline in alcohol-related mortality across the <a href="https://en.wikipedia.org/wiki/Black_Belt_(U.S._region)">Black Belt</a>. These trends should be considered within the broader context of substance use, such as the [recent epidemic of drug overdoses](https://www.nytimes.com/interactive/2016/01/07/us/drug-overdose-deaths-in-the-us.html).

We can compare by darting back and forth between the two maps, but can we see the temporal pattern more directly?

## Difference

Surely the simplest method to compare two values is to subtract them.

${tex.block`\text{difference}(a, b) = b - a`}

### Change in Deaths from Alcohol Use Disorders, 1980–2014

```js
map(
  (id) => color2(deaths.get(id)[1] - deaths.get(id)[0]),
  (id) => `${names.get(id)}
${formatChange(deaths.get(id)[1] - deaths.get(id)[0])} deaths per 100,000 people
${format(deaths.get(id)[0])} per 100,000 in 1980
${format(deaths.get(id)[1])} per 100,000 in 2014`,
  visibility
);
```

```js
legend(color2, "Change in deaths per 100,000 people", "+d");
```

In Apache County, the mortality rate increased from ${tex`18.6`} deaths per 100,000 people in 1980 to ${tex`31.5`} per 100,000 people in 2014, a difference of ${tex`31.5 - 18.6 = +13.0`} ${html`<div
  style="display:inline-block;width:16px;height:16px;background:${color2(13.0)}"

> </div>`} deaths per 100,000 people. Meanwhile, Plymouth County, Massachusetts increased from ${tex`3.2 - 0.9 = +2.3`} ${html`<div
>   style="display:inline-block;width:16px;height:16px;background:${color2(2.3)}"
> </div>`} deaths per 100,000 people.

The difference here conveys the _marginal change_ in mortality rates: where people are becoming more or less likely to die from alcoholism, weighted according to the absolute change in likelihood.

## Relative Change

We may wish to normalize the difference relative to the starting value.

${tex.block`\text{relative change}(a, b) = \frac{\text{b} - \text{a}}{\text{a}}`}

Often this is multiplied by 100 to produce _percentage change_.

### Change in Deaths from Alcohol Use Disorders, 1980–2014

```js
map(
  (id) => color3a((deaths.get(id)[1] - deaths.get(id)[0]) / deaths.get(id)[0]),
  (id) => `${names.get(id)}
${formatPercentChange((deaths.get(id)[1] - deaths.get(id)[0]) / deaths.get(id)[0])}
${format(deaths.get(id)[0])} per 100,000 in 1980
${format(deaths.get(id)[1])} per 100,000 in 2014`,
  visibility
);
```

```js
d3.select(legend(color3a, "Percentage change of deaths per 100,000 people"))
  .call((g) => g.selectAll(".tick text").text((d) => (d > 0 ? "+" : "") + d * 100))
  .node();
```

This map differs dramatically from the previous one! The decline in mortality in the Black Belt is much more pronounced, as is an increase in the Midwest, such as the ${tex`+254.9\%`} ${html`<div
  style="display:inline-block;width:16px;height:16px;background:${color3a(2.55)}"

> </div>`} increase in Randolph County, Indiana.

But is this a good way to look at this data?

Consider Plymouth County again: it increased from ${tex`0.9`} to ${tex`3.2`} deaths per 100,000, which is ${tex`\tfrac{3.2 - 0.9}{0.9} = +243.8\%`} ${html`<div
  style="display:inline-block;width:16px;height:16px;background:${color3a(2.44)}"

> </div>`}. Meanwhile, Apache County “only” increased by ${tex`\tfrac{31.5 - 18.6}{18.6} = +69.7\%`} ${html`<div
>   style="display:inline-block;width:16px;height:16px;background:${color3a(0.7)}"
> </div>`}. Is the change ${tex`3.5\times`} more notable in Plymouth County than in Apache County? Probably not: counties with a low initial mortality rate—the denominator in our relative change formula—have a much larger relative change for the same absolute change. On the other hand, a tripling of the alcohol-related mortality rate could be a significant concern.

Also, note that the color scale above is not symmetric: its minimum is ${tex`-83\%`} ${html`<div
  style="display:inline-block;width:16px;height:16px;background:${color3a(-0.83)}"

> </div>`} while its maximum is ${tex`+265\%`} ${html`<div
>   style="display:inline-block;width:16px;height:16px;background:${color3a(2.65)}"
> </div>`}. In other words, the scale treats ${tex`+50\%`} ${html`<div
>   style="display:inline-block;width:16px;height:16px;background:${color3a(0.5)}"
> </div>`} as significant as ${tex`-16\%`} ${html`<div
>   style="display:inline-block;width:16px;height:16px;background:${color3a(-0.16)}"
> </div>`}, and ${tex`-50\%`} ${html`<div
>   style="display:inline-block;width:16px;height:16px;background:${color3a(-0.5)}"
> </div>`} as significant as ${tex`+160\%`} ${html`<div
>   style="display:inline-block;width:16px;height:16px;background:${color3a(+1.6)}"
> </div>`}. If we force the scale to be symmetric, we see another dramatic change.

### Change in Deaths from Alcohol Use Disorders, 1980–2014

```js
map(
  (id) => color3b((deaths.get(id)[1] - deaths.get(id)[0]) / deaths.get(id)[0]),
  (id) => `${names.get(id)}
${formatPercentChange((deaths.get(id)[1] - deaths.get(id)[0]) / deaths.get(id)[0])}
${format(deaths.get(id)[0])} per 100,000 in 1980
${format(deaths.get(id)[1])} per 100,000 in 2014`,
  visibility
);
```

```js
d3.select(legend(color3b, "Percentage change of deaths per 100,000 people"))
  .call((g) => g.selectAll(".tick text").text((d) => (d > 0 ? "+" : "") + d * 100))
  .node();
```

Yeesh, what’s going on here? A percentage change of less than ${tex`-100\%`} ${html`<div
  style="display:inline-block;width:16px;height:16px;background:${color3b(-1)}"

> </div>`} is nonsense here: it would imply a negative number of deaths. So if the scale is symmetric and fits the data, its domain is ${tex`\pm265\%`} and we can’t reach most of the darker blues.

Is there a way to show relative change that is symmetric?

## Ratio

We can also compare two values by asking: how big is ${tex`b`} relative to ${tex`a`}?

${tex.block`\text{ratio}(a, b) = \frac{\text{b}}{\text{a}}`}

This is sometimes referred to as _multiplicative change_ to distinguish it from _additive change_: the difference obtained by subtracting ${tex`b - a`}.

### Change in Deaths from Alcohol Use Disorders, 1980–2014

```js
map(
  (id) => color4(deaths.get(id)[1] / deaths.get(id)[0]),
  (id) => `${names.get(id)}
${formatRatio(deaths.get(id)[1] / deaths.get(id)[0])}
${format(deaths.get(id)[0])} per 100,000 in 1980
${format(deaths.get(id)[1])} per 100,000 in 2014`,
  visibility
);
```

```js
d3.select(legend(color4, "Relative likelihood of death", formatRatio)).node();
```

This map is much closer to the previous relative change map than the first absolute difference map, but with an important difference: we can now make it symmetric for both positive and negative change by taking the logarithm of the ratio.

${tex.block`\text{log ratio}(a, b) = \log\frac{\text{b}}{\text{a}}`}

Let’s return to Apache County, Arizona. The 2014 mortality rate is ${tex`\tfrac{31.5}{18.6} = 1.7\times`} its 1980 mortality rate, so the log ratio is ${tex`+0.53`} ${html`<div
  style="display:inline-block;width:16px;height:16px;background:${color4(1.7)}"

> </div>`}. The log scale is symmetric, so it treats this increase from ${tex`18.6`} to ${tex`31.5`} as significant as a decrease from ${tex`31.5`} to ${tex`18.6`}, which is a log ratio of ${tex`\log(\tfrac{18.6}{31.5} = 0.59\times) = -0.53`} ${html`<div
>   style="display:inline-block;width:16px;height:16px;background:${color4(0.59)}"
> </div>`}. For example, that’s about the same as Talbot County, Georgia’s decline from ${tex`7.3`} to ${tex`4.2`} deaths per 100,000.

Log ratios are often used when considering growth, as with investment returns. For example, if a stock doubles and then halves, you’re back where you started: ${tex`\log(\tfrac{2}{1}) + \log(\tfrac{1}{2}) = 0`}. On the other hand if a stock goes up by fifty percent then down by fifty percent, you’ve lost twenty-five percent of your investment: ${tex`(1 \times 0.5) - (1.5 \times 0.5) = -0.25`}. This is why log scales are commonly used in stock price charts, such as this [change line chart](/@mbostock/d3-change-line-chart) and [index chart](/@mbostock/d3-index-chart).

## Which is Best?

I know it’s disappointing, but: none of them. No method is better universally, and none of them is “the best” even in the context of the dataset. (There are also a number of methods I did not cover, such as the [relative difference](https://en.wikipedia.org/wiki/Relative_change_and_difference).) What’s best depends on what you are trying to show. I’d favor [absolute difference](#difference) here as the simplest option, but [log ratio](#ratio) might work if you want to show rate of growth.

There’s another important variable here which we’re ignoring, but which might influence our understanding of the data: population counts. This data is _per capita_ (deaths per 100,000 people per year), which is helpful for understanding how likely any individual is to die, but _not_ the number of people affected. Populations vary widely from county to county, and populations move over time. This makes it especially hard to understand trends that vary both geographically and temporally.

If anything, this essay demonstrates the importance of reading the legend: each map above uses the identical (valid!) title while showing something very different. If we, as readers, do not give the legend a critical eye, we can easily misunderstand, or worse, be actively misled.

#### Acknowledgments

_Thanks to [Lisa Charlotte Rost](https://twitter.com/lisacrost), whose [recent posts on log scales](https://blog.datawrapper.de/weeklychart-logscale/) ([1](https://blog.datawrapper.de/weeklychart-logscale/), [2](https://blog.datawrapper.de/weeklychart-logscale2/), [3](https://blog.datawrapper.de/weeklychart-logscale3/)) inspired this essay!_

---

## Appendix

```js echo
const formatPercentChange = d3.format("+.1%");
```

```js echo
const formatRatio = {
  const format = d3.format(".2~r");
  return x => format(x) + "×";
}
```

```js echo
const color3a = {
  const values = [...deaths.values()];
  return d3.scaleLinear()
      .domain([d3.min(values, ([a, b]) => (b - a) / a), 0, d3.max(values, ([a, b]) => (b - a) / a)])
      .range([-1, 0, 1])
      .interpolate((a, b) => a < 0
          ? t => d3.interpolateBlues(1 - t)
          : t => d3.interpolateReds(t));
}
```

```js echo
const color3b = {
  const values = [...deaths.values()];
  const max = Math.max(-d3.min(values, ([a, b]) => (b - a) / a), d3.max(values, ([a, b]) => (b - a) / a));
  return d3.scaleLinear()
      .domain([-max, 0, max])
      .range([-1, 0, 1])
      .interpolate((a, b) => a < 0
          ? t => d3.interpolateBlues(1 - t)
          : t => d3.interpolateReds(t));
}
```

```js echo
const color4 = {
  const values = [...deaths.values()];
  const max = Math.max(d3.max(values, ([a, b]) => a / b), d3.max(values, ([a, b]) => b / a));
  return d3.scaleLog()
      .domain([1 / max, 1, max])
      .range([-1, 0, 1])
      .interpolate((a, b) => a < 0
          ? t => d3.interpolateBlues(1 - t)
          : t => d3.interpolateReds(t));
}
```

```js echo
import {
  map,
  legend,
  names,
  deaths,
  format,
  formatChange,
  color,
  color2,
  d3
} from "@mbostock/mortality-due-to-alcohol-use-disorder";
```
