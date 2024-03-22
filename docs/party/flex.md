# Using flexbox

If you’re new to flexbox, read https://css-tricks.com/snippets/css/a-guide-to-flexbox/

Here’s an example of using flexbox with the **resize** function in order to make dashboards that are responsive.

Let’s begin with a simple **div**:

```html run=false
<div class="card">${resize(box1)}</div>
```

Using resize, we communicate the width of the container `<div class=card>` to the underlying box function (which returns a chart of that width).

<div class="card">${resize(box1)}</div>

```js echo
function box1(width) {
  return Plot.plot({
    width,
    margin: 2,
    marks: [Plot.frame({strokeDasharray: 4}), Plot.text([`${width}px`], {x: null, y: null, anchor: "center"})]
  });
}
```

If the function passed to resize accepts two dimensions (width, height), then the container is expected to have an explicitly set height (and it defaults to 0). The height can be set with a direct style, like so:

```html run=false
<div class="card" style="height: 200px;">${resize(box2)}</div>
```

<div class="card" style="height: 200px;">${resize(box2)}</div>

```js
function box2(width, height) {
  return Plot.plot({
    width,
    height,
    margin: 2,
    marks: [Plot.frame({strokeDasharray: 4}), Plot.text([`${width}×${height}`], {x: null, y: null, anchor: "center"})]
  });
}
```

But the height can be set by any other way, including flexbox. And this is where things become interesting. When a layout has many moving parts, flexbox can set the height to “fill in the space” in a responsive way.

Here’s a slightly elaborate layout that uses flexbox. The adjustment variable is going to be our target div (where we might put a chart):

<div style="display: flex; flex-direction: row; gap: 3%;"
>
  <div style="flex-grow: 1; display: flex; flex-wrap: nowrap; flex-direction: column;">
    <div class="card" style="margin-bottom: 0;"><h2>A title</h2></div>
    <div class="card" style="flex-grow: 1;">
      ${resize(box2)}
    </div>
  </div>
  <div style="width: 240px; display: flex; flex-wrap: nowrap; flex-direction: column;">
    <div class="card" style="flex-grow: 1;">
      <small>Some text to lorem is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum passages, and more essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like publishing software like Aldus PageMaker including versions of Lorem Ipsum.</small>
    </div>
  </div>
</div>

See how these values also are not integers anymore.
