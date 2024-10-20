import {rgb} from "npm:d3-color";
import {easePolyInOut} from "npm:d3-ease";

// orange dark blue
export const interpolateOrDBu = interpolateDivergent("#ff9c00", "#0090ff", {
  pivot: rgb(NaN, 70, NaN),
  back: "#211", // a tiny bit of red in the background
  easing: easePolyInOut.exponent(1.2)
});

// purple dark orange
export const interpolatePuDOr = interpolateDivergent("purple", "orange", {
  pivot: rgb(NaN, 70, NaN),
  back: "#112",
  easing: easePolyInOut.exponent(1.2)
});

// blue gray red
export const interpolateBuGyRd = interpolateDivergent("#04f", "#f30", {
  pivot: rgb(NaN, 70, NaN),
  back: "#777",
  easing: easePolyInOut.exponent(1.2)
});

// red dark white
export const interpolateRdDW = interpolateDivergent("red", "white", {
  pivot: rgb(NaN, NaN, NaN),
  back: "#111",
  easing: easePolyInOut.exponent(1.2)
});

// pink dark green
export const interpolatePiDG = interpolateDivergent("#f4a", "#0f5", {
  pivot: rgb(150, NaN, NaN),
  back: "#222",
  easing: easePolyInOut.exponent(1.2)
});

export function interpolateBack(c = "orange", {pivot = "transparent", easing, back = "#fff"} = {}) {
  c = rgb(c);
  const p = rgb(pivot);
  const k = rgb(back);
  return (t) => {
    t = t < 0 ? 0 : t > 1 ? 1 : t; // clamp
    if (easing) t = easing(t);
    return `rgb(${((isNaN(p.r) ? t * c.r : t * (t * c.r + (1 - t) * p.r)) + (1 - t) * k.r) | 0},${
      ((isNaN(p.g) ? t * c.g : t * (t * c.g + (1 - t) * p.g)) + (1 - t) * k.g) | 0
    }, ${((isNaN(p.b) ? t * c.b : t * (t * c.b + (1 - t) * p.b)) + (1 - t) * k.b) | 0})`;
  };
}

export function interpolateDivergent(a = "orange", b = "blue", options) {
  const neg = interpolateBack(a, options);
  const pos = interpolateBack(b, options);
  return (t) => (t < 0.5 ? neg(2 * (0.5 - t)) : pos(2 * (t - 0.5)));
}
