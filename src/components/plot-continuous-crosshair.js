import * as Plot from "npm:@observablehq/plot";
import {format, utcFormat, pointer} from "npm:d3";

function hairK(
  k,
  {
    tickFormat,
    interval,
    ariaLabel = "crosshair",
    textStroke = "var(--plot-background)",
    textStrokeWidth = 5,
    tickFormatX = tickFormat,
    tickFormatY = tickFormat,
    tickFormatX2 = null, /** set if you want an opposite tick */
    tickFormatY2 = null,
    anchorX = "bottom",
    anchorY = "left",
    intervalX = interval,
    intervalY = interval,
    text, // an additional text function of x and y
    fontVariant = "tabular-nums",
    ...options
  } = {}
) {
  options = { ...options, pointerEvents: "none" };
  intervalX = maybeInterval(intervalX);
  intervalY = maybeInterval(intervalY);
  const marks = { x: [], x2: [], y: [], y2: [], xy: [] };

  if (k.includes("x")) {
    marks.x.push(Plot.gridX({ ariaLabel: `${ariaLabel}-x tick`, anchor: anchorX, ...options }));
    const [, textX] = Plot.axisX({
      ariaLabel: `${ariaLabel}-x label`,
      textStroke,
      textStrokeWidth,
      tickSize: 0,
      fontVariant,
      anchor: anchorX,
      ...options
    });
    if (textX) marks.x.push(textX);
    if (tickFormatX2 != null) {
      const [, textX] = Plot.axisX({
        ariaLabel: `${ariaLabel}-x label2`,
        textStroke,
        textStrokeWidth,
        tickSize: 0,
        fontVariant,
        anchor: anchorX === "bottom" ? "top" : "bottom",
        ...options
      });
      if (textX) marks.x2.push(textX);
    }
  }

  if (k.includes("y")) {
    marks.y.push(Plot.gridY({ ariaLabel: `${ariaLabel}-y tick`, anchor: anchorY, ...options }));
    const [, textY] = Plot.axisY({
      ariaLabel: `${ariaLabel}-y label`,
      textStroke,
      textStrokeWidth,
      tickSize: 0,
      fontVariant,
      anchor: anchorY,
      ...options
    });
    if (textY) marks.y.push(textY);
    if (tickFormatY2 != null) {
      const [, textY] = Plot.axisY({
        ariaLabel: `${ariaLabel}-y label2`,
        textStroke,
        textStrokeWidth,
        tickSize: 0,
        fontVariant,
        anchor: anchorY === "left" ? "right" : "left",
        ...options
      });
      if (textY) marks.y2.push(textY);
    }
  }

  if (text && k === "xy") {
    marks.xy.push(
      Plot.text([1], {
        ariaLabel: `${ariaLabel}-text`,
        ...options,
        dx: 6,
        textAnchor: "start",
        dy: -10,
        stroke: textStroke
      })
    );
  }

  const frame = Plot.frame({ pointerEvents: "all", stroke: "none" });

  return (_i, scales, _v, dimensions, context) => {
    const g = context.document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("aria-label", `${ariaLabel}`);
    const f = frame.render.apply(frame, [[], {}, {}, dimensions, context]);
    g.append(f);
    const r = context.document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.append(r);
    let sticky = false;
    f.addEventListener("click", (event) => ((sticky = !sticky), update(event)));
    f.addEventListener("pointermove", update);
    f.addEventListener("pointerout", function () {
      if (sticky) return;
      r.innerHTML = "";
      context.dispatchValue(null);
    });

    const formatX = k.includes("x") ? formatk(tickFormatX, scales.x.type) : null;
    const formatX2 = k.includes("x") ? formatk(tickFormatX2, scales.x.type) : null;
    const formatY = k.includes("y") ? formatk(tickFormatY, scales.y.type) : null;
    const formatY2 = k.includes("y") ? formatk(tickFormatY2, scales.y.type) : null;
    
    function formatk(fmt, type) {
      return typeof fmt === "function"
        ? fmt
        : typeof fmt === "string"
        ? (type === "time" || type === "utc" ? utcFormat : format)(fmt)
        : (d) => d;
    }

    function update(event) {
      if (sticky) return;
      let [px, py] = pointer(event, context.ownerSVGElement);
      let x = scales.x?.invert ? scales.x.invert(px) : px;
      if (intervalX)
        (x = intervalX.floor(x)), (px = scales.x ? scales.x(x) : px);
      let y = scales.y?.invert ? scales.y.invert(py) : py;
      if (intervalY)
        (y = intervalY.floor(y)), (py = scales.y ? scales.y(y) : py);
      context.dispatchValue({ x, y });
      r.innerHTML = "";
      r.append(
        ...marks.x.map((m) =>
          m.render.apply(m, [
            [0],
            scales,
            { x: [px], text: [formatX(x)] },
            dimensions,
            context
          ])
        ),
        ...marks.x2.map((m) =>
          m.render.apply(m, [
            [0],
            scales,
            { x: [px], text: [formatX2(x)] },
            dimensions,
            context
          ])
        ),
        ...marks.y.map((mark) =>
          mark.render.apply(mark, [
            [0],
            scales,
            { y: [py], text: [formatY(y)] },
            dimensions,
            context
          ])
        ),
        ...marks.y2.map((mark) =>
          mark.render.apply(mark, [
            [0],
            scales,
            { y: [py], text: [formatY2(y)] },
            dimensions,
            context
          ])
        ),        ...marks.xy.map((mark) =>
          mark.render.apply(mark, [
            [0],
            scales,
            { x: [px], y: [py], text: [text(x, y)] },
            dimensions,
            context
          ])
        )
      );
    }

    return g;
  };
}

function maybeInterval(i) {
  return i == null
    ? i
    : typeof i === "string"
    ? Plot.utcInterval(i)
    : typeof i === "number"
    ? Plot.numberInterval(i)
    : (() => {
        throw new Error(`unsupported interval ${i}`);
      })();
}

export function hair(options) {
  return hairK("xy", options)
}

export function hairX(options) {
  return hairK("x", options)
}

export function hairY(options) {
  return hairK("y", options)
}
